---
layout: topbar
---
<html lang="es">
<head>
<meta charset="utf-8">
<title>Sistema Binario Eclipsante</title>

<style>
body {
  margin: 0;
  background: black;
  color: white;
  font-family: sans-serif;
}

#container {
  width: 480px;
  margin: auto;
}

canvas {
  display: block;
  background: black;
  margin: auto;
}

.controls {
  padding: 8px;
  font-size: 12px;
}

.global {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.global label { flex: 1; }

.stars {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.star {
  border: 1px solid #333;
  padding: 6px;
  width: 48%;
}

.star h4 {
  text-align: center;
  margin: 4px 0;
  font-size: 13px;
}

.vslider {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6px;
}

.vslider span {
  font-size: 11px;
  margin-bottom: 4px;
}

input[type=range][orient="vertical"] {
  writing-mode: bt-lr;
  -webkit-appearance: slider-vertical;
  width: 18px;
  height: 110px;
}

button {
  margin-top: 8px;
  width: 100%;
  padding: 6px;
  background: #222;
  color: white;
  border: 1px solid #555;
  cursor: pointer;
}
</style>
</head>

<body>
<div id="container">

<canvas id="scene" width="460" height="330"></canvas>
<canvas id="lc" width="460" height="210"></canvas>

<div class="controls">

  <div class="global">
    <label>Inclinación (°)
      <input type="range" id="incl" min="0" max="90" value="80">
    </label>
    <label>Separación orbital
      <input type="range" id="a" min="1.0" max="3.0" step="0.1" value="1.82">
    </label>
  </div>

  <div class="stars">

    <div class="star">
      <h4>⭐ Estrella 1</h4>
      <div style="display:flex; justify-content:center;">
        <div class="vslider"><span>M</span><input type="range" id="M1" min="0.5" max="2.0" step="0.1" value="1.0" orient="vertical"></div>
        <div class="vslider"><span>R</span><input type="range" id="R1" min="0.3" max="1.2" step="0.05" value="0.65" orient="vertical"></div>
        <div class="vslider"><span>T</span><input type="range" id="T1" min="3000" max="10000" step="100" value="7000" orient="vertical"></div>
      </div>
    </div>

    <div class="star">
      <h4>⭐ Estrella 2</h4>
      <div style="display:flex; justify-content:center;">
        <div class="vslider"><span>M</span><input type="range" id="M2" min="0.2" max="1.5" step="0.1" value="0.3" orient="vertical"></div>
        <div class="vslider"><span>R</span><input type="range" id="R2" min="0.2" max="1.0" step="0.05" value="0.38" orient="vertical"></div>
        <div class="vslider"><span>T</span><input type="range" id="T2" min="3000" max="10000" step="100" value="4500" orient="vertical"></div>
      </div>
    </div>

  </div>

  <button id="reset">Reiniciar simulación</button>
</div>
</div>

<script>
// ================= DOM =================
const sliders = {
  incl: document.getElementById("incl"),
  a: document.getElementById("a"),
  M1: document.getElementById("M1"),
  M2: document.getElementById("M2"),
  R1: document.getElementById("R1"),
  R2: document.getElementById("R2"),
  T1: document.getElementById("T1"),
  T2: document.getElementById("T2")
};

// ================= PARÁMETROS =================
let params = {
  M1: 1.0, M2: 0.3,
  R1: 0.65, R2: 0.38,
  T1: 7000, T2: 4500,
  a: 1.82,
  incl: 80 * Math.PI / 180,
  u: 0.6
};

const G = 1;

// ================= CANVAS =================
const scene = document.getElementById("scene");
const ctx = scene.getContext("2d");
const lcCanvas = document.getElementById("lc");
const lc = lcCanvas.getContext("2d");

const W = scene.width, H = scene.height;
const scale = 90, margin = 40;

// ================= TIEMPO =================
let t = 0;
const dt = 0.03;
let flux = [];
let Fref = null;

// ================= TRAYECTORIAS =================
let trail1 = [], trail2 = [];
const maxTrail = 300;

// ================= MODELO =================
const lum = (R, T) => R * R * T ** 4;
const limb = u => 1 - u / 3;
const omega = () => Math.sqrt(G * (params.M1 + params.M2) / params.a ** 3);

function posiciones(t) {
  const w = omega();
  return {
    x1: -params.M2 / (params.M1 + params.M2) * params.a * Math.cos(w * t),
    y1: -params.M2 / (params.M1 + params.M2) * params.a * Math.sin(w * t),
    x2:  params.M1 / (params.M1 + params.M2) * params.a * Math.cos(w * t),
    y2:  params.M1 / (params.M1 + params.M2) * params.a * Math.sin(w * t)
  };
}

const proj = (x, y) => ({
  xp: x,
  yp: y * Math.cos(params.incl),
  zp: y * Math.sin(params.incl)
});

function overlap(d, R1, R2) {
  if (d >= R1 + R2) return 0;
  if (d <= Math.abs(R1 - R2)) return Math.PI * Math.min(R1, R2) ** 2;
  return R1 * R1 * Math.acos((d * d + R1 * R1 - R2 * R2) / (2 * d * R1))
       + R2 * R2 * Math.acos((d * d + R2 * R2 - R1 * R1) / (2 * d * R2))
       - 0.5 * Math.sqrt((-d + R1 + R2) * (d + R1 - R2) * (d - R1 + R2) * (d + R1 + R2));
}

function flujo(s1, s2) {
  const L1 = lum(params.R1, params.T1);
  const L2 = lum(params.R2, params.T2);
  const F0 = limb(params.u) * (L1 + L2);
  const d = Math.hypot(s1.xp - s2.xp, s1.yp - s2.yp);
  const A = overlap(d, params.R1, params.R2);
  if (A === 0) return F0;
  return s1.zp > s2.zp
    ? F0 - limb(params.u) * L2 * A / (Math.PI * params.R2 ** 2)
    : F0 - limb(params.u) * L1 * A / (Math.PI * params.R1 ** 2);
}

// ================= DIBUJO =================
function colorTemp(T) {
  if (T < 4000) return "#ff6666";
  if (T < 6000) return "#ffd966";
  if (T < 8000) return "#ffffff";
  return "#9ecbff";
}

function drawTrail(trail, color) {
  if (trail.length < 2) return;
  ctx.strokeStyle = color;
  ctx.beginPath();
  trail.forEach((p, i) => {
    const x = W / 2 + p.x * scale;
    const y = H / 2 - p.y * scale;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.stroke();
}

function drawStar(x, y, R, c) {
  ctx.beginPath();
  ctx.arc(x, y, R, 0, 2 * Math.PI);
  ctx.fillStyle = c;
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.stroke();
}

// ================= RESET + DEBOUNCE =================
let debounceTimer = null;
const DEBOUNCE_DELAY = 500;

function applyParamsAndReset() {
  Object.keys(sliders).forEach(k => {
    params[k] = +sliders[k].value * (k === "incl" ? Math.PI / 180 : 1);
  });
  t = 0;
  flux = [];
  Fref = null;
  trail1 = [];
  trail2 = [];
}

Object.values(sliders).forEach(slider => {
  slider.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyParamsAndReset, DEBOUNCE_DELAY);
  });
});

document.getElementById("reset").onclick = applyParamsAndReset;

// ================= LOOP =================
function animate() {
  ctx.clearRect(0, 0, W, H);
  lc.clearRect(0, 0, lcCanvas.width, lcCanvas.height);

  const p = posiciones(t);
  const s1 = proj(p.x1, p.y1);
  const s2 = proj(p.x2, p.y2);

  trail1.push({ x: s1.xp, y: s1.yp });
  trail2.push({ x: s2.xp, y: s2.yp });
  if (trail1.length > maxTrail) trail1.shift();
  if (trail2.length > maxTrail) trail2.shift();

  drawTrail(trail1, "rgba(120,120,255,0.5)");
  drawTrail(trail2, "rgba(255,120,120,0.5)");

  let stars = [
    { z: s1.zp, x: W/2 + s1.xp*scale, y: H/2 - s1.yp*scale, R: params.R1*scale, c: colorTemp(params.T1) },
    { z: s2.zp, x: W/2 + s2.xp*scale, y: H/2 - s2.yp*scale, R: params.R2*scale, c: colorTemp(params.T2) }
  ];
  stars.sort((a,b)=>a.z-b.z);
  stars.forEach(s=>drawStar(s.x,s.y,s.R,s.c));

  const F = flujo(s1, s2);
  if (Fref === null) Fref = F;
  flux.push(F / Fref);
  if (flux.length > 400) flux.shift();

  lc.strokeStyle = "white";
  lc.beginPath();
  flux.forEach((f, i) => {
    const x = margin + i * (lcCanvas.width - 2 * margin) / 400;
    const y = margin + (1 - f) * (lcCanvas.height - 2 * margin);
    i ? lc.lineTo(x, y) : lc.moveTo(x, y);
  });
  lc.stroke();

  t += dt;
  requestAnimationFrame(animate);
}

animate();
</script>
</body>
</html>
