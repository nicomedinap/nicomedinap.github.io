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
    top: 40px;
    left: 8px;
    padding: 8px 16px;
    width: auto;
    min-width: 40px;  /* Ancho mínimo para cuando muestra ✕ */
    height: 40px;
    background: rgba(20,20,30,0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #4CAF50;
    border-radius: 20px;
    color: #4CAF50;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    white-space: nowrap;
    transition: all 0.2s ease;  /* Transición suave al cambiar */
}

/* Estilo especial cuando muestra ✕ */
#menu-toggle:has(✕) {
    font-size: 18px;  /* ✕ un poco más grande */
    padding: 8px 12px;  /* Menos padding horizontal */
}

#ui {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100%;
    background: rgba(10,10,15,0.98);
    backdrop-filter: blur(10px);
    border-right: 1px solid #333;
    z-index: 1000;
    transition: transform 0.3s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 15px;
}

#ui.collapsed {
    transform: translateX(-100%);
}

.ui-header {
    padding: 15px 12px;
    border-bottom: 1px solid #333;
}

.ui-header h1 {
    margin: 0;
    font-size: 16px;
    text-align: center;
    font-weight: 500;
}

.ui-header span { color: #4CAF50; }

.ui-content { padding: 12px; }

.section {
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 12px;
}

.section h3 {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: #aaa;
    text-transform: uppercase;
    border-left: 3px solid #4CAF50;
    padding-left: 8px;
}

.row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    min-height: 40px;
}

.row label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #eee;
    font-size: 13px;
}

input[type="checkbox"], input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #4CAF50;
}

.mode-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    margin: 8px 0;
}

.mode-btn {
    background: #2a2a3a;
    border: 1px solid #555;
    border-radius: 25px;
    padding: 12px 3px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
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
    border-radius: 25px;
    padding: 12px;
    color: white;
    font-size: 13px;
    cursor: pointer;
    margin: 4px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    touch-action: manipulation;
}

.action-btn:active { background: #3a3a4a; }

.help-text {
    font-size: 11px;
    color: #aaa;
    background: rgba(0,0,0,0.3);
    border-radius: 10px;
    padding: 10px;
    margin-top: 12px;
}

.help-text div {
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 6px;
}

.mode-indicator {
    position: fixed;
    bottom: 8px;
    right: 8px;
    background: rgba(0,0,0,0.9);
    border: 1.5px solid #4CAF50;
    border-radius: 30px;
    padding: 8px 16px;
    color: #4CAF50;
    font-weight: bold;
    font-size: 12px;
    z-index: 2000;
    pointer-events: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

.hidden { display: none !important; }
</style>
</head>
<body>

<div id="menu-toggle" onclick="toggleMenu()">MENÚ DE ACCIONES</div>

<div id="ui" class="collapsed">

    <div class="ui-content">
        <br>
        <br>
        <br>
        <br>

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
            
            <div id="fixedControls" class="hidden">
                <div class="row"><label><input type="radio" name="pol" value="1" checked> 🔴 Positiva</label></div>
                <div class="row"><label><input type="radio" name="pol" value="-1"> 🔵 Negativa</label></div>
            </div>
            
            <div id="mobileControls" class="hidden">
                <div class="row"><label><input type="radio" name="mobilePol" value="1" checked> 🟠 Positiva móvil</label></div>
                <div class="row"><label><input type="radio" name="mobilePol" value="-1"> 🟣 Negativa móvil</label></div>
            </div>
            
            <div id="measureControls" class="hidden">
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
// SIMULADOR OPTIMIZADO PARA MÓVIL - CON SÍMBOLOS + Y -
// ============================================================================

// --- CONSTANTES ---
const DOMAIN = { W:30, H:40, X_MIN:-15, X_MAX:15, Y_MIN:-20, Y_MAX:20 };
const CONFIG = {
    FIELD_MAX:20, POTENTIAL_SCALE:0.4, EPSILON:1e-6,
    CHARGE_RADIUS:15, MOBILE_RADIUS:15, MEASUREMENT_RADIUS:5,
    GRID_STEP:1.0, ZOOM_MIN:2, ZOOM_MAX:40, DT:0.1, MASS:1.0, TRAIL_LENGTH:20
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
let touches = {};
let touchStart = null, touchMoved = false, lastTouch = null;
let initialDistance = null;
let initialZoom = null;
let zoomCenter = null;

// --- INICIALIZACIÓN ---
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener('resize', resize);
    
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchEnd);
    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    
    setupButtons();
    
    charges.push({ x:-5, y:0, q:3 }, { x:5, y:0, q:-3 });
    mobileCharges.push({
        x:0, y:0, q:0.5, vx:0.3, vy:0.2,
        trail: []
    });
    
    setMode(MODE.PAN);
    // Asegurar que el botón muestre "MENÚ DE ACCIONES" al inicio
    ui.toggle.textContent = 'MENÚ DE ACCIONES';
    ui.toggle.style.backgroundColor = 'rgba(20,20,30,0.95)';
    ui.toggle.style.borderColor = '#4CAF50';
    ui.toggle.style.color = '#4CAF50';
    animate();
}

function toggleMenu() {
    ui.panel.classList.toggle('collapsed');
    
    // Cambiar el texto y estilo del botón según el estado del menú
    if (ui.panel.classList.contains('collapsed')) {
        ui.toggle.textContent = 'MENÚ DE ACCIONES';  // Menú cerrado
        ui.toggle.style.backgroundColor = 'rgba(20,20,30,0.95)';
        ui.toggle.style.borderColor = '#4CAF50';
        ui.toggle.style.color = '#4CAF50';
    } else {
        ui.toggle.textContent = '✕';  // Menú abierto - símbolo de cerrar
        ui.toggle.style.backgroundColor = '#4CAF50';
        ui.toggle.style.borderColor = '#4CAF50';
        ui.toggle.style.color = 'black';
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

// --- FUNCIONES FÍSICAS ---
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
        
        let saltoX = Math.abs(pos.x - c.x) > DOMAIN.W/2;
        let saltoY = Math.abs(pos.y - c.y) > DOMAIN.H/2;
        
        c.x = pos.x;
        c.y = pos.y;
        
        if (saltoX || saltoY) {
            c.trail = [];
        }
        
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

// --- FUNCIÓN PARA DIBUJAR CARGA CON SÍMBOLO ---
function drawCharge(x, y, q, isMobile = false) {
    let s = worldToScreen(x, y);
    let radius = isMobile ? CONFIG.MOBILE_RADIUS : CONFIG.CHARGE_RADIUS;
    
    // Color de fondo según polaridad y tipo
    if (q > 0) {
        // Positivas: rojo
        ctx.fillStyle = "#ff3333";
    } else {
        // Negativas: azul oscuro
        ctx.fillStyle = "#003366";
    }
    
    // Círculo de fondo
    ctx.beginPath();
    ctx.arc(s.X, s.Y, radius, 0, 2*Math.PI);
    ctx.fill();
    
    // Borde blanco
    ctx.strokeStyle = "white";
    ctx.lineWidth = isMobile ? 2 : 1.5;
    ctx.stroke();
    
    // Símbolo
    ctx.font = `bold ${radius * 2}px Arial`; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    if (q > 0) {
        // Positivo: signo + negro
        ctx.fillStyle = "black";
        ctx.fillText("+", s.X, s.Y - 1);
    } else {
        // Negativo: signo - blanco
        ctx.fillStyle = "white";
        ctx.fillText("−", s.X, s.Y - 1);
    }
}

// --- DIBUJO ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Potencial
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
        
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        let tl = worldToScreen(DOMAIN.X_MIN, DOMAIN.Y_MIN);
        let br = worldToScreen(DOMAIN.X_MAX, DOMAIN.Y_MAX);
        ctx.strokeRect(tl.X, tl.Y, br.X - tl.X, br.Y - tl.Y);
        ctx.setLineDash([]);
    }
    
// Líneas de campo con flechas de dirección < >
if (ui.showFieldLines.checked) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1.4;
    
    let spacing = 1.2;
    for (let x = DOMAIN.X_MIN; x <= DOMAIN.X_MAX; x += spacing) {
        for (let y = DOMAIN.Y_MIN; y <= DOMAIN.Y_MAX; y += spacing) {
            let cerca = false;
            for (let c of charges) {
                if (Math.hypot(x - c.x, y - c.y) < 0.6) { cerca = true; break; }
            }
            if (!cerca) {
                for (let c of mobileCharges) {
                    if (Math.hypot(x - c.x, y - c.y) < 0.6) { cerca = true; break; }
                }
            }
            
            if (!cerca) {
                let f = field(x, y);
                let m = Math.hypot(f.vx, f.vy);
                if (m > 0.05) {
                    let px = x, py = y;
                    let puntos = [];
                    
                    // Recoger puntos de la línea
                    for (let step = 0; step < 40; step++) {
                        let f2 = field(px, py);
                        let m2 = Math.hypot(f2.vx, f2.vy);
                        if (m2 < 0.01) break;
                        
                        px += 0.12 * f2.vx / m2;
                        py += 0.12 * f2.vy / m2;
                        
                        if (px < DOMAIN.X_MIN || px > DOMAIN.X_MAX || 
                            py < DOMAIN.Y_MIN || py > DOMAIN.Y_MAX) break;
                        
                        puntos.push({ x: px, y: py });
                    }
                    
                    // Dibujar la línea
                    if (puntos.length > 1) {
                        ctx.beginPath();
                        let start = worldToScreen(x, y);
                        ctx.moveTo(start.X, start.Y);
                        
                        for (let p of puntos) {
                            let s = worldToScreen(p.x, p.y);
                            ctx.lineTo(s.X, s.Y);
                        }
                        ctx.stroke();
                        
                        // Añadir flecha < > en la dirección
                        if (puntos.length > 5) {
                            let idx = Math.floor(puntos.length / 2);
                            let p1 = puntos[idx-1];
                            let p2 = puntos[idx];
                            
                            if (p1 && p2) {
                                let s1 = worldToScreen(p1.x, p1.y);
                                let s2 = worldToScreen(p2.x, p2.y);
                                
                                // Vector dirección
                                let dx = s2.X - s1.X;
                                let dy = s2.Y - s1.Y;
                                let len = Math.hypot(dx, dy);
                                let angulo = Math.atan2(dy, dx);
                                
                                if (len > 5) {
                                    ctx.save();
                                    ctx.translate(s2.X, s2.Y);
                                    ctx.rotate(angulo);
                                    
                                    // Dibujar símbolo <
                                    ctx.font = "20px Arial";
                                    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                                    ctx.textAlign = "center";
                                    ctx.textBaseline = "middle";
                                    ctx.fillText(">", 0, 0);
                                    
                                    ctx.restore();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
    
    // Vectores campo
    if (ui.showField.checked) {
        let spacing = 40;
        for (let i = spacing/2; i < canvas.width; i += spacing) {
            for (let j = spacing/2; j < canvas.height; j += spacing) {
                let w = screenToWorld(i, j);
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
            
            let puntosValidos = [];
            for (let i = 0; i < c.trail.length; i++) {
                let p = c.trail[i];
                if (i > 0) {
                    let dist = Math.hypot(p.x - c.trail[i-1].x, p.y - c.trail[i-1].y);
                    if (dist < 5) {
                        puntosValidos.push(p);
                    } else {
                        if (puntosValidos.length > 1) {
                            ctx.stroke();
                        }
                        puntosValidos = [p];
                    }
                } else {
                    puntosValidos.push(p);
                }
            }
            
            if (puntosValidos.length > 1) {
                ctx.beginPath();
                for (let i = 0; i < puntosValidos.length; i++) {
                    let s = worldToScreen(puntosValidos[i].x, puntosValidos[i].y);
                    if (i === 0) ctx.moveTo(s.X, s.Y);
                    else ctx.lineTo(s.X, s.Y);
                }
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }
    }
    
    // Cargas fijas con símbolos
    for (let c of charges) {
        drawCharge(c.x, c.y, c.q, false);
    }
    
    // Cargas móviles con símbolos
    for (let c of mobileCharges) {
        drawCharge(c.x, c.y, c.q, true);
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

// --- FUNCIÓN AUXILIAR PARA DISTANCIA ENTRE DOS DEDOS ---
function getTouchDistance(touch1, touch2) {
    let dx = touch1.clientX - touch2.clientX;
    let dy = touch1.clientY - touch2.clientY;
    return Math.hypot(dx, dy);
}

function getTouchMidpoint(touch1, touch2) {
    return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
    };
}

// --- MANEJADORES TÁCTILES ---
function handleTouchStart(e) {
    e.preventDefault();
    let rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < e.touches.length; i++) {
        let touch = e.touches[i];
        touches[touch.identifier] = {
            id: touch.identifier,
            clientX: touch.clientX,
            clientY: touch.clientY
        };
    }
    
    if (e.touches.length === 2) {
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];
        initialDistance = getTouchDistance(touch1, touch2);
        initialZoom = zoom;
        
        let mid = getTouchMidpoint(touch1, touch2);
        zoomCenter = screenToWorld(mid.x - rect.left, mid.y - rect.top);
    }
    else if (e.touches.length === 1) {
        let touch = e.touches[0];
        let w = screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
        
        if (currentMode === MODE.MEASURE && Math.hypot(w.x - origin.x, w.y - origin.y) < 0.5) {
            draggingOrigin = true;
            return;
        }
        
        touchStart = { x: touch.clientX, y: touch.clientY };
        lastTouch = { x: touch.clientX, y: touch.clientY };
        touchMoved = false;
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    let rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < e.touches.length; i++) {
        let touch = e.touches[i];
        if (touches[touch.identifier]) {
            touches[touch.identifier].clientX = touch.clientX;
            touches[touch.identifier].clientY = touch.clientY;
        }
    }
    
    if (e.touches.length === 2 && initialDistance !== null) {
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];
        
        let currentDistance = getTouchDistance(touch1, touch2);
        let zoomFactor = initialDistance / currentDistance;  // Invertido
        
        let newZoom = initialZoom * zoomFactor;
        newZoom = Math.max(CONFIG.ZOOM_MIN, Math.min(CONFIG.ZOOM_MAX, newZoom));
        
        if (zoomCenter) {
            let mid = getTouchMidpoint(touch1, touch2);
            let worldMid = screenToWorld(mid.x - rect.left, mid.y - rect.top);
            
            viewX += (zoomCenter.x - worldMid.x) * (1 - zoom/newZoom);
            viewY += (zoomCenter.y - worldMid.y) * (1 - zoom/newZoom);
        }
        
        zoom = newZoom;
        return;
    }
    
    if (draggingOrigin) {
        let touch = e.touches[0];
        let w = screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
        origin.x = w.x;
        origin.y = w.y;
        return;
    }
    
    if (!touchStart) return;
    
    let touch = e.touches[0];
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
    let rect = canvas.getBoundingClientRect();
    
    let remainingTouches = {};
    for (let i = 0; i < e.touches.length; i++) {
        let touch = e.touches[i];
        remainingTouches[touch.identifier] = touches[touch.identifier];
    }
    touches = remainingTouches;
    
    if (e.touches.length !== 2) {
        initialDistance = null;
        initialZoom = null;
        zoomCenter = null;
    }
    
    if (draggingOrigin) {
        draggingOrigin = false;
        return;
    }
    
    if (!touchStart) return;
    
    if (!touchMoved && e.touches.length === 0) {
        let w = screenToWorld(touchStart.x - rect.left, touchStart.y - rect.top);
        w = applyCyclic(w.x, w.y);
        
        // SIEMPRE AGREGAR SEGÚN EL MODO, SIN COMPROBAR ELIMINACIÓN
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
                    trail: []
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
    
    touchStart = null;
}
// --- MANEJADORES RATÓN ---
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
        
        // SIEMPRE AGREGAR SEGÚN EL MODO, SIN COMPROBAR ELIMINACIÓN
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
                    trail: []
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

window.onload = init;
</script>
</body>
</html>