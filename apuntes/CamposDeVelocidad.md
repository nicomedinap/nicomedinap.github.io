---
layout: topbar
---
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Campo de vórtices interactivo</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<style>
body{
  margin:0;
  background:black;
  overflow:hidden;
  color:white;
  font-family:sans-serif;
  touch-action:none;
}
canvas{
  display:block;
  touch-action:none;
}
#ui{
  position:fixed;
  top:60px;
  left:10px;
  background:rgba(0,0,0,0.7);
  padding:10px 15px;
  border:1px solid #444;
  border-radius:8px;
  font-size:14px;
  z-index:100;
}

#instructions{
  position:fixed;
  top:60px;
  right:10px;
  background:rgba(0,0,0,0.7);
  padding:10px 15px;
  border:1px solid #444;
  border-radius:8px;
  font-size:12px;
  max-width:250px;
  z-index:100;
}
.control-btn{
  background:rgba(100,100,100,0.5);
  color:white;
  border:1px solid #666;
  padding:8px 12px;
  margin:4px;
  border-radius:6px;
  font-size:14px;
  touch-action:manipulation;
}
@media (max-width: 768px) {
  #ui{
    font-size:12px;
    padding:8px 12px;
  }

  .control-btn{
    font-size:12px;
    padding:6px 10px;
  }
}
</style>
</head>
<body>

<div id="ui">
<label><input type="checkbox" id="showField"> Mostrar campo</label><br>
<label><input type="checkbox" id="particleFrame"> Seguir partícula roja</label>
</div>

<div id="instructions">
Controles táctiles:<br>
• Un dedo: Arrastrar vista<br>
• Dos dedos: Zoom<br>
• Toque largo: Crear partículas
</div>

<canvas id="canvas"></canvas>

<script>
/* ================= DETECCIÓN DE DISPOSITIVO ================= */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/* ================= CANVAS ================= */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const showField = document.getElementById("showField");
const frameBox  = document.getElementById("particleFrame");

/* ================= ZOOM Y PAN ================= */
let zoom = 1.0;
let viewX = 0.5;
let viewY = 0.5;
const ZOOM_MIN = 0.05;
const ZOOM_MAX = 5.0;

// Variables para controles táctiles
let touchStartDistance = 0;
let touchStartZoom = 1.0;
let isTouching = false;
let lastTouchX = 0;
let lastTouchY = 0;
let touchStartTime = 0;
let longPressTimer = null;

/* ================= EVENTOS TÁCTILES ================= */

// Touch start
canvas.addEventListener("touchstart", e=>{
  e.preventDefault();
  if (e.touches.length === 1) {
    // Un dedo - preparar para arrastre o toque largo
    const touch = e.touches[0];
    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
    isTouching = true;
    
    // Iniciar temporizador para toque largo
    touchStartTime = Date.now();
    longPressTimer = setTimeout(() => {
      // Toque largo - crear partículas
      const rect = canvas.getBoundingClientRect();
      const useFrame = frameBox.checked;
      const cx = useFrame ? refParticle.x : viewX;
      const cy = useFrame ? refParticle.y : viewY;
      
      const worldX = cx + (touch.clientX - rect.left) / canvas.width * zoom - 0.5 * zoom;
      const worldY = cy + (touch.clientY - rect.top) / canvas.height * zoom - 0.5 * zoom;
      
      for(let k = 0; k < 10; k++) {
        spawn(worldX + 0.1 * (Math.random() - 0.5),
              worldY + 0.1 * (Math.random() - 0.5));
      }
    }, 500);
    
  } else if (e.touches.length === 2) {
    // Dos dedos - preparar para zoom
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    touchStartDistance = Math.sqrt(dx * dx + dy * dy);
    touchStartZoom = zoom;
  }
}, {passive: false});

// Touch move
canvas.addEventListener("touchmove", e=>{
  e.preventDefault();
  
  if (e.touches.length === 1 && isTouching) {
    // Cancelar toque largo si hay movimiento
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    
    // Un dedo - mover vista
    const touch = e.touches[0];
    const dx = touch.clientX - lastTouchX;
    const dy = touch.clientY - lastTouchY;
    
    viewX -= dx / canvas.width * zoom;
    viewY -= dy / canvas.height * zoom;
    
    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
    
  } else if (e.touches.length === 2) {
    // Dos dedos - zoom
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);
    
    if (touchStartDistance > 0) {
      const zoomFactor = currentDistance / touchStartDistance;
      zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, touchStartZoom * zoomFactor));
    }
  }
}, {passive: false});

