---
layout: topbar
---

<html>
<head>
    <script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>
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
    <h1>Problema de n (20) cuerpos gravitatorios</h1>
    <div id="controls">
        <button id="startButton" pys-onClick="generate_and_start">Generar y Empezar Animación</button>
        <button id="stopButton" pys-onClick="stop" disabled>Detener Animación</button>
    </div>
    <canvas id="my-canvas" width="350" height="500"></canvas>
    <div id="info">
        <div id="timer">Tiempo: 0s</div>
    </div>

    <py-script>
        from js import window, setInterval, clearInterval, document, Math
        from pyodide import create_proxy
        import random

        canvas = document.getElementById("my-canvas")
        ctx = canvas.getContext("2d")
        G = 6.67430 # Constante gravitacional universal
        ret = None
        dt = 0.05  # Paso de tiempo (s)
        fps = 10  # Fotogramas por segundo
        start_time = None
        bodies = []

        class Body:
            def __init__(self, x, y, radius, mass):
                self.x = x
                self.y = y
                self.radius = radius
                self.mass = mass
                self.color = f'rgba({random.randint(0, 200)},{random.randint(0, 200)},{random.randint(0, 200)},0.8)'
                self.dx = (random.random() - 0.5) * 10.5
                self.dy = (random.random() - 0.5) * 10.5
                self.history = []

            def draw(self):
                ctx.beginPath()
                ctx.fillStyle = self.color
                ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI)
                ctx.fill()

            def update_position(self, forces):
                ax = sum([f[0] / self.mass for f in forces])
                ay = sum([f[1] / self.mass for f in forces])
                self.dx += ax * dt
                self.dy += ay * dt
                self.x += self.dx * dt
                self.y += self.dy * dt
                self.history.append((self.x, self.y))

        def generate_and_start(*args, **kwargs):
            global bodies, ret, start_time
            num_bodies = 30
            bodies = []
            for _ in range(num_bodies):
                radii = random.randint(5, 15)
                mass = radii**4
                bodies.append(Body(random.randint(40, canvas.width - 40), random.randint(40, canvas.height - 40), radii, mass))
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

        def calculate_gravitational_force(body1, body2):
            dx = body2.x - body1.x
            dy = body2.y - body1.y
            distance = max(Math.sqrt(dx ** 2 + dy ** 2), 0.001)  # Evitar divisiones por cero
            force_magnitude = G * body1.mass * body2.mass / distance ** 2
            angle = Math.atan2(dy, dx)
            force_x = force_magnitude * Math.cos(angle)
            force_y = force_magnitude * Math.sin(angle)
            return force_x, force_y

        def run():
            global start_time
            elapsed_time = (window.performance.now() - start_time) / 1000
            Element("timer").element.innerText = f"Tiempo: {elapsed_time:.1f} s"

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            # Calcular fuerzas gravitatorias entre todos los pares de cuerpos
            forces = []
            for i, body1 in enumerate(bodies):
                force = [0, 0]
                for j, body2 in enumerate(bodies):
                    if i != j:
                        force_x, force_y = calculate_gravitational_force(body1, body2)
                        force[0] += force_x
                        force[1] += force_y
                forces.append(force)

            # Actualizar posiciones de los cuerpos y dibujar sus trayectorias
            for i, body in enumerate(bodies):
                body.update_position([forces[i]])
                for x, y in body.history:
                    ctx.beginPath()
                    ctx.fillStyle = body.color
                    ctx.arc(x, y, 1, 0, 2 * Math.PI)
                    ctx.fill()

            # Dibujar los cuerpos
            for body in bodies:
                body.draw()

    </py-script>
</body>
</html>
