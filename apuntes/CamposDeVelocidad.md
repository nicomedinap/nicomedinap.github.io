---
layout: topbar
---
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Campo de vórtices interactivo</title>
<style>
body{
  margin:0;
  background:black;
  overflow:hidden;
  color:white;
  font-family:sans-serif;
}
canvas{display:block}
#ui{
  position:fixed;
  top:80px;
  left:20px;
  background:rgba(0,0,0,0.6);
  padding:8px 12px;
  border:1px solid #444;
  font-size:13px;
}
</style>
</head>
<body>

<div id="ui">
<label><input type="checkbox" id="showField"> Mostrar campo</label><br>
<label><input type="checkbox" id="periodic" checked> Bordes periódicos</label><br>
<label><input type="checkbox" id="particleFrame"> SRI partícula roja</label>
</div>

<canvas id="canvas"></canvas>

<script>
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
const periodic  = document.getElementById("periodic");
const frameBox  = document.getElementById("particleFrame");

/* ================= VÓRTICES ================= */
const vortices = [
 {x:0.3,y:0.9,gamma:0.05},{x:0.7,y:0.2,gamma:-0.25},
 {x:0.4,y:0.2,gamma:0.3},{x:0.6,y:0.3,gamma:-0.1},
 {x:0.2,y:0.3,gamma:-0.7},{x:0.8,y:0.6,gamma:0.25}
];

/* ================= PARTÍCULAS ================= */
const particles=[];
const MAX_TRAIL=80;
const MIN_PARTS=25;

/* partícula de referencia */
const refParticle = { x:Math.random(), y:Math.random(), trail:[] };
particles.push(refParticle);

function spawn(x,y){
 particles.push({
  x,y,
  age:0,
  life:900+400*Math.random(),
  trail:[]
 });
}

for(let i=0;i<15;i++) spawn(Math.random(),Math.random());

canvas.addEventListener("mousedown",e=>{
 const r=canvas.getBoundingClientRect();
 const x=(e.clientX-r.left)/canvas.width;
 const y=(e.clientY-r.top)/canvas.height;
 for(let k=0;k<15;k++)
  spawn(x+0.5*(Math.random()-0.5),
        y+0.5*(Math.random()-0.5));
});

/* ================= UTILIDADES ================= */
function wrap(d){
 if(d>0.5)d-=1;
 if(d<-0.5)d+=1;
 return d;
}

// FUNCIONES MODIFICADAS: No usar wrap() en el SRI
function relX(x, ref, useWrap){
 if(useWrap) return wrap(x-ref.x);
 return x - ref.x;  // En SRI, diferencia directa sin wrap
}

function relY(y, ref, useWrap){
 if(useWrap) return wrap(y-ref.y);
 return y - ref.y;  // En SRI, diferencia directa sin wrap
}

function jumped(a,b){ return Math.abs(a-b)>0.5; }

/* ================= CAMPO ================= */
function velocity(x,y){
 let vx=0,vy=0;
 vortices.forEach(v=>{
  let dx=x-v.x, dy=y-v.y;
  if(periodic.checked){ dx=wrap(dx); dy=wrap(dy); }
  const r2=dx*dx+dy*dy+1e-4;
  const f=v.gamma/r2;
  vx+=-f*dy;
  vy+= f*dx;
 });
 return {vx,vy};
}

/* ================= FLECHAS ================= */
function drawArrow(x,y,vx,vy,color="rgba(180,180,180,0.4)",scale=25){
 const m=Math.hypot(vx,vy);
 if(m<1e-3) return;
 const ux=vx/m, uy=vy/m;
 const L=scale;

 ctx.strokeStyle=color;
 ctx.fillStyle=color;

 ctx.beginPath();
 ctx.moveTo(x,y);
 ctx.lineTo(x+L*ux,y+L*uy);
 ctx.stroke();

 const a=Math.PI/6;
 ctx.beginPath();
 ctx.moveTo(x+L*ux,y+L*uy);
 ctx.lineTo(x+L*ux-8*(ux*Math.cos(a)-uy*Math.sin(a)),
            y+L*uy-8*(uy*Math.cos(a)+ux*Math.sin(a)));
 ctx.lineTo(x+L*ux-8*(ux*Math.cos(a)+uy*Math.sin(a)),
            y+L*uy-8*(uy*Math.cos(a)-ux*Math.sin(a)));
 ctx.closePath();
 ctx.fill();
}

