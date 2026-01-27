---
layout: topbar
---
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Campo de vórtices – partículas interactivas</title>
<style>
  body { margin: 0; background: black; overflow: hidden; }
  canvas { display: block; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>

<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ======================
   VÓRTICES
====================== */
const vortices = [
  { x: 0.3, y: 0.5, gamma:  0.2 },
  { x: 0.7, y: 0.5, gamma: -0.2 },
  { x: 0.4, y: 0.2, gamma:  0.2 },
  { x: 0.5, y: 0.3, gamma: -0.3 },
  { x: 0.2, y: 0.3, gamma: -0.5 },
  { x: 0.6, y: 0.2, gamma:  0.4 },
  { x: 0.8, y: 0.4, gamma: -0.3 },
  { x: 0.25, y: 0.7, gamma: 0.3 },
  { x: 0.55, y: 0.75, gamma: -0.4 },
  { x: 0.75, y: 0.65, gamma: 0.2 }
];

/* ======================
   PARTÍCULAS
====================== */
const particles = [];
const MAX_TRAIL = 150;

/* partículas iniciales */
for (let i = 0; i < 100; i++) {
  spawnParticle(Math.random(), Math.random());
}

/* inyección con mouse */
canvas.addEventListener("mousedown", e => {
  const r = canvas.getBoundingClientRect();
  const x = (e.clientX - r.left) / canvas.width;
  const y = (e.clientY - r.top) / canvas.height;

  for (let k = 0; k < 5; k++) {
    spawnParticle(x + 0.305*(Math.random()-0.5),
                  y + 0.305*(Math.random()-0.5));
  }
});

function spawnParticle(x, y){
  particles.push({
    x, y,
    trail: []
  });
}

/* ======================
   CAMPO DE VELOCIDAD
====================== */
function velocityField(x, y){
  let vx = 0, vy = 0;
  const eps = 1e-4;

  vortices.forEach(v => {
    const dx = x - v.x;
    const dy = y - v.y;
    const r2 = dx*dx + dy*dy + eps;
    const f = v.gamma / r2;
    vx += -f * dy;
    vy +=  f * dx;
  });

  return { vx, vy };
}

/* ======================
   LOOP
====================== */
function animate(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    const v = velocityField(p.x, p.y);

    // integración
    const dt = 0.002;
    p.x += dt * v.vx + 0.0006 * (Math.random()-0.5);
    p.y += dt * v.vy + 0.0006 * (Math.random()-0.5);

    // bordes reflectantes (NO periódicos)
    if (p.x < 0) { p.x = 0; }
    if (p.x > 1) { p.x = 1; }
    if (p.y < 0) { p.y = 0; }
    if (p.y > 1) { p.y = 1; }

    // trayectoria
    p.trail.push({ x:p.x, y:p.y });
    if (p.trail.length > MAX_TRAIL) p.trail.shift();

    // dibujar trayectoria
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    p.trail.forEach((t,i)=>{
      const X = t.x * canvas.width;
      const Y = t.y * canvas.height;
      i ? ctx.lineTo(X,Y) : ctx.moveTo(X,Y);
    });
    ctx.stroke();

    // partícula
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      p.x * canvas.width,
      p.y * canvas.height,
      2, 0, 2*Math.PI
    );
    ctx.fill();
  });

  // vórtices
  vortices.forEach(v=>{
    ctx.fillStyle = v.gamma>0 ? "red" : "blue";
    ctx.beginPath();
    ctx.arc(
      v.x * canvas.width,
      v.y * canvas.height,
      6, 0, 2*Math.PI
    );
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
</script>
</body>
</html>
