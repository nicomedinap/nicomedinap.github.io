---
layout: topbar
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Virtual Museum</title>
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
            top: 10px;
            right: 10px;
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
        minimapCanvas.width = 150;
        minimapCanvas.height = 150;

        const map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 3, 4, 5, 6, 7, 8, 1, 1]
        ];

        const player = {
            x: 2,
            y: 2,
            angle: 0,
            speed: 0,
            turnSpeed: 0,
            minDistanceToWall: 1,
            maxDistanceToTexture: 10
        };

        const roomTextures = {
            2: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/201.jpg',
            3: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/210.jpg',
            4: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/021.jpg',
            5: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/120.jpg',
            6: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/201.jpg',
            7: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/210.jpg',
            8: 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/021.jpg'
        };

        let currentRoom = null;
        const textures = {};

        function preloadTextures(urls) {
            const promises = Object.entries(urls).map(([key, url]) => {
                return new Promise((resolve, reject) => {
                    if (textures[key]) {
                        resolve();
                    } else {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => {
                            textures[key] = img;
                            resolve();
                        };
                        img.onerror = reject;
                    }
                });
            });
            return Promise.all(promises);
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
            if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
                return false;
            }

            const mapX = Math.floor(newX);
            const mapY = Math.floor(newY);
            if (map[mapY][mapX] !== 0) {
                const distToWall = Math.sqrt((newX - player.x) ** 2 + (newY - player.y) ** 2);
                if (distToWall < player.minDistanceToWall) {
                    return false;
                }
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

            const fov = Math.PI / 4;
            const numRays = canvas.width;
            const rayAngleStep = fov / numRays;

            for (let i = 0; i < numRays; i++) {
                const rayAngle = player.angle - fov / 2 + i * rayAngleStep;
                const { dist, texture, hitOffset, mapX, mapY } = castRay(rayAngle);

                const wallHeight = Math.min(canvas.height / dist, canvas.height);
                const wallTop = (canvas.height - wallHeight) / 2;

                if (texture) {
                    let textureX = Math.floor(hitOffset * texture.width);

                    const distToWall = Math.sqrt((mapX - player.x) ** 2 + (mapY - player.y) ** 2);
                    if (distToWall < player.minDistanceToWall) {
                        textureX = Math.floor((i / numRays) * texture.width);
                    } else if (distToWall > player.maxDistanceToTexture) {
                        textureX = Math.floor((i / numRays) * texture.width * (player.maxDistanceToTexture / distToWall));
                    }

                    ctx.drawImage(texture, textureX, 0, 1, texture.height, i, wallTop, 1, wallHeight);
                } else {
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(i, wallTop, 1, wallHeight);
                }
            }

            drawMinimap();
        }

        function drawMinimap() {
            minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

            const scale = minimapCanvas.width / map[0].length;

            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[0].length; x++) {
                    if (map[y][x] !== 0) {
                        minimapCtx.fillStyle = 'gray';
                        minimapCtx.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            }

            minimapCtx.fillStyle = 'red';
            minimapCtx.beginPath();
            minimapCtx.arc(player.x * scale, player.y * scale, scale / 2, 0, 2 * Math.PI);
            minimapCtx.fill();
        }

        function mainLoop() {
            update();
            draw();
            requestAnimationFrame(mainLoop);
        }

        preloadTextures(roomTextures).then(() => {
            handleInput();
            mainLoop();
        }).catch((error) => {
            console.error('Error loading textures:', error);
        });
    </script>
</body>
</html>
