---
layout: none
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería virtual astronómica</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        canvas {
            display: block;
        }
        #roomIndicator, #mapSelect {
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 5px 10px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            font-family: Arial, sans-serif;
        }
        #minimap {
            position: absolute;
            top: 90px;
            right: 20px;
            width: 50px;
            height: 250px;
            background-color: rgba(0, 0, 0, 0.5);
        }
        #minimap canvas {
            width: 100%;
            height: 100%;
        }
        .control-button {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            border-radius: 30px;
            font-size: 24px;
            text-align: center;
            line-height: 60px;
            user-select: none;
        }
        #upButton {
            bottom: 80px;
            right: 10px;
        }
        #downButton {
            bottom: 10px;
            right: 10px;
        }
        #leftButton {
            bottom: 45px;
            left: 10px;
        }
        #rightButton {
            bottom: 45px;
            left: 80px;
        }
        .control-button {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            border-radius: 30px;
            font-size: 24px;
            text-align: center;
            line-height: 60px;
            user-select: none;
        }
        #upButton {
            bottom: 80px;
            right: 10px;
        }
        #downButton {
            bottom: 10px;
            right: 10px;
        }
        #leftButton {
            bottom: 45px;
            left: 10px;
        }
        #rightButton {
            bottom: 45px;
            left: 80px;
        }
    </style>
