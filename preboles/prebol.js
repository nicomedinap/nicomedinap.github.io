/* ==========================================================================
   PORCENTAJE DE ROJO REAL — VERSIÓN OPTIMIZADA
   ==========================================================================
   - Muestreo a 2 FPS (en lugar de ~12 FPS)
   - Canvas se pinta una vez
*/
(function () {
  'use strict';

  // --- CONFIGURACIÓN ---
  const CONFIG = {
    ANIMATION_DURATION_MS: 16300,    // duración de la animación (ms)
    GRADIENT_ANGLE_DEG: 290,         // ángulo del gradiente CSS
    BG_SIZE_X: 5,                    // background-size: 500% → 5x
    SAMPLE_INTERVAL_MS: 200,         // 2 FPS (suficiente para un contador de texto)
    REDRAW_THRESHOLD: 15.5,           // solo actualizar si cambia > 15.5%
    RESIZE_DEBOUNCE_MS: 200,         // debounce para resize
  };

  // --- DATOS DEL GRADIENTE (precalculados) ---
  const STOP_COLORS = [
    '#1b5e20', '#2e7d32', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9',
    '#a5d6a7', '#81c784', '#4caf50', '#2e7d32',
    '#f06292', '#ff8a65', '#ff5722', '#e53935', '#ff5722', '#ff8a65', '#f06292',
    '#2e7d32', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9',
    '#a5d6a7', '#81c784', '#4caf50', '#2e7d32', '#1b5e20'
  ];

  // Posiciones clave de la animación [tiempo (0-1), posición (%)
  const POSITION_KEYFRAMES = [
    [0.00, 0], [0.35, 15], [0.45, 30], [0.52, 45],
    [0.58, 55], [0.65, 65], [0.75, 80], [0.85, 92], [1.00, 100]
  ];

  // --- PRECÁLCULOS (se ejecutan una sola vez) ---
  // Convertir colores a RGB una sola vez
  const RGB_COLORS = STOP_COLORS.map(hex => {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  });

  // Calcular el máximo R-G una sola vez
  const MAX_R_MINUS_G = Math.max(...RGB_COLORS.map(c => c.r - c.g));

  // Precalcular tabla de lookup para posición de fondo (100 puntos)
  const POSITION_LOOKUP = new Float32Array(101);
  for (let i = 0; i <= 100; i++) {
    const progress = i / 100;
    POSITION_LOOKUP[i] = backgroundPositionAt(progress);
  }

  function backgroundPositionAt(progress) {
    for (let i = 0; i < POSITION_KEYFRAMES.length - 1; i++) {
      const [t0, p0] = POSITION_KEYFRAMES[i];
      const [t1, p1] = POSITION_KEYFRAMES[i + 1];
      if (progress >= t0 && progress <= t1) {
        const localT = (progress - t0) / (t1 - t0 || 1);
        return p0 + (p1 - p0) * localT;
      }
    }
    return 0;
  }

  // --- ESTADO ---
  let canvas, ctx;
  let W = 0, H = 0, bigW = 0, bigH = 0;
  let canvasReady = false;
  let lastSample = 0;
  let lastRedness = -1;
  let animationId = null;
  let resizeTimeout = null;

  // --- DOM REFS (cacheadas) ---
  const emojiEl = document.getElementById('trebolEmoji');
  const percentEl = document.getElementById('arrebolPercent');

  // --- FUNCIÓN PRINCIPAL: PINTAR GRADIENTE (solo cuando es necesario) ---
  function paintGradient() {
    if (!emojiEl) return false;

    const rect = emojiEl.getBoundingClientRect();
    const newW = Math.max(1, Math.round(rect.width));
    const newH = Math.max(1, Math.round(rect.height));

    // Si el tamaño no cambió, no repintamos (ahorro de CPU)
    if (W === newW && H === newH && canvasReady) {
      return true;
    }

    W = newW;
    H = newH;
    bigW = W * CONFIG.BG_SIZE_X;
    bigH = H;

    // Crear canvas solo una vez
    if (!canvas) {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    }

    canvas.width = Math.max(1, Math.round(bigW));
    canvas.height = Math.max(1, Math.round(bigH));

    // Calcular línea de gradiente (misma fórmula que CSS)
    const a = CONFIG.GRADIENT_ANGLE_DEG * Math.PI / 180;
    const dx = Math.sin(a);
    const dy = -Math.cos(a);
    const L = Math.abs(bigW * dx) + Math.abs(bigH * dy);
    const cx = bigW / 2, cy = bigH / 2;
    const x0 = cx - (dx * L) / 2, y0 = cy - (dy * L) / 2;
    const x1 = cx + (dx * L) / 2, y1 = cy + (dy * L) / 2;

    // Crear gradiente
    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    RGB_COLORS.forEach((color, i) => {
      grad.addColorStop(i / (RGB_COLORS.length - 1), 
        `rgb(${color.r},${color.g},${color.b})`);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvasReady = true;
    return true;
  }

  // --- MUESTREO OPTIMIZADO (usando lookup table) ---
  function samplePixelAt(bgPosPercent) {
    // Usar lookup table para obtener la posición X
    const progress = (performance.now() % CONFIG.ANIMATION_DURATION_MS) / CONFIG.ANIMATION_DURATION_MS;
    const progressIndex = Math.round(progress * 100);
    const posPercent = POSITION_LOOKUP[progressIndex] || 0;

    const px = Math.min(
      canvas.width - 1,
      Math.max(0, Math.round(W * (CONFIG.BG_SIZE_X - 1) * (posPercent / 100) + W / 2))
    );
    const py = Math.round(canvas.height / 2);

    // Leer solo un píxel (getImageData es costoso, pero solo 2 veces/segundo)
    const data = ctx.getImageData(px, py, 1, 1).data;
    return { r: data[0], g: data[1] };
  }

  // --- ACTUALIZAR PORCENTAJE CON THROTTLING ---
  function updateArrebolPercent(timestamp) {
    if (!canvasReady || !percentEl) {
      animationId = requestAnimationFrame(updateArrebolPercent);
      return;
    }

    // Throttling: solo muestrear cada SAMPLE_INTERVAL_MS
    if (timestamp - lastSample >= CONFIG.SAMPLE_INTERVAL_MS) {
      lastSample = timestamp;

      // Calcular rojez
      const progress = (timestamp % CONFIG.ANIMATION_DURATION_MS) / CONFIG.ANIMATION_DURATION_MS;
      const progressIndex = Math.round(progress * 100);
      const bgPos = POSITION_LOOKUP[progressIndex] || 0;

      const { r, g } = samplePixelAt(bgPos);
      const redness = Math.max(0, Math.min(100, ((r - g) / MAX_R_MINUS_G) * 100));

      // Solo actualizar el DOM si el cambio es significativo (ahorro de reflows)
      if (Math.abs(redness - lastRedness) >= CONFIG.REDRAW_THRESHOLD) {
        lastRedness = redness;
        percentEl.textContent = `${Math.round(redness)}%`;
      }
    }

    // Continuar el loop
    animationId = requestAnimationFrame(updateArrebolPercent);
  }

  // --- INICIALIZACIÓN CON DEBOUNCE ---
  function initOrResize() {
    // Limpiar timeout previo (debounce)
    if (resizeTimeout) {
      cancelAnimationFrame(resizeTimeout);
      resizeTimeout = null;
    }

    // Ejecutar paintGradient en el próximo frame (evita layout thrashing)
    resizeTimeout = requestAnimationFrame(() => {
      paintGradient();
      resizeTimeout = null;
    });
  }

  // --- START / STOP (para pestañas inactivas) ---
  function startAnimation() {
    if (animationId) return;
    lastSample = 0;
    lastRedness = -1;
    animationId = requestAnimationFrame(updateArrebolPercent);
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // --- EVENTOS ---
  document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que el DOM esté listo y las fuentes cargadas
    initOrResize();
    setTimeout(initOrResize, 300);
    startAnimation();
  });

  // Resize con debounce
  window.addEventListener('resize', initOrResize);

  // Pausar cuando la pestaña no está visible (ahorro de CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      // Recalcular al volver
      initOrResize();
      startAnimation();
    }
  });

  // Cleanup al salir (opcional)
  window.addEventListener('beforeunload', () => {
    stopAnimation();
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
      canvas = null;
      ctx = null;
    }
  });
})();