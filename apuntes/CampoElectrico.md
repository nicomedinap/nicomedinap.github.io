---
layout: topbar
---

---
layout: topbar
---

<html lang="es">
<head>
<meta charset="UTF-8">
<title>Campo eléctrico interactivo</title>

<style>

/* =========================================================
   ESTILO GENERAL
========================================================= */

body{
margin:0;
background:black;
overflow:hidden;
color:white;
font-family:sans-serif;
}

canvas{display:block}

/* Panel UI */

#ui{
position:fixed;
top:60px;
left:10px;
background:rgba(0,0,0,0.7);
padding:12px;
border-radius:8px;
border:1px solid #444;
font-size:14px;
}

</style>
</head>

<body>

<!-- ======================================================
     PANEL DE CONTROL
====================================================== -->

<div id="ui">

<label>
<input type="checkbox" id="showField" checked>
Mostrar campo
</label>

<br>

<label>
<input type="checkbox" id="showPotential" checked>
Mostrar potencial
</label>

<br>

<label>
<input type="checkbox" id="showFieldLines" checked>
Mostrar líneas de campo
</label>

<br>

<label>
<input type="checkbox" id="measureMode">
Modo medición
</label>

<br><br>

Polaridad de nueva carga

<br>

<label><input type="radio" name="pol" value="1" checked> Positiva</label>
<label><input type="radio" name="pol" value="-1"> Negativa</label>

</div>

<canvas id="canvas"></canvas>

<script>

/* =========================================================
   CANVAS
========================================================= */

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = innerWidth
canvas.height = innerHeight
}

resize()
addEventListener("resize", resize)

/* =========================================================
   PARÁMETROS DE VISTA
========================================================= */

let zoom = 1
let viewX = 0
let viewY = 0

const ZOOM_MIN = 0.05
const ZOOM_MAX = 20

/* =========================================================
   MEDICIONES
========================================================= */

let measurementPoint = null

/* origen movible */

let originPoint = {x:0,y:0}

let draggingOrigin=false

/* =========================================================
   LISTA DE CARGAS
========================================================= */

const charges=[]

/* =========================================================
   CAMPO ELÉCTRICO
========================================================= */

function field(x,y){

let Ex=0
let Ey=0

charges.forEach(c=>{

const dx=x-c.x
const dy=y-c.y

const r2=dx*dx+dy*dy+1e-6
const r=Math.sqrt(r2)

const E=c.q/r2

Ex+=E*dx/r
Ey+=E*dy/r

})

return{vx:Ex,vy:Ey}

}

/* =========================================================
   POTENCIAL
========================================================= */

function potential(x,y){

let V=0

charges.forEach(c=>{

const dx=x-c.x
const dy=y-c.y

const r=Math.sqrt(dx*dx+dy*dy)+1e-6

V+=c.q/r

})

return V

}

/* =========================================================
   COLORES
========================================================= */

function potentialColor(V){

V*=0.4

let r=0,g=0,b=0

if(V>0){

r=Math.min(255,200*V)
g=40
b=40

}else{

b=Math.min(255,-200*V)
g=40
r=40

}

return`rgba(${r},${g},${b},0.35)`

}

function fieldColor(E){

let t=Math.min(E/20,1)

let r,g,b

if(t<0.5){

let u=t*2
r=0
g=255*u
b=255*(1-u)

}else{

let u=(t-0.5)*2
r=255*u
g=255*(1-u)
b=0

}

return`rgb(${r},${g},${b})`

}

/* =========================================================
   CONVERSIONES
========================================================= */

function worldToScreen(x,y){

return{

X:canvas.width*(0.5+(x-viewX)/zoom),
Y:canvas.height*(0.5+(y-viewY)/zoom)

}

}

function screenToWorld(X,Y){

return{

x:viewX+(X/canvas.width-0.5)*zoom,
y:viewY+(Y/canvas.height-0.5)*zoom

}

}

/* =========================================================
   FLECHA DE CAMPO
========================================================= */

