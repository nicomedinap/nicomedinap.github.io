    /* ==========================================================================
   PORCENTAJE DE ROJO REAL — LEÍDO DIRECTAMENTE DEL PIXEL RENDERIZADO
   ==========================================================================
   En vez de reimplementar a mano la interpolación de color del gradiente
   (lo que arrastra errores de aproximación), pintamos el MISMO gradiente
   en un <canvas> oculto usando createLinearGradient con los mismos colores,
   posiciones y ángulo que el CSS. El canvas hace la interpolación exacta.
   Luego, en cada frame, leemos con getImageData el pixel que corresponde
   al centro del trébol (según el background-position actual) y calculamos
   su "rojez" real como (R-G) normalizado contra el stop más rojo.
*/
(function () {
  const ANIMATION_DURATION_MS = 16300; // debe calzar con "16s" en @keyframes arrebolShift
  const GRADIENT_ANGLE_DEG = 290;      // debe calzar con el ángulo del gradiente CSS
  const BG_SIZE_X = 5;                 // background-size: 500% 100% → 5x de ancho
  const SAMPLE_INTERVAL_MS = 80;       // ~12 lecturas/seg, de sobra para un contador de texto

  // Mismos 27 colores y posiciones que el @keyframes/gradiente CSS
  const STOP_COLORS = [
    '#1b5e20', '#2e7d32', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9',
    '#a5d6a7', '#81c784', '#4caf50', '#2e7d32',
    '#f06292', '#ff8a65', '#ff5722', '#e53935', '#ff5722', '#ff8a65', '#f06292',
    '#2e7d32', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9',
    '#a5d6a7', '#81c784', '#4caf50', '#2e7d32', '#1b5e20'
  ];

  const POSITION_KEYFRAMES = [
    [0.00, 0], [0.35, 15], [0.45, 30], [0.52, 45],
    [0.58, 55], [0.65, 65], [0.75, 80], [0.85, 92], [1.00, 100]
  ];

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  // R-G máximo entre los stops → define qué color es "100% rojo"
  const MAX_R_MINUS_G = Math.max(...STOP_COLORS.map(c => {
    const { r, g } = hexToRgb(c);
    return r - g;
  }));

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

  // --- Canvas oculto donde se pinta el gradiente real ---
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let W = 0, H = 0, bigW = 0, bigH = 0;

  function paintGradient() {
    const emoji = document.getElementById('trebolEmoji');
    if (!emoji) return false;
    const rect = emoji.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return false;

    W = rect.width;
    H = rect.height;
    bigW = W * BG_SIZE_X;
    bigH = H;
    canvas.width = Math.max(1, Math.round(bigW));
    canvas.height = Math.max(1, Math.round(bigH));

    // Misma fórmula que usa CSS para proyectar la línea del gradiente
    // según su ángulo sobre una caja de tamaño (bigW x bigH).
    const a = GRADIENT_ANGLE_DEG * Math.PI / 180;
    const dx = Math.sin(a);
    const dy = -Math.cos(a);
    const L = Math.abs(bigW * dx) + Math.abs(bigH * dy);
    const cx = bigW / 2, cy = bigH / 2;
    const x0 = cx - (dx * L) / 2, y0 = cy - (dy * L) / 2;
    const x1 = cx + (dx * L) / 2, y1 = cy + (dy * L) / 2;

    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    STOP_COLORS.forEach((color, i) => {
      grad.addColorStop(i / (STOP_COLORS.length - 1), color);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return true;
  }

  function samplePixelAt(bgPosPercent) {
    // Coordenada X, dentro de la imagen grande, que queda centrada
    // en el trébol para un background-position dado.
    const px = Math.min(
      canvas.width - 1,
      Math.max(0, Math.round(W * (BG_SIZE_X - 1) * (bgPosPercent / 100) + W / 2))
    );
    const py = Math.round(canvas.height / 2);
    const data = ctx.getImageData(px, py, 1, 1).data;
    return { r: data[0], g: data[1], b: data[2] };
  }

  function updateArrebolPercent(timestampMs) {
    const el = document.getElementById('arrebolPercent');
    if (el && ready && timestampMs - lastSample >= SAMPLE_INTERVAL_MS) {
      lastSample = timestampMs;
      const progress = (timestampMs % ANIMATION_DURATION_MS) / ANIMATION_DURATION_MS;
      const bgPos = backgroundPositionAt(progress);
      const { r, g } = samplePixelAt(bgPos);
      const redness = Math.max(0, Math.min(100, ((r - g) / MAX_R_MINUS_G) * 100));
      el.textContent = `${Math.round(redness)}%`;
    }
    requestAnimationFrame(updateArrebolPercent);
  }

  function initOrResize() {
    ready = paintGradient();
  }

  let ready = false;
  let lastSample = 0;

  document.addEventListener('DOMContentLoaded', () => {
    initOrResize();
    // El span puede tardar un tick en tener dimensiones finales (fuentes cargando)
    setTimeout(initOrResize, 300);
    requestAnimationFrame(updateArrebolPercent);
  });

  window.addEventListener('resize', initOrResize);
})();