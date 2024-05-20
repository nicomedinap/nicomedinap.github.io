<html>
<head>
    <script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>
    <py-env>
        - numpy
    </py-env>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        h1 {
            margin-top: 10px;
        }
        input, select, button {
            margin: 2px;
            padding: 5px;
            font-size: 14px;
        }
        canvas {
            border: 2px solid black;
            margin-top: 20px;
        }
        #controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
        }
        #info {
            margin-top: 10px;
            text-align: center;
        }
        button:disabled {
            background-color: #ccc;
            color: #666;
        }
        button.active {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Problema de tres cuerpos gravitatorios</h1>
    <div id="controls">
        <button id="startButton" pys-onClick="generate_and_start">Generar y Empezar Animación</button>
        <button id="stopButton" pys-onClick="stop" disabled>Detener Animación</button>
    </div>
    <canvas id="my-canvas" width="800" height="600"></canvas>
    <div id="info">
        <div id="timer">Tiempo: 0s</div>
    </div>

    <py-script>
        from js import window, setInterval, clearInterval, document
        from pyodide import create_proxy
        import random
        from math import pi, sqrt

        canvas = Element("my-canvas").element
        ctx = canvas.getContext("2d")

        ret = None
        g = 9.8  # Constante de gravedad (m/s^2)
        dt = 0.05  # Paso de tiempo (s)
        fps = 60  # Fotogramas por segundo
        start_time = None
        bodies = []

        class Body:
            def __init__(self, x, y, radius):
                self.x = x
                self.y = y
                self.radius = radius
                self.color = f'rgba({random.randint(0, 200)},{random.randint(0, 200)},{random.randint(0, 200)},0.8)'
                self.width = canvas.width
                self.height = canvas.height
                self.dx = (random.random() - 0.5) * 100  # Rango de velocidad inicial ajustado
                self.dy = (random.random() - 0.5) * 100  # Rango de velocidad inicial ajustado

            def draw(self):
                ctx.beginPath()
                ctx.fillStyle = self.color
                ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
                ctx.fill()

        def generate_and_start(*args, **kwargs):
            global bodies, ret, start_time
            num_bodies = 3
            bodies = []
            for i in range(num_bodies):
                bodies.append(Body(random.randint(40, canvas.width - 40), random.randint(40, canvas.height - 40), 20))
            if ret is None:
                start_time = window.performance.now()
                ret = setInterval(create_proxy(run), int(1000 / fps))
            Element("startButton").element.disabled = True
            Element("stopButton").element.disabled = False
            Element("stopButton").element.classList.add('active')

        def stop(*args, **kwargs):
            global ret
            if ret is not None:
                clearInterval(ret)
                ret = None
            Element("startButton").element.disabled = False
            Element("stopButton").element.disabled = True
            Element("stopButton").element.classList.remove('active')

        def run():
            global start_time
            elapsed_time = (window.performance.now() - start_time) / 1000
            Element("timer").element.innerText = f"Tiempo: {elapsed_time:.1f} s"

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for body in bodies:
                body.draw()

    </py-script>
</body>
</html>