function drawArrow(x,y,vx,vy){

const m=Math.hypot(vx,vy)
if(m<1e-6)return

const L=6+10*Math.tanh(0.15*m)

const ux=vx/m
const uy=vy/m

ctx.strokeStyle=fieldColor(m)

ctx.beginPath()
ctx.moveTo(x,y)
ctx.lineTo(x+L*ux,y+L*uy)
ctx.stroke()

}

/* =========================================================
   LÍNEAS DE CAMPO
========================================================= */

function drawFieldLine(x,y){

let step=0.015

ctx.beginPath()

for(let i=0;i<400;i++){

const s=worldToScreen(x,y)

if(i===0) ctx.moveTo(s.X,s.Y)
else ctx.lineTo(s.X,s.Y)

const f=field(x,y)
const m=Math.hypot(f.vx,f.vy)

if(m<1e-4)break

x+=step*f.vx/m
y+=step*f.vy/m

}

ctx.strokeStyle="rgba(255,255,255,0.25)"
ctx.stroke()

}

/* =========================================================
   ESCALA DEL CAMPO
========================================================= */

function drawScale(){

const x=canvas.width-40
const y0=80
const h=200

for(let i=0;i<h;i++){

const t=i/h
const E=t*20

ctx.strokeStyle=fieldColor(E)

ctx.beginPath()
ctx.moveTo(x,y0+i)
ctx.lineTo(x+15,y0+i)
ctx.stroke()

}

ctx.fillStyle="white"
ctx.font="12px sans-serif"

ctx.fillText("E",x-5,y0-10)
ctx.fillText("0",x+18,y0+h)
ctx.fillText("alto",x+18,y0)

}

/* =========================================================
   DIBUJAR ORIGEN
========================================================= */

function drawOrigin(){

if(!measureMode.checked)return

const s=worldToScreen(originPoint.x,originPoint.y)

ctx.strokeStyle="yellow"
ctx.lineWidth=2

ctx.beginPath()
ctx.moveTo(s.X-10,s.Y)
ctx.lineTo(s.X+10,s.Y)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(s.X,s.Y-10)
ctx.lineTo(s.X,s.Y+10)
ctx.stroke()

ctx.fillStyle="yellow"
ctx.font="12px sans-serif"
ctx.fillText("Origen",s.X+10,s.Y-10)

}

/* =========================================================
   INTERACCIÓN
========================================================= */

let mouseDown=false
let moved=false
let startX=0
let startY=0
let lastX=0
let lastY=0

canvas.addEventListener("mousedown",e=>{

const rect=canvas.getBoundingClientRect()

const w=screenToWorld(
e.clientX-rect.left,
e.clientY-rect.top
)

/* detectar click cerca del origen */

if(measureMode.checked){

const dx=w.x-originPoint.x
const dy=w.y-originPoint.y

if(Math.sqrt(dx*dx+dy*dy)<0.05){

draggingOrigin=true
return

}

}

mouseDown=true
moved=false

startX=e.clientX
startY=e.clientY

lastX=e.clientX
lastY=e.clientY

})

canvas.addEventListener("mousemove",e=>{

/* mover origen */

if(draggingOrigin){

const rect=canvas.getBoundingClientRect()

const w=screenToWorld(
e.clientX-rect.left,
e.clientY-rect.top
)

originPoint=w
return

}

if(!mouseDown)return

const dx=e.clientX-lastX
const dy=e.clientY-lastY

if(Math.abs(e.clientX-startX)>5||Math.abs(e.clientY-startY)>5)
moved=true

viewX-=dx/canvas.width*zoom
viewY-=dy/canvas.height*zoom

lastX=e.clientX
lastY=e.clientY

})

canvas.addEventListener("mouseup",e=>{

if(draggingOrigin){

draggingOrigin=false
return

}

if(!mouseDown)return

mouseDown=false

if(!moved){

const rect=canvas.getBoundingClientRect()

const w=screenToWorld(
e.clientX-rect.left,
e.clientY-rect.top
)

/* modo medición */

if(measureMode.checked){

measurementPoint=w
return

}

/* crear carga */

const pol=document.querySelector('input[name="pol"]:checked').value

charges.push({
x:w.x,
y:w.y,
q:Number(pol)
})

}

})

