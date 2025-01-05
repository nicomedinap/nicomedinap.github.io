---
layout: none
---
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
            top: 10px;
            right: 10px;
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
    </style>
</head>
<body>
    <select id="mapSelect">
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Mapa.js">Mapa 2</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo.js">Laberinto</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/CalleLarga.js">Mapa 1</option>
    </select>
    <canvas id="gameCanvas"></canvas>
    <div id="minimap"><canvas id="minimapCanvas"></canvas></div>

    <!-- Botones de control -->
    <button id="upButton" class="control-button">↑</button>
    <button id="downButton" class="control-button">↓</button>
    <button id="leftButton" class="control-button">←</button>
    <button id="rightButton" class="control-button">→</button>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const minimapCanvas = document.getElementById('minimapCanvas');
        const minimapCtx = minimapCanvas.getContext('2d');
        const upButton = document.getElementById('upButton');
        const downButton = document.getElementById('downButton');
        const leftButton = document.getElementById('leftButton');
        const rightButton = document.getElementById('rightButton');
        const mapSelect = document.getElementById('mapSelect');

        // Ajustar el tamaño del canvas según el dispositivo
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        let map = [];
        const player = {
            x: 2.5,
            y: 2.5,
            angle: 1,
            speed: 0,
            turnSpeed: 0,
            minDistanceToWall: 1
            maxDistanceToTexture: 15
        };

        const textures = {};
        let skyTexture = null;
        let floorTexture = null;

        function detectMobileAndLockOrientation() {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                screen.orientation.lock('landscape').catch(err => console.log(err));
            }
        }

        function preloadTextures(urls) {
            const promises = Object.entries(urls).map(([key, url]) => {
                return new Promise((resolve, reject) => {
                    if (textures[key]) {
                        resolve();
                    } else {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => {
                            if (img.width > 2000 || img.height > 2300) {
                                console.warn(`Texture ${key} is too large and will not be used.`);
                                resolve();
                            } else {
                                textures[key] = createMipmaps(img);
                                resolve();
                            }
                        };
                        img.onerror = reject;
                    }
                });
            });
            return Promise.all(promises);
        }

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

        function handleInput() {
            const setPlayerMovement = (speed, turnSpeed) => {
                player.speed = speed !== undefined ? speed : player.speed;
                player.turnSpeed = turnSpeed !== undefined ? turnSpeed : player.turnSpeed;
            };

            function keyDownHandler(e) {
                switch (e.keyCode) {
                    case 37: setPlayerMovement(undefined, -0.05); break;
                    case 39: setPlayerMovement(undefined, 0.05); break;
                    case 38: setPlayerMovement(0.1); break;
                    case 40: setPlayerMovement(-0.1); break;
                }
            }

            function keyUpHandler(e) {
                switch (e.keyCode) {
                    case 37:
                    case 39: setPlayerMovement(undefined, 0); break;
                    case 38:
                    case 40: setPlayerMovement(0); break;
                }
            }

            window.addEventListener('keydown', keyDownHandler);
            window.addEventListener('keyup', keyUpHandler);

            // Manejo de eventos táctiles para dispositivos móviles
            upButton.addEventListener('touchstart', () => setPlayerMovement(0.1));
            upButton.addEventListener('touchend', () => setPlayerMovement(0));
            downButton.addEventListener('touchstart', () => setPlayerMovement(-0.1));
            downButton.addEventListener('touchend', () => setPlayerMovement(0));
            leftButton.addEventListener('touchstart', () => setPlayerMovement(undefined, -0.05));
            leftButton.addEventListener('touchend', () => setPlayerMovement(undefined, 0));
            rightButton.addEventListener('touchstart', () => setPlayerMovement(undefined, 0.05));
            rightButton.addEventListener('touchend', () => setPlayerMovement(undefined, 0));
        }

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

        function isValidMove(newX, newY) {
            const mapX = Math.floor(newX);
            const mapY = Math.floor(newY);
            return !(newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length || map[mapY][mapX] !== 0);
        }

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

                // Verificar si los valores están fuera del mapa
                if (mapX < 0 || mapY < 0 || mapY >= map.length || mapX >= map[0].length) {
                    return { dist: Infinity, texture: null, hitOffset: 0, mapX, mapY };
                }

                // Detectar colisión con una pared
                if (map[mapY][mapX] !== 0) {
                    const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);

                    let hitOffset;
                    const deltaX = x - mapX;
                    const deltaY = y - mapY;

                    // Determinar si se golpeó una pared vertical u horizontal
                    let isVerticalWall;
                    if (Math.abs(deltaX - 0.5) > Math.abs(deltaY - 0.5)) {
                        // Es una pared vertical
                        isVerticalWall = true;
                        hitOffset = y - mapY;
                        // Ajustar hitOffset para paredes izquierda y derecha
                        if (cos < 0) hitOffset = 1 - hitOffset;
                    } else {
                        // Es una pared horizontal
                        isVerticalWall = false;
                        hitOffset = x - mapX;
                        // Ajustar hitOffset para paredes superior e inferior
                        if (sin < 0) hitOffset = 1 - hitOffset;
                    }

                    // Asegurarse de que el hitOffset esté en el rango [0, 1]
                    if (hitOffset < 0) hitOffset += 1;
                    if (hitOffset > 1) hitOffset -= 1;

                    return { dist, texture: textures[map[mapY][mapX]], hitOffset, mapX, mapY, isVerticalWall };
                }
            }
        }

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

            const fov = Math.PI /2;
            const numRays = canvas.width;
            const rayAngleStep = fov / numRays;

            for (let i = 0; i < numRays; i++) {
                const rayAngle = player.angle - fov / 2 + i * rayAngleStep;
                const { dist, texture, hitOffset, isVerticalWall } = castRay(rayAngle);
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

            drawMinimap();
        }

        function drawMinimap() {
            // Ajustar el tamaño del minimapa según el tamaño del mapa
            const minimapMaxSize = 100; // Tamaño máximo del minimapa
            const mapWidth = map[0].length;
            const mapHeight = map.length;
            const scale = Math.min(minimapMaxSize / mapWidth, minimapMaxSize / mapHeight);

            // Ajustar el tamaño del canvas del minimapa
            minimapCanvas.width = mapWidth * scale;
            minimapCanvas.height = mapHeight * scale;

            minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
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

            minimapCtx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            minimapCtx.beginPath();
            minimapCtx.moveTo(player.x * scale, player.y * scale);
            const fov = Math.PI / 3;
            const numRays = 30; // Número de rayos para el campo de visión en el minimapa
            const rayAngleStep = fov / numRays;
            for (let i = 0; i <= numRays; i++) {
                const rayAngle = player.angle - fov / 2 + i * rayAngleStep;
                const endX = player.x + Math.cos(rayAngle) * 4;
                const endY = player.y + Math.sin(rayAngle) * 4;
                minimapCtx.lineTo(endX * scale, endY * scale);
            }
            minimapCtx.closePath();
            minimapCtx.fill();
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        document.addEventListener('DOMContentLoaded', () => {
            mapSelect.addEventListener('change', (event) => {
                const selectedMap = event.target.value;
                loadMap(selectedMap).then(() => {
                    player.speed = 0;
                    player.turnSpeed = 0;
                    // Reset player position to initial coordinates
                    player.x = 2.5;
                    player.y = 2.5;
                    player.angle = 1;
                });
            });

            const initialMap = mapSelect.value;
            loadMap(initialMap).then(() => {
                handleInput();
                gameLoop();
            });
        });

        function loadMap(mapUrl) {
            return fetch(mapUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Error al cargar el mapa');
                    return response.text();
                })
                .then(script => {
                    const mapaMatch = script.match(/const map = (\[[\s\S]*?\]);/);
                    if (mapaMatch) {
                        map = JSON.parse(mapaMatch[1]);
                    } else {
                        throw new Error('No se pudo encontrar el mapa en el script.');
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el mapa:', error);
                });
        }

        function init() {
            detectMobileAndLockOrientation();

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
                    loadMap(initialMap).then(() => {
                        handleInput();
                        gameLoop();
                    });
                })
                .catch(error => {
                    console.error('Error durante la inicialización:', error);
                });
        }

        init();
    </script>
</body>
</html>