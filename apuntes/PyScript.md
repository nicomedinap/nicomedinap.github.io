---
layout: post
title: PyScript
---
<html>

<h1 style="font-size:12px">Este lugar estara destinado a probar las utilidades de pyscript: python ejecutado en html. 
    Al parecer es normal que tarde unos segundos en ejecutarse.
</h1>

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


<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'></script>

<button id="mybuttonstart" pys-onClick="start">Start animation</button>
<button id="mybuttonstop" pys-onClick="stop">Stop animation</button>
<canvas id="my-canvas"></canvas></div><py-script>
from js import window, setInterval,clearInterval
from pyodide import create_proxy
import random; from math import pi
canvas=Element("my-canvas").element;
canvas.width=window.innerWidth-12; canvas.height=500
ctx = canvas.getContext("2d")
ret=None
def start(*args,**kwargs):
    global ret
    if ret==None:
        ret=setInterval(create_proxy(run),30)
def stop(*args,**kwargs):
    global ret
    clearInterval(ret)
    ret=None
class Circle:
    def __init__(self,x,y,radius):
        self.x=x; self.y=y
        self.radius=radius+random.randint(0,30)
        r,g,b=random.randint(0,200),random.randint(0,200),random.randint(0,200)
        self.color=f'rgba({r},{g},{b},.8)'
        self.width=canvas.width
        self.height=canvas.height
        self.dx=2+random.randint(0,20)
        self.dy=3+random.randint(0,20)
    def draw(self):
        ctx.beginPath() 
        ctx.fillStyle=self.color
        ctx.arc(self.x, self.y, self.radius, 0, 2 * pi) 
        ctx.fill()   
        if (self.x>=(self.width-self.radius)) or (self.x < self.radius):
            self.dx=-self.dx
        if (self.y>=(self.height-self.radius)) or (self.y < self.radius):
            self.dy=-self.dy
        self.x+=self.dx; self.y+=self.dy
circles=[]
for i in range(30):
    circles.append(Circle(canvas.width//2,canvas.height//2,20))
def run():
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.lineWidth='5'
    ctx.strokeStyle='yellow'
    ctx.rect(0,0,canvas.width,canvas.height)
    ctx.stroke()
    for circle in circles:
        circle.draw()
</py-script>

</body>
</html>
