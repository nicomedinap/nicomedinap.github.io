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
            font-family: Arial, sans-serif;
        }
        canvas {
            display: block;
        }
        #mapSelect {
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
            top: 80px;
            left: 15%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 100;
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
        #wallInfo {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: none;
            max-width: 80%;
            text-align: center;
            transition: opacity 0.3s ease;
            z-index: 100;
        }
        #wallTitle {
            margin: 0 0 5px 0;
        }
        #wallDescription {
            margin: 0;
        }
        #lensControls {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0,0,0,0.7);
            padding: 10px;
            border-radius: 5px;
            color: white;
            width: 200px;
        }
        #lensControls h3 {
            margin-top: 0;
            margin-bottom: 10px;
        }
        #lensControls label {
            display: block;
            margin: 5px 0;
            font-size: 14px;
        }
        #lensControls input {
            width: 100%;
        }
        #centerLens {
            margin-top: 10px;
            padding: 5px;
            width: 100%;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <select id="mapSelect">
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo_recursivo.js">Mapa generico</option>
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

    <div id="wallInfo">
        <h3 id="wallTitle"></h3>
        <p id="wallDescription"></p>
    </div>

    <div id="lensControls">
        <h3>Gravitational Lens</h3>
        <label>
            Strength: <input type="range" id="lensStrength" min="0" max="1.5" step="0.01" value="0.1">
        </label>
        <label>
            Radius: <input type="range" id="lensRadius" min="1" max="5" step="0.1" value="0.5">
        </label>
        <button id="centerLens">Center Lens</button>
    </div>

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
        const wallInfo = document.getElementById('wallInfo');
        const wallTitle = document.getElementById('wallTitle');
        const wallDescription = document.getElementById('wallDescription');
        const lensStrengthInput = document.getElementById('lensStrength');
        const lensRadiusInput = document.getElementById('lensRadius');
        const centerLensButton = document.getElementById('centerLens');

        const MOVEMENT_SPEED = 0.06;    // Velocidad de movimiento
        const ROTATION_SPEED = 0.025;   // Velocidad de rotación
        const FOV = Math.PI/3

        // Gravitational lens parameters
        const lens = {
            x: 10,
            y: 10,
            strength: 0.2,
            radius: 0.5,
            visible: true
        };

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
            minDistanceToWall: 1,
            maxDistanceToTexture: 15,
            wallInfoDistance: 1.5 // Distance to show wall info
        };

         // Texturas
        const textures = {};
        let skyTexture = null;
        let floorTexture = null;
        const wallInfoData = {};

        function detectMobileAndLockOrientation() {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                screen.orientation.lock('landscape').catch(err => console.log(err));
            }
        }

        function checkNearbyWalls() {
            // Check all walls around the player
            const directions = [
                { x: 0, y: -1 }, // up
                { x: 1, y: 0 },  // right
                { x: 0, y: 1 },  // down
                { x: -1, y: 0 }  // left
            ];
            
            let closestWall = null;
            let minDistance = Infinity;
            
            directions.forEach(dir => {
                const checkX = Math.floor(player.x + dir.x);
                const checkY = Math.floor(player.y + dir.y);
                
                // Make sure we're checking within map bounds
                if (checkY >= 0 && checkY < map.length && checkX >= 0 && checkX < map[0].length) {
                    const wallType = map[checkY][checkX];
                    
                    if (wallType !== 0 && wallInfoData[wallType]) {
                        // Calculate distance to this wall
                        const distance = Math.sqrt(
                            Math.pow(checkX + 0.5 - player.x, 2) + 
                            Math.pow(checkY + 0.5 - player.y, 2)
                        );
                        
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestWall = wallType;
                        }
                    }
                }
            });
            
            // If we found a nearby wall and player is close enough
            if (closestWall && minDistance < player.wallInfoDistance) {
                const info = wallInfoData[closestWall];
                wallTitle.textContent = info.title;
                wallDescription.textContent = info.description;
                wallInfo.style.display = 'block';
                wallInfo.style.opacity = 1;
            } else {
                // Fade out the info if no wall is nearby
                wallInfo.style.opacity = 0;
                setTimeout(() => {
                    if (wallInfo.style.opacity === '0') {
                        wallInfo.style.display = 'none';
                    }
                }, 300);
            }
        }

        function preloadTextures(textureData) {
            const promises = Object.entries(textureData).map(([key, texture]) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = texture.url;
                    img.onload = () => {
                        if (img.width > 2500 || img.height > 2800) {
                            console.warn(`Texture ${key} is too large and will not be used.`);
                            resolve();
                        } else {
                            textures[key] = createMipmaps(img);
                            // Store the texture info in wallInfoData
                            wallInfoData[key] = {
                                title: texture.title,
                                description: texture.description
                            };
                            resolve();
                        }
                    };
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
                    case 37: setPlayerMovement(undefined, -ROTATION_SPEED); break;
                    case 39: setPlayerMovement(undefined, ROTATION_SPEED); break;
                    case 38: setPlayerMovement(MOVEMENT_SPEED); break;
                    case 40: setPlayerMovement(-MOVEMENT_SPEED); break;
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
            upButton.addEventListener('touchstart', () => setPlayerMovement(MOVEMENT_SPEED));
            upButton.addEventListener('touchend', () => setPlayerMovement(0));
            downButton.addEventListener('touchstart', () => setPlayerMovement(-MOVEMENT_SPEED));
            downButton.addEventListener('touchend', () => setPlayerMovement(0));
            leftButton.addEventListener('touchstart', () => setPlayerMovement(undefined, -ROTATION_SPEED));
            leftButton.addEventListener('touchend', () => setPlayerMovement(undefined, 0));
            rightButton.addEventListener('touchstart', () => setPlayerMovement(undefined, ROTATION_SPEED));
            rightButton.addEventListener('touchend', () => setPlayerMovement(undefined, 0));

            // Update the lens controls event listeners
            lensStrengthInput.addEventListener('input', (e) => {
                lens.strength = Math.min(parseFloat(e.target.value), 5.5); // Clamp to max 5.5
                lens.strength = Math.max(lens.strength, 0); // Ensure not negative
            });

            lensRadiusInput.addEventListener('input', (e) => {
                lens.radius = Math.min(parseFloat(e.target.value), 10); // Clamp to max 10
                lens.radius = Math.max(lens.radius, 0.1); // Minimum radius
            });
        }

        function calculateLensPosition() {
            if (map.length > 0 && map[0].length > 0) {
                lens.x = map[0].length / 2;
                lens.y = map.length / 2;
            }
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
            
            // Check for nearby walls to show info
            checkNearbyWalls();
        }

        function isValidMove(newX, newY) {
            const mapX = Math.floor(newX);
            const mapY = Math.floor(newY);
            return !(newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length || map[mapY][mapX] !== 0);
        }

        // In the castRay function, replace it with this version:
        function castRay(angle) {
            let x = player.x;
            let y = player.y;
            let sin = Math.sin(angle);
            let cos = Math.cos(angle);
            const stepSize = 0.02;
            
            // Track original angle for texture mapping
            let originalAngle = angle;
            
            // Add a maximum iteration limit to prevent freezing
            const maxIterations = 1000;
            let iterations = 0;

            while (iterations++ < maxIterations) {
                // Calculate distance to lens center
                const dx = x - lens.x;
                const dy = y - lens.y;
                const distToLens = Math.sqrt(dx*dx + dy*dy);
                
                // Apply lensing effect if within lens radius and strength is non-zero
                if (lens.visible && lens.strength > 0 && lens.radius > 0 && distToLens < lens.radius) {
                    // Use a small epsilon to prevent division by zero
                    const epsilon = 0.0001;
                    const safeDist = Math.max(distToLens, epsilon);
                    
                    // Clamp the strength to reasonable values
                    const clampedStrength = Math.min(lens.strength, 5.5);
                    
                    // Calculate bending amount (stronger when closer to center)
                    const normalizedDist = safeDist / lens.radius;
                    const bendFactor = clampedStrength * (1 - normalizedDist);
                    
                    // Calculate angle towards lens center
                    const angleToLens = Math.atan2(dy, dx);
                    
                    // Bend the ray towards the lens center
                    const angleDiff = angle - angleToLens;
                    const newAngle = angle + bendFactor * Math.sin(angleDiff);
                    
                    // Only update if the change is significant
                    if (Math.abs(newAngle - angle) > 0.0001) {
                        sin = Math.sin(newAngle);
                        cos = Math.cos(newAngle);
                        angle = newAngle;
                    }
                }
                
                x += cos * stepSize;
                y += sin * stepSize;
                const mapX = Math.floor(x);
                const mapY = Math.floor(y);

                if (mapX < 0 || mapY < 0 || mapY >= map.length || mapX >= map[0].length) {
                    return { dist: Infinity, texture: null, hitOffset: 0, mapX, mapY };
                }

                if (map[mapY][mapX] !== 0) {
                    const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);

                    let hitOffset;
                    const deltaX = x - mapX;
                    const deltaY = y - mapY;

                    // Use original angle for texture mapping to avoid distortion
                    let isVerticalWall;
                    if (Math.abs(deltaX - 0.5) > Math.abs(deltaY - 0.5)) {
                        isVerticalWall = true;
                        hitOffset = y - mapY;
                        if (Math.cos(originalAngle) < 0) hitOffset = 1 - hitOffset;
                    } else {
                        isVerticalWall = false;
                        hitOffset = x - mapX;
                        if (Math.sin(originalAngle) < 0) hitOffset = 1 - hitOffset;
                    }

                    if (hitOffset < 0) hitOffset += 1;
                    if (hitOffset > 1) hitOffset -= 1;

                    return { 
                        dist, 
                        texture: textures[map[mapY][mapX]], 
                        hitOffset, 
                        mapX, 
                        mapY, 
                        isVerticalWall 
                    };
                }
            }
            
            // If we hit max iterations, return a default value
            return { dist: Infinity, texture: null, hitOffset: 0, mapX: -1, mapY: -1 };
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

            const fov = FOV ;
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

            // Draw the gravitational lens area
            minimapCtx.fillStyle = 'rgba(100, 100, 255, 0.3)';
            minimapCtx.beginPath();
            minimapCtx.arc(
                lens.x * scale, 
                lens.y * scale, 
                lens.radius * scale, 
                0, 
                Math.PI * 2
            );
            minimapCtx.fill();

            minimapCtx.fillStyle = 'red';
            minimapCtx.fillRect(player.x * scale - scale / 2, player.y * scale - scale / 2, scale, scale);

            minimapCtx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            minimapCtx.beginPath();
            minimapCtx.moveTo(player.x * scale, player.y * scale);
            
            const fov = FOV ;
            const numRays = 10; // Número de rayos para el campo de visión en el minimapa
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
                    // Hide wall info when map changes
                    wallInfo.style.display = 'none';
                    // Recalculate lens position for new map
                    calculateLensPosition();
                });
            });

            const initialMap = mapSelect.value;
            loadMap(initialMap).then(() => {
                calculateLensPosition();
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

            // First load the texture database
            fetch('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/interactive_textures.json')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(textureDatabase => {
                    // Store the basic texture info immediately
                    Object.entries(textureDatabase.roomTextures).forEach(([key, texture]) => {
                        wallInfoData[key] = {
                            title: texture.title,
                            description: texture.description
                        };
                    });

                    // Load sky and floor textures first
                    return Promise.all([
                        preloadSkyAndFloorTextures(
                            textureDatabase.skyTexture, 
                            textureDatabase.floorTexture
                        ),
                        preloadTextures(textureDatabase.roomTextures)
                    ]);
                })
                .then(() => {
                    // Start the game after textures are loaded
                    const initialMap = mapSelect.value;
                    return loadMap(initialMap);
                })
                .then(() => {
                    handleInput();
                    gameLoop();
                    
                    // Add loading complete message
                    console.log("All textures loaded successfully");
                })
                .catch(error => {
                    console.error('Initialization error:', error);
                    // Fallback to basic functionality
                    const initialMap = mapSelect.value;
                    loadMap(initialMap).then(() => {
                        handleInput();
                        gameLoop();
                    });
                });
        }

        init();
    </script>
</body>
</html>