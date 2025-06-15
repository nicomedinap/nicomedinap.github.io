---
layout: none
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería virtual astronómica</title>
    <style>
        body, html { margin: 0; padding: 0; overflow: hidden; font-family: Arial, sans-serif; }
        canvas { display: block; }
        #mapSelect { position: absolute; top: 10px; left: 10px; padding: 5px 10px; background: rgba(0,0,0,0.5); color: white; }
        #minimap { position: absolute; top: 80px; left: 15%; transform: translateX(-50%); background: rgba(0,0,0,0.5); z-index: 100; }
        .control-button { position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.5); border: none; border-radius: 30px; font-size: 24px; text-align: center; line-height: 60px; user-select: none; }
        #upButton { bottom: 80px; right: 10px; }
        #downButton { bottom: 10px; right: 10px; }
        #leftButton { bottom: 45px; left: 10px; }
        #rightButton { bottom: 45px; left: 80px; }
        #wallInfo { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: white; padding: 10px 20px; border-radius: 5px; display: none; max-width: 80%; text-align: center; transition: opacity 0.3s; z-index: 100; }
        #wallTitle { margin: 0 0 5px 0; }
        #wallDescription { margin: 0; }
        #lensControls { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px; color: white; width: 200px; display: none; }
        #lensControls h3 { margin-top: 0; margin-bottom: 10px; }
        #lensControls label { display: block; margin: 5px 0; font-size: 14px; }
        #lensControls input { width: 100%; }
        #lensMoveGroup { margin-top: 10px; display: flex; gap: 3px; flex-wrap: wrap;}
        #lensMoveGroup button { flex: 1 1 45%; margin: 2px; padding: 3px 0; border-radius: 3px; border: 1px solid #333; background: #444; color: #fff;}
    </style>
