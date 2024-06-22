---
layout: topbar
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raycasting Example</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const map = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 3],
            [1, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, 4],
            [1, 0, 0, 0, 0, 5],
            [1, 2, 3, 6, 1, 1]
        ];

        const player = {
            x: 2,
            y: 2,
            angle: 0,
            speed: 0,
            turnSpeed: 0,
            minDistanceToWall: 1, // Minimum distance player can get to a wall
            maxDistanceToTexture: 5  // Maximum distance to render texture without stretching
        };

        const textures = {
            2: new Image(),
            3: new Image(),
            4: new Image(),
            5: new Image(),
            6: new Image()
        };
        textures[2].src = 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/201.jpg';
        textures[3].src = 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/210.jpg';
        textures[4].src = 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/021.jpg';
        textures[5].src = 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/120.jpg';
        textures[6].src = 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC3132/012.jpg';

        function handleInput() {
            window.addEventListener('keydown', (e) => {
                switch (e.keyCode) {
                    case 37: player.turnSpeed = -0.05; break; // Left
                    case 39: player.turnSpeed = 0.05; break; // Right
                    case 38: player.speed = 0.1; break; // Up
                    case 40: player.speed = -0.1; break; // Down
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
        }

        function isValidMove(newX, newY) {
            // Check if the new position is within the map bounds
            if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
                return false;
            }

            // Check if the new position is too close to a wall
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
                    // Calculate the texture coordinates correctly
                    let textureX = Math.floor(hitOffset * texture.width);
                    
                    // Adjust textureX if too close to the wall to avoid stretching
                    const distToWall = Math.sqrt((mapX - player.x) ** 2 + (mapY - player.y) ** 2);
                    if (distToWall < player.minDistanceToWall) {
                        textureX = Math.floor((i / numRays) * texture.width);
                    } else if (distToWall > player.maxDistanceToTexture) {
                        textureX = Math.floor((i / numRays) * texture.width * (player.maxDistanceToTexture / distToWall));
                    }

                    // Draw four columns for the four faces of the projection
                    ctx.drawImage(texture, textureX, 0, 1, texture.height, i, wallTop, 1, wallHeight);
                    ctx.drawImage(texture, textureX, 0, 1, texture.height, i, wallTop + wallHeight, 1, -wallHeight); // Bottom face
                    ctx.drawImage(texture, textureX, 0, 1, texture.height, i, canvas.height - wallTop - wallHeight, 1, wallHeight); // Top face
                    ctx.drawImage(texture, textureX, 0, 1, texture.height, i, canvas.height - wallTop, 1, -wallHeight); // Back face
                } else {
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(i, wallTop, 1, wallHeight);
                }
            }
        }

        function mainLoop() {
            update();
            draw();
            requestAnimationFrame(mainLoop);
        }

        textures[2].onload = function() {
            textures[3].onload = function() {
                textures[4].onload = function() {
                    textures[5].onload = function() {
                        textures[6].onload = function() {
                            handleInput();
                            mainLoop();
                        };
                    };
                };
            };
        };
    </script>
</body>
</html>
