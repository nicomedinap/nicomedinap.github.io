---
layout: none
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería virtual astronómica</title>
    <!-- Configuración MathJax -->
    <script>
        window.MathJax = {
            tex: {inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']], processEscapes: true, packages: {'[+]': ['physics']}},
            options: {skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'], ignoreHtmlClass: 'tex2jax_ignore', processHtmlClass: 'tex2jax_process'},
            loader: {load: ['[tex]/physics']},
            startup: {
                ready: () => {
                    MathJax.startup.defaultReady();
                    if (window.mathJaxQueue && window.mathJaxQueue.length > 0) {
                        MathJax.typesetPromise(window.mathJaxQueue);
                        window.mathJaxQueue = [];
                    }
                }
            }
        };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <style>
        html, body { margin: 0; padding: 0; overflow: hidden; font-family: Arial, sans-serif; }
        canvas { display: block; }
        #mapSelect { position: absolute; top: 10px; left: 10px; padding: 5px 10px; background: rgba(0,0,0,0.5); color: white; }
        #minimap { position: absolute; top: 80px; left: 20%; transform: translateX(-50%); background: rgba(0,0,0,0.5); z-index: 100; }
        .control-button { position: absolute; width: 70px; height: 70px; background: rgba(255,255,255,0.5); border: none; border-radius: 30px; font-size: 22px; text-align: center; line-height: 54px; user-select: none; }
        #upButton { bottom: 80px; right: 10px; }
        #downButton { bottom: 10px; right: 10px; }
        #leftButton { bottom: 45px; left: 10px; }
        #rightButton { bottom: 45px; left: 80px; }
        #wallInfo {
            position: absolute; bottom: 150px; left: 50%; transform: translateX(-50%);
            background: rgba(0, 20, 30, 0.85); color: #0ff; padding: 13px 21px; border-radius: 8px;
            display: none; max-width: 80%; text-align: left; transition: opacity 0.25s; z-index: 100;
            border: 1px solid rgba(0, 255, 255, 0.3); box-shadow: 0 0 15px rgba(0,255,255,0.17);
            font-family: 'Courier New', monospace; min-width: 220px;
        }
        @media (max-width: 768px) {
            #wallInfo { bottom: 180px; max-width: 90%; }
        }
        @media (max-width: 480px) {
            #wallInfo { bottom: 200px; font-size: .9em; }
            .control-button { width: 64px; height: 64px; font-size: 18px; line-height: 44px; }
            #minimap {left: 25vw;}
        }
        #wallTitle {
            margin: 0 0 8px 0; color: #0ff; font-size: 17px; text-transform: uppercase;
            letter-spacing: 1px; border-bottom: 1px solid rgba(0, 255, 255, 0.3); padding-bottom: 6px;
        }
        #wallDescription {
            margin: 8px 0 0 0; color: #ccc; font-size: 14px; line-height: 1.36;
        }
        .MathJax {
            font-size: 0.95em !important; color: #0ff !important;
            background: rgba(0, 50, 70, 0.3); padding: 1.5px 4px; border-radius: 3px; display: inline-block !important;
        }
        #toggleLensesBtn { position: absolute; top: 10px; right: 10px; z-index:110; padding: 7px 18px; border-radius: 6px; background: #222; color: #fff; border: none; font-size: 12px; cursor: pointer; }
        #lensControls { position: absolute; top: 40px; right: 10px; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px; color: white; width: 130px; display: none; }
        #lensControls h3 { margin-top: 0; margin-bottom: 10px; }
        #lensControls label { display: block; margin: 5px 0; font-size: 14px; }
        #lensControls input { width: 100%; }
        #textureActionsContainer {
            position: absolute; left: 50%; bottom: 60px; transform: translateX(-50%);
            z-index: 120; display: none; background: rgba(0, 20, 30, 0.93); border-radius: 10px;
            padding: 10px 20px; box-shadow: 0 0 16px 0 rgba(0,255,255,0.13); border: 1px solid rgba(0,255,255,0.19);
        }
        .texture-action-btn {
            margin: 5px 10px 5px 0; padding: 7px 14px; border-radius: 6px; border: 1px solid #0ff;
            background: #012b36; color: #0ff; font-weight: bold; font-size: 14px; cursor: pointer;
            transition: background .2s, color .2s;
        }
        .texture-action-btn:hover { background: #0ff; color: #012b36; }
        @media (max-width: 768px) {
            #textureActionsContainer { bottom: 85px; padding: 7px 8px; }
            .texture-action-btn { font-size: 12px; padding: 5px 8px; }
        }
        #enrichedAppModal { position:fixed;top:0;left:0;width:100vw;height:100vh;display:none;z-index:9999;background:rgba(0,0,0,0.95);align-items:center;justify-content:center; }
        #enrichedAppModal iframe { width:90vw; height:90vh; border:none; border-radius:12px; box-shadow:0 0 20px #000; background:#111;}
        #enrichedAppModal button.close-modal {position:absolute;top:15px;right:25px;z-index:10001;font-size:2em;color:#fff;background:none;border:none;cursor:pointer;}
    </style>
</head>
<body>
    <select id="mapSelect">
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo_recursivo.js">Mapa genérico</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/CalleLarga.js">Mapa 1</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Mapa.js">Mapa 2</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Laberinto_Largo.js">Laberinto</option>
        <option value="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/Galeria/SalaHubble.js">Sala Hubble</option>
    </select>
    <canvas id="gameCanvas"></canvas>
    <div id="minimap"><canvas id="minimapCanvas"></canvas></div>
    <button id="upButton" class="control-button">↑</button>
    <button id="downButton" class="control-button">↓</button>
    <button id="leftButton" class="control-button">←</button>
    <button id="rightButton" class="control-button">→</button>
    <div id="wallInfo">
        <h3 id="wallTitle"></h3>
        <p id="wallDescription" class="tex2jax_process"></p>
    </div>
    <div id="textureActionsContainer">
        <button class="texture-action-btn" id="btnAbrirApp">Abrir App</button>
        <button class="texture-action-btn" id="btnVerInfo">Ver info</button>
        <button class="texture-action-btn" id="btnCerrarAcciones">Cerrar</button>
    </div>
    <div id="lensControls">
        <h3>Lente gravitatoria</h3>
        <p id="lensLabel" style="font-size:13px;margin-bottom:4px;"></p>
        <label>Distorsión: <input type="range" id="lensStrength" min="0." max="0.1" step="0.001" value="0.01"></label>
        <label>Radio: <input type="range" id="lensRadius" min="0.3" max="15" step="0.01" value="1."></label>
    </div>
    <button id="toggleLensesBtn">Desactivar lentes</button>
    <div id="enrichedAppModal">
        <button onclick="closeAppModal()" class="close-modal">×</button>
        <iframe id="enrichedAppIframe" src="" allowfullscreen></iframe>
    </div>
    <script>
        window.mathJaxQueue = [];
        function renderLaTeX(element, content) {
            element.innerHTML = content;
            if (typeof MathJax !== 'undefined' && MathJax.typeset) MathJax.typesetPromise([element]).catch(()=>{});
            else window.mathJaxQueue.push(element);
        }
        
        // --- DETECCIÓN DE MÓVIL ---
        const IS_MOBILE = /Mobi|Android/i.test(navigator.userAgent);

        // --- OPTIMIZACIONES PARA HARDWARE BAJO ---
        const MOVEMENT_SPEED = 0.055, 
        ROTATION_SPEED = 0.022, 
        FOV = Math.PI/2,
        MAX_TEXTURE_SIZE = 768, 
        MINIMAP_MAX_SIZE = 190, 
        WALL_INFO_DISTANCE = 1.5, 
        MAX_DISTANCE_TO_TEXTURE = 35, 
        WALL_MARGIN = 0.85, 
        // RENDER_SCALE menor en móvil para menos píxeles procesados
        RENDER_SCALE = IS_MOBILE ? 0.8 : 1, 
        TARGET_FPS = IS_MOBILE ? 20 : 25, 
        STEPSIZE = IS_MOBILE ? 0.095: 0.05;


        // DOM Elements
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d', { alpha: false });
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
        const toggleLensesBtn = document.getElementById('toggleLensesBtn');
        const textureActionsContainer = document.getElementById('textureActionsContainer');
        const btnAbrirApp = document.getElementById('btnAbrirApp');
        const btnVerInfo = document.getElementById('btnVerInfo');
        const btnCerrarAcciones = document.getElementById('btnCerrarAcciones');
        const enrichedAppModal = document.getElementById('enrichedAppModal');
        const enrichedAppIframe = document.getElementById('enrichedAppIframe');
        // RENDER CANVAS INTERNO
        let renderCanvas = document.createElement('canvas');
        let renderCtx = renderCanvas.getContext('2d', { alpha: false });
        renderCtx.imageSmoothingEnabled = false;
        // Game State
        const player = { x: 2, y: 2, angle: 70, speed: 0, turnSpeed: 0 };
        const textures = {};
        const wallInfoData = {};
        let map = [], skyTexture = null, floorTexture = null, lenses = [], customRoomTextures = null, customSkyTexture = null, customFloorTexture = null, sprites = [];
        let currentLensIndex = -1, lensesActive = true;
        let lastLookedTexture = null, lookStartTime = null, currentlyPointedWallType = null;
        const LOOK_INTEREST_THRESHOLD = 2500;
        const textureAppUrls = {
            "NGC3324": "https://nicomedinap.github.io/decosmos/Tarantula/JWST/02Septiembre2024/Tarantula.html"
        };
        function openAppModal(appUrl) {
            enrichedAppIframe.src = appUrl;
            enrichedAppModal.style.display = 'flex';
        }
        function closeAppModal() {
            enrichedAppModal.style.display = 'none';
            enrichedAppIframe.src = '';
        }
        btnAbrirApp.onclick = () => {
            let url = null;
            if (currentlyPointedWallType) {
                const textureInfo = customRoomTextures?.[currentlyPointedWallType];
                url = textureInfo?.actions?.appUrl || textureAppUrls[currentlyPointedWallType] || "https://nicomedinap.github.io/decosmos/Tarantula/JWST/02Septiembre2024/Tarantula.html";
            }
            if (url) openAppModal(url);
            hideTextureActions();
        };
        btnVerInfo.onclick = () => {
            if (currentlyPointedWallType && wallInfoData[currentlyPointedWallType]) {
                const textureInfo = customRoomTextures?.[currentlyPointedWallType];
                const url = textureInfo?.actions?.infoUrl;
                if (url) window.open(url, "_blank");
                else { wallInfo.style.display = 'block'; wallInfo.style.opacity = 1; }
            }
            hideTextureActions();
        };
        btnCerrarAcciones.onclick = hideTextureActions;
        function showTextureActions(wallType) {
            currentlyPointedWallType = wallType;
            textureActionsContainer.style.display = "block";
        }
        function hideTextureActions() {
            textureActionsContainer.style.display = "none";
            currentlyPointedWallType = null;
        }
        // BAJA FRECUENCIA DE ACTUALIZACION ---
        let lastDrawTime = 0;
        function updateLensesButton() {
            toggleLensesBtn.textContent = lensesActive ? "Desactivar lentes" : "Activar lentes";
        }
        toggleLensesBtn.onclick = ()=>{
            lensesActive = !lensesActive;
            for (const lens of lenses) lens.visible = lensesActive;
            for (const sprite of sprites) { if (sprite.type === 'lens') sprite.visible = lensesActive; }
            updateLensesButton();
        };
        function lensNearPlayer(threshold = 2.5) {
            let closest = -1, minD = 99;
            for (let i = 0; i < lenses.length; i++) {
                const dx = player.x - lenses[i].x, dy = player.y - lenses[i].y, d = Math.sqrt(dx*dx + dy*dy);
                if (d < threshold && d < minD) { closest = i; minD = d; }
            }
            return closest;
        }
        function updateRaycastingParams() {
            if (!map || !map.length) return;
            const maxMapDist = Math.sqrt(map[0].length ** 2 + map.length ** 2);
            MAX_ITERATIONS = Math.ceil(maxMapDist / STEPSIZE) + 2;
        }
        async function loadSprites() {
            for (const s of sprites) s.img = await loadImage(s.imageUrl);
        }
        async function init() {
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);
            detectMobileAndLockOrientation();
            setupEventListeners();
            await loadMap(mapSelect.value);
            await loadTexturesAndStart();
            await loadSprites();
            gameLoop();
        }
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderCanvas.width = Math.floor(canvas.width * RENDER_SCALE);
            renderCanvas.height = Math.floor(canvas.height * RENDER_SCALE);
        }
        function detectMobileAndLockOrientation() {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                if (screen.orientation && screen.orientation.lock)
                    screen.orientation.lock('landscape').catch(()=>{});
            }
        }
        async function loadTexturesAndStart() {
            try {
                let textureDatabase = null;
                if (!customRoomTextures || !customSkyTexture || !customFloorTexture) {
                    const textureResponse = await fetch('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/interactive_textures.json');
                    textureDatabase = await textureResponse.json();
                }
                const roomTextures = customRoomTextures || (textureDatabase && textureDatabase.roomTextures) || {};
                const skyTextureUrl = customSkyTexture || (textureDatabase && textureDatabase.skyTexture);
                const floorTextureUrl = customFloorTexture || (textureDatabase && textureDatabase.floorTexture);
                Object.entries(roomTextures).forEach(([key, texture]) => {
                    wallInfoData[key] = {
                        title: texture.title,
                        description: texture.description || "",
                        composition: texture.composition || "$\\text{COMPOSICIÓN DESCONOCIDA}$",
                        density: texture.density || "$\\rho = \\text{?}$",
                        reflectivity: texture.reflectivity || "$R = \\frac{I_r}{I_i}$"
                    };
                });
                await Promise.all([
                    loadSkyAndFloor(skyTextureUrl, floorTextureUrl),
                    loadRoomTextures(roomTextures)
                ]);
            } catch (error) {
                console.error('Initialization error:', error);
            }
        }
        async function loadSkyAndFloor(skyUrl, floorUrl) {
            if (skyUrl) skyTexture = await loadImage(skyUrl);
            if (floorUrl) floorTexture = await loadImage(floorUrl);
        }
        async function loadRoomTextures(textureData) {
            const promises = Object.entries(textureData).map(async ([key, texture]) => {
                if (texture.url) {
                    const img = await loadImage(texture.url);
                    if (img.width > MAX_TEXTURE_SIZE || img.height > MAX_TEXTURE_SIZE) {
                        const scale = Math.min(MAX_TEXTURE_SIZE / img.width, MAX_TEXTURE_SIZE / img.height, 1);
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = Math.floor(img.width * scale);
                        tempCanvas.height = Math.floor(img.height * scale);
                        const tempCtx = tempCanvas.getContext('2d');
                        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                        textures[key] = createMipmaps(tempCanvas);
                    } else {
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
            let width = image.width / 2, height = image.height / 2, mipCount = 0;
            while (width >= 1 && height >= 1 && mipCount < 1) {
                const canvas = document.createElement('canvas');
                canvas.width = Math.floor(width);
                canvas.height = Math.floor(height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);
                mipmaps.push(canvas);
                width /= 2;
                height /= 2;
                mipCount++;
            }
            return mipmaps;
        }
        function updateLensControlsVisibility() {
            document.getElementById('lensControls').style.display = "none";
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
                await loadTexturesAndStart();
                await loadSprites();
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
                customRoomTextures = null;
                customSkyTexture = null;
                customFloorTexture = null;
                const response = await fetch(mapUrl);
                if (!response.ok) throw new Error('Error al cargar el mapa');
                const script = await response.text();
                window.eval(script);
                if (typeof mapData === "undefined") throw new Error('mapData no está definido');
                map = mapData.map;
                lenses = (mapData.lenses || []).map(l => ({ ...l, visible: lensesActive }));
                if (mapData.roomTextures) customRoomTextures = mapData.roomTextures;
                if (mapData.skyTexture) customSkyTexture = mapData.skyTexture;
                if (mapData.floorTexture) customFloorTexture = mapData.floorTexture;
                sprites = [];
                if (Array.isArray(mapData.sprites)) sprites = mapData.sprites.map(s => ({...s, visible: true}));
                updateLensControlsVisibility();
                updateRaycastingParams();
                updateLensesButton();
            } catch (error) { console.error('Error al cargar el mapa:', error); }
        }
        function resetPlayerPosition() {
            player.x = 1.5; player.y = 1.5; player.angle = 1; player.speed = 0; player.turnSpeed = 0;
        }
        let hudUpdateSkip = 0;
        function update() {
            player.angle += player.turnSpeed;
            const moveStep = player.speed;
            let newX = player.x + Math.cos(player.angle) * moveStep;
            let newY = player.y + Math.sin(player.angle) * moveStep;
            if (isValidMove(newX, player.y)) player.x = newX;
            if (isValidMove(player.x, newY)) player.y = newY;
            if (++hudUpdateSkip % 17 === 0) {
                checkNearbyWalls();
                const idx = lensNearPlayer();
                const lensControls = document.getElementById('lensControls');
                if (idx !== -1) {
                    currentLensIndex = idx;
                    lensStrengthInput.value = lenses[idx].strength;
                    lensRadiusInput.value = lenses[idx].radius;
                    lensLabel.textContent =
                        `Editando lente #${idx + 1}\nRadio: ${lenses[idx].radius.toFixed(2)} | Distorsión: ${lenses[idx].strength.toFixed(3)}`;
                    lensControls.style.display = "block";
                } else {
                    lensControls.style.display = "none";
                    currentLensIndex = -1;
                }
            }
        }
        function isValidMove(x, y) {
            if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) return false;
            for (let offsetY = -1; offsetY <= 1; offsetY++)
                for (let offsetX = -1; offsetX <= 1; offsetX++) {
                    const nx = Math.floor(x) + offsetX, ny = Math.floor(y) + offsetY;
                    if (ny >= 0 && ny < map.length && nx >= 0 && nx < map[0].length) {
                        const cell = map[ny][nx];
                        if (cell !== 0) {
                            const dist = Math.sqrt(Math.pow(nx + 0.5 - x, 2) + Math.pow(ny + 0.5 - y, 2));
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
            let playerViewDir = { x: Math.cos(player.angle), y: Math.sin(player.angle) }, bestAlignment = -1, bestWall = null;
            for (const dir of directions) {
                const checkX = Math.floor(player.x + dir.x), checkY = Math.floor(player.y + dir.y);
                if (checkY >= 0 && checkY < map.length && checkX >= 0 && checkX < map[0].length) {
                    const wallType = map[checkY][checkX];
                    if (wallType !== 0 && wallInfoData[wallType] && textures[wallType]) {
                        const wallVec = { x: checkX + 0.5 - player.x, y: checkY + 0.5 - player.y };
                        const wallDist = Math.sqrt(wallVec.x * wallVec.x + wallVec.y * wallVec.y);
                        const alignment = (wallVec.x * playerViewDir.x + wallVec.y * playerViewDir.y) / (wallDist || 1);
                        if (wallDist < WALL_INFO_DISTANCE && alignment > 0.8 && alignment > bestAlignment) {
                            bestAlignment = alignment;
                            bestWall = wallType;
                        }
                    }
                }
            }
            if (bestWall) {
                const info = wallInfoData[bestWall];
                wallTitle.textContent = info.title;
                renderLaTeX(wallDescription, info.description || "");
                wallInfo.style.display = 'block';
                wallInfo.style.opacity = 1;
                if (lastLookedTexture === bestWall) {
                    if (lookStartTime && performance.now() - lookStartTime > LOOK_INTEREST_THRESHOLD) {
                        if (textureActionsContainer.style.display !== "block") showTextureActions(bestWall);
                    }
                } else {
                    lastLookedTexture = bestWall;
                    lookStartTime = performance.now();
                    hideTextureActions();
                }
            } else {
                wallInfo.style.opacity = 0;
                setTimeout(() => { if (wallInfo.style.opacity === '0') wallInfo.style.display = 'none'; }, 250);
                lastLookedTexture = null; lookStartTime = null; hideTextureActions();
            }
        }
        function castRay(angle) {
            let x = player.x, y = player.y, 
            stepSize = STEPSIZE, 
            maxIterations = MAX_ITERATIONS, 
            iterations = 0, 
            magnification = 1.0;
            while (iterations++ < maxIterations) {
                for (const lens of lenses) {
                    if (!lens.visible) continue;
                    const dx = x - lens.x, dy = y - lens.y, 
                    distToLens = Math.sqrt(dx*dx + dy*dy);
                    if (distToLens < lens.radius) magnification *= (1 + lens.strength * (1 - (distToLens/lens.radius)));
                }
                applyLensEffects();
                x += Math.cos(angle) * stepSize; 
                y += Math.sin(angle) * stepSize;
                const mapX = Math.floor(x), mapY = Math.floor(y);
                if (mapX < 0 || mapY < 0 || mapY >= map.length || mapX >= map[0].length) break;
                if (map[mapY][mapX] !== 0 && map[mapY][mapX] !== 'L') {
                    const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
                    const hitData = calculateHitData(x, y, mapX, mapY, angle);
                    return { dist, texture: textures[map[mapY][mapX]], ...hitData, magnification };
                }
            }
            return { dist: Infinity, texture: null, hitOffset: 0, mapX: -1, mapY: -1, magnification };
            
            function applyLensEffects() {
                for (const lens of lenses) {
                    if (!lens.visible) continue;
                    const dx = x - lens.x, dy = y - lens.y, distToLens = Math.sqrt(dx*dx + dy*dy);
                    if (distToLens < lens.radius) {
                        const epsilon = 0.0001, 
                        safeDist = Math.max(distToLens, epsilon), 
                        normalizedDist = safeDist / lens.radius;
                        const bendFactor = lens.strength * (1 - normalizedDist);
                        const angleToLens = Math.atan2(dy, dx);
                        const newAngle = angle + bendFactor * Math.sin(angle - angleToLens);
                        if (Math.abs(newAngle - angle) > 0.0001) {
                            sin = Math.sin(newAngle); cos = Math.cos(newAngle); angle = newAngle;
                        }
                    }
                }
            }
            function calculateHitData(x, y, mapX, mapY, originalAngle) {
                const deltaX = x - mapX, deltaY = y - mapY;
                let hitOffset, isVerticalWall;
                if (Math.abs(deltaX - 0.5) > Math.abs(deltaY - 0.5)) {
                    isVerticalWall = true; hitOffset = y - mapY; if (Math.cos(originalAngle) < 0) hitOffset = 1 - hitOffset;
                } else {
                    isVerticalWall = false; hitOffset = x - mapX; if (Math.sin(originalAngle) < 0) hitOffset = 1 - hitOffset;
                }
                hitOffset = (hitOffset < 0) ? hitOffset + 1 : (hitOffset > 1) ? hitOffset - 1 : hitOffset;
                return { hitOffset, mapX, mapY, isVerticalWall };
            }
        }
        
        function draw() {
            renderCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);
            drawSkyAndFloor(renderCtx, renderCanvas);
            drawWalls(renderCtx, renderCanvas);
            drawSprites(renderCtx, renderCanvas);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(renderCanvas, 0, 0, canvas.width, canvas.height);
            drawMinimap();
        }
        function drawSkyAndFloor(ctxToUse, canvasToUse) {
            if (skyTexture) drawTiledTexture(ctxToUse, skyTexture, player.angle * 0.1, 0, canvasToUse.height / 2, canvasToUse.width);
            if (floorTexture) drawTiledTexture(ctxToUse, floorTexture, player.angle * 0.3, canvasToUse.height / 2, canvasToUse.height / 2, canvasToUse.width);
        }
        function drawTiledTexture(ctxToUse, texture, angleOffset, yPos, height, outWidth) {
            const width = texture.width, offset = ((angleOffset + 8 * Math.PI) / (2 * Math.PI)) * width % width;
            ctxToUse.drawImage(texture, offset, 0, width - offset, texture.height, 0, yPos, outWidth, height);
            if (offset > 0) {
                ctxToUse.drawImage(texture, 0, 0, offset, texture.height, outWidth - (offset / width) * outWidth, yPos, (offset / width) * outWidth, height);
            }
        }
        function drawWalls(ctxToUse, canvasToUse) {
            // usamos el numero de lentes en el mapa para controlar el numero de rayos  
            const RAYS_PER_PIXEL = lenses.length > 2 ? 0.32 : 0.8;
            if (IS_MOBILE) { const RAYS_PER_PIXEL = lenses.length > 2 ? 0.22 : 0.32;}
            
            numRays = Math.floor(canvasToUse.width * RAYS_PER_PIXEL), 
            rayAngleStep = FOV / numRays, 
            pixelPerRay = canvasToUse.width / numRays, 
            maxWallHeight = canvasToUse.height * 2;
            
            for (let i = 0; i < numRays; i++) {
                const rayAngle = player.angle - FOV / 2 + i * rayAngleStep;
                const { dist, texture, hitOffset, magnification } = castRay(rayAngle);
                if (dist <= MAX_DISTANCE_TO_TEXTURE) {
                    let lineHeight = Math.min(canvasToUse.height / dist, maxWallHeight);
                    lineHeight *= magnification || 1.0;
                    const lineOffset = (canvasToUse.height - lineHeight) / 2;
                    if (texture) {
                        let mipLevel = 0, targetHeight = Math.abs(lineHeight);
                        while (mipLevel + 1 < texture.length && texture[mipLevel].height > targetHeight * 1.5) mipLevel++;
                        const textureX = Math.floor(hitOffset * texture[mipLevel].width);
                        const x = Math.round(i * pixelPerRay), w = Math.ceil(pixelPerRay);
                        ctxToUse.drawImage(texture[mipLevel], textureX, 0, 1, texture[mipLevel].height, x, lineOffset, w, lineHeight);
                    } else {
                        const x = Math.round(i * pixelPerRay), w = Math.ceil(pixelPerRay);
                        ctxToUse.fillStyle = 'black'; ctxToUse.fillRect(x, lineOffset, w, lineHeight);
                    }
                }
            }
        }
        function drawSprites(ctxOut, canvasOut) {
            for (const s of sprites) {
                if (!s.img || !s.visible) continue;
                const dx = s.x - player.x, dy = s.y - player.y, dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 0.2 || dist > 30) continue;
                let spriteAngle = Math.atan2(dy, dx) - player.angle;
                while (spriteAngle < -Math.PI) spriteAngle += 2 * Math.PI;
                while (spriteAngle > Math.PI) spriteAngle -= 2 * Math.PI;
                if (Math.abs(spriteAngle) < FOV / 2 + 0.2) {
                    const screenX = canvasOut.width / 2 + Math.tan(spriteAngle) * (canvasOut.width / 2) / Math.tan(FOV/2);
                    const spriteSize = Math.min(canvasOut.height / dist, canvasOut.height * 0.45);
                    const yBase = (canvasOut.height - spriteSize) / 2;
                    const imgWidth = s.img.width, imgHeight = s.img.height;
                    let opacity = 1.0;
                    const fadeStartDistance = 1.5, fadeEndDistance = 0.5;
                    if (dist < fadeStartDistance) {
                        opacity = (dist - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
                        opacity = Math.max(0, Math.min(1, opacity));
                    }
                    for (let i = 0; i < spriteSize; i++) {
                        const colScreenX = screenX - spriteSize / 2 + i;
                        const relAngle = Math.atan2(i - spriteSize / 2, canvasOut.width / (2 * Math.tan(FOV / 2)));
                        const rayAngle = player.angle + spriteAngle + relAngle * 0.9;
                        const spriteDistAtCol = dist;
                        const ray = castRay(rayAngle);
                        if (ray.dist < spriteDistAtCol - 0.05) continue;
                        const spriteCol = Math.floor(i * imgWidth / spriteSize);
                        ctxOut.save();
                        ctxOut.globalAlpha = opacity * 0.98;
                        ctxOut.drawImage(s.img, spriteCol, 0, 1, imgHeight, colScreenX, yBase, 1, spriteSize);
                        ctxOut.restore();
                    }
                }
            }
        }
        function drawMinimap() {
            if (!map.length) return;
            const mapWidth = map[0].length, mapHeight = map.length, scale = Math.min(MINIMAP_MAX_SIZE / mapWidth, MINIMAP_MAX_SIZE / mapHeight);
            minimapCanvas.width = mapWidth * scale;
            minimapCanvas.height = mapHeight * scale;
            minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
            for (let y = 0; y < map.length; y++)
                for (let x = 0; x < map[y].length; x++)
                    if (map[y][x] !== 0) minimapCtx.fillStyle = 'white', minimapCtx.fillRect(x * scale, y * scale, scale, scale);
            for (const lens of lenses) {
                if (lens.visible) {
                    minimapCtx.fillStyle = 'rgba(100, 100, 255, 0.3)';
                    minimapCtx.beginPath();
                    minimapCtx.arc(lens.x * scale, lens.y * scale, lens.radius * scale, 0, Math.PI * 2);
                    minimapCtx.fill();
                }
            }
            minimapCtx.fillStyle = 'red';
            minimapCtx.fillRect(player.x * scale - scale / 2, player.y * scale - scale / 2, scale, scale);
            minimapCtx.fillStyle = 'rgba(255, 255, 0, 0.4)';
            minimapCtx.beginPath();
            minimapCtx.moveTo(player.x * scale, player.y * scale);
            const numRays = 4, rayAngleStep = FOV / numRays;
            for (let i = 0; i <= numRays; i++) {
                const rayAngle = player.angle - FOV / 2 + i * rayAngleStep;
                const endX = player.x + Math.cos(rayAngle) * 4, endY = player.y + Math.sin(rayAngle) * 4;
                minimapCtx.lineTo(endX * scale, endY * scale);
            }
            minimapCtx.closePath(); minimapCtx.fill();
            for (const s of sprites) {
                if (!s.visible) continue;
                minimapCtx.save();
                minimapCtx.fillStyle = "#0ff";
                minimapCtx.beginPath();
                minimapCtx.arc(s.x * scale, s.y * scale, scale * 0.45, 0, Math.PI * 2);
                minimapCtx.fill();
                minimapCtx.restore();
            }
        }
        function gameLoop(now) {
            update();
            if (!lastDrawTime || now - lastDrawTime > 1000 / TARGET_FPS) {
                draw();
                lastDrawTime = now || 0;
            }
            requestAnimationFrame(gameLoop);
        }
        init();
    </script>
</body>
</html>