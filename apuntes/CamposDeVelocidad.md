---
layout: topbar
---
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Campo de vórtices interactivo</title>
<style>
  body {
    margin: 0;
    background: black;
    overflow: hidden;
    color: white;
    font-family: sans-serif;
  }
  canvas { display: block; }
  #ui {
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0,0,0,0.6);
    padding: 8px 12px;
    border: 1px solid #444;
    font-size: 13px;
  }
</style>
</head>
<body>

<div id="ui">
  <label>
    <input type="checkbox" id="showField">
    Mostrar campo de velocidades
  </label><br>
  <label>
    <input type="checkbox" id="periodic">
    Bordes periódicos
  </label>
</div>

<canvas id="canvas"></canvas>

<script>
/* ======================
   CANVAS
====================== */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const showFieldCheckbox = document.getElementById("showField");
const periodicCheckbox  = document.getElementById("periodic");

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
  { x: 0.3,  y: 0.5,  gamma:  0.2 },
  { x: 0.7,  y: 0.5,  gamma: -0.2 },
  { x: 0.4,  y: 0.2,  gamma:  0.2 },
  { x: 0.5,  y: 0.3,  gamma: -0.3 },
  { x: 0.2,  y: 0.3,  gamma: -0.5 },
  { x: 0.6,  y: 0.2,  gamma:  0.4 },
  { x: 0.8,  y: 0.4,  gamma: -0.3 },
  { x: 0.25, y: 0.7,  gamma:  0.3 },
  { x: 0.55, y: 0.75, gamma: -0.4 },
  { x: 0.75, y: 0.65, gamma:  0.2 }
];

/* ======================
   PARTÍCULAS
====================== */
const particles = [];
const MAX_TRAIL = 120;
const INITIAL_PARTICLES = 40;
const MIN_PARTICLES = 10;

function spawnParticle(x,y){
  particles.push({
    x, y,
    age: 0,
    life: 1500 - Math.random()*00,
    trail: []
  });
}

for(let i=0;i<INITIAL_PARTICLES;i++){
  spawnParticle(Math.random(), Math.random());
}

/* mouse – dispersión */
canvas.addEventListener("mousedown", e=>{
  const r = canvas.getBoundingClientRect();
  const x0 = (e.clientX - r.left) / canvas.width;
  const y0 = (e.clientY - r.top)  / canvas.height;

  for(let k=0;k<22;k++){
    spawnParticle(
      x0 + 0.06*(Math.random()-0.5),
      y0 + 0.06*(Math.random()-0.5)
    );
  }
});

/* ======================
   CAMPO DE VELOCIDAD
====================== */
function velocityField(x,y){
  let vx = 0, vy = 0;
  const eps = 1e-4;

  vortices.forEach(v=>{
    let dx = x - v.x;
    let dy = y - v.y;

    if(periodicCheckbox.checked){
      if(dx >  0.5) dx -= 1;
      if(dx < -0.5) dx += 1;
      if(dy >  0.5) dy -= 1;
      if(dy < -0.5) dy += 1;
    }

    const r2 = dx*dx + dy*dy + eps;
    const f  = v.gamma / r2;

    vx += -f * dy;
    vy +=  f * dx;
  });

  return {vx,vy};
}

/* ======================
   FLECHAS
====================== */
function drawArrow(x,y,vx,vy){
  const mag = Math.hypot(vx,vy);
  if(mag < 1e-3) return;

  const len = 22;
  const ux = vx / mag;
  const uy = vy / mag;

  const x2 = x + len * ux;
  const y2 = y + len * uy;

  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x2,y2);
  ctx.stroke();

  const a = Math.PI / 6;
  ctx.beginPath();
  ctx.moveTo(x2,y2);
  ctx.lineTo(
    x2 - 8*(ux*Math.cos(a) - uy*Math.sin(a)),
    y2 - 8*(uy*Math.cos(a) + ux*Math.sin(a))
  );
  ctx.lineTo(
    x2 - 8*(ux*Math.cos(a) + uy*Math.sin(a)),
    y2 - 8*(uy*Math.cos(a) - ux*Math.sin(a))
  );
  ctx.closePath();
  ctx.fill();
}

function drawVectors(){
  const step = 70;
  ctx.strokeStyle = "rgba(180,180,180,0.4)";
  ctx.fillStyle   = "rgba(180,180,180,0.4)";
  ctx.lineWidth   = 1;

  for(let i=0;i<canvas.width;i+=step){
    for(let j=0;j<canvas.height;j+=step){
      const x = i / canvas.width;
      const y = j / canvas.height;
      const v = velocityField(x,y);
      drawArrow(i,j,v.vx,v.vy);
    }
  }
}

/* ======================
   LOOP PRINCIPAL
====================== */
function animate(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(showFieldCheckbox.checked){
    drawVectors();
  }

  for(let i=particles.length-1;i>=0;i--){
    const p = particles[i];
    const v = velocityField(p.x,p.y);
    const dt = 0.002;

    p.x += dt*v.vx + 0.0015*(Math.random()-0.5);
    p.y += dt*v.vy + 0.0015*(Math.random()-0.5);

    if(periodicCheckbox.checked){
      if(p.x < 0) p.x += 1;
      if(p.x > 1) p.x -= 1;
      if(p.y < 0) p.y += 1;
      if(p.y > 1) p.y -= 1;
    } else {
      p.x = Math.min(1,Math.max(0,p.x));
      p.y = Math.min(1,Math.max(0,p.y));
    }

    if(p.trail.length){
      const last = p.trail[p.trail.length-1];
      if(Math.abs(p.x-last.x)>0.5 || Math.abs(p.y-last.y)>0.5){
        p.trail = [];
      }
    }

    p.trail.push({x:p.x,y:p.y});
    if(p.trail.length>MAX_TRAIL) p.trail.shift();

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    p.trail.forEach((t,j)=>{
      const X=t.x*canvas.width;
      const Y=t.y*canvas.height;
      j?ctx.lineTo(X,Y):ctx.moveTo(X,Y);
    });
    ctx.stroke();

    const a = Math.min(1,p.age/p.life);
    ctx.fillStyle = `rgb(255,${255*a|0},${255*a|0})`;
    ctx.beginPath();
    ctx.arc(p.x*canvas.width,p.y*canvas.height,6,0,2*Math.PI);
    ctx.fill();

    if(++p.age>p.life) particles.splice(i,1);
  }

  while(particles.length<MIN_PARTICLES){
    spawnParticle(Math.random(),Math.random());
  }

  vortices.forEach(v=>{
    ctx.fillStyle = v.gamma>0?"green":"blue";
    ctx.beginPath();
    ctx.arc(v.x*canvas.width,v.y*canvas.height,6,0,2*Math.PI);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
</script>
</body>
</html>