/* ================= LOOP ================= */
function animate(){
 ctx.fillStyle="black";
 ctx.fillRect(0,0,canvas.width,canvas.height);

 const useFrame=frameBox.checked;
 const ref=refParticle;
 const useWrap = periodic.checked && !useFrame;  // Solo usar wrap en modo periódico y NO en SRI

 /* CAMPO */
 if(showField.checked){
  for(let i=0;i<canvas.width;i+=70)
   for(let j=0;j<canvas.height;j+=70){
    let x=i/canvas.width, y=j/canvas.height;
    if(useFrame){
     x=ref.x+(i/canvas.width-0.5);
     y=ref.y+(j/canvas.height-0.5);
    }
    const v=velocity(x,y);
    drawArrow(i,j,v.vx,v.vy);
   }
 }

 /* PARTÍCULAS */
 for(let i=particles.length-1;i>=0;i--){
  const p=particles[i];
  const v=velocity(p.x,p.y);
  const xo=p.x, yo=p.y;

  p.x+=0.003*v.vx;
  p.y+=0.003*v.vy;

  if(periodic.checked){
   if(jumped(p.x,xo)||jumped(p.y,yo)) p.trail=[];
   p.x=(p.x+1)%1;
   p.y=(p.y+1)%1;
  }

  p.trail.push({x:p.x,y:p.y});
  if(p.trail.length>MAX_TRAIL) p.trail.shift();

  ctx.strokeStyle="rgba(255,255,255,0.25)";
  ctx.beginPath();

  p.trail.forEach((t,k)=>{
    let X,Y;
    if(useFrame){
      // MODIFICADO: No usar wrap en SRI
      const rx=relX(t.x,ref,false); // false = sin wrap
      const ry=relY(t.y,ref,false);
      X=canvas.width*(0.5+rx);
      Y=canvas.height*(0.5+ry);

      // Solo dibujar si está dentro de los límites visibles
      const visible = Math.abs(rx) <= 0.5 && Math.abs(ry) <= 0.5;
      
      if(k>0){
        const prx=relX(p.trail[k-1].x,ref,false);
        const pry=relY(p.trail[k-1].y,ref,false);
        if(!visible || Math.abs(rx-prx)>0.25 || Math.abs(ry-pry)>0.25){
          ctx.moveTo(X,Y); return;
        }
      }
      if(!visible && k===0) ctx.moveTo(X,Y);
    }else{
      X=t.x*canvas.width;
      Y=t.y*canvas.height;
      if(k>0 && (jumped(t.x,p.trail[k-1].x)||jumped(t.y,p.trail[k-1].y))){
        ctx.moveTo(X,Y); return;
      }
    }
    k?ctx.lineTo(X,Y):ctx.moveTo(X,Y);
  });

  ctx.stroke();

  if(p!==ref && ++p.age>p.life && particles.length>MIN_PARTS)
   particles.splice(i,1);

  let px, py, visible=true;

  if(useFrame){
    // MODIFICADO: No usar wrap en SRI
    const rx = relX(p.x, ref, false);
    const ry = relY(p.y, ref, false);
    px = canvas.width  * (0.5 + rx);
    py = canvas.height * (0.5 + ry);
    // Solo mostrar si está dentro de los límites
    visible = Math.abs(rx) <= 0.5 && Math.abs(ry) <= 0.5;
  }else{
    px = p.x * canvas.width;
    py = p.y * canvas.height;
  }

  if(visible){
    ctx.fillStyle=p===ref?"red":"white";
    ctx.beginPath();
    ctx.arc(px,py,p===ref?6:2.2,0,2*Math.PI);
    ctx.fill();
  }
 }

 /* PARTÍCULA DE REFERENCIA */
 const cx=useFrame?canvas.width/2:ref.x*canvas.width;
 const cy=useFrame?canvas.height/2:ref.y*canvas.height;
 ctx.fillStyle="red";
 ctx.beginPath();
 ctx.arc(cx,cy,6,0,2*Math.PI);
 ctx.fill();

 const vr=velocity(ref.x,ref.y);
 drawArrow(cx,cy,vr.vx,vr.vy,"red",60);

 /* VÓRTICES - MODIFICADO para SRI */
 vortices.forEach(v=>{
    let X, Y, visible=true;

    if(useFrame){
      // MODIFICADO: No usar wrap en SRI
      const rx = relX(v.x, ref, false);
      const ry = relY(v.y, ref, false);
      // Solo mostrar vórtices dentro del área visible
      if(Math.abs(rx) <= 0.5 && Math.abs(ry) <= 0.5){
        X = canvas.width  * (0.5 + rx);
        Y = canvas.height * (0.5 + ry);
      } else {
        visible = false;
      }
    }else{
      X = v.x * canvas.width;
      Y = v.y * canvas.height;
    }

    if(visible){
      ctx.fillStyle = v.gamma > 0 ? "green" : "blue";
      ctx.beginPath();
      ctx.arc(X, Y, 6, 0, 2*Math.PI);
      ctx.fill();
    }
  });

 requestAnimationFrame(animate);
}
animate();
</script>
</body>
</html>