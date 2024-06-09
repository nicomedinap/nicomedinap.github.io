---
telescopio: none
--- 


<html lang="en">
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
        canvas {
            border: 2px solid black;
            margin-top: 20px;
            background-color: black;
        }
        #info {
            margin-top: 10px;
            text-align: center;
        }
        #reset-button {
            margin-top: 10px;
            padding: 10px 20px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Camara de nieble que resultó ser un juego</h1>
    <canvas id="my-canvas" width="300" height="600"></canvas>
    <div id="info">
        <div id="timer">Tiempo: 0s</div>
        <div id="status">Juegaaa</div>
    </div>
    <button id="reset-button">Volver a empezar</button>

    <py-script>
        from js import window, setInterval, clearInterval, document
        from pyodide import create_proxy
        import random
        from math import pi, cos, sin, sqrt

        # Canvas setup
        canvas = Element("my-canvas").element
        ctx = canvas.getContext("2d")

        # Simulation parameters
        particle_radius = 2
        max_velocity = 4
        trail_length = 20
        fps = 80
        center_x = canvas.width / 2
        center_y = canvas.height / 2
        particle_lifetime = 1  # Lifetime of each particle in seconds
        player_radius = 6
        player_speed = 2
        max_particles = 100  # Maximum number of active particles

        # Initial positions
        player_start_x, player_start_y = 20, canvas.height - 20
        player_x, player_y = player_start_x, player_start_y
        target_x, target_y = canvas.width - 20, 20
        direction = {'up': False, 'down': False, 'left': False, 'right': False}

        class Particle:
            def __init__(self, x, y, dx, dy, lifetime):
                self.x = x
                self.y = y
                self.dx = dx
                self.dy = dy
                self.radius = particle_radius
                self.trail = []
                self.lifetime = lifetime

            def update_trail(self):
                if len(self.trail) >= trail_length:
                    self.trail.pop(0)
                self.trail.append((self.x, self.y))

            def draw_trail(self):
                for i, (tx, ty) in enumerate(self.trail):
                    opacity = (i + 1) / len(self.trail)
                    ctx.beginPath()
                    ctx.fillStyle = f'rgba(255, 255, 255, {opacity})'
                    ctx.arc(tx, ty, self.radius, 0, 2 * pi)
                    ctx.fill()

            def move(self):
                self.x += self.dx
                self.y += self.dy

                # Bounce off the walls
                if (self.x + self.radius) >= canvas.width or (self.x - self.radius) <= 0:
                    self.dx *= -1
                if (self.y + self.radius) >= canvas.height or (self.y - self.radius) <= 0:
                    self.dy *= -1

            def draw(self):
                self.update_trail()
                self.draw_trail()
                ctx.beginPath()
                ctx.fillStyle = 'white'
                ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
                ctx.fill()

        particles = []

        def emit_particle():
            if len(particles) < max_particles:
                angle = random.uniform(0, 2 * pi)
                dx = max_velocity * cos(angle)
                dy = max_velocity * sin(angle)
                particles.append(Particle(center_x, center_y, dx, dy, particle_lifetime))

        def draw_particles():
            global particles
            for particle in particles:
                particle.move()
                particle.draw()
                particle.lifetime -= 1 / fps
            particles = [p for p in particles if p.lifetime > 0]

        def draw_player():
            ctx.beginPath()
            ctx.fillStyle = 'blue'
            ctx.arc(player_x, player_y, player_radius, 0, 2 * pi)
            ctx.fill()

        def draw_target():
            ctx.beginPath()
            ctx.fillStyle = 'green'
            ctx.arc(target_x, target_y, player_radius, 0, 2 * pi)
            ctx.fill()

        def check_collision():
            global particles, player_x, player_y
            for particle in particles:
                dist = sqrt((particle.x - player_x) ** 2 + (particle.y - player_y) ** 2)
                if dist < (particle.radius + player_radius):
                    return True
            return False

        def update_game():
            global player_x, player_y
            elapsed_time = (window.performance.now() - start_time) / 1000
            Element("timer").element.innerText = f"Time: {elapsed_time:.1f} s"
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            draw_particles()
            draw_player()
            draw_target()

            if check_collision():
                Element("status").element.innerText =  "Perdisteee"
                clearInterval(game_interval)
                clearInterval(particle_interval)
                return

            if abs(player_x - target_x) < player_radius and abs(player_y - target_y) < player_radius:
                Element("status").element.innerText = "Wiiii!"
                clearInterval(game_interval)
                clearInterval(particle_interval)
                return

            if direction['up']:
                player_y -= player_speed
            if direction['down']:
                player_y += player_speed
            if direction['left']:
                player_x -= player_speed
            if direction['right']:
                player_x += player_speed

        def handle_keydown(event):
            if event.key == "ArrowUp":
                direction['up'] = True
            elif event.key == "ArrowDown":
                direction['down'] = True
            elif event.key == "ArrowLeft":
                direction['left'] = True
            elif event.key == "ArrowRight":
                direction['right'] = True

        def handle_keyup(event):
            if event.key == "ArrowUp":
                direction['up'] = False
            elif event.key == "ArrowDown":
                direction['down'] = False
            elif event.key == "ArrowLeft":
                direction['left'] = False
            elif event.key == "ArrowRight":
                direction['right'] = False

        def reset_game(event=None):
            global player_x, player_y, particles, start_time, game_interval, particle_interval
            player_x, player_y = player_start_x, player_start_y
            particles = []
            Element("status").element.innerText = "Status: Playing"
            clearInterval(game_interval)
            clearInterval(particle_interval)
            start_animation()

        def start_animation():
            global start_time, game_interval, particle_interval
            start_time = window.performance.now()
            game_interval = setInterval(create_proxy(update_game), int(1000 / fps))
            particle_interval = setInterval(create_proxy(emit_particle), 100)  # Emit particles every 200 ms

        document.addEventListener("keydown", create_proxy(handle_keydown))
        document.addEventListener("keyup", create_proxy(handle_keyup))
        document.getElementById("reset-button").addEventListener("click", create_proxy(reset_game))

        start_animation()
    </py-script>
</body>
</html>
