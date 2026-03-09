---
layout: topbar
---

<html lang="es">
<head>
<meta charset="UTF-8">
<title>Simulador de Cargas Eléctricas</title>

<style>
/* ===== ESTILOS GENERALES ===== */
body {
    margin: 0;
    background: black;
    overflow: hidden;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

canvas {
    display: block;
}

/* ===== BOTÓN PARA OCULTAR/MOSTRAR PANEL ===== */
#menu-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: rgba(30, 30, 40, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #555;
    border-radius: 8px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

#menu-toggle:hover {
    background: rgba(50, 50, 60, 0.95);
    border-color: #777;
}

/* ===== PANEL DE CONTROL ===== */
#ui {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 260px;
    background: rgba(20, 20, 30, 0.95);
    backdrop-filter: blur(10px);
    padding: 0;
    border-radius: 12px;
    border: 1px solid #444;
    font-size: 13px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    transition: transform 0.3s ease;
    overflow: hidden;
}

#ui.collapsed {
    transform: translateX(-280px);
}

.ui-header {
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-bottom: 1px solid #444;
}

.ui-header h1 {
    margin: 0;
    font-size: 18px;
    color: #fff;
    text-align: center;
    font-weight: 500;
    letter-spacing: 1px;
}

.ui-header h1 span {
    color: #4CAF50;
    font-weight: bold;
}

.ui-content {
    padding: 16px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
}

.ui-section {
    margin-bottom: 20px;
}

.ui-section h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-left: 3px solid #4CAF50;
    padding-left: 8px;
}

.ui-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    padding: 6px 10px;
    border-radius: 6px;
    transition: background 0.2s;
}

.ui-row:hover {
    background: rgba(255, 255, 255, 0.08);
}

.ui-row label {
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #eee;
}

.ui-row input[type="checkbox"],
.ui-row input[type="radio"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #4CAF50;
}

.ui-button {
    width: 100%;
    padding: 10px;
    background: #2a2a3a;
    color: white;
    border: 1px solid #555;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.ui-button:hover {
    background: #3a3a4a;
    border-color: #777;
}

.ui-badge {
    background: #333;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    color: #4CAF50;
    border: 1px solid #4CAF5033;
    font-weight: bold;
}

.help-text {
    font-size: 12px;
    color: #aaa;
    line-height: 1.8;
    padding: 10px;
    background: rgba(0,0,0,0.2);
    border-radius: 6px;
    margin-top: 10px;
}

.help-text div {
    margin: 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Estilo para scrollbar */
.ui-content::-webkit-scrollbar {
    width: 6px;
}

.ui-content::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.2);
}

.ui-content::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
}

.ui-content::-webkit-scrollbar-thumb:hover {
    background: #777;
}
</style>
</head>

<body>

<div id="menu-toggle" onclick="toggleMenu()">◀</div>

<div id="ui">
    <div class="ui-header">
        <h1><span>⚡</span> SIMULADOR DE CARGAS ELÉCTRICAS <span>⚡</span></h1>
    </div>
    
    <div class="ui-content">
        <!-- Visualización -->
        <div class="ui-section">
            <h3>VISUALIZACIÓN</h3>
            <div class="ui-row">
                <label><input type="checkbox" id="showGrid" checked> Grilla de coordenadas</label>
            </div>
            <div class="ui-row">
                <label><input type="checkbox" id="showField" checked> Vectores de campo</label>
            </div>
            <div class="ui-row">
                <label><input type="checkbox" id="showPotential" checked> Potencial (fondo)</label>
            </div>
            <div class="ui-row">
                <label><input type="checkbox" id="showFieldLines" checked> Líneas de campo</label>
            </div>
        </div>

        <!-- Medición -->
        <div class="ui-section">
            <h3>MEDICIÓN</h3>
            <div class="ui-row">
                <label><input type="checkbox" id="measureMode"> Modo medición</label>
                <span class="ui-badge" id="measurementCount">0</span>
            </div>
            <div class="ui-row">
                <label><input type="checkbox" id="showModel"> Modelo 1/r²</label>
            </div>
            <button class="ui-button" id="clearMeasurements">
                <span>🗑️</span> Borrar mediciones
            </button>
        </div>

        <!-- Cargas -->
        <div class="ui-section">
            <h3>Polaridad de las cargas</h3>
            <div class="ui-row">
                <label><input type="radio" name="pol" value="1" checked> <span style="color: #ff6b6b;">🔴 Positiva</span></label>
            </div>
            <div class="ui-row">
                <label><input type="radio" name="pol" value="-1"> <span style="color: #6b9fff;">🔵 Negativa</span></label>
            </div>
        </div>

    </div>
