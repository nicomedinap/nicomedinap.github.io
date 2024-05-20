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
            margin: 10px;
            padding: 2px;
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
    <h1>Pelotas que resuelven un laberinto</h1>
    <div id="controls">
        <select id="presetBallCount">
            <option value="50">50 bolas</option>
            <option value="70">70 bolas</option>
            <option value="90">90 bolas</option>
            <option value="120">120 bolas</option>
        </select>
        <input type="number" id="ballCount" placeholder="O ingrese número de bolas" min="1" />
        <button id="startButton" pys-onClick="generate_and_start">Generar y Empezar Animación</button>
        <button id="stopButton" pys-onClick="stop" disabled>Detener Animación</button>
        <button id="toggleCollisionButton" pys-onClick="toggle_collision">Habilitar/Deshabilitar Colisiones</button>
    </div>
    <canvas id="my-canvas" width="300" height="500"></canvas>
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
        circles = []
        E_retenida = 1  # Coeficiente de restitución
        enable_collision = True
        m = 1
        selected_circle = None
        last_mouse_position = None

        

        maze = [
            (50, 50, 250, 50), (250, 50, 250, 150), (250, 150, 150, 150), (150, 150, 150, 100),
            (150, 100, 200, 100), (200, 100, 200, 50), (200, 50, 150, 50), (150, 50, 150, 75),
            (150, 75, 100, 75), (100, 75, 100, 125), (100, 125, 50, 125), (50, 125, 50, 175),
            (50, 175, 100, 175), (100, 175, 100, 225), (100, 225, 50, 225), (50, 225, 50, 300),
            (50, 300, 100, 300), (100, 300, 100, 250), (100, 250, 200, 250), (200, 250, 200, 300),
            (200, 300, 250, 300), (250, 300, 250, 400), (250, 400, 150, 400), (150, 400, 150, 350),
            (150, 350, 200, 350), (200, 350, 200, 400), (200, 400, 100, 400), (100, 400, 100, 450),
            (100, 450, 150, 450), (150, 450, 150, 500), (150, 500, 250, 500), (250, 500, 250, 450),
            (250, 450, 300, 450), (300, 450, 300, 400), (300, 400, 350, 400), (350, 400, 350, 500),
            (350, 500, 450, 500), (450, 500, 450, 450), (450, 450, 500, 450), (500, 450, 500, 400),
            (500, 400, 450, 400), (450, 400, 450, 300), (450, 300, 400, 300), (400, 300, 400, 250),
            (400, 250, 450, 250), (450, 250, 450, 200), (450, 200, 400, 200), (400, 200, 400, 100),
            (400, 100, 450, 100), (450, 100, 450, 50), (450, 50, 350, 50), (350, 50, 350, 100),
            (350, 100, 300, 100), (300, 100, 300, 50), (300, 50, 50, 50)
            ]

        class Circle:
            def __init__(self, x, y, radius):
                self.x = x
                self.y = y
                self.radius = radius
                self.color = f'rgba({random.randint(0, 200)},{random.randint(0, 200)},{random.randint(0, 200)},0.8)'
                self.width = canvas.width
                self.height = canvas.height
                self.dx = (random.random() - 0.5) * 60  # Rango de velocidad inicial ajustado
                self.dy = (random.random() - 0.5) * 60  # Rango de velocidad inicial ajustado
                self.display_energy = True

            def draw(self):
                ctx.beginPath()
                ctx.fillStyle = self.color
                ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
                ctx.fill()

            def move(self):
                self.x += self.dx * dt
                self.y += self.dy * dt #+ 0.5 * g * dt**2
                #self.dy += g * dt

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

            def check_collision_with_walls(self):
                for (x1, y1, x2, y2) in maze:
                    if x1 == x2:  # Pared vertical
                        if x1 - self.radius <= self.x <= x1 + self.radius:
                            if y1 <= self.y <= y2:
                                self.x = x1 + self.radius * (-1 if self.dx > 0 else 1)  # Ajuste de posición
                                self.dx *= -1
                    elif y1 == y2:  # Pared horizontal
                        if y1 - self.radius <= self.y <= y1 + self.radius:
                            if x1 <= self.x <= x2:
                                self.y = y1 + self.radius * (-1 if self.dy > 0 else 1)  # Ajuste de posición
                                self.dy *= -1

                                            
        def generate_and_start(*args, **kwargs):
            global circles, ret, start_time
            preset_count = int(Element("presetBallCount").element.value)
            input_count = Element("ballCount").element.value
            num_balls = int(input_count) if input_count else preset_count
            circles = []
            for i in range(num_balls):
                circles.append(Circle(random.randint(40, canvas.width - 40), random.randint(40, canvas.height - 40), 5 + random.randint(0, 5)))
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

        def stop_animation():
            global ret
            if ret is not None:
                clearInterval(ret)
                ret = None
            Element("startButton").element.disabled = False
            Element("stopButton").element.disabled = True
            Element("stopButton").element.classList.remove('active')
            alert("¡Pelota llegó al centro del laberinto!")


        def draw_maze():
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            for (x1, y1, x2, y2) in maze:
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()

        def mouse_down(event):
            global selected_circle, last_mouse_position
            x, y = event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop
            for circle in circles:
                if sqrt((circle.x - x)**2 + (circle.y - y)**2) <= circle.radius:
                    selected_circle = circle
                    last_mouse_position = (x, y)
                    break

        def mouse_move(event):
            global last_mouse_position
            if selected_circle and last_mouse_position:
                x, y = event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop
                dx = x - last_mouse_position[0]
                dy = y - last_mouse_position[1]
                selected_circle.x += dx
                selected_circle.y += dy
                last_mouse_position = (x, y)

        def mouse_up(event):
            global selected_circle, last_mouse_position
            selected_circle = None
            last_mouse_position = None

        canvas.addEventListener("mousedown", create_proxy(mouse_down))
        canvas.addEventListener("mousemove", create_proxy(mouse_move))
        canvas.addEventListener("mouseup", create_proxy(mouse_up))

        
        def run():
            global start_time
            elapsed_time = (window.performance.now() - start_time) / 1000
            Element("timer").element.innerText = f"Tiempo: {elapsed_time:.1f} s"
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            draw_maze()
            total_energy = 0
            for i, circle in enumerate(circles):
                circle.move()
                circle.draw()
                circle.check_collision_with_walls()

                if enable_collision:
                    for other_circle in circles[i + 1:]:
                        distance = sqrt((circle.x - other_circle.x)**2 + (circle.y - other_circle.y)**2)
                        if distance <= circle.radius + other_circle.radius:
                            circle.dx, other_circle.dx = other_circle.dx, circle.dx
                            circle.dy, other_circle.dy = other_circle.dy, circle.dy
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
               
                # Check if any circle reaches the center of the maze
                if circle.x >= 400 and circle.x <= 450 and circle.y >= 275 and circle.y <= 325:
                    stop_animation()

    </py-script>
</body>
</html>
