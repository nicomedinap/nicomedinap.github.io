---
layout: post
title: PyScript
---
<html>

<!--
algo de informacion
https://www.jhanley.com/blog/pyscript-javascript-callbacks/


<h1 style="font-size:12px">Este lugar estara destinado a probar las utilidades de pyscript: python ejecutado en html. 
    Al parecer es normal que tarde unos segundos en ejecutarse.
</h1>

<!--
<head>
code at: https://github.com/ostad-ai/Miscellaneous-->
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

</head>
-->

<body>


<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'></script>

<input type="number" id="ballCount" placeholder="¿cuantas pelotitas?" />
<button id="generateBalls" pys-onClick="generate_balls">Generate Balls</button>
<button id="mybuttonstart" pys-onClick="start" disabled>Start animation</button>
<button id="mybuttonstop" pys-onClick="stop" disabled>Stop animation</button>
<canvas id="my-canvas"></canvas>
<div id="timer">Tiempo: 0s</div>
<py-script>
from js import window, setInterval, clearInterval, document
from pyodide import create_proxy
import random
from math import pi

canvas = Element("my-canvas").element
canvas.width = window.innerWidth - 500
canvas.height = 600
ctx = canvas.getContext("2d")

ret = None
g = 0.5  # Gravity constant
start_time = None
circles = []

class Circle:
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius + random.randint(0, 20)
        r, g, b = random.randint(0, 200), random.randint(0, 200), random.randint(0, 200)
        self.color = f'rgba({r},{g},{b},.8)'
        self.width = canvas.width
        self.height = canvas.height
        self.dx = 2 + random.randint(0, 20)
        self.dy = 3 + random.randint(0, 20)
        self.dy_initial = self.dy  # Store initial dy to reset later

    def draw(self):
        ctx.beginPath()
        ctx.fillStyle = self.color
        ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
        ctx.fill()
        
        # Bounce off the walls
        if self.x >= (self.width - self.radius) or self.x <= self.radius:
            self.dx = -self.dx
        if self.y >= (self.height - self.radius):
            self.dy = -self.dy 
        elif self.y <= self.radius:
            self.dy = abs(self.dy)  # Ensure movement direction is correct
        
        # Update position with gravity
        self.x += self.dx
        self.y += self.dy
        self.dy += g  # Apply gravity

def generate_balls(*args, **kwargs):
    global circles
    num_balls = int(Element("ballCount").element.value)
    circles = []
    for i in range(num_balls):
        circles.append(Circle(random.randint(40, canvas.width), random.randint(40, canvas.height) // 2, 20))
    Element("mybuttonstart").element.disabled = False

def start(*args, **kwargs):
    global ret, start_time
    if ret is None:
        start_time = window.performance.now()
        ret = setInterval(create_proxy(run), 30)
    Element("mybuttonstart").element.disabled = True
    Element("mybuttonstop").element.disabled = False

def stop(*args, **kwargs):
    global ret
    clearInterval(ret)
    ret = None
    Element("mybuttonstart").element.disabled = False
    Element("mybuttonstop").element.disabled = True

def run():
    global start_time
    elapsed_time = (window.performance.now() - start_time) / 1000
    Element("timer").element.innerText = f"Tiempo: {elapsed_time:.1f} s"
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.lineWidth = '5'
    ctx.strokeStyle = 'yellow'
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.stroke()
    for circle in circles:
        circle.draw()

</py-script>


</body>
</html>