// Touch end
canvas.addEventListener("touchend", e=>{
  e.preventDefault();
  isTouching = false;
  
  // Cancelar temporizador de toque largo
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  
  // Si fue un toque corto sin movimiento (y no en los botones)
  if (e.changedTouches.length === 1 && Date.now() - touchStartTime < 300) {
    const touch = e.changedTouches[0];
    // Verificar que no sea en los controles UI
    const uiElements = document.querySelectorAll('#ui, #instructions');
    let isOnUI = false;
    uiElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        isOnUI = true;
      }
    });
    
    if (!isOnUI) {
      // Crear partículas en la posición del toque
      const rect = canvas.getBoundingClientRect();
      const useFrame = frameBox.checked;
      const cx = useFrame ? refParticle.x : viewX;
      const cy = useFrame ? refParticle.y : viewY;
      
      const worldX = cx + (touch.clientX - rect.left) / canvas.width * zoom - 0.5 * zoom;
      const worldY = cy + (touch.clientY - rect.top) / canvas.height * zoom - 0.5 * zoom;
      
      for(let k = 0; k < 15; k++) {
        spawn(worldX + 2.0 * (Math.random() - 0.5),
              worldY + 2.0 * (Math.random() - 0.5));
      }
    }
  }
}, {passive: false});

// Eventos de ratón para desktop (se mantienen)
canvas.addEventListener("wheel", e=>{
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  const mouseWorldX = viewX + (mouseX / canvas.width - 0.5) * zoom;
  const mouseWorldY = viewY + (mouseY / canvas.height - 0.5) * zoom;
  
  zoom *= Math.exp(e.deltaY * 0.001);
  zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoom));
  
  viewX = mouseWorldX - (mouseX / canvas.width - 0.5) * zoom;
  viewY = mouseWorldY - (mouseY / canvas.height - 0.5) * zoom;
}, {passive: false});

// Arrastre para desktop
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener("mousedown", e=>{
  if (e.button === 0) {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    canvas.style.cursor = "grabbing";
  }
});

