---
layout: topbar
---

<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Simulador de Cargas - Móvil</title>
<style>
* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

body {
    margin: 0;
    background: black;
    overflow: hidden;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    touch-action: none;
    position: fixed;
    width: 100%;
    height: 100%;
}

canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
}

#menu-toggle {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 44px;
    height: 44px;
    background: rgba(20,20,30,0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #4CAF50;
    border-radius: 12px;
    color: #4CAF50;
    font-size: 20px;
    cursor: pointer;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.2s;
}

#ui {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100%;
    background: rgba(10,10,15,0.98);
    backdrop-filter: blur(10px);
    border-right: 1px solid #333;
    z-index: 1000;
    transition: transform 0.3s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 20px;
}

#ui.collapsed {
    transform: translateX(-100%);
}

.ui-header {
    padding: 20px 15px;
    border-bottom: 1px solid #333;
    background: rgba(0,0,0,0.3);
}

.ui-header h1 {
    margin: 0;
    font-size: 18px;
    text-align: center;
    font-weight: 500;
}

.ui-header span { color: #4CAF50; }

.ui-content { padding: 15px; }

.section {
    background: rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 15px;
    margin-bottom: 15px;
}

.section h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-left: 3px solid #4CAF50;
    padding-left: 8px;
}

.row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    min-height: 44px;
}

.row label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #eee;
    font-size: 14px;
}

input[type="checkbox"], input[type="radio"] {
    width: 20px;
    height: 20px;
    accent-color: #4CAF50;
}

.mode-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin: 10px 0;
}

.mode-btn {
    background: #2a2a3a;
    border: 1px solid #555;
    border-radius: 30px;
    padding: 14px 5px;
    color: white;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    touch-action: manipulation;
}

.mode-btn.active {
    background: #4CAF50;
    border-color: #8bc34a;
    color: black;
}

.mode-btn:active { transform: scale(0.95); }

.action-btn {
    width: 100%;
    background: #2a2a3a;
    border: 1px solid #555;
    border-radius: 30px;
    padding: 14px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    touch-action: manipulation;
}

