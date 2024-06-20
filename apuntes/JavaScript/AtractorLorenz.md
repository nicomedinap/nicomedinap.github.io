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
        <button id="startButton" onclick="startAnimation()">Iniciar Animación</button>
        <button id="stopButton" onclick="stopAnimation()" disabled>Detener Animación</button>
        <div class="slider-container">
            <label for="sigmaSlider">Sigma: <span id="sigmaValue">10</span></label>
            <input type="range" id="sigmaSlider" min="0" max="30" value="10" step="0.1">
        </div>
        <div class="slider-container">
            <label for="rhoSlider">Rho: <span id="rhoValue">28</span></label>
            <input type="range" id="rhoSlider" min="0" max="50" value="28" step="0.1">
        </div>
    </div>
    <canvas id="my-canvas" width="350" height="600"></canvas>
    <div id="info">
        <div id="timer">Tiempo: 0s</div>
    </div>

    <script>
        // Variables globales
        var canvas = document.getElementById("my-canvas");
        var ctx = canvas.getContext("2d");
        var sigma = 10;
        var beta = 2.667;
        var rho = 28;
        var dt = 0.01;
        var fps = 100;
        var scale = 10;
        var center_x = canvas.width / 2;
        var center_y = canvas.height;
        var x = 30, y = 0, z = 20;
        var ret = null;
        var start_time = null;
        var trajectory = [];

        // Función para actualizar el valor de Sigma
        document.getElementById("sigmaSlider").addEventListener("input", function() {
            sigma = parseFloat(this.value);
            document.getElementById("sigmaValue").innerText = sigma;
        });

        // Función para actualizar el valor de Rho
        document.getElementById("rhoSlider").addEventListener("input", function() {
            rho = parseFloat(this.value);
            document.getElementById("rhoValue").innerText = rho;
        });

        // Función para iniciar la animación
        function startAnimation() {
            x = 30;
            y = 0;
            z = 20;
            trajectory = [(x, y, z)];
            if (ret === null) {
                start_time = performance.now();
                ret = setInterval(run, 1000 / fps);
            }
            document.getElementById("startButton").disabled = true;
            document.getElementById("stopButton").disabled = false;
            document.getElementById("stopButton").classList.add('active');
        }

        // Función para detener la animación
        function stopAnimation() {
            if (ret !== null) {
                clearInterval(ret);
                ret = null;
            }
            document.getElementById("startButton").disabled = false;
            document.getElementById("stopButton").disabled = true;
            document.getElementById("stopButton").classList.remove('active');
        }

        // Función para ejecutar la animación en cada fotograma
        function run() {
            var elapsed_time = (performance.now() - start_time) / 1000;
            document.getElementById("timer").innerText = "Tiempo: " + elapsed_time.toFixed(1) + "s";

            var k1x = sigma * (y - x);
            var k1y = x * (rho - z) - y;
            var k1z = x * y - beta * z;

            var k2x = sigma * ((y + 0.5 * dt * k1y) - (x + 0.5 * dt * k1x));
            var k2y = (x + 0.5 * dt * k1x) * (rho - (z + 0.5 * dt * k1z)) - (y + 0.5 * dt * k1y);
            var k2z = (x + 0.5 * dt * k1x) * (y + 0.5 * dt * k1y) - beta * (z + 0.5 * dt * k1z);

            var k3x = sigma * ((y + 0.5 * dt * k2y) - (x + 0.5 * dt * k2x));
            var k3y = (x + 0.5 * dt * k2x) * (rho - (z + 0.5 * dt * k2z)) - (y + 0.5 * dt * k2y);
            var k3z = (x + 0.5 * dt * k2x) * (y + 0.5 * dt * k2y) - beta * (z + 0.5 * dt * k2z);

            var k4x = sigma * ((y + dt * k3y) - (x + dt * k3x));
            var k4y = (x + dt * k3x) * (rho - (z + dt * k3z)) - (y + dt * k3y);
            var k4z = (x + dt * k3x) * (y + dt * k3y) - beta * (z + dt * k3z);

        x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
        y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
        z += (dt / 6) * (k1z + 2 * k2z + 2 * k3z + k4z);

        trajectory.push({ x: x, y: y, z: z });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.strokeStyle = "green";
        for (var i = 1; i < trajectory.length; i++) {
            ctx.moveTo(center_x + trajectory[i - 1].x * scale, center_y - trajectory[i - 1].z * scale);
            ctx.lineTo(center_x + trajectory[i].x * scale, center_y - trajectory[i].z * scale);
        }
        ctx.stroke();

        for (var i = 0; i < trajectory.length; i++) {
            ctx.beginPath();
            ctx.arc(center_x + trajectory[i].x * scale, center_y - trajectory[i].z * scale, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
</script>