</head>
<body>
    <select id="mapSelect">
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo.js">Laberinto</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/CalleLarga.js">Mapa 1</option>
     <!---   <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Mapa.js">Mapa 2</option> --->
     <!---   <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/test_mapa.js">Test</option> --->
    </select>
    <canvas id="gameCanvas"></canvas>
    <div id="minimap"><canvas id="minimapCanvas"></canvas></div>

    <!-- Botones de control -->
    <button id="upButton" class="control-button">↑</button>
    <button id="downButton" class="control-button">↓</button>
    <button id="leftButton" class="control-button">←</button>
    <button id="rightButton" class="control-button">→</button>

    <script>
        // Obtener referencias a los elementos del canvas y botones
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const minimapCanvas = document.getElementById('minimapCanvas');
        const minimapCtx = minimapCanvas.getContext('2d');
        const upButton = document.getElementById('upButton');
        const downButton = document.getElementById('downButton');
        const leftButton = document.getElementById('leftButton');
        const rightButton = document.getElementById('rightButton');

        // Establecer dimensiones del canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        minimapCanvas.width = 100;
        minimapCanvas.height = 600;

        // Inicializar variables
        let map = [];
        const player = {
            x: 2.5,
            y: 2.5,
            angle: 1,
            speed: 0,
            turnSpeed: 0,
            minDistanceToWall: 0.1,
            maxDistanceToTexture: 10 // Distancia máxima para texturizar las paredes
            maxDistanceToTexture: 30
        };

        let currentRoom = null;
        const textures = {};
        let skyTexture = null;
        let floorTexture = null;

        // Detectar dispositivo móvil y forzar orientación horizontal
        function detectMobileAndLockOrientation() {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                screen.orientation.lock('landscape').catch(err => console.log(err));
            }
        }

        // Pre-cargar texturas
        function preloadTextures(urls) {
            const promises = Object.entries(urls).map(([key, url]) => {
                return new Promise((resolve, reject) => {
                    if (textures[key]) {
                        resolve();
                    } else {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => {
                            textures[key] = createMipmaps(img);
                            resolve();
                        };
                        img.onerror = reject;
                    }
                });
            });
            return Promise.all(promises);
        }

        // Pre-cargar texturas de cielo y piso
        function preloadSkyAndFloorTextures(skyUrl, floorUrl) {
            return new Promise((resolve, reject) => {
                const skyImg = new Image();
                skyImg.src = skyUrl;
                skyImg.onload = () => {
                    skyTexture = skyImg;
                    const floorImg = new Image();
                    floorImg.src = floorUrl;
                    floorImg.onload = () => {
                        floorTexture = floorImg;
                        resolve();
                    };
                    floorImg.onerror = reject;
                };
                skyImg.onerror = reject;
            });
        }

        // Crear mipmaps para las texturas
        function createMipmaps(image) {
            const mipmaps = [image];
            let width = image.width / 2;
            let height = image.height / 2;
            while (width >= 1 && height >= 1) {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);
                mipmaps.push(canvas);
                width /= 2;
                height /= 2;
            }
            return mipmaps;
        }

        // Manejar entrada del usuario
        function handleInput() {
            window.addEventListener('keydown', (e) => {
                switch (e.keyCode) {
                    case 37: player.turnSpeed = -0.05; break;
                    case 39: player.turnSpeed = 0.05; break;
                    case 38: player.speed = 0.1; break;
                    case 40: player.speed = -0.1; break;
                }
            });

            window.addEventListener('keyup', (e) => {
                switch (e.keyCode) {
                    case 37:
                    case 39: player.turnSpeed = 0; break;
                    case 38:
                    case 40: player.speed = 0; break;
                }
            });

            // Manejar eventos de los botones de control
            upButton.addEventListener('touchstart', () => player.speed = 0.1);
            upButton.addEventListener('touchend', () => player.speed = 0);
            upButton.addEventListener('mousedown', () => player.speed = 0.1);
            upButton.addEventListener('mouseup', () => player.speed = 0);

            downButton.addEventListener('touchstart', () => player.speed = -0.1);
            downButton.addEventListener('touchend', () => player.speed = 0);
            downButton.addEventListener('mousedown', () => player.speed = -0.1);
            downButton.addEventListener('mouseup', () => player.speed = 0);

            leftButton.addEventListener('touchstart', () => player.turnSpeed = -0.05);
            leftButton.addEventListener('touchend', () => player.turnSpeed = 0);
            leftButton.addEventListener('mousedown', () => player.turnSpeed = -0.05);
            leftButton.addEventListener('mouseup', () => player.turnSpeed = 0);

            rightButton.addEventListener('touchstart', () => player.turnSpeed = 0.05);
            rightButton.addEventListener('touchend', () => player.turnSpeed = 0);
            rightButton.addEventListener('mousedown', () => player.turnSpeed = 0.05);
            rightButton.addEventListener('mouseup', () => player.turnSpeed = 0);
            const touchStartHandler = (e, speed, turnSpeed) => {
                e.preventDefault();
                player.speed = speed || player.speed;
                player.turnSpeed = turnSpeed || player.turnSpeed;
            };

            const touchEndHandler = (e) => {
                e.preventDefault();
                player.speed = 0;
                player.turnSpeed = 0;
            };

            upButton.addEventListener('touchstart', (e) => touchStartHandler(e, 0.1, 0));
            upButton.addEventListener('touchend', touchEndHandler);
            downButton.addEventListener('touchstart', (e) => touchStartHandler(e, -0.1, 0));
            downButton.addEventListener('touchend', touchEndHandler);
            leftButton.addEventListener('touchstart', (e) => touchStartHandler(e, 0, -0.05));
            leftButton.addEventListener('touchend', touchEndHandler);
            rightButton.addEventListener('touchstart', (e) => touchStartHandler(e, 0, 0.05));
            rightButton.addEventListener('touchend', touchEndHandler);
        }

        // Actualizar estado del jugador
        function update() {
            player.angle += player.turnSpeed;
            const moveStep = player.speed;
            const newX = player.x + Math.cos(player.angle) * moveStep;
            const newY = player.y + Math.sin(player.angle) * moveStep;

            if (isValidMove(newX, newY)) {
                player.x = newX;
                player.y = newY;
            }
        }

        // Validar movimiento del jugador
        function isValidMove(newX, newY) {
            const mapX = Math.floor(newX);
            const mapY = Math.floor(newY);
            if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length || map[mapY][mapX] !== 0) {
                return false;
            }
            return true;
        }

        // Lanzar un rayo para detectar colisiones
        function castRay(angle) {
            let x = player.x;
            let y = player.y;
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);
            const stepSize = 0.02;

            while (true) {
                x += cos * stepSize;
                y += sin * stepSize;
                const mapX = Math.floor(x);
                const mapY = Math.floor(y);

                if (mapX < 0 || mapY < 0 || mapY >= map.length || mapX >= map[0].length) {
                    return { dist: Infinity, texture: null, hitOffset: 0, mapX, mapY }; // Retornar una distancia infinita si está fuera del mapa
                    return { dist: Infinity, texture: null, hitOffset: 0, mapX, mapY };
                }

                if (map[mapY][mapX] !== 0) {
                    const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);

                    let hitOffset;
                    const deltaX = x - mapX;
                    const deltaY = y - mapY;

                    if (Math.abs(deltaX) < stepSize) {
                        hitOffset = deltaY % 1;
                        if (cos < 0) hitOffset = 1 - hitOffset;
                    } else {
                        hitOffset = deltaX % 1;
                        if (sin < 0) hitOffset = 1 - hitOffset;
                    }

                    if (hitOffset < 0) hitOffset += 1;

                    return { dist, texture: textures[map[mapY][mapX]], hitOffset, mapX, mapY };
                }
            }
        }

        // Dibujar la escena

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (skyTexture) {
                const skyWidth = skyTexture.width;
                const skyHeight = skyTexture.height;
                const skyOffset = ((player.angle * 0.1 + 8 * Math.PI) / (2 * Math.PI)) * skyWidth % skyWidth;

                ctx.drawImage(skyTexture, skyOffset, 0, skyWidth - skyOffset, skyHeight, 0, 0, canvas.width, canvas.height / 2);
                if (skyOffset > 0) {
                    ctx.drawImage(skyTexture, 0, 0, skyOffset, skyHeight, canvas.width - (skyOffset / skyWidth) * canvas.width, 0, (skyOffset / skyWidth) * canvas.width, canvas.height / 2);
                }
            }

            if (floorTexture) {
                const floorWidth = floorTexture.width;
                const floorHeight = floorTexture.height;
                const floorOffset = ((player.angle * 0.3 + 8 * Math.PI) / (2 * Math.PI)) * floorWidth % floorWidth;

                ctx.drawImage(floorTexture, floorOffset, 0, floorWidth - floorOffset, floorHeight, 0, canvas.height / 2, canvas.width, canvas.height / 2);
                if (floorOffset > 0) {
                    ctx.drawImage(floorTexture, 0, 0, floorOffset, floorHeight, canvas.width - (floorOffset / floorWidth) * canvas.width, canvas.height / 2, (floorOffset / floorWidth) * canvas.width, canvas.height / 2);
                }
            }

            const fov = Math.PI / 2;
            const numRays = canvas.width;
            const rayAngleStep = fov / numRays;

            for (let i = 0; i < numRays; i++) {
                const rayAngle = player.angle - fov / 2 + i * rayAngleStep;
                const { dist, texture, hitOffset } = castRay(rayAngle);
                const lineHeight = canvas.height / dist;
                const lineOffset = (canvas.height - lineHeight) / 2;

                if (dist <= player.maxDistanceToTexture && texture) {
                    const textureX = Math.floor(hitOffset * texture[0].width);
                    const textureY = 0;
                    const textureWidth = 1;
                    const textureHeight = texture[0].height;

                    ctx.drawImage(texture[0], textureX, textureY, textureWidth, textureHeight, i, lineOffset, 1, lineHeight);
                } else {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(i, lineOffset, 1, lineHeight);
                }
            }

            minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
            const scale = minimapCanvas.width / map[0].length;
            minimapCtx.fillStyle = 'white';
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    if (map[y][x] !== 0) {
                        minimapCtx.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            }
            minimapCtx.fillStyle = 'red';
            minimapCtx.fillRect(player.x * scale - scale / 2, player.y * scale - scale / 2, scale, scale);

            // Dibujar el campo de visión en el minimapa
            minimapCtx.fillStyle = 'rgba(255, 255, 0, 0.3)'; // Color amarillo translúcido
            minimapCtx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            minimapCtx.beginPath();
            minimapCtx.moveTo(player.x * scale, player.y * scale);
            for (let i = 0; i <= numRays; i++) {
                const rayAngle = player.angle - fov / 2 + i * rayAngleStep;
                const endX = player.x + Math.cos(rayAngle) * 4;
                const endY = player.y + Math.sin(rayAngle) * 4;
                minimapCtx.lineTo(endX * scale, endY * scale);
            }
            minimapCtx.closePath();
            minimapCtx.fill();
        }

        // Bucle principal del juego
        function gameLoop() {
            update();
            draw();
            setTimeout(() => {
                requestAnimationFrame(gameLoop);
            }, 1000 / 60);
        }

        // Cargar el mapa desde una URL
        function loadMap(mapUrl) {
            fetch(mapUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Error al cargar el mapa');
                    return response.text();
                })
                .then(script => {
                    const mapaMatch = script.match(/const map = (\[[\s\S]*?\]);/);
                    if (mapaMatch) {
                        map = JSON.parse(mapaMatch[1]);
                        gameLoop();
                    } else {
                        throw new Error('No se pudo encontrar el mapa en el script.');
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el mapa:', error);
                });
        }

        // Inicializar el juego
        function init() {
            detectMobileAndLockOrientation();
            handleInput();
            const mapSelect = document.getElementById('mapSelect');
            mapSelect.addEventListener('change', (event) => {
                const selectedMap = event.target.value;
                loadMap(selectedMap);
            });

            fetch('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/textures.json')
                .then(response => {
                    if (!response.ok) throw new Error('Error al cargar textures.json');
                    return response.json();
                })
                .then(data => {
                    const skyTextureUrl = data.skyTexture;
                    const floorTextureUrl = data.floorTexture;
                    const roomTextures = data.roomTextures;

                    return preloadSkyAndFloorTextures(skyTextureUrl, floorTextureUrl)
                        .then(() => preloadTextures(roomTextures));
                })
                .then(() => {
                    const initialMap = mapSelect.value;
                    loadMap(initialMap);
                })
                .catch(error => {
                    console.error('Error durante la inicialización:', error);
                });
        }

        // Ejecutar la inicialización
        init();
    </script>
</body>
</html>