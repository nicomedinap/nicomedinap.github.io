---
layout: post
title: PyScript
---

Este lugar estará destinado a probar las utilidades de pyscript: python ejecutado en html. Al parecer es normal que tarde unos segundos en ejecutarse.

<html>
<head>
<!--code at: https://github.com/ostad-ai/Miscellaneous-->
<script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>

<!--
<py-config>
    packages = [
        "numpy",
        "matplotlib.pyplot"
        "matplotlib.animations"
        "collections"
    ]
    plugins = [
        "https://pyscript.net/latest/plugins/python/py_tutor.py"
    ]
</py-config>

py-env preinstala una libreria externa, se demora en cargar
<py-env>
- sentence-transformers
</py-env>
-->

<py-env>
    - matplotlib
    - numpy
</py-env>

</head>

<body>

<!--
<h1> Creamos un plot simple de matplotlib, unsando numpy:</h1>
<div id="plot-python">
</div>

<py-script output="plot-python">
    # Python Code
    # importing the matplotlib library
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots()
    # x axis
    x = ["Python", "C++", "JavaScript", "Golang"]
    # y axis
    y = [10, 5, 9, 7]
    plt.bar(x, y)
    # Naming the x-label
    plt.xlabel('Language')
    # Naming the y-label
    plt.ylabel('Score')
    # Naming the title of the plot
    plt.title('Language vs Score')
    fig
</py-script>
-->

<h1 style="color:#fa8900;">Python inside HTML: Drawing trees on click</h1>

<h3>Código adaptado desde https://github.com/ostad-ai/Miscellaneous, de <i>Hamed Shah-Hosseini</i></h3>

<button style="font-size:20px" id="mybutton" pys-onClick="run">Click to draw Tree</button>&nbsp;
<button style="font-size:20px" id="mybutton2" pys-onClick="clear">Click to Clear</button>

<div><canvas id="my-canvas"></canvas></div>

<py-script>
from js import window
import random; 
from math import pi,sin,cos

canvas=Element("my-canvas").element

#canvas.width=window.innerWidth-280; 

canvas.width=700; 
canvas.height=500
ctx = canvas.getContext("2d")

class Tree:
    def __init__(self,level=8,angle=pi/6):
        self.width,self.height=canvas.width,canvas.height    
        x=self.width/2+random.randint(-self.width/2,self.width/2); 
        y=self.height
        self.cp=[x,y]; 
        self.cd=pi/2; 
        self.angle=angle; 
        self.level=level
        self.size=70+.04*self.width*random.random(); 
        self.ratio=.7+.1*random.random() 
        r,g,b=random.randint(0,200),random.randint(0,200),random.randint(0,200)
        self.color=f'rgba({r},{g},{b},.8)' 
    def forward(self,d):
        x,y=self.cp
        xd,yd=x-d*cos(self.cd),y-d*sin(self.cd)
        ctx.beginPath();
        ctx.moveTo(x,y)
        ctx.lineTo(xd,yd)
        ctx.strokeStyle=self.color
        ctx.lineWidth=self.level
        ctx.stroke()
        self.cp=[xd,yd]     
    def moveTo(self,d):
        x,y=self.cp   
        xd,yd=x-d*cos(self.cd),y-d*sin(self.cd)
        self.cp=[xd,yd]
    def right(self,teta):
        self.cd=(self.cd-teta)%(2*pi)
    def left(self,teta):
        self.cd=(self.cd+teta)%(2*pi)
    def draw(self):
        if self.level<=0: return
        self.forward(self.size)
        self.right(self.angle)
        self.size*=self.ratio; self.level-=1
        self.draw()
        self.left(2*self.angle)
        self.draw()
        self.right(self.angle)
        self.size/=self.ratio; self.level+=1
        self.moveTo(-self.size)

def run(*args, **kwargs):    
    tree=Tree(); tree.draw()    
def clear(*args,**kwargs):
    ctx.clearRect(0, 0, canvas.width, canvas.height)
clear(None,None)
</py-script>



<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'></script>



<button style="font-size:18px" id="mybutton" pys-onClick="drawCube">
    Click to draw Cube</button>&nbsp;
<button style="font-size:18px" id="mybutton2" pys-onClick="ClearCubes">
    Click to Clear</button>
<div id="container"></div>
<py-script>
from js import THREE
from js import window
from pyodide import create_proxy
import random
from math import pi
#------------------------
container=Element("container").element
renderer = THREE.WebGLRenderer.new()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.shadowMap.enabled=True
renderer.shadowMap.type = THREE.PCFSoftShadowMap
#-----------
scene = THREE.Scene.new();
camera =THREE.PerspectiveCamera.new( 75, window.innerWidth / window.innerHeight, 1, 500 )
camera.position.z = 5; camera.position.y=2
#----------
light = THREE.PointLight.new( color="#ffffff",intensity=2 )
light.position.set(0,10,4)
light.castShadow = True
scene.add( light )
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
light.shadow.camera.near = 1
light.shadow.camera.far = 500
#-------------------
geometry_plane = THREE.PlaneGeometry.new( 200, 200 ,32,32)
material_plane = THREE.MeshStandardMaterial.new(color="#ffff00",side=THREE.DoubleSide )
plane = THREE.Mesh.new( geometry_plane, material_plane )
plane.receiveShadow = True
plane.position.z=-15
plane.rotation.x=-pi/2.1
scene.add(plane)
#-----------------
scene.background = THREE.Color.new("#0000ff")
cubes=[]
def drawCube(*args,**kwargs):    
    r,g,b=random.randint(0,255),random.randint(0,255),random.randint(0,255)
    geometry=THREE.BoxGeometry.new(1.5,1.5,1.5)
    material = THREE.MeshStandardMaterial.new(color=f"rgb({r},{g},{b})")
    cube = THREE.Mesh.new(geometry, material);
    cube.position.z=-5
    cube.position.x=10-20*random.random()
    cube.position.y=8-8*random.random()
    cube.castShadow =True
    scene.add( cube )
    cubes.append(cube)
    #renderer.render( scene, camera )
def ClearCubes(*args,**kwargs):
    for cb in cubes:
        scene.remove(cb)
    cubes.clear()
def animate(*args):
    window.requestAnimationFrame(create_proxy(animate))
    for cb in cubes:
        cb.rotation.x+=.01
        cb.rotation.y+=.015
    renderer.render( scene, camera )
animate()
container.appendChild(renderer.domElement)
</py-script>


</body>
</html>



