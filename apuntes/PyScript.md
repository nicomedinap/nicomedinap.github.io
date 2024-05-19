<!DOCTYPE html>
<html>
<head>
    <script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>
    <py-env>
        - numpy
    </py-env>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <h1>Realistic Ball Animation</h1>
    <input type="number" id="ballCount" placeholder="Enter number of balls" />
    <button id="startButton" pys-onClick="generate_and_start">Generate and Start Animation</button>
    <button id="stopButton" pys-onClick="stop" disabled>Stop Animation</button>
    <button id="toggleEnergyButton" pys-onClick="toggle_energy">Toggle Individual Energy Display</button>
    <button id="toggleCollisionButton" pys-onClick="toggle_collision">Toggle Collisions</button>
    <canvas id="my-canvas" width="400" height="600"></canvas>
    <div id="timer">Tiempo: 0s</div>
    <div id="energy">Energia Total: 0 J</div>

    <py-script>
        from js import window, setInterval, clearInterval, document
        from pyodide import create_proxy
        import random
        from math import pi, sqrt

        canvas = Element("my-canvas").element
        ctx = canvas.getContext("2d")

        ret = None
        g = 9.8  # Gravity constant (m/s^2)
        dt = 0.05  # Time step (s)
        fps = 60  # Frames per second
        start_time = None
        circles = []
        E_retenida = 0.3  # Coefficient of restitution
        enable_collision = True

        class Circle:
            def __init__(self, x, y, radius):
                self.x = x
                self.y = y
                self.radius = radius
                self.color = f'rgba({random.randint(0, 200)},{random.randint(0, 200)},{random.randint(0, 200)},0.8)'
                self.width = canvas.width
                self.height = canvas.height
                self.dx = (random.random() - 0.5) * 300  # Adjusted initial velocity range
                self.dy = (random.random() - 0.5) * 300  # Adjusted initial velocity range
                self.display_energy = True

            def draw(self):
                ctx.beginPath()
                ctx.fillStyle = self.color
                ctx.arc(self.x, self.y, self.radius, 0, 2 * pi)
                ctx.fill()

                # Bounce off the walls
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

                # Update position with gravity
                self.x += self.dx * dt
                self.y += self.dy * dt + 0.5 * g * dt**2

                self.dy += g * dt  # Apply gravity

            def kinetic_energy(self):
                # Assuming mass proportional to radius for simplicity
                m = self.radius
                return 0.5 * m * (self.dx**2 + self.dy**2)

            def potential_energy(self):
                # Assuming mass proportional to radius for simplicity
                m = self.radius
                return m * g * (self.height - self.y - self.radius)

        def generate_and_start(*args, **kwargs):
            global circles, ret, start_time
            num_balls = int(Element("ballCount").element.value)
            circles = []
            for i in range(num_balls):
                circles.append(Circle(random.randint(40, canvas.width - 40), random.randint(40, canvas.height - 40), 10 + random.randint(0, 20)))
            if ret is None:
                start_time = window.performance.now()
                ret = setInterval(create_proxy(run), int(1000 / fps))
            Element("startButton").element.disabled = True
            Element("stopButton").element.disabled = False
            toggle_collision_button = Element("toggleCollisionButton").element
            toggle_collision_button.innerText = "Disable Collisions" if enable_collision else "Enable Collisions"

        def stop(*args, **kwargs):
            global ret
            if ret is not None:
                clearInterval(ret)
                ret = None
            Element("startButton").element.disabled = False
            Element("stopButton").element.disabled = True

        def toggle_energy(*args, **kwargs):
            global circles
            for circle in circles:
                circle.display_energy = not circle.display_energy

        def toggle_collision(*args, **kwargs):
            global enable_collision
            enable_collision = not enable_collision
            toggle_collision_button = Element("toggleCollisionButton").element
            toggle_collision_button.innerText = "Disable Collisions" if enable_collision else "Enable Collisions"

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
                    # Display energy for each ball
                    energy_text = f"E= {circle.kinetic_energy() + circle.potential_energy():.1f} J"
                    ctx.font = "10px Arial"
                    ctx.fillStyle = "black"
                    ctx.fillText(energy_text, circle.x - circle.radius, circle.y - circle.radius)

                # Collision detection if enabled
                if enable_collision:
                    for other_circle in circles[i + 1:]:
                        distance = sqrt((circle.x - other_circle.x)**2 + (circle.y - other_circle.y)**2)
                        if distance <= circle.radius + other_circle.radius:
                            # If collision detected, swap velocities
                            circle.dx, other_circle.dx = other_circle.dx, circle.dx
                            circle.dy, other_circle.dy = other_circle.dy, circle.dy

                           
                            # Adjust positions to prevent overlapping
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