</head>
<body>
    <select id="mapSelect">
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo_recursivo.js">Mapa genérico</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Mapa.js">Mapa 2</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo.js">Laberinto</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/CalleLarga.js">Mapa 1</option>
    </select>

    <canvas id="gameCanvas"></canvas>
    <div id="minimap"><canvas id="minimapCanvas"></canvas></div>

    <button id="upButton" class="control-button">↑</button>
    <button id="downButton" class="control-button">↓</button>
    <button id="leftButton" class="control-button">←</button>
    <button id="rightButton" class="control-button">→</button>

    <div id="wallInfo">
        <h3 id="wallTitle"></h3>
        <p id="wallDescription"></p>
    </div>

    <div id="lensControls">
        <h3>Lente gravitatoria</h3>
        <p id="lensLabel" style="font-size:13px;margin-bottom:4px;"></p>
        <label>Distorsión: <input type="range" id="lensStrength" min="0." max="0.1" step="0.001" value="0.01"></label>
        <label>Radio: <input type="range" id="lensRadius" min="0.3" max="15" step="0.01" value="1."></label>
    </div>

    <script>
        // Constants
        const MOVEMENT_SPEED = 0.06;
        const ROTATION_SPEED = 0.025;
        const FOV = Math.PI/4;
        const MAX_TEXTURE_SIZE = 2800;
        const MINIMAP_MAX_SIZE = 100;
        const WALL_INFO_DISTANCE = 1.5;
        const MAX_DISTANCE_TO_TEXTURE = 50;
        const WALL_MARGIN = 0.85; // Distancia mínima permitida a la muralla

        // DOM Elements
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
        ctx.imageSmoothingEnabled = false;
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
        const lensLabel = document.getElementById('lensLabel');

        // Game State
        const player = { x: 2, y: 2, angle: 70, speed: 0, turnSpeed: 0 };
        const textures = {};
        const wallInfoData = {};
        let map = [];
        let skyTexture = null;
        let floorTexture = null;
        let lenses = [];

        // Para controles de lente cerca
        let currentLensIndex = -1;

        function setTelescopeLenses() {
            // Lente "objetivo" (entrada)
            const lens1 = {
                x: 2.5,
                y: 5.5,
                strength: 0.013,
                radius: 11.33,
                visible: true
            };
            // Lente "ocular" (salida)
            const lens2 = {
                x: 2.5,
                y: 15.5,
                strength: 0.004,
                radius: 15.0,
                visible: true
            };
            lenses = [lens1, lens2];
        }

        function lensNearPlayer(threshold = 1.5) {
            let closest = -1, minD = 99;
            for (let i = 0; i < lenses.length; i++) {
                const dx = player.x - lenses[i].x;
                const dy = player.y - lenses[i].y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if (d < threshold && d < minD) {
                    closest = i;
                    minD = d;
                }
            }
            return closest;
        }

        function updateRaycastingParams() {
            if (!map || !map.length) return;
            const maxMapDist = Math.sqrt(map[0].length ** 2 + map.length ** 2);
            STEPSIZE = Math.min(0.04, 1 / Math.max(map[0].length, map.length));
            MAX_ITERATIONS = Math.ceil(maxMapDist / STEPSIZE) + 2;
        }

        // Initialize game
        function init() {
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);
            detectMobileAndLockOrientation();
            loadTexturesAndStart();
            setupEventListeners();
        }

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function detectMobileAndLockOrientation() {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                screen.orientation.lock('landscape').catch(()=>{});
            }
        }

        async function loadTexturesAndStart() {
            try {
                const textureResponse = await fetch('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/interactive_textures.json');
                const textureDatabase = await textureResponse.json();
                Object.entries(textureDatabase.roomTextures).forEach(([key, texture]) => {
                    wallInfoData[key] = { title: texture.title, description: texture.description };
                });
                await Promise.all([
                    loadSkyAndFloor(textureDatabase.skyTexture, textureDatabase.floorTexture),
                    loadRoomTextures(textureDatabase.roomTextures)
                ]);
                await loadMap(mapSelect.value);
                gameLoop();
            } catch (error) {
                console.error('Initialization error:', error);
                await loadMap(mapSelect.value);
                gameLoop();
            }
        }

        async function loadSkyAndFloor(skyUrl, floorUrl) {
            skyTexture = await loadImage(skyUrl);
            floorTexture = await loadImage(floorUrl);
        }

        async function loadRoomTextures(textureData) {
            const promises = Object.entries(textureData).map(async ([key, texture]) => {
                if (texture.url) {
                    const img = await loadImage(texture.url);
                    if (img.width <= MAX_TEXTURE_SIZE && img.height <= MAX_TEXTURE_SIZE) {
                        textures[key] = createMipmaps(img);
                    }
                }
            });
            await Promise.all(promises);
        }

        function loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new window.Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
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

        function updateLensControlsVisibility() {
            const lensControls = document.getElementById('lensControls');
            // Mostrado/ocultado se gestiona por update()
            lensControls.style.display = "none";
        }

        function setupLensEventListeners() {
            lensStrengthInput.addEventListener('input', updateLensParameters);
            lensRadiusInput.addEventListener('input', updateLensParameters);
        } 

        function setupEventListeners() {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            upButton.addEventListener('touchstart', () => setPlayerMovement(MOVEMENT_SPEED));
            upButton.addEventListener('touchend', () => setPlayerMovement(0));
            downButton.addEventListener('touchstart', () => setPlayerMovement(-MOVEMENT_SPEED));
            downButton.addEventListener('touchend', () => setPlayerMovement(0));
            leftButton.addEventListener('touchstart', () => setPlayerMovement(undefined, -ROTATION_SPEED));
            leftButton.addEventListener('touchend', () => setPlayerMovement(undefined, 0));
            rightButton.addEventListener('touchstart', () => setPlayerMovement(undefined, ROTATION_SPEED));
            rightButton.addEventListener('touchend', () => setPlayerMovement(undefined, 0));
            mapSelect.addEventListener('change', async (event) => {
                await loadMap(event.target.value);
                resetPlayerPosition();
                wallInfo.style.display = 'none';
            });

            setupLensEventListeners();
        }

        function handleKeyDown(e) {
            switch (e.keyCode) {
                case 37: setPlayerMovement(undefined, -ROTATION_SPEED); break;
                case 39: setPlayerMovement(undefined, ROTATION_SPEED); break;
                case 38: setPlayerMovement(MOVEMENT_SPEED); break;
                case 40: setPlayerMovement(-MOVEMENT_SPEED); break;
            }
        }

        function handleKeyUp(e) {
            switch (e.keyCode) {
                case 37: case 39: setPlayerMovement(undefined, 0); break;
                case 38: case 40: setPlayerMovement(0); break;
            }
        }

        function setPlayerMovement(speed, turnSpeed) {
            if (speed !== undefined) player.speed = speed;
            if (turnSpeed !== undefined) player.turnSpeed = turnSpeed;
        }

        function updateLensParameters() {
            if (currentLensIndex === -1) return;
            lenses[currentLensIndex].strength = parseFloat(lensStrengthInput.value);
            lenses[currentLensIndex].radius = parseFloat(lensRadiusInput.value);
        }

        async function loadMap(mapUrl) {
            try {
                const response = await fetch(mapUrl);
                if (!response.ok) throw new Error('Error al cargar el mapa');
                const script = await response.text();
                const mapMatch = script.match(/const map = (\[[\s\S]*?\]);/);
                if (!mapMatch) throw new Error('No se pudo encontrar el mapa en el script.');
                const getMap = new Function(`${mapMatch[0]} return map;`);
                map = getMap();
                //lenses = findLensPositions()
                setTelescopeLenses();
                updateLensControlsVisibility();
                updateRaycastingParams();
            } catch (error) {
                console.error('Error al cargar el mapa:', error);
            }
        function findLensPositions() {
            const positions = [];
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    if (map[y][x] === 'L') {
                        positions.push({
                            x: x + 0.5,
                            y: y + 0.5,
                            strength: parseFloat(lensStrengthInput.value),
                            radius: parseFloat(lensRadiusInput.value),
                            visible: true
                        });
                    }
                }
            }
            return positions;
        }
        }

        function resetPlayerPosition() {
            player.x = 2.5;
            player.y = 2.5;
            player.angle = 1;
            player.speed = 0;
            player.turnSpeed = 0;
        }

        function update() {
            player.angle += player.turnSpeed;
            const moveStep = player.speed;
            let newX = player.x + Math.cos(player.angle) * moveStep;
            let newY = player.y + Math.sin(player.angle) * moveStep;
            if (isValidMove(newX, player.y)) player.x = newX;
            if (isValidMove(player.x, newY)) player.y = newY;
            checkNearbyWalls();

            // Mostrar controles de lente al acercarse
            const idx = lensNearPlayer();
            const lensControls = document.getElementById('lensControls');
            if (idx !== -1) {
                currentLensIndex = idx;
                // Sincroniza sliders y etiqueta
                lensStrengthInput.value = lenses[idx].strength;
                lensRadiusInput.value = lenses[idx].radius;
                // Aquí va la línea modificada:
                lensLabel.textContent =
                `Editando lente #${idx + 1}\n` +
                `Radio: ${lenses[idx].radius.toFixed(2)} | ` +
                `Distorsión: ${lenses[idx].strength.toFixed(3)}`;
                lensControls.style.display = "block";
            } else {
                lensControls.style.display = "none";
                currentLensIndex = -1;
            }
        }

        function isValidMove(x, y) {
            if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) return false;
            const mapX = Math.floor(x);
            const mapY = Math.floor(y);
            const cellValue = map[mapY] && map[mapY][mapX];
            if (cellValue !== 0 && cellValue !== 'L') return false;
            const directions = [
                { x: 0, y: -1 }, { x: 1, y: 0 },
                { x: 0, y: 1 },  { x: -1, y: 0 }
            ];
            for (const dir of directions) {
                const nx = Math.floor(x + dir.x);
                const ny = Math.floor(y + dir.y);
                if (ny >= 0 && ny < map.length && nx >= 0 && nx < map[0].length) {
                    const neighborType = map[ny][nx];
                    if (neighborType !== 0 && neighborType !== 'L' && textures[neighborType]) {
                        const dist = Math.sqrt(
                            Math.pow(nx + 0.5 - x, 2) +
                            Math.pow(ny + 0.5 - y, 2)
                        );
                        if (dist < WALL_MARGIN) return false;
                    }
                }
            }
            return true;
        }

        function checkNearbyWalls() {
            const directions = [
                { x: 0, y: -1 }, { x: 1, y: 0 },
                { x: 0, y: 1 },  { x: -1, y: 0 }
            ];
            let closestWall = null;
            let minDistance = Infinity;
            for (const dir of directions) {
                const checkX = Math.floor(player.x + dir.x);
                const checkY = Math.floor(player.y + dir.y);
                if (checkY >= 0 && checkY < map.length && 
                    checkX >= 0 && checkX < map[0].length) {
                    const wallType = map[checkY][checkX];
                    if (wallType !== 0 && wallInfoData[wallType] && textures[wallType]) {
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
            }
            if (closestWall && minDistance < WALL_INFO_DISTANCE) {
                const info = wallInfoData[closestWall];
                wallTitle.textContent = info.title;
                wallDescription.textContent = info.description;
                wallInfo.style.display = 'block';
                wallInfo.style.opacity = 1;
            } else {
                wallInfo.style.opacity = 0;
                setTimeout(() => {
                    if (wallInfo.style.opacity === '0') {
                        wallInfo.style.display = 'none';
                    }
                }, 300);
            }
        }

        function castRay(angle) {
            let x = player.x;
            let y = player.y;
            let sin = Math.sin(angle);
            let cos = Math.cos(angle);
            const stepSize = STEPSIZE;
            const originalAngle = angle;
            const maxIterations = MAX_ITERATIONS;
            let iterations = 0;
            let magnification = 1.0
            
            while (iterations++ < maxIterations) {

                for (const lens of lenses) {
                    if (!lens.visible) continue;
                    const dx = x - lens.x;
                    const dy = y - lens.y;
                    const distToLens = Math.sqrt(dx*dx + dy*dy);
                    if (distToLens < lens.radius) {
                        const normalizedDist = distToLens / lens.radius;
                        // Efecto máximo en el centro, suave en los bordes
                        const localMagnification = 1 + lens.strength * (1 - normalizedDist);
                        magnification *= localMagnification;
                    }
                }

                applyLensEffects();

                x += cos * stepSize;
                y += sin * stepSize;
                const mapX = Math.floor(x);
                const mapY = Math.floor(y);
                if (mapX < 0 || mapY < 0 || mapY >= map.length || mapX >= map[0].length) {
                    return { dist: Infinity, texture: null, hitOffset: 0, mapX, mapY, magnification };
                }
                if (map[mapY][mapX] !== 0 && map[mapY][mapX] !== 'L') {
                    const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
                    const hitData = calculateHitData(x, y, mapX, mapY, originalAngle);
                    return { dist, texture: textures[map[mapY][mapX]], ...hitData, magnification };
                }
            }
            return { dist: Infinity, texture: null, hitOffset: 0, mapX: -1, mapY: -1, magnification };

            function applyLensEffects() {
                for (const lens of lenses) {
                    if (!lens.visible) continue;
                    const dx = x - lens.x;
                    const dy = y - lens.y;
                    const distToLens = Math.sqrt(dx*dx + dy*dy);
                    if (distToLens < lens.radius) {
                        const epsilon = 0.0001;
                        const safeDist = Math.max(distToLens, epsilon);
                        const normalizedDist = safeDist / lens.radius;
                        const bendFactor = lens.strength * (1 - normalizedDist);
                        const angleToLens = Math.atan2(dy, dx);
                        const newAngle = angle + bendFactor * Math.sin(angle - angleToLens);
                        if (Math.abs(newAngle - angle) > 0.0001) {
                            sin = Math.sin(newAngle);
                            cos = Math.cos(newAngle);
                            angle = newAngle;
                        }
                    }
                }
            }

            function calculateHitData(x, y, mapX, mapY, originalAngle) {
                const deltaX = x - mapX;
                const deltaY = y - mapY;
                let hitOffset, isVerticalWall;
                if (Math.abs(deltaX - 0.5) > Math.abs(deltaY - 0.5)) {
                    isVerticalWall = true;
                    hitOffset = y - mapY;
                    if (Math.cos(originalAngle) < 0) hitOffset = 1 - hitOffset;
                } else {
                    isVerticalWall = false;
                    hitOffset = x - mapX;
                    if (Math.sin(originalAngle) < 0) hitOffset = 1 - hitOffset;
                }
                hitOffset = (hitOffset < 0) ? hitOffset + 1 : (hitOffset > 1) ? hitOffset - 1 : hitOffset;
                return { hitOffset, mapX, mapY, isVerticalWall };
            }
        }

        function draw() {
            drawSkyAndFloor();
            drawWalls();
            drawMinimap();
        }

        function drawSkyAndFloor() {
            if (skyTexture) drawTiledTexture(skyTexture, player.angle * 0.1, 0, canvas.height / 2);
            if (floorTexture) drawTiledTexture(floorTexture, player.angle * 0.3, canvas.height / 2, canvas.height / 2);
        }

        function drawTiledTexture(texture, angleOffset, yPos, height) {
            const width = texture.width;
            const offset = ((angleOffset + 8 * Math.PI) / (2 * Math.PI)) * width % width;
            ctx.drawImage(texture, offset, 0, width - offset, texture.height, 0, yPos, canvas.width, height);
            if (offset > 0) {
                ctx.drawImage(texture, 0, 0, offset, texture.height, canvas.width - (offset / width) * canvas.width, yPos, (offset / width) * canvas.width, height);
            }
        }

        function drawWalls() {
            const numRays = canvas.width;
            const rayAngleStep = FOV / numRays;
            const maxWallHeight = canvas.height * 2;
            for (let i = 0; i < numRays; i++) {
                const rayAngle = player.angle - FOV / 2 + i * rayAngleStep;
                const { dist, texture, hitOffset, magnification } = castRay(rayAngle);
                if (dist <= MAX_DISTANCE_TO_TEXTURE) {
                    let lineHeight = Math.min(canvas.height / dist, maxWallHeight);
                    lineHeight *= magnification || 1.0; // Aplica el factor de magnificación
                    const lineOffset = (canvas.height - lineHeight) / 2;
                    if (texture) {
                        let mipLevel = 0;
                        let targetHeight = Math.abs(lineHeight);
                        while (
                            mipLevel + 1 < texture.length &&
                            texture[mipLevel].height > targetHeight * 1.5
                        ) {
                            mipLevel++;
                        }
                        const textureX = Math.floor(hitOffset * texture[mipLevel].width);
                        ctx.drawImage(
                            texture[mipLevel], 
                            textureX, 0, 1, texture[mipLevel].height, 
                            i, lineOffset, 1, lineHeight
                        );
                    } else {
                        ctx.fillStyle = 'black';
                        ctx.fillRect(i, lineOffset, 1, lineHeight);
                    }
                }
            }
        }

        function drawMinimap() {
            if (!map.length) return;
            const mapWidth = map[0].length;
            const mapHeight = map.length;
            const scale = 1.5*Math.min(MINIMAP_MAX_SIZE / mapWidth, MINIMAP_MAX_SIZE / mapHeight);
            minimapCanvas.width = mapWidth * scale;
            minimapCanvas.height = mapHeight * scale;
            minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
            drawMapCells();
            drawLensEffects();
            drawPlayer();
            drawPlayerFOV();

            function drawMapCells() {
                for (let y = 0; y < map.length; y++) {
                    for (let x = 0; x < map[y].length; x++) {
                        if (map[y][x] === 'L') {
                            minimapCtx.fillStyle = 'blue';
                            minimapCtx.fillRect(x * scale, y * scale, scale, scale);
                        } else if (map[y][x] !== 0) {
                            minimapCtx.fillStyle = 'white';
                            minimapCtx.fillRect(x * scale, y * scale, scale, scale);
                        }
                    }
                }
            }
            function drawLensEffects() {
                for (const lens of lenses) {
                    if (lens.visible) {
                        minimapCtx.fillStyle = 'rgba(100, 100, 255, 0.3)';
                        minimapCtx.beginPath();
                        minimapCtx.arc(lens.x * scale, lens.y * scale, lens.radius * scale, 0, Math.PI * 2);
                        minimapCtx.fill();
                    }
                }
            }
            function drawPlayer() {
                minimapCtx.fillStyle = 'red';
                minimapCtx.fillRect(
                    player.x * scale - scale / 2, 
                    player.y * scale - scale / 2, 
                    scale, 
                    scale
                );
            }
            function drawPlayerFOV() {
                minimapCtx.fillStyle = 'rgba(255, 255, 0, 0.3)';
                minimapCtx.beginPath();
                minimapCtx.moveTo(player.x * scale, player.y * scale);
                const numRays = 4;
                const rayAngleStep = FOV / numRays;
                for (let i = 0; i <= numRays; i++) {
                    const rayAngle = player.angle - FOV / 2 + i * rayAngleStep;
                    const endX = player.x + Math.cos(rayAngle) * 4;
                    const endY = player.y + Math.sin(rayAngle) * 4;
                    minimapCtx.lineTo(endX * scale, endY * scale);
                }
                minimapCtx.closePath();
                minimapCtx.fill();
            }
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Start the game
        init();

    </script>
</body>
</html>