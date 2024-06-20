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
        canvas {
            border: 2px solid black;
            margin-top: 20px;
        }
        #controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
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
        .slider-container {
            margin: 10px;
        }
        .slider-container label {
            display: block;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Animación del Atractor de Lorenz</h1>
    <div id="controls">
        <button id="startButton" pys-onClick="start_animation">Iniciar Animación</button>
        <button id="stopButton" pys-onClick="stop_animation" disabled>Detener Animación</button>
        <div class="slider-container">
            <label for="sigmaSlider">Sigma: <span id="sigmaValue">10</span></label>
            <input type="range" id="sigmaSlider" min="0" max="30" value="10" step="0.1" pys-onChange="update_sigma">
        </div>
        <div class="slider-container">
            <label for="rhoSlider">Rho: <span id="rhoValue">28</span></label>
            <input type="range" id="rhoSlider" min="0" max="50" value="28" step="0.1" pys-onChange="update_rho">
        </div>
    </div>
    <canvas id="my-canvas" width="350" height="600"></canvas>
    <div id="info">
        <div id="timer">Tiempo: 0s</div>
    </div>

    <py-script>
        from js import window, setInterval, clearInterval, document
        from pyodide import create_proxy
        import math

        # Configuración del canvas
        canvas = document.getElementById("my-canvas")
        ctx = canvas.getContext("2d")

        # Parámetros del atractor de Lorenz
        sigma = 10
        beta = 2.667
        rho = 28
        dt = 0.01  # Paso de tiempo
        fps = 100  # Fotogramas por segundo

        # Inicialización de la partícula
        x, y, z = 30, 0, 20
        ret = None
        start_time = None
        trajectory = []

        # Escalado y traslación para centrar la animación
        scale = 10
        center_x = canvas.width / 2
        center_y = canvas.height

        def update_sigma(value):
            global sigma
            sigma = float(value)
            document.getElementById("sigmaValue").innerText = str(sigma)

        def update_rho(value):
            global rho
            rho = float(value)
            document.getElementById("rhoValue").innerText = str(rho)

        def start_animation(*args, **kwargs):
            global ret, start_time, trajectory, x, y, z
            x, y, z = 30, 0, 20  # Reiniciar las posiciones iniciales
            trajectory = [(x, y, z)]
            if ret is None:
                start_time = window.performance.now()
                ret = setInterval(create_proxy(run), int(1000 / fps))
            document.getElementById("startButton").disabled = True
            document.getElementById("stopButton").disabled = False
            document.getElementById("stopButton").classList.add('active')

        def stop_animation(*args, **kwargs):
            global ret
            if ret is not None:
                clearInterval(ret)
                ret = None
            document.getElementById("startButton").disabled = False
            document.getElementById("stopButton").disabled = True
            document.getElementById("stopButton").classList.remove('active')

        def run():
            global x, y, z, start_time, trajectory

            # Calcular el tiempo transcurrido
            elapsed_time = (window.performance.now() - start_time) / 1000
            document.getElementById("timer").innerText = f"Tiempo: {elapsed_time:.1f} s"

            # Método de Runge-Kutta de cuarto orden (RK4)
            k1x = sigma * (y - x)
            k1y = x * (rho - z) - y
            k1z = x * y - beta * z

            k2x = sigma * ((y + 0.5 * dt * k1y) - (x + 0.5 * dt * k1x))
            k2y = (x + 0.5 * dt * k1x) * (rho - (z + 0.5 * dt * k1z)) - (y + 0.5 * dt * k1y)
            k2z = (x + 0.5 * dt * k1x) * (y + 0.5 * dt * k1y) - beta * (z + 0.5 * dt * k1z)

            k3x = sigma * ((y + 0.5 * dt * k2y) - (x + 0.5 * dt * k2x))
            k3y = (x + 0.5 * dt * k2x) * (rho - (z + 0.5 * dt * k2z)) - (y + 0.5 * dt * k2y)
            k3z = (x + 0.5 * dt * k2x) * (y + 0.5 * dt * k2y) - beta * (z + 0.5 * dt * k2z)

            k4x = sigma * ((y + dt * k3y) - (x + dt * k3x))
            k4y = (x + dt * k3x) * (rho - (z + dt * k3z)) - (y + dt * k3y)
            k4z = (x + dt * k3x) * (y + dt * k3y) - beta * (z + dt * k3z)

            x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x)
            y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y)
            z += (dt / 6) * (k1z + 2 * k2z + 2 * k3z + k4z)

            # Añadir la nueva posición a la trayectoria
            trajectory.append((x, y, z))

            # Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            # Dibujar la trayectoria
            ctx.beginPath()
            ctx.strokeStyle = "green"
            for i in range(1, len(trajectory)):
                ctx.moveTo(center_x + trajectory[i-1][0] * scale, center_y - trajectory[i-1][2] * scale)
                ctx.lineTo(center_x + trajectory[i][0] * scale, center_y - trajectory[i][2] * scale)
            ctx.stroke()

            # Dibujar la partícula
            ctx.beginPath()
            ctx.arc(center_x + x * scale, center_y - z * scale, 5, 0, 2 * math.pi)
            ctx.fillStyle = "red"
            ctx.fill()

        # Inicializar eventos
        document.getElementById("sigmaSlider").addEventListener("input", lambda event: update_sigma(event.target.value))
        document.getElementById("rhoSlider").addEventListener("input", lambda event: update_rho(event.target.value))
    </py-script>
</body>
</html>