/* =========================================================
   ZOOM
========================================================= */

canvas.addEventListener("wheel",e=>{

e.preventDefault()

const rect=canvas.getBoundingClientRect()

const mx=e.clientX-rect.left
const my=e.clientY-rect.top

const before=screenToWorld(mx,my)

zoom*=Math.exp(e.deltaY*0.001)
zoom=Math.max(ZOOM_MIN,Math.min(ZOOM_MAX,zoom))

const after=screenToWorld(mx,my)

viewX+=before.x-after.x
viewY+=before.y-after.y

},{passive:false})

/* =========================================================
   DIBUJAR MEDICIÓN
========================================================= */

function drawMeasurement(){

if(!measurementPoint)return

const x0=measurementPoint.x
const y0=measurementPoint.y

const dx0=x0-originPoint.x
const dy0=y0-originPoint.y

const r0=Math.sqrt(dx0*dx0+dy0*dy0)

const f=field(x0,y0)
const V=potential(x0,y0)

const E=Math.hypot(f.vx,f.vy)

const s=worldToScreen(x0,y0)
const sO=worldToScreen(originPoint.x,originPoint.y)

/* punto medido */

ctx.fillStyle="white"

ctx.beginPath()
ctx.arc(s.X,s.Y,5,0,2*Math.PI)
ctx.fill()

/* flecha campo */

drawArrow(s.X,s.Y,f.vx,f.vy)

/* línea origen-medición */

ctx.setLineDash([6,6])

ctx.beginPath()
ctx.moveTo(sO.X,sO.Y)
ctx.lineTo(s.X,s.Y)
ctx.stroke()

ctx.setLineDash([])

/* texto */

ctx.fillStyle="white"
ctx.font="14px sans-serif"

const x=20
let y=canvas.height-140

ctx.fillText(`x_rel = ${dx0.toFixed(3)}`,x,y); y+=20
ctx.fillText(`y_rel = ${dy0.toFixed(3)}`,x,y); y+=20
ctx.fillText(`r = ${r0.toFixed(3)}`,x,y); y+=20

ctx.fillText(`|E| = ${E.toFixed(3)}`,x,y); y+=20
ctx.fillText(`Ex = ${f.vx.toFixed(3)}`,x,y); y+=20
ctx.fillText(`Ey = ${f.vy.toFixed(3)}`,x,y); y+=20
ctx.fillText(`V = ${V.toFixed(3)}`,x,y)

}

/* =========================================================
   LOOP PRINCIPAL
========================================================= */

function animate(){

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

/* potencial */

if(showPotential.checked){

const step=30

for(let i=0;i<canvas.width;i+=step)
for(let j=0;j<canvas.height;j+=step){

const w=screenToWorld(i,j)

ctx.fillStyle=potentialColor(
potential(w.x,w.y)
)

ctx.fillRect(i,j,step,step)

}

}

/* campo */

if(showField.checked){

for(let i=0;i<canvas.width;i+=90)
for(let j=0;j<canvas.height;j+=90){

const w=screenToWorld(i,j)
const f=field(w.x,w.y)

drawArrow(i,j,f.vx,f.vy)

}

/* líneas de campo */

if(showFieldLines.checked){

charges.forEach(c=>{

const N=Math.max(8,Math.floor(16*Math.abs(c.q)))

for(let i=0;i<N;i++){

const a=2*Math.PI*i/N

drawFieldLine(
c.x+0.02*Math.cos(a),
c.y+0.02*Math.sin(a)
)

}

})

}

}

/* cargas */

charges.forEach(c=>{

const s=worldToScreen(c.x,c.y)

ctx.fillStyle=c.q>0?"red":"blue"

ctx.beginPath()
ctx.arc(s.X,s.Y,8,0,2*Math.PI)
ctx.fill()

})

drawOrigin()
drawMeasurement()
drawScale()

requestAnimationFrame(animate)

}

animate()

</script>
</body>
</html>