canvas.addEventListener("mousemove", e=>{
  if (!isDragging) return;
  
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  
  viewX -= dx / canvas.width * zoom;
  viewY -= dy / canvas.height * zoom;
  
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

canvas.addEventListener("mouseup", e=>{
  if (e.button === 0) {
    isDragging = false;
    canvas.style.cursor = "default";
  }
});

canvas.addEventListener("mouseleave", ()=>{
  isDragging = false;
  canvas.style.cursor = "default";
});

/* ================= VÓRTICES ================= */
const vortices=[
 {x:0.3,y:0.9,gamma:0.05},{x:0.7,y:0.2,gamma:-0.25},
 {x:0.4,y:0.2,gamma:0.3},{x:0.6,y:0.3,gamma:-0.1},
 {x:0.2,y:0.3,gamma:-0.7},{x:0.8,y:0.6,gamma:0.25}
];

/* ================= PARTÍCULAS ================= */
const particles=[];
const MAX_TRAIL=120;

const refParticle={x:Math.random(),y:Math.random(),trail:[]};
particles.push(refParticle);

function spawn(x,y){
 particles.push({x,y,age:0,life:900+400*Math.random(),trail:[]});
}

for(let i=0;i<15;i++) spawn(Math.random(),Math.random());

// Evento de clic para desktop (se mantiene)
canvas.addEventListener("mousedown", e=>{
 if (e.button !== 0) return;
  
 const r=canvas.getBoundingClientRect();
 const useFrame=frameBox.checked;
 const cx=useFrame?refParticle.x:viewX;
 const cy=useFrame?refParticle.y:viewY;
 
 const worldX=cx+(e.clientX-r.left)/canvas.width*zoom-0.5*zoom;
 const worldY=cy+(e.clientY-r.top)/canvas.height*zoom-0.5*zoom;
 
 for(let k=0;k<15;k++)
  spawn(worldX+0.5*(Math.random()-0.5),
        worldY+0.5*(Math.random()-0.5));
});

/* ================= UTILIDADES ================= */
function worldToScreen(x, y, cx, cy) {
  const rx = (x - cx) / zoom;
  const ry = (y - cy) / zoom;
  return {
    visible: Math.abs(rx) <= 0.5 && Math.abs(ry) <= 0.5,
    X: canvas.width  * (0.5 + rx),
    Y: canvas.height * (0.5 + ry)
  };
}

function screenToWorld(screenX, screenY, cx, cy) {
  const rx = screenX / canvas.width - 0.5;
  const ry = screenY / canvas.height - 0.5;
  return {
    x: cx + rx * zoom,
    y: cy + ry * zoom
  };
}

/* ================= CAMPO ================= */
function velocity(x,y){
 const X=6*(x-0.5), Y=6*(y-0.5);
 const Z=Math.sin(X)*Math.cos(Y)+1;
 return {vx:-Y-Z, vy:X+0.2*Y};
}

/* ================= FLECHAS ================= */
function drawArrow(x,y,vx,vy,color="rgba(180,180,180,0.4)",L=25){
 const m=Math.hypot(vx,vy); if(m<1e-3)return;
 const ux=vx/m, uy=vy/m;
 ctx.strokeStyle=color; ctx.fillStyle=color;
 ctx.beginPath(); ctx.moveTo(x,y);
 ctx.lineTo(x+L*ux,y+L*uy); ctx.stroke();
 const a=Math.PI/6;
 ctx.beginPath();
 ctx.moveTo(x+L*ux,y+L*uy);
 ctx.lineTo(x+L*ux-8*(ux*Math.cos(a)-uy*Math.sin(a)),
            y+L*uy-8*(uy*Math.cos(a)+ux*Math.sin(a)));
 ctx.lineTo(x+L*ux-8*(ux*Math.cos(a)+uy*Math.sin(a)),
            y+L*uy-8*(uy*Math.cos(a)-ux*Math.sin(a)));
 ctx.closePath(); ctx.fill();
}

/* ================= LOOP ================= */
function animate(){
 ctx.fillStyle="black";
 ctx.fillRect(0,0,canvas.width,canvas.height);

 const useFrame=frameBox.checked;
 const ref=refParticle;
 const cx=useFrame?ref.x:viewX;
 const cy=useFrame?ref.y:viewY;

 /* CAMPO */
 if(showField.checked){
  for(let i=0;i<canvas.width;i+=70)
   for(let j=0;j<canvas.height;j+=70){
    const screenX = i;
    const screenY = j;
    const worldPos = screenToWorld(screenX, screenY, cx, cy);
    const v=velocity(worldPos.x, worldPos.y);
    drawArrow(screenX, screenY, v.vx, v.vy);
   }
 }

 /* PARTÍCULAS */
 for(let i=particles.length-1;i>=0;i--){
  const p=particles[i];
  const v=velocity(p.x,p.y);
  p.x+=0.002*v.vx; p.y+=0.002*v.vy;

  p.trail.push({x:p.x,y:p.y});
  if(p.trail.length>MAX_TRAIL)p.trail.shift();

  ctx.strokeStyle="rgba(255,255,255,0.25)";
  ctx.beginPath();
  p.trail.forEach((t,k)=>{
    const screenPos=worldToScreen(t.x,t.y,cx,cy);
    if(!screenPos.visible)return;
    k?ctx.lineTo(screenPos.X,screenPos.Y):ctx.moveTo(screenPos.X,screenPos.Y);
  });
  ctx.stroke();

  const screenPos=worldToScreen(p.x,p.y,cx,cy);
  if(screenPos.visible){
   ctx.fillStyle=p===ref?"red":"white";
   ctx.beginPath();
   ctx.arc(screenPos.X, screenPos.Y, p===ref?6:2.2,0,2*Math.PI);
   ctx.fill();

   if(p===ref){
    drawArrow(screenPos.X, screenPos.Y, v.vx, v.vy, "red", 60);
   }
  }
 }

 /* VÓRTICES */
 vortices.forEach(v=>{
  const screenPos=worldToScreen(v.x,v.y,cx,cy);
  if(screenPos.visible){
   ctx.fillStyle=v.gamma>0?"green":"blue";
   ctx.beginPath();
   ctx.arc(screenPos.X, screenPos.Y, 6, 0, 2*Math.PI);
   ctx.fill();
  }
 });

 /* Indicador de posición de la vista */
 if(!useFrame){
  ctx.fillStyle="rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 5, 0, 2*Math.PI);
  ctx.fill();
  
  ctx.font=(isMobile ? "10px" : "12px") + " sans-serif";
  ctx.fillStyle="rgba(255,255,255,0.5)";
  ctx.textAlign="right";
  ctx.fillText(`Vista: (${viewX.toFixed(2)}, ${viewY.toFixed(2)})`, canvas.width-20, 30);
  ctx.fillText(`Zoom: ${zoom.toFixed(2)}`, canvas.width-20, isMobile ? 45 : 50);
 }

 requestAnimationFrame(animate);
}
animate();
</script>
</body>
</html>