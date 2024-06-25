<!DOCTYPE html>
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
            minDistanceToWall: 0.1,
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

        const skyTextureUrl = 'https://content.nationalgeographic.com.es/medio/2018/01/22/la-via-lactea-es-mayormente-plana_9fd1ebf7.jpg';
        const floorTextureUrl = 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2023/05/solid-oak-flooring.jpeg-1-e1684409736918.jpg';

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
                const { dist, texture, hitOffset, mapX, mapY } = castRay(rayAngle);

                const wallHeight = Math.min(canvas.height / dist, canvas.height);
                const wallTop = (canvas.height - wallHeight) / 2;

                if (texture) {
                    const mipLevel = Math.min(Math.floor(dist / 2), texture.length - 1);
                    const mipTexture = texture[mipLevel];
                    const textureX = Math.floor(hitOffset * mipTexture.width);

                    ctx.drawImage(mipTexture, textureX, 0, 1, mipTexture.height, i, wallTop, 1, wallHeight);
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

            // Dibujar el fondo del minimapa
            minimapCtx.fillStyle = 'white';
            minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);

            // Dibujar las paredes
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[0].length; x++) {
                    if (map[y][x] !== 0) {
                        minimapCtx.fillStyle = 'black';
                        minimapCtx.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            }

            // Dibujar el jugador
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
            return preloadSkyAndFloorTextures(skyTextureUrl, floorTextureUrl);
        }).then(() => {
            handleInput();
            mainLoop();
        }).catch((error) => {
            console.error('Error loading textures:', error);
        });
    </script>
</body>
</html>
