<!DOCTYPE html>
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
    <h1>Pelotas que colisionan elásticamente que están sometidas a la gravedad</h1>
    <div id="controls">
        <div>
            <select id="presetBallCount">
                <option value="50">50 bolas</option>
                <option value="70">70 bolas</option>
                <option value="90">90 bolas</option>
                <option value="120">120 bolas</option>
            </select>
            <input type="number" id="ballCount" placeholder="O ingrese número de bolas" min="1" />
        </div>
        <div>
            <button id="startButton" pys-onClick="generate_and_start">Generar y Empezar Animación</button>
            <button id="stopButton" pys-onClick="stop" disabled>Detener Animación</button>
            <button id="toggleEnergyButton" pys-onClick="toggle_energy">Mostrar/Ocultar Energía Individual</button>
            <button id="toggleCollisionButton" pys-onClick="toggle_collision">Hab/Deshab Colisiones</button>
        </div>
    </div>
    <canvas id="my-canvas" width="300" height="500"></canvas>
    <div id="info">
        <div id="timer">Tiempo: 0s</div>
        <div id="energy">Energía Total: 0 J</div>
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
        circles = []
        E_retenida = 0.5  # Coeficiente de restitución
        enable_collision = True
        m = 1

        class Circle:
            def __init__(self, x, y, radius):
                self.x = x
                self.y = y
                self.radius = radius
                self.color = f'rgba({random.randint(0, 200)},{random.randint(0, 200)},{random.randint(0, 200)},0.8)'
                self.width = canvas.width
                self.height = canvas.height
                self.dx = (random.random() - 0.5) * 300  # Rango de velocidad inicial ajustado
                self.dy = (random.random() - 0.5) * 300  # Rango de velocidad inicial ajustado
                self.display_energy = True

            def draw(self):
                ctx.beginPath()
                ctx.fillStyle = self.color
                ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
                ctx.fill()

                # Rebote en las paredes
                if (self.x + self.radius) >= self.width:
                    self.dx = -self.dx * E_retenida
                    self.x = self.width - self.radius
                if (self.x - self.radius) <= 0:
                    self.dx = -self.dx * E_retenida
                    self.x = self.radius

                if (self.y + self.radius) >= self.height:
                    self.dy = -self.dy * E_retenida
                    self.y = self.height - self.radius
                if (self.y - self.radius) <= 0:
                    self.dy = -self.dy * E_retenida
                    self.y = self.radius

                # Actualizar posición con gravedad
                self.x += self.dx * dt
                self.y += self.dy * dt + 0.5 * g * dt**2

                self.dy += g * dt  # Aplicar gravedad

            def kinetic_energy(self):
                # Suponiendo masa proporcional al radio por simplicidad
                return 0.5 * m * (self.dx**2 + self.dy**2)

            def potential_energy(self):
                # Suponiendo masa proporcional al radio por simplicidad
                return m * g * (self.height - self.y - self.radius)

        def generate_and_start(*args, **kwargs):
            global circles, ret, start_time
            preset_count = int(Element("presetBallCount").element.value)
            input_count = Element("ballCount").element.value
            num_balls = int(input_count) if input_count else preset_count
            circles = []
            for i in range(num_balls):
                circles.append(Circle(random.randint(40, canvas.width - 40), random.randint(40, canvas.height - 40), 5 + random.randint(0, 20)))
            if ret is None:
                start_time = window.performance.now()
                ret = setInterval(create_proxy(run), int(1000 / fps))
            Element("startButton").element.disabled = True
            Element("stopButton").element.disabled = False
            Element("stopButton").element.classList.add('active')
            toggle_collision_button = Element("toggleCollisionButton").element
            toggle_collision_button.innerText = "Deshabilitar Colisiones" if enable_collision else "Habilitar Colisiones"

        def stop(*args, **kwargs):
            global ret
            if ret is not None:
                clearInterval(ret)
                ret = None
            Element("startButton").element.disabled = False
            Element("stopButton").element.disabled = True
            Element("stopButton").element.classList.remove('active')

        def toggle_energy(*args, **kwargs):
            global circles
            for circle in circles:
                circle.display_energy = not circle.display_energy
            Element("toggleEnergyButton").element.classList.toggle('active')

        def toggle_collision(*args, **kwargs):
            global enable_collision
            enable_collision = not enable_collision
            toggle_collision_button = Element("toggleCollisionButton").element
            toggle_collision_button.innerText = "Deshabilitar Colisiones" if enable_collision else "Habilitar Colisiones"
            toggle_collision_button.classList.toggle('active')

        def run():
            global start_time
            elapsed_time = (window.performance.now() - start_time) / 1000
            Element("timer").element.innerText = f"Tiempo: {elapsed_time:.1f} s"

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            total_energy = 0
            for i, circle in enumerate(circles):
                circle.draw()
                total_energy += circle.kinetic_energy() + circle.potential_energy()
                if circle.display_energy:
                    # Mostrar energía para cada bola
                    energy_text = f"E= {circle.kinetic_energy() + circle.potential_energy():.1f} J"
                    ctx.font = "10px Arial"
                    ctx.fillStyle = "black"
                    ctx.fillText(energy_text, circle.x - circle.radius, circle.y - circle.radius)

                # Detección de colisiones si está habilitado
                if enable_collision:
                    for other_circle in circles[i + 1:]:
                        distance = sqrt((circle.x - other_circle.x)**2 + (circle.y - other_circle.y)**2)
                        if distance <= circle.radius + other_circle.radius:
                            # Si se detecta una colisión, intercambiar velocidades
                            circle.dx, other_circle.dx = other_circle.dx, circle.dx
                            circle.dy, other_circle.dy = other_circle.dy, circle.dy

                            # Ajustar posiciones para evitar superposición
                            overlap = circle.radius + other_circle.radius - distance
                            dx = circle.x - other_circle.x
                            dy = circle.y - other_circle.y
                            length = sqrt(dx**2 + dy**2)
                            dx /= length
                            dy /= length
                            circle.x += overlap * dx
                            circle.y += overlap * dy
                            other_circle.x -= overlap * dx
                            other_circle.y -= overlap * dy

            Element("energy").element.innerText = f"Energía Total: {total_energy:.1f} J"

    </py-script>
</body>
</html>
