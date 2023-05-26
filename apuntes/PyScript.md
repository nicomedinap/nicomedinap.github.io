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

<div class="mydiv" id="py-out"></div>

<h1> Creamos un plot simple de matplotlib, unsando numpy:</h1>

<!--
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


</body>
</html>