.action-btn:active { background: #3a3a4a; }

.action-btn.danger { background: #5a2a2a; }

.help-text {
    font-size: 12px;
    color: #aaa;
    background: rgba(0,0,0,0.3);
    border-radius: 12px;
    padding: 12px;
    margin-top: 15px;
}

.help-text div {
    margin: 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.mode-indicator {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.9);
    border: 2px solid #4CAF50;
    border-radius: 40px;
    padding: 12px 20px;
    color: #4CAF50;
    font-weight: bold;
    font-size: 14px;
    z-index: 2000;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.controls-container {
    transition: opacity 0.2s;
    margin-top: 10px;
}

.hidden { display: none !important; }
</style>
</head>
<body>

<div id="menu-toggle" onclick="toggleMenu()">☰</div>

<div id="ui">
    <div class="ui-header"><h1><span>⚡</span> CARGAS MÓVILES <span>⚡</span></h1></div>
    <div class="ui-content">
        
        <div class="section">
            <h3>VISUALIZACIÓN</h3>
            <div class="row"><label><input type="checkbox" id="showGrid" checked> Grilla</label></div>
            <div class="row"><label><input type="checkbox" id="showField" checked> Vectores campo</label></div>
            <div class="row"><label><input type="checkbox" id="showPotential" checked> Potencial</label></div>
            <div class="row"><label><input type="checkbox" id="showFieldLines" checked> Líneas campo</label></div>
            <div class="row"><label><input type="checkbox" id="showTrails" checked> Trayectorias</label></div>
        </div>

        <div class="section">
            <h3>MODO</h3>
            <div class="mode-grid">
                <button class="mode-btn" id="modePan">🖱️ Mover</button>
                <button class="mode-btn" id="modeAddFixed">➕ Fija</button>
                <button class="mode-btn" id="modeAddMobile">⚡ Móvil</button>
                <button class="mode-btn" id="modeMeasure">📏 Medir</button>
            </div>
            
            <div id="fixedControls" class="controls-container hidden">
                <div class="row"><label><input type="radio" name="pol" value="1" checked> 🔴 Positiva</label></div>
                <div class="row"><label><input type="radio" name="pol" value="-1"> 🔵 Negativa</label></div>
            </div>
            
            <div id="mobileControls" class="controls-container hidden">
                <div class="row"><label><input type="radio" name="mobilePol" value="1" checked> 🟠 Positiva móvil</label></div>
                <div class="row"><label><input type="radio" name="mobilePol" value="-1"> 🟣 Negativa móvil</label></div>
            </div>
            
            <div id="measureControls" class="controls-container hidden">
                <div class="row"><label><input type="checkbox" id="showModel"> Modelo 1/r²</label></div>
                <button class="action-btn" id="clearMeasurements">🗑️ Borrar <span id="measurementCount">0</span></button>
            </div>
        </div>

        <div class="section">
            <h3>ACCIONES</h3>
            <button class="action-btn" id="clearMobileCharges">🗑️ Eliminar móviles</button>
            <button class="action-btn" id="toggleMotion">⏸️ Pausar</button>
            <button class="action-btn" id="resetView">🎯 Centrar vista</button>
        </div>

        <div class="help-text">
            <div>👆 Arrastrar: Mover vista</div>
            <div>👆 Tocar: Acción según modo</div>
            <div>👆 Tocar carga: Eliminar</div>
            <div>🌌 Dominio 20×30 cíclico</div>
        </div>
    </div>
</div>

<div id="modeIndicator" class="mode-indicator">🖱️ MOVER</div>

<canvas id="canvas"></canvas>

<script>
// ============================================================================
// SIMULADOR OPTIMIZADO PARA MÓVIL - CON LÍNEAS DE CAMPO MÁS DENSAS Y VECTORES MÁS GRANDES
// ============================================================================

// --- CONSTANTES ---
const DOMAIN = { W:20, H:30, X_MIN:-10, X_MAX:10, Y_MIN:-15, Y_MAX:15 };
const CONFIG = {
    FIELD_MAX:20, POTENTIAL_SCALE:0.4, EPSILON:1e-6,
    CHARGE_RADIUS:8, MOBILE_RADIUS:10, MEASUREMENT_RADIUS:5,
    GRID_STEP:1.0, ZOOM_MIN:2, ZOOM_MAX:40, DT:0.1, MASS:1.0, TRAIL_LENGTH:20,
    // Parámetros mejorados para visualización
    FIELD_LINE_DENSITY: 12,      // Más líneas por carga (antes 6)
    FIELD_LINE_STEP: 0.03,       // Paso más pequeño para líneas más suaves
    FIELD_LINE_MAX_STEPS: 150,   // Más pasos por línea
    ARROW_SIZE_MULT: 1.5,        // Flechas más grandes
    ARROW_SPACING: 40            // Más vectores (antes 50)
};

const ERROR = { POSITION:0.02, FIELD:0.1 };
const MODE = { PAN:'pan', ADD_FIXED:'addFixed', ADD_MOBILE:'addMobile', MEASURE:'measure' };

// --- ELEMENTOS UI ---
const ui = {
    toggle: document.getElementById("menu-toggle"),
    panel: document.getElementById("ui"),
    showGrid: document.getElementById("showGrid"),
    showField: document.getElementById("showField"),
    showPotential: document.getElementById("showPotential"),
    showFieldLines: document.getElementById("showFieldLines"),
    showTrails: document.getElementById("showTrails"),
    showModel: document.getElementById("showModel"),
    clearMeasurements: document.getElementById("clearMeasurements"),
    measurementCount: document.getElementById("measurementCount"),
    clearMobile: document.getElementById("clearMobileCharges"),
    toggleMotion: document.getElementById("toggleMotion"),
    resetView: document.getElementById("resetView"),
    modeIndicator: document.getElementById("modeIndicator"),
    
    modePan: document.getElementById("modePan"),
    modeAddFixed: document.getElementById("modeAddFixed"),
    modeAddMobile: document.getElementById("modeAddMobile"),
    modeMeasure: document.getElementById("modeMeasure"),
    
    fixedControls: document.getElementById("fixedControls"),
    mobileControls: document.getElementById("mobileControls"),
    measureControls: document.getElementById("measureControls")
};

// --- ESTADO ---
let canvas, ctx;
let zoom = 15, viewX = 0, viewY = 0;
let currentMode = MODE.PAN;
let charges = [], mobileCharges = [], measurements = [];
let simulationPaused = false, draggingOrigin = false;
let origin = { x:0, y:0 };

// Touch handling
let touchStart = null, touchMoved = false, lastTouch = null;

// --- INICIALIZACIÓN ---
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener('resize', resize);
    
    // Event listeners táctiles
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchEnd);
    
    // Event listeners ratón (para desarrollo)
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    
    // Configurar botones
    setupButtons();
    
    // Ejemplos iniciales
    charges.push({ x:-5, y:0, q:3 }, { x:5, y:0, q:-3 });
    mobileCharges.push({
        x:0, y:0, q:0.5, vx:0.3, vy:0.2,
        trail: [{ x:0, y:0 }]
    });
    
    setMode(MODE.PAN);
    animate();
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function toggleMenu() {
    ui.panel.classList.toggle('collapsed');
    ui.toggle.textContent = ui.panel.classList.contains('collapsed') ? '☰' : '✕';
}

function setupButtons() {
    ui.modePan.onclick = () => setMode(MODE.PAN);
    ui.modeAddFixed.onclick = () => setMode(MODE.ADD_FIXED);
    ui.modeAddMobile.onclick = () => setMode(MODE.ADD_MOBILE);
    ui.modeMeasure.onclick = () => setMode(MODE.MEASURE);
    
    ui.clearMeasurements.onclick = () => {
        measurements = [];
        updateMeasurementCount();
    };
    
    ui.clearMobile.onclick = () => { mobileCharges = []; };
    
    ui.toggleMotion.onclick = () => {
        simulationPaused = !simulationPaused;
        ui.toggleMotion.innerHTML = simulationPaused ? '▶️ Reanudar' : '⏸️ Pausar';
    };
    
    ui.resetView.onclick = () => {
        viewX = 0; viewY = 0; zoom = 15;
    };
    
    ui.showModel.checked = false;
}

function setMode(mode) {
    currentMode = mode;
    
    [ui.modePan, ui.modeAddFixed, ui.modeAddMobile, ui.modeMeasure].forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`mode${mode.charAt(0).toUpperCase()+mode.slice(1)}`).classList.add('active');
    
    ui.fixedControls.classList.toggle('hidden', mode !== MODE.ADD_FIXED);
    ui.mobileControls.classList.toggle('hidden', mode !== MODE.ADD_MOBILE);
    ui.measureControls.classList.toggle('hidden', mode !== MODE.MEASURE);
    
    const modeNames = {
        [MODE.PAN]: '🖱️ MOVER', [MODE.ADD_FIXED]: '➕ FIJA',
        [MODE.ADD_MOBILE]: '⚡ MÓVIL', [MODE.MEASURE]: '📏 MEDIR'
    };
    ui.modeIndicator.textContent = `MODO: ${modeNames[mode]}`;
    ui.modeIndicator.style.borderColor = mode === MODE.ADD_MOBILE ? '#ffaa6b' : '#4CAF50';
}

function updateMeasurementCount() {
    ui.measurementCount.textContent = measurements.length;
}

// --- FUNCIONES FÍSICAS OPTIMIZADAS ---
function applyCyclic(x, y) {
    if (x > DOMAIN.X_MAX) x -= DOMAIN.W;
    else if (x < DOMAIN.X_MIN) x += DOMAIN.W;
    if (y > DOMAIN.Y_MAX) y -= DOMAIN.H;
    else if (y < DOMAIN.Y_MIN) y += DOMAIN.H;
    return { x, y };
}

function minImageDistance(x1, y1, x2, y2) {
    let dx = x1 - x2, dy = y1 - y2;
    if (dx > DOMAIN.W/2) dx -= DOMAIN.W;
    else if (dx < -DOMAIN.W/2) dx += DOMAIN.W;
    if (dy > DOMAIN.H/2) dy -= DOMAIN.H;
    else if (dy < -DOMAIN.H/2) dy += DOMAIN.H;
    return { dx, dy, r: Math.hypot(dx, dy) };
}

function field(x, y) {
    let Ex = 0, Ey = 0;
    
    for (let c of charges) {
        let { dx, dy, r } = minImageDistance(x, y, c.x, c.y);
        if (r < CONFIG.EPSILON) continue;
        let E = c.q / (r * r + CONFIG.EPSILON);
        Ex += E * dx / r;
        Ey += E * dy / r;
    }
    
    for (let c of mobileCharges) {
        let { dx, dy, r } = minImageDistance(x, y, c.x, c.y);
        if (r < CONFIG.EPSILON) continue;
        let E = c.q / (r * r + CONFIG.EPSILON);
        Ex += E * dx / r;
        Ey += E * dy / r;
    }
    
    return { vx: Ex, vy: Ey };
}

function potential(x, y) {
    let V = 0;
    for (let c of charges) V += c.q / (minImageDistance(x, y, c.x, c.y).r + CONFIG.EPSILON);
    for (let c of mobileCharges) V += c.q / (minImageDistance(x, y, c.x, c.y).r + CONFIG.EPSILON);
    return V;
}

function drawFieldLine(startX, startY, forward = true) {
    let x = startX, y = startY;
    const step = CONFIG.FIELD_LINE_STEP * (forward ? 1 : -1);
    
    ctx.beginPath();
    const startScreen = worldToScreen(x, y);
    ctx.moveTo(startScreen.X, startScreen.Y);

    for (let i = 0; i < CONFIG.FIELD_LINE_MAX_STEPS; i++) {
        const f = field(x, y);
        const m = Math.hypot(f.vx, f.vy);
        
        if (m < 0.001) break;
        
        x += step * f.vx / m;
        y += step * f.vy / m;
        
        // APLICAR CONDICIONES CÍCLICAS TAMBIÉN EN EL DIBUJO
        const cyclic = applyCyclicForDrawing(x, y);
        x = cyclic.x;
        y = cyclic.y;
        
        const s = worldToScreen(x, y);
        ctx.lineTo(s.X, s.Y);
    }
    
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
}

// Función para aplicar condiciones cíclicas también en el dibujo
function applyCyclicForDrawing(px, py) {
    // Si está fuera del dominio visible, reiniciar para que siga dibujando
    if (px < DOMAIN.X_MIN) px += DOMAIN.W;
    else if (px > DOMAIN.X_MAX) px -= DOMAIN.W;
    if (py < DOMAIN.Y_MIN) py += DOMAIN.H;
    else if (py > DOMAIN.Y_MAX) py -= DOMAIN.H;
    return { x: px, y: py };
}

function updateMobile() {
    if (simulationPaused) return;
    
    for (let c of mobileCharges) {
        let E = field(c.x, c.y);
        let ax = c.q * E.vx / CONFIG.MASS;
        let ay = c.q * E.vy / CONFIG.MASS;
        
        let newX = c.x + c.vx * CONFIG.DT + 0.5 * ax * CONFIG.DT * CONFIG.DT;
        let newY = c.y + c.vy * CONFIG.DT + 0.5 * ay * CONFIG.DT * CONFIG.DT;
        
        c.vx += ax * CONFIG.DT;
        c.vy += ay * CONFIG.DT;
        
        let pos = applyCyclic(newX, newY);
        c.x = pos.x; c.y = pos.y;
        
        c.trail.push({ x: c.x, y: c.y });
        if (c.trail.length > CONFIG.TRAIL_LENGTH) c.trail.shift();
    }
}

// --- CONVERSIÓN COORDENADAS ---
function worldToScreen(x, y) {
    return {
        X: canvas.width * (0.5 + (x - viewX) / zoom),
        Y: canvas.height * (0.5 + (y - viewY) / zoom)
    };
}

function screenToWorld(X, Y) {
    return {
        x: viewX + (X / canvas.width - 0.5) * zoom,
        y: viewY + (Y / canvas.height - 0.5) * zoom
    };
}

// --- DIBUJO MEJORADO ---
// --- DIBUJO MEJORADO ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Potencial (fondo)
    if (ui.showPotential.checked) {
        let step = 30;
        for (let i = 0; i < canvas.width; i += step) {
            for (let j = 0; j < canvas.height; j += step) {
                let w = screenToWorld(i, j);
                let V = potential(w.x, w.y) * CONFIG.POTENTIAL_SCALE;
                let int = Math.min(255, 200 * Math.abs(V));
                ctx.fillStyle = V > 0 ? `rgba(${int},40,40,0.35)` : `rgba(40,40,${int},0.35)`;
                ctx.fillRect(i, j, step, step);
            }
        }
    }
    
    // Grilla
    if (ui.showGrid.checked) {
        let step = CONFIG.GRID_STEP;
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 0.5;
        
        let startX = Math.floor((viewX - zoom/2) / step) * step;
        let startY = Math.floor((viewY - zoom*canvas.height/canvas.width/2) / step) * step;
        
        for (let x = startX; x <= viewX + zoom/2; x += step) {
            let sx = worldToScreen(x, 0).X;
            if (sx >= 0 && sx <= canvas.width) {
                ctx.beginPath();
                ctx.moveTo(sx, 0);
                ctx.lineTo(sx, canvas.height);
                ctx.stroke();
            }
        }
        
        for (let y = startY; y <= viewY + zoom*canvas.height/canvas.width/2; y += step) {
            let sy = worldToScreen(0, y).Y;
            if (sy >= 0 && sy <= canvas.height) {
                ctx.beginPath();
                ctx.moveTo(0, sy);
                ctx.lineTo(canvas.width, sy);
                ctx.stroke();
            }
        }
        
        // Bordes dominio
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        let tl = worldToScreen(DOMAIN.X_MIN, DOMAIN.Y_MIN);
        let br = worldToScreen(DOMAIN.X_MAX, DOMAIN.Y_MAX);
        ctx.strokeRect(tl.X, tl.Y, br.X - tl.X, br.Y - tl.Y);
        ctx.setLineDash([]);
    }
    
    // LÍNEAS DE CAMPO - AHORA CUBREN TODO EL DOMINIO
    if (ui.showFieldLines.checked) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1.2;
        
        // Crear una cuadrícula de puntos de inicio en el dominio
        let spacing = 1.5; // Espaciado en unidades del mundo
        for (let x = DOMAIN.X_MIN; x <= DOMAIN.X_MAX; x += spacing) {
            for (let y = DOMAIN.Y_MIN; y <= DOMAIN.Y_MAX; y += spacing) {
                // Evitar empezar muy cerca de las cargas (para no saturar)
                let cercaDeCarga = false;
                for (let c of charges) {
                    let dx = x - c.x;
                    let dy = y - c.y;
                    if (Math.hypot(dx, dy) < 0.8) {
                        cercaDeCarga = true;
                        break;
                    }
                }
                if (!cercaDeCarga) {
                    for (let c of mobileCharges) {
                        let dx = x - c.x;
                        let dy = y - c.y;
                        if (Math.hypot(dx, dy) < 0.8) {
                            cercaDeCarga = true;
                            break;
                        }
                    }
                }
                
                if (!cercaDeCarga) {
                    // Dibujar línea en dirección del campo
                    let f = field(x, y);
                    let m = Math.hypot(f.vx, f.vy);
                    if (m > 0.1) {
                        // Dirección positiva
                        let px = x, py = y;
                        ctx.beginPath();
                        let start = worldToScreen(px, py);
                        ctx.moveTo(start.X, start.Y);
                        
                        for (let step = 0; step < 50; step++) {
                            let f2 = field(px, py);
                            let m2 = Math.hypot(f2.vx, f2.vy);
                            if (m2 < 0.01) break;
                            
                            px += 0.1 * f2.vx / m2;
                            py += 0.1 * f2.vy / m2;
                            
                            if (px < DOMAIN.X_MIN || px > DOMAIN.X_MAX || 
                                py < DOMAIN.Y_MIN || py > DOMAIN.Y_MAX) break;
                            
                            let s = worldToScreen(px, py);
                            ctx.lineTo(s.X, s.Y);
                        }
                        ctx.stroke();
                        
                        // Dirección negativa
                        px = x; py = y;
                        ctx.beginPath();
                        ctx.moveTo(start.X, start.Y);
                        
                        for (let step = 0; step < 50; step++) {
                            let f2 = field(px, py);
                            let m2 = Math.hypot(f2.vx, f2.vy);
                            if (m2 < 0.01) break;
                            
                            px -= 0.1 * f2.vx / m2;
                            py -= 0.1 * f2.vy / m2;
                            
                            if (px < DOMAIN.X_MIN || px > DOMAIN.X_MAX || 
                                py < DOMAIN.Y_MIN || py > DOMAIN.Y_MAX) break;
                            
                            let s = worldToScreen(px, py);
                            ctx.lineTo(s.X, s.Y);
                        }
                        ctx.stroke();
                    }
                }
            }
        }
    }
    
    // VECTORES DE CAMPO
    if (ui.showField.checked) {
        let spacing = 40;
        for (let i = spacing/2; i < canvas.width; i += spacing) {
            for (let j = spacing/2; j < canvas.height; j += spacing) {
                let w = screenToWorld(i, j);
                // Solo dibujar vectores dentro del dominio
                if (w.x >= DOMAIN.X_MIN && w.x <= DOMAIN.X_MAX && 
                    w.y >= DOMAIN.Y_MIN && w.y <= DOMAIN.Y_MAX) {
                    let f = field(w.x, w.y);
                    let m = Math.hypot(f.vx, f.vy);
                    if (m < 0.01) continue;
                    
                    let L = (8 + 15 * Math.tanh(0.15 * m)) * 1.5;
                    let ux = f.vx / m, uy = f.vy / m;
                    let t = Math.min(1, m / CONFIG.FIELD_MAX);
                    ctx.strokeStyle = `rgb(${255*t},0,${255*(1-t)})`;
                    ctx.fillStyle = ctx.strokeStyle;
                    ctx.lineWidth = 1.5;
                    
                    ctx.beginPath();
                    ctx.moveTo(i, j);
                    ctx.lineTo(i + L*ux, j + L*uy);
                    ctx.stroke();
                    
                    let tipX = i + L*ux, tipY = j + L*uy;
                    let arrowSize = 7 * 1.5;
                    ctx.beginPath();
                    ctx.moveTo(tipX, tipY);
                    ctx.lineTo(tipX - arrowSize*(ux*0.866 - uy*0.5), 
                              tipY - arrowSize*(uy*0.866 + ux*0.5));
                    ctx.lineTo(tipX - arrowSize*(ux*0.866 + uy*0.5), 
                              tipY - arrowSize*(uy*0.866 - ux*0.5));
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    }
    
    // Trayectorias
    if (ui.showTrails.checked) {
        for (let c of mobileCharges) {
            if (c.trail.length < 2) continue;
            ctx.strokeStyle = c.q > 0 ? "#ffaa6b" : "#9f6bff";
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            
            for (let i = 0; i < c.trail.length; i++) {
                let s = worldToScreen(c.trail[i].x, c.trail[i].y);
                if (i === 0) ctx.moveTo(s.X, s.Y);
                else ctx.lineTo(s.X, s.Y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }
    
    // Cargas fijas
    for (let c of charges) {
        let s = worldToScreen(c.x, c.y);
        ctx.fillStyle = c.q > 0 ? "#ff6b6b" : "#6b9fff";
        ctx.beginPath();
        ctx.arc(s.X, s.Y, CONFIG.CHARGE_RADIUS, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Cargas móviles
    for (let c of mobileCharges) {
        let s = worldToScreen(c.x, c.y);
        ctx.fillStyle = c.q > 0 ? "#ffaa6b" : "#9f6bff";
        ctx.beginPath();
        ctx.arc(s.X, s.Y, CONFIG.MOBILE_RADIUS, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Origen medición
    if (currentMode === MODE.MEASURE) {
        let s = worldToScreen(origin.x, origin.y);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.X - 12, s.Y);
        ctx.lineTo(s.X + 12, s.Y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.X, s.Y - 12);
        ctx.lineTo(s.X, s.Y + 12);
        ctx.stroke();
        ctx.fillStyle = "yellow";
        ctx.font = "12px sans-serif";
        ctx.fillText("Origen", s.X + 15, s.Y - 10);
    }
    
    // Gráfico mediciones
    if (currentMode === MODE.MEASURE && measurements.length > 0) {
        let h = canvas.height * 0.3;
        let y0 = canvas.height - h;
        
        ctx.fillStyle = "rgba(0,0,0,0.95)";
        ctx.fillRect(0, y0, canvas.width, h);
        
        let rMin = Math.min(...measurements.map(m => m.r));
        let rMax = Math.max(...measurements.map(m => m.r));
        let eMin = Math.min(...measurements.map(m => m.E));
        let eMax = Math.max(...measurements.map(m => m.E));
        
        if (rMax === rMin) rMax = rMin + 1;
        if (eMax === eMin) eMax = eMin + 1;
        
        for (let m of measurements) {
            let x = 50 + (m.r - rMin) / (rMax - rMin) * (canvas.width - 100);
            let y = y0 + 20 + (1 - (m.E - eMin) / (eMax - eMin)) * (h - 40);
            
            let t = Math.min(1, m.E / CONFIG.FIELD_MAX);
            ctx.fillStyle = `rgb(${255*t},0,${255*(1-t)})`;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2*Math.PI);
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    // Escala
    let x = canvas.width - 40, y0 = 80, h = 150;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(x - 8, y0 - 10, 30, h + 20);
    
    for (let i = 0; i < h; i++) {
        let t = i / h;
        let E = (1 - t) * CONFIG.FIELD_MAX;
        ctx.strokeStyle = `rgb(${255*t},0,${255*(1-t)})`;
        ctx.beginPath();
        ctx.moveTo(x, y0 + i);
        ctx.lineTo(x + 15, y0 + i);
        ctx.stroke();
    }
    
    ctx.fillStyle = "white";
    ctx.font = "10px sans-serif";
    ctx.fillText("E", x - 6, y0 - 5);
}

// --- MANEJADORES TÁCTILES OPTIMIZADOS ---
function handleTouchStart(e) {
    e.preventDefault();
    let touch = e.touches[0];
    let rect = canvas.getBoundingClientRect();
    let w = screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
    
    if (currentMode === MODE.MEASURE && Math.hypot(w.x - origin.x, w.y - origin.y) < 0.5) {
        draggingOrigin = true;
        return;
    }
    
    touchStart = { x: touch.clientX, y: touch.clientY };
    lastTouch = { x: touch.clientX, y: touch.clientY };
    touchMoved = false;
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchStart && !draggingOrigin) return;
    
    let touch = e.touches[0];
    
    if (draggingOrigin) {
        let rect = canvas.getBoundingClientRect();
        let w = screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
        origin.x = w.x;
        origin.y = w.y;
        return;
    }
    
    let dx = touch.clientX - lastTouch.x;
    let dy = touch.clientY - lastTouch.y;
    
    if (Math.hypot(touch.clientX - touchStart.x, touch.clientY - touchStart.y) > 10) {
        touchMoved = true;
    }
    
    viewX -= dx / canvas.width * zoom;
    viewY -= dy / canvas.height * zoom;
    
    lastTouch = { x: touch.clientX, y: touch.clientY };
}

function handleTouchEnd(e) {
    e.preventDefault();
    
    if (draggingOrigin) {
        draggingOrigin = false;
        return;
    }
    
    if (!touchStart) return;
    
    if (!touchMoved && e.touches.length === 0) {
        // Fue un tap
        let rect = canvas.getBoundingClientRect();
        let w = screenToWorld(touchStart.x - rect.left, touchStart.y - rect.top);
        w = applyCyclic(w.x, w.y);
        
        // Verificar si tocó alguna carga para eliminar
        let chargeFound = false;
        for (let i = 0; i < charges.length; i++) {
            let { r } = minImageDistance(charges[i].x, charges[i].y, w.x, w.y);
            if (r < 1.0) {
                charges.splice(i, 1);
                chargeFound = true;
                break;
            }
        }
        
        if (!chargeFound) {
            for (let i = 0; i < mobileCharges.length; i++) {
                let { r } = minImageDistance(mobileCharges[i].x, mobileCharges[i].y, w.x, w.y);
                if (r < 1.0) {
                    mobileCharges.splice(i, 1);
                    chargeFound = true;
                    break;
                }
            }
        }
        
        // Si no tocó ninguna carga, realizar acción según modo
        if (!chargeFound) {
            switch (currentMode) {
                case MODE.ADD_FIXED:
                    let pol = document.querySelector('input[name="pol"]:checked').value;
                    charges.push({ x: w.x, y: w.y, q: Number(pol) });
                    break;
                    
                case MODE.ADD_MOBILE:
                    let mpol = document.querySelector('input[name="mobilePol"]:checked').value;
                    mobileCharges.push({
                        x: w.x, y: w.y, q: Number(mpol),
                        vx: 0.2, vy: 0.1,
                        trail: [{ x: w.x, y: w.y }]
                    });
                    break;
                    
                case MODE.MEASURE:
                    let x = w.x + (Math.random()*2-1)*ERROR.POSITION;
                    let y = w.y + (Math.random()*2-1)*ERROR.POSITION;
                    let dx = x - origin.x, dy = y - origin.y;
                    let r = Math.hypot(dx, dy);
                    let f = field(x, y);
                    let Ex = f.vx * (1 + (Math.random()*2-1)*ERROR.FIELD);
                    let Ey = f.vy * (1 + (Math.random()*2-1)*ERROR.FIELD);
                    measurements.push({ r, E: Math.hypot(Ex, Ey) });
                    updateMeasurementCount();
                    break;
            }
        }
    }
    
    touchStart = null;
}

// --- MANEJADORES RATÓN (respaldo) ---
function handleMouseDown(e) {
    let rect = canvas.getBoundingClientRect();
    let w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
    
    if (currentMode === MODE.MEASURE && Math.hypot(w.x - origin.x, w.y - origin.y) < 0.5) {
        draggingOrigin = true;
        return;
    }
    
    touchStart = { x: e.clientX, y: e.clientY };
    lastTouch = { x: e.clientX, y: e.clientY };
    touchMoved = false;
}

function handleMouseMove(e) {
    if (!touchStart && !draggingOrigin) return;
    
    if (draggingOrigin) {
        let rect = canvas.getBoundingClientRect();
        let w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
        origin.x = w.x;
        origin.y = w.y;
        return;
    }
    
    let dx = e.clientX - lastTouch.x;
    let dy = e.clientY - lastTouch.y;
    
    if (Math.hypot(e.clientX - touchStart.x, e.clientY - touchStart.y) > 5) {
        touchMoved = true;
    }
    
    viewX -= dx / canvas.width * zoom;
    viewY -= dy / canvas.height * zoom;
    
    lastTouch = { x: e.clientX, y: e.clientY };
}

function handleMouseUp(e) {
    if (draggingOrigin) {
        draggingOrigin = false;
        return;
    }
    
    if (!touchStart) return;
    
    if (!touchMoved) {
        let rect = canvas.getBoundingClientRect();
        let w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
        w = applyCyclic(w.x, w.y);
        
        // Verificar si hizo click en alguna carga para eliminar
        let chargeFound = false;
        for (let i = 0; i < charges.length; i++) {
            let { r } = minImageDistance(charges[i].x, charges[i].y, w.x, w.y);
            if (r < 1.0) {
                charges.splice(i, 1);
                chargeFound = true;
                break;
            }
        }
        
        if (!chargeFound) {
            for (let i = 0; i < mobileCharges.length; i++) {
                let { r } = minImageDistance(mobileCharges[i].x, mobileCharges[i].y, w.x, w.y);
                if (r < 1.0) {
                    mobileCharges.splice(i, 1);
                    chargeFound = true;
                    break;
                }
            }
        }
        
        // Si no hizo click en ninguna carga, realizar acción según modo
        if (!chargeFound) {
            switch (currentMode) {
                case MODE.ADD_FIXED:
                    let pol = document.querySelector('input[name="pol"]:checked').value;
                    charges.push({ x: w.x, y: w.y, q: Number(pol) });
                    break;
                    
                case MODE.ADD_MOBILE:
                    let mpol = document.querySelector('input[name="mobilePol"]:checked').value;
                    mobileCharges.push({
                        x: w.x, y: w.y, q: Number(mpol),
                        vx: 0.2, vy: 0.1,
                        trail: [{ x: w.x, y: w.y }]
                    });
                    break;
                    
                case MODE.MEASURE:
                    let x = w.x + (Math.random()*2-1)*ERROR.POSITION;
                    let y = w.y + (Math.random()*2-1)*ERROR.POSITION;
                    let dx = x - origin.x, dy = y - origin.y;
                    let r = Math.hypot(dx, dy);
                    let f = field(x, y);
                    let Ex = f.vx * (1 + (Math.random()*2-1)*ERROR.FIELD);
                    let Ey = f.vy * (1 + (Math.random()*2-1)*ERROR.FIELD);
                    measurements.push({ r, E: Math.hypot(Ex, Ey) });
                    updateMeasurementCount();
                    break;
            }
        }
    }
    
    touchStart = null;
}

function handleWheel(e) {
    e.preventDefault();
    let rect = canvas.getBoundingClientRect();
    let before = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
    
    zoom *= Math.exp(e.deltaY * 0.001);
    zoom = Math.max(CONFIG.ZOOM_MIN, Math.min(CONFIG.ZOOM_MAX, zoom));
    
    let after = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
    viewX += before.x - after.x;
    viewY += before.y - after.y;
}

// --- BUCLE PRINCIPAL ---
function animate() {
    updateMobile();
    draw();
    requestAnimationFrame(animate);
}

// Iniciar
window.onload = init;
</script>
</body>
</html>