</div>

<canvas id="canvas"></canvas>

<script>
/* ============================================================================
   SIMULADOR DE CARGAS ELÉCTRICAS - VERSIÓN FINAL
   ============================================================================ */

/* ----------------------------------------------------------------------------
   CONFIGURACIÓN Y CONSTANTES GLOBALES
   ---------------------------------------------------------------------------- */
const CONFIG = {
    FIELD_MAX: 20,              // Valor máximo para escala de colores
    POTENTIAL_SCALE: 0.4,       // Escala para visualización de potencial
    EPSILON: 1e-6,              // Evitar divisiones por cero
    LINE_STEP: 0.015,           // Paso inicial para líneas de campo
    MAX_LINE_POINTS: 400,       // Máximo de puntos por línea
    MIN_FIELD_THRESHOLD: 1e-4,  // Umbral mínimo de campo
    CHARGE_RADIUS: 8,           // Radio visual de las cargas
    MEASUREMENT_RADIUS: 5,      // Radio visual de las mediciones
    GRID_STEP: 0.2,             // Paso base de la grilla
    ZOOM: { MIN: 0.05, MAX: 20 } // Límites de zoom
};

// Error máximo para mediciones (valores fijos)
const ERROR = {
    POSITION: 0.02,    // Error máximo de posición
    FIELD: 0.1         // Error máximo de campo
};

/* ----------------------------------------------------------------------------
   FUNCIÓN PARA OCULTAR/MOSTRAR PANEL
   ---------------------------------------------------------------------------- */
function toggleMenu() {
    const ui = document.getElementById('ui');
    const toggle = document.getElementById('menu-toggle');
    ui.classList.toggle('collapsed');
    toggle.textContent = ui.classList.contains('collapsed') ? '▶' : '◀';
}

/* ----------------------------------------------------------------------------
   ELEMENTOS UI Y REFERENCIAS
   ---------------------------------------------------------------------------- */
const showGrid = document.getElementById("showGrid");
const showField = document.getElementById("showField");
const showPotential = document.getElementById("showPotential");
const showFieldLines = document.getElementById("showFieldLines");
const measureMode = document.getElementById("measureMode");
const showModel = document.getElementById("showModel");
const clearMeasurements = document.getElementById("clearMeasurements");
const measurementCount = document.getElementById("measurementCount");

// Modelo desactivado por defecto
showModel.checked = false;

/* ----------------------------------------------------------------------------
   CANVAS Y CONTEXTO
   ---------------------------------------------------------------------------- */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

/* ----------------------------------------------------------------------------
   ESTADO DE LA VISTA
   ---------------------------------------------------------------------------- */
let zoom = 1;
let viewX = 0.5;
let viewY = 0.5;

/* ----------------------------------------------------------------------------
   DATOS DE LA SIMULACIÓN
   ---------------------------------------------------------------------------- */
const charges = [];
const measurements = [];
let measurementPoint = null;

// Actualizar contador de mediciones
function updateMeasurementCount() {
    measurementCount.textContent = measurements.length;
}

// Borrar mediciones
clearMeasurements.onclick = () => {
    measurements.length = 0;
    updateMeasurementCount();
};

/* ----------------------------------------------------------------------------
   ORIGEN PARA MEDICIONES
   ---------------------------------------------------------------------------- */
let origin = { x: 0, y: 0 };
let draggingOrigin = false;

/* ----------------------------------------------------------------------------
   FUNCIONES FÍSICAS
   ---------------------------------------------------------------------------- */

/**
 * Calcula el campo eléctrico en un punto (x, y)
 */
function field(x, y) {
    let Ex = 0, Ey = 0;
    
    for (const c of charges) {
        const dx = x - c.x;
        const dy = y - c.y;
        const r2 = dx * dx + dy * dy + CONFIG.EPSILON;
        const r = Math.sqrt(r2);
        const E = c.q / r2;
        
        Ex += E * dx / r;
        Ey += E * dy / r;
    }
    
    return { vx: Ex, vy: Ey };
}

/**
 * Calcula el potencial eléctrico en un punto (x, y)
 */
function potential(x, y) {
    let V = 0;
    
    for (const c of charges) {
        const dx = x - c.x;
        const dy = y - c.y;
        const r = Math.sqrt(dx * dx + dy * dy) + CONFIG.EPSILON;
        V += c.q / r;
    }
    
    return V;
}

/* ----------------------------------------------------------------------------
   FUNCIONES DE ERROR
   ---------------------------------------------------------------------------- */

/**
 * Genera ruido aleatorio con el nivel máximo especificado
 */
function noise(level) {
    return (Math.random() * 2 - 1) * level;
}

/* ----------------------------------------------------------------------------
   FUNCIONES DE COLOR
   ---------------------------------------------------------------------------- */

function potentialColor(V) {
    V *= CONFIG.POTENTIAL_SCALE;
    const intensity = Math.min(255, 200 * Math.abs(V));
    
    if (V > 0) {
        return `rgba(${intensity}, 40, 40, 0.35)`;
    } else {
        return `rgba(40, 40, ${intensity}, 0.35)`;
    }
}

function fieldColor(E) {
    const t = Math.max(0, Math.min(1, E / CONFIG.FIELD_MAX));
    const r = Math.floor(255 * t);
    const b = Math.floor(255 * (1 - t));
    return `rgb(${r}, 0, ${b})`;
}

/* ----------------------------------------------------------------------------
   CONVERSIÓN COORDENADAS
   ---------------------------------------------------------------------------- */

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

/* ----------------------------------------------------------------------------
   DIBUJO DE GRILLA (AHORA CON CHECKBOX)
   ---------------------------------------------------------------------------- */

function drawMainGrid() {
    if (!showGrid.checked) return; // No dibujar si está desactivada

    const worldWidth = zoom;
    const worldHeight = zoom * canvas.height / canvas.width;

    // Ajustar paso según zoom
    let baseStep = CONFIG.GRID_STEP;
    if (zoom < 0.5) baseStep = 1.0;
    else if (zoom < 1) baseStep = 0.5;
    else if (zoom < 2) baseStep = 0.2;
    else if (zoom < 5) baseStep = 0.1;
    else baseStep = 0.05;

    const startX = Math.floor((viewX - worldWidth / 2) / baseStep) * baseStep;
    const startY = Math.floor((viewY - worldHeight / 2) / baseStep) * baseStep;
    const endX = viewX + worldWidth / 2;
    const endY = viewY + worldHeight / 2;

    const originScreen = worldToScreen(0, 0);

    // Líneas de grilla
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 0.5;

    // Verticales
    for (let x = startX; x <= endX; x += baseStep) {
        if (Math.abs(x) < 0.001) continue;
        const screenX = worldToScreen(x, 0).X;
        if (screenX >= 0 && screenX <= canvas.width) {
            ctx.beginPath();
            ctx.moveTo(screenX, 0);
            ctx.lineTo(screenX, canvas.height);
            ctx.stroke();
        }
    }

    // Horizontales
    for (let y = startY; y <= endY; y += baseStep) {
        if (Math.abs(y) < 0.001) continue;
        const screenY = worldToScreen(0, y).Y;
        if (screenY >= 0 && screenY <= canvas.height) {
            ctx.beginPath();
            ctx.moveTo(0, screenY);
            ctx.lineTo(canvas.width, screenY);
            ctx.stroke();
        }
    }

    // Ejes coordenados (siempre visibles aunque la grilla esté desactivada)
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;

    if (originScreen.Y >= 0 && originScreen.Y <= canvas.height) {
        ctx.beginPath();
        ctx.moveTo(0, originScreen.Y);
        ctx.lineTo(canvas.width, originScreen.Y);
        ctx.stroke();
    }

    if (originScreen.X >= 0 && originScreen.X <= canvas.width) {
        ctx.beginPath();
        ctx.moveTo(originScreen.X, 0);
        ctx.lineTo(originScreen.X, canvas.height);
        ctx.stroke();
    }
}

/* ----------------------------------------------------------------------------
   DIBUJO DE FLECHAS
   ---------------------------------------------------------------------------- */

function drawArrow(x, y, vx, vy) {
    const m = Math.hypot(vx, vy);
    if (m < 1e-6) return;

    const L = 6 + 10 * Math.tanh(0.15 * m);
    const ux = vx / m;
    const uy = vy / m;
    const color = fieldColor(m);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + L * ux, y + L * uy);
    ctx.stroke();

    const angle = Math.PI / 6;
    const tipX = x + L * ux;
    const tipY = y + L * uy;

    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(
        tipX - 5 * (ux * Math.cos(angle) - uy * Math.sin(angle)),
        tipY - 5 * (uy * Math.cos(angle) + ux * Math.sin(angle))
    );
    ctx.lineTo(
        tipX - 5 * (ux * Math.cos(angle) + uy * Math.sin(angle)),
        tipY - 5 * (uy * Math.cos(angle) - ux * Math.sin(angle))
    );
    ctx.closePath();
    ctx.fill();
}

/* ----------------------------------------------------------------------------
   DIBUJO DE LÍNEAS DE CAMPO
   ---------------------------------------------------------------------------- */

function drawFieldLine(startX, startY, forward = true) {
    let x = startX, y = startY;
    const step = 0.01 * (forward ? 1 : -1);
    
    ctx.beginPath();
    
    // Primer punto
    const startScreen = worldToScreen(x, y);
    ctx.moveTo(startScreen.X, startScreen.Y);

    for (let i = 0; i < 300; i++) {
        const f = field(x, y);
        const m = Math.hypot(f.vx, f.vy);
        
        if (m < 0.001) break;
        
        // Avanzar en dirección del campo
        x += step * f.vx / m;
        y += step * f.vy / m;
        
        const s = worldToScreen(x, y);
        ctx.lineTo(s.X, s.Y);
        
        // Salir si nos vamos muy lejos
        if (s.X < -50 || s.X > canvas.width + 50 || 
            s.Y < -50 || s.Y > canvas.height + 50) break;
    }
    
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
}

/* ================= ESCALA ================= */

function drawScale() {
    const x = canvas.width - 50;
    const y0 = 100;
    const h = 200;

    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(x - 12, y0 - 20, 42, h + 30);

    for (let i = 0; i < h; i++) {
        const t = i / h;
        const E = (1 - t) * CONFIG.FIELD_MAX;
        ctx.strokeStyle = fieldColor(E);
        
        ctx.beginPath();
        ctx.moveTo(x, y0 + i);
        ctx.lineTo(x + 20, y0 + i);
        ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("E", x - 8, y0 - 10);
    ctx.fillText("bajo", x + 25, y0 + h - 5);
    ctx.fillText("alto", x + 25, y0 + 10);
}
/* ----------------------------------------------------------------------------
   ESCALA DE COLORES
   ---------------------------------------------------------------------------- */

function drawScale() {
    const x = canvas.width - 50;
    const y0 = 100;
    const h = 200;

    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(x - 12, y0 - 20, 42, h + 30);

    for (let i = 0; i < h; i++) {
        const t = i / h;
        const E = (1 - t) * CONFIG.FIELD_MAX;
        ctx.strokeStyle = fieldColor(E);
        
        ctx.beginPath();
        ctx.moveTo(x, y0 + i);
        ctx.lineTo(x + 20, y0 + i);
        ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "11px sans-serif";
    ctx.fillText("E", x - 8, y0 - 10);
    ctx.fillText("bajo", x + 25, y0 + h - 5);
    ctx.fillText("alto", x + 25, y0 + 10);
}

/* ----------------------------------------------------------------------------
   GRÁFICO DE MEDICIONES
   ---------------------------------------------------------------------------- */

function drawGraph() {
    if (!measureMode.checked) return;

    // Cuando el modo medición está activo, el gráfico ocupa la mitad inferior
    const graphHeight = measurements.length === 0 ? 0.15 : 0.35;
    const h = canvas.height * graphHeight;
    const y0 = canvas.height - h;
    
    ctx.fillStyle = "rgba(0,0,0,0.95)";
    ctx.fillRect(0, y0, canvas.width, h);

    if (measurements.length === 0) {
        // Mensaje cuando no hay mediciones
        ctx.fillStyle = "#666";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Haz clic en el área de simulación para agregar mediciones", canvas.width / 2, y0 + h / 2);
        return;
    }

    const margin = { left: 90, right: 50, bottom: 70, top: 30 };
    const xAxis = margin.left;
    const yAxis = y0 + h - margin.bottom;

    // Calcular rangos
    let rMin = Infinity, rMax = -Infinity;
    let eMin = Infinity, eMax = -Infinity;
    
    measurements.forEach(p => {
        rMin = Math.min(rMin, p.r);
        rMax = Math.max(rMax, p.r);
        eMin = Math.min(eMin, p.E);
        eMax = Math.max(eMax, p.E);
    });

    if (rMax === rMin) rMax = rMin + 1e-6;
    if (eMax === eMin) eMax = eMin + 1e-6;

    // Ejes
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(canvas.width - margin.right, yAxis);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis, y0 + margin.top);
    ctx.stroke();

    // Etiquetas
    ctx.fillStyle = "white";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("r (distancia)", canvas.width / 2, yAxis + 25);
    
    ctx.save();
    ctx.translate(25, y0 + h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("E (campo)", 0, 0);
    ctx.restore();

    // Grid del gráfico
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 0.5;
    
    for (let i = 1; i <= 4; i++) {
        const y = yAxis - (i / 5) * (h - margin.top - margin.bottom);
        ctx.beginPath();
        ctx.moveTo(xAxis, y);
        ctx.lineTo(canvas.width - margin.right, y);
        ctx.stroke();
    }
    
    for (let i = 1; i <= 4; i++) {
        const x = xAxis + (i / 5) * (canvas.width - margin.left - margin.right);
        ctx.beginPath();
        ctx.moveTo(x, yAxis);
        ctx.lineTo(x, y0 + margin.top);
        ctx.stroke();
    }

    // Puntos de medición
    measurements.forEach(p => {
        const x = xAxis + (p.r - rMin) / (rMax - rMin) * (canvas.width - margin.left - margin.right);
        const y = yAxis - (p.E - eMin) / (eMax - eMin) * (h - margin.top - margin.bottom);
        
        ctx.fillStyle = fieldColor(p.E);
        ctx.beginPath();
        ctx.arc(x, y, CONFIG.MEASUREMENT_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    // Modelo 1/r² (solo si está activado)
    if (showModel.checked && measurements.length > 1) {
        let num = 0, den = 0;
        measurements.forEach(p => {
            num += p.E / (p.r * p.r);
            den += 1 / (p.r * p.r * p.r * p.r);
        });
        const A = num / den;

        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < 200; i++) {
            const r = rMin + (rMax - rMin) * i / 199;
            const E = A / (r * r);
            
            const x = xAxis + (r - rMin) / (rMax - rMin) * (canvas.width - margin.left - margin.right);
            const y = yAxis - (E - eMin) / (eMax - eMin) * (h - margin.top - margin.bottom);
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.fillStyle = "#4CAF50";
        ctx.font = "12px sans-serif";
        ctx.fillText("modelo 1/r²", canvas.width - 150, y0 + 30);
    }

    // Leyenda con número de mediciones
    ctx.fillStyle = "#aaa";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`Mediciones: ${measurements.length}`, canvas.width - 60, y0 + 50);
}

/* ----------------------------------------------------------------------------
   DIBUJO DEL ORIGEN
   ---------------------------------------------------------------------------- */

function drawOrigin() {
    if (!measureMode.checked) return;

    const s = worldToScreen(origin.x, origin.y);

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

/* ----------------------------------------------------------------------------
   EVENTOS DE RATÓN
   ---------------------------------------------------------------------------- */

let mouseDown = false;
let moved = false;
let startX = 0, startY = 0, lastX = 0, lastY = 0;

canvas.addEventListener("mousedown", e => {
    const rect = canvas.getBoundingClientRect();
    const w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);

    if (measureMode.checked) {
        const dx = w.x - origin.x;
        const dy = w.y - origin.y;
        if (Math.hypot(dx, dy) < 0.05) {
            draggingOrigin = true;
            return;
        }
    }

    mouseDown = true;
    moved = false;
    startX = lastX = e.clientX;
    startY = lastY = e.clientY;
});

canvas.addEventListener("mousemove", e => {
    if (draggingOrigin) {
        const rect = canvas.getBoundingClientRect();
        const w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
        origin.x = w.x;
        origin.y = w.y;
        return;
    }

    if (!mouseDown) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    if (Math.hypot(e.clientX - startX, e.clientY - startY) > 5) {
        moved = true;
    }

    viewX -= dx / canvas.width * zoom;
    viewY -= dy / canvas.height * zoom;

    lastX = e.clientX;
    lastY = e.clientY;
});

canvas.addEventListener("mouseup", e => {
    if (draggingOrigin) {
        draggingOrigin = false;
        return;
    }

    if (!mouseDown) return;
    mouseDown = false;

    if (!moved) {
        const rect = canvas.getBoundingClientRect();
        const w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);

        if (measureMode.checked) {
            measurementPoint = w;
            
            // Aplicar errores máximos
            let x = w.x + noise(ERROR.POSITION);
            let y = w.y + noise(ERROR.POSITION);
            
            const dx = x - origin.x;
            const dy = y - origin.y;
            const r = Math.hypot(dx, dy);
            
            const f = field(x, y);
            let Ex = f.vx * (1 + noise(ERROR.FIELD));
            let Ey = f.vy * (1 + noise(ERROR.FIELD));
            const E = Math.hypot(Ex, Ey);
            
            measurements.push({ r, E });
            updateMeasurementCount();
            return;
        }

        const pol = document.querySelector('input[name="pol"]:checked').value;
        charges.push({ x: w.x, y: w.y, q: Number(pol) });
    }
});

canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    const w = screenToWorld(e.clientX - rect.left, e.clientY - rect.top);

    for (let i = charges.length - 1; i >= 0; i--) {
        const dx = charges[i].x - w.x;
        const dy = charges[i].y - w.y;
        if (Math.hypot(dx, dy) < 0.05) {
            charges.splice(i, 1);
            break;
        }
    }
});

canvas.addEventListener("wheel", e => {
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const before = screenToWorld(mx, my);

    zoom *= Math.exp(e.deltaY * 0.001);
    zoom = Math.max(CONFIG.ZOOM.MIN, Math.min(CONFIG.ZOOM.MAX, zoom));

    const after = screenToWorld(mx, my);
    viewX += before.x - after.x;
    viewY += before.y - after.y;
}, { passive: false });

/* ----------------------------------------------------------------------------
   BUCLE PRINCIPAL
   ---------------------------------------------------------------------------- */

function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar grilla (solo si está activada)
    drawMainGrid();

    if (showPotential.checked) {
        const step = 30;
        for (let i = 0; i < canvas.width; i += step) {
            for (let j = 0; j < canvas.height; j += step) {
                const w = screenToWorld(i, j);
                ctx.fillStyle = potentialColor(potential(w.x, w.y));
                ctx.fillRect(i, j, step, step);
            }
        }
    }

    if (showFieldLines.checked) {
        for (const c of charges) {
            const numLines = Math.max(8, Math.floor(16 * Math.abs(c.q)));
            for (let i = 0; i < numLines; i++) {
                const angle = 2 * Math.PI * i / numLines;
                const startX = c.x + 0.05 * Math.cos(angle);
                const startY = c.y + 0.05 * Math.sin(angle);
                
                drawFieldLine(startX, startY, true);
                drawFieldLine(startX, startY, false);
            }
        }
    }

    if (showField.checked) {
        const spacing = 60;
        for (let i = 0; i < canvas.width; i += spacing) {
            for (let j = 0; j < canvas.height; j += spacing) {
                const w = screenToWorld(i, j);
                const f = field(w.x, w.y);
                drawArrow(i, j, f.vx, f.vy);
            }
        }
    }

    for (const c of charges) {
        const s = worldToScreen(c.x, c.y);
        ctx.fillStyle = c.q > 0 ? "#ff6b6b" : "#6b9fff";
        ctx.beginPath();
        ctx.arc(s.X, s.Y, CONFIG.CHARGE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    drawOrigin();
    drawGraph();
    drawScale();

    requestAnimationFrame(animate);
}

animate();
</script>
</body>
</html>