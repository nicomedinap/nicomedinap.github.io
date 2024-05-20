<!DOCTYPE html>
<html lang="es">
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
        #info {
            margin-top: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Pelota en el Laberinto</h1>
    <canvas id="my-canvas" width="500" height="500"></canvas>
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
        dt = 0.05  # Paso de tiempo (s)
        fps = 60  # Fotogramas por segundo
        start_time = None
        dash_speed = 10
        normal_speed = 2

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
                self.color = 'blue'
                self.dx = 0
                self.dy = 0
                self.speed = normal_speed

            def draw(self):
                ctx.beginPath()
                ctx.fillStyle = self.color
                ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
                ctx.fill()

            def move(self):
                self.x += self.dx
                self.y += self.dy

                if (self.x + self.radius) >= canvas.width:
                    self.x = canvas.width - self.radius
                if (self.x - self.radius) <= 0:
                    self.x = self.radius

                if (self.y + self.radius) >= canvas.height:
                    self.y = canvas.height - self.radius
                if (self.y - self.radius) <= 0:
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

        ball = Circle(75, 75, 10)
        goal_x, goal_y = 400, 300  # Posición del objetivo

        def draw_maze():
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            for (x1, y1, x2, y2) in maze:
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()

        def draw_goal():
            ctx.beginPath()
            ctx.arc(goal_x, goal_y, 10, 0, 2 * pi)
            ctx.fillStyle = 'red'
            ctx.fill()

        def key_down(event):
            if event.key == "ArrowUp":
                ball.dy = -ball.speed
            elif event.key == "ArrowDown":
                ball.dy = ball.speed
            elif event.key == "ArrowLeft":
                ball.dx = -ball.speed
            elif event.key == "ArrowRight":
                ball.dx = ball.speed
            elif event.key == " ":  # Tecla de espacio
                if ball.dx != 0:
                    ball.dx *= dash_speed
                if ball.dy != 0:
                    ball.dy *= dash_speed

        def key_up(event):
            if event.key == "ArrowUp" or event.key == "ArrowDown":
                ball.dy = 0
            elif event.key == "ArrowLeft" or event.key == "ArrowRight":
                ball.dx = 0
            elif event.key == " ":  # Tecla de espacio
                ball.dx = ball.dx / dash_speed if ball.dx != 0 else 0
                ball.dy = ball.dy / dash_speed if ball.dy != 0 else 0

        window.addEventListener("keydown", create_proxy(key_down))
        window.addEventListener("keyup", create_proxy(key_up))

        def run():
            global start_time
            elapsed_time = (window.performance.now() - start_time) / 1000
            Element("timer").element.innerText = f"Tiempo: {elapsed_time:.1f} s"
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            draw_maze()
            draw_goal()
            ball.move()
            ball.draw()
            ball.check_collision_with_walls()
            if (ball.x - goal_x)**2 + (ball.y - goal_y)**2 <= 100:  # Si la pelota llega al objetivo
                clearInterval(ret)
                ret = None
                alert("¡Pelota llegó al objetivo!")

        def start_animation():
            global ret, start_time
            if ret is None:
                start_time = window.performance.now()
                ret = setInterval(create_proxy(run), int(1000 / fps))

        start_animation()
    </py-script>
</body>
</html>
