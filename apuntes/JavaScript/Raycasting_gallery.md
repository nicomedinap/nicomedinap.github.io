---
layout: topbar
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
        #roomIndicator {
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
            top: 50px;
            right: 20px;
            width: 150px;
            height: 150px;
            background-color: rgba(0, 0, 0, 0.5);
        }
        #minimap canvas {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <div id="roomIndicator">Room: 1</div>
    <div id="minimap"><canvas id="minimapCanvas"></canvas></div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const roomIndicator = document.getElementById('roomIndicator');
        const minimapCanvas = document.getElementById('minimapCanvas');
        const minimapCtx = minimapCanvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        minimapCanvas.width = 100;
        minimapCanvas.height = 100;

        let map = [];

        // Player settings
        const player = {
            x: 15,
            y: 2,
            angle: 0,
            speed: 0,
            turnSpeed: 0,
            minDistanceToWall: 0.1,
            maxDistanceToTexture: 1
        };

        // Predefined textures
        const roomTextures = {
            2: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/201.jpg',
            3: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/210.jpg',
            4: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/021.jpg',
            5: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/120.jpg',
            6: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/201.jpg',
            7: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/210.jpg',
            8: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/021.jpg'
        };

        const skyTextureUrl = 'https://content.nationalgeographic.com.es/medio/2018/01/22/la-via-lactea-es-mayormente-plana_9fd1ebf7.jpg';
        const floorTextureUrl = 'https://cdn.pixabay.com/photo/2014/06/16/23/39/black-370118_1280.png';

        let currentRoom = null;
        const textures = {};
        let skyTexture = null;
        let floorTexture = null;

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

            checkRoomTransition();
        }

        function isValidMove(newX, newY) {
            const mapX = Math.floor(newX);
            const mapY = Math.floor(newY);
            if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
                return false;
            }
            if (map[mapY][mapX] !== 0) {
                return false;
            }
            return true;
        }

        function checkRoomTransition() {
            const mapX = Math.floor(player.x);
            const mapY = Math.floor(player.y);
            const room = map[mapY][mapX];
            if (room !== currentRoom && room !== 0 && roomTextures[room]) {
                currentRoom = room;
                roomIndicator.innerText = `Room: ${room}`;
                preloadTextures({ [room]: roomTextures[room] }).then(() => {
                    draw();
                });
            }
        }

        function castRay(angle) {
            let x = player.x;
            let y = player.y;
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            while (true) {
                x += cos * 0.01;
                y += sin * 0.01;
                const mapX = Math.floor(x);
                const mapY = Math.floor(y);

                if (map[mapY][mapX] !== 0) {
                    const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
                    const hitX = x - mapX;
                    const hitY = y - mapY;
                    const hitOffset = Math.abs(hitX) > Math.abs(hitY) ? hitX : hitY;
                    return { dist, texture: textures[map[mapY][mapX]], hitOffset, mapX, mapY };
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar cielo
            if (skyTexture) {
                ctx.drawImage(skyTexture, 0, 0, canvas.width, canvas.height / 2);
            }

            // Dibujar suelo
            if (floorTexture) {
                ctx.drawImage(floorTexture, 0, canvas.height / 2, canvas.width, canvas.height / 2);
            }

            const fov = Math.PI / 4;
            const numRays = canvas.width;
            const rayAngleStep = fov / numRays;

            for (let i = 0; i < numRays; i++) {
                const rayAngle = player.angle - fov / 2 + i * rayAngleStep;
                const { dist, texture, hitOffset } = castRay(rayAngle);
                const lineHeight = Math.min(canvas.height, canvas.height / dist);
                const lineOffset = (canvas.height - lineHeight) / 2;

                if (texture) {
                    const textureX = Math.floor(hitOffset * texture[0].width);
                    const textureY = 0;
                    const textureWidth = 1;
                    const textureHeight = texture[0].height;

                    ctx.drawImage(
                        texture[0],
                        textureX, textureY, textureWidth, textureHeight,
                        i, lineOffset, 1, lineHeight
                    );
                } else {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(i, lineOffset, 1, lineHeight);
                }
            }

            // Dibujar minimapa
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
            minimapCtx.fillRect(player.x * scale - scale / 4, player.y * scale - scale / 4, scale / 2, scale / 2);
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        function init() {
            handleInput();
            preloadSkyAndFloorTextures(skyTextureUrl, floorTextureUrl)
                .then(() => preloadTextures(roomTextures))
                .then(() => fetch('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Mapa.js'))
                .then(response => response.text())
                .then(script => {
                    const mapaMatch = script.match(/const map = (\[[\s\S]*?\]);/);
                    if (mapaMatch) {
                        map = JSON.parse(mapaMatch[1]);
                        currentRoom = map[Math.floor(player.y)][Math.floor(player.x)];
                        roomIndicator.innerText = `Room: ${currentRoom}`;
                        gameLoop();
                    } else {
                        throw new Error('No se pudo encontrar el mapa en el script.');
                    }
                })
                .catch(console.error);
        }

        init();
    </script>
</body>
</html>
