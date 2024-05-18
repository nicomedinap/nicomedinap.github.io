---
layout: post
title: PyScript Two-Body Problem
---
<html>

<head>
<script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>
</head>

<body>

<canvas id="my-canvas" width="500" height="500"></canvas>

<button id="startButton" pys-onClick="start_animation">Start Animation</button>
<button id="stopButton" pys-onClick="stop_animation">Stop Animation</button>

<py-script>
from js import document, console, setInterval, clearInterval
import math

# Initialize global variables
positions = [[100, 100], [400, 400]]  # Initial positions of the two balls
velocities = [[1, 1], [-1, -1]]        # Initial velocities of the two balls
animation_interval = None

def animate():
    console.log("Animating...")  # Log to check if animate is called
    ctx = document.getElementById("my-canvas").getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    # Update positions based on velocities
    for i in range(2):
        positions[i][0] += velocities[i][0]
        positions[i][1] += velocities[i][1]

        # Reverse velocity if ball reaches canvas boundary
        if positions[i][0] <= 0 or positions[i][0] >= 500:
            velocities[i][0] *= -1
        if positions[i][1] <= 0 or positions[i][1] >= 500:
            velocities[i][1] *= -1

    # Draw the first ball (red)
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(positions[0][0], positions[0][1], 20, 0, 2 * math.pi)
    ctx.fill()

    # Draw the second ball (blue)
    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.arc(positions[1][0], positions[1][1], 20, 0, 2 * math.pi)
    ctx.fill()

def start_animation(*args, **kwargs):
    global animation_interval
    console.log("Start button pressed")  # Log to check if start_animation is called
    if animation_interval is None:
        animation_interval = setInterval(animate, 30)
        console.log("Animation started")  # Log to confirm interval is set

def stop_animation(*args, **kwargs):
    global animation_interval
    console.log("Stop button pressed")  # Log to check if stop_animation is called
    if animation_interval is not None:
        clearInterval(animation_interval)
        animation_interval = None
        console.log("Animation stopped")  # Log to confirm interval is cleared

</py-script>

</body>
</html>
