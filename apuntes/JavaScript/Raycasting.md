---
layout: topbar
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Raycasting</title>
    <style>
        body, html {
            background: black;
            color: white;
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            
        }
        .header {
            text-align: center;
            background: #222;
            color: white;
            width: 100%;
            padding: 10px;
        }
        canvas {
            display: block;
            margin: 0 auto;
            width: 120vh;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>3D Raycasting</h1>
        <p>Usa las flechas del teclado para moverte.</p>
    </div>
    <canvas id="gameCanvas"></canvas>
    <script>
        (function(doc) {
            var canvas = doc.getElementById('gameCanvas'),
                context = canvas.getContext("2d"),
                mapData = [
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
                    [1,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
                    [1,0,2,0,2,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
                    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
                    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
                    [1,0,0,0,1,0,1,1,0,1,1,1,0,1,1,0,1,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                ],
                screenCtx = canvas.getContext("2d"),
                player,
                map,
                options = {
                    scale: 4,
                    stripWidth: 5,
                    rayCount: 120,
                },
                colors = ["#aaa", "#red"],
                fov = 70 * Math.PI / 180,
                viewDistance,
                numRays;

            function adjustCanvasSize() {
                canvas.width = 600; // Ancho deseado en píxeles
                canvas.height = 400; // Alto deseado en píxeles

                // Opcional: Ajustar otros parámetros relacionados con el tamaño del juego
                options.screenWidth = canvas.width;
                options.screenHeight = canvas.height;
                viewDistance = (options.screenWidth/2) / Math.tan((fov/2));
                numRays = Math.ceil(options.screenWidth / options.stripWidth);
            }

            window.onload = function init() {
                map = new Map(mapData);
                player = new Player();

                adjustCanvasSize();
                window.addEventListener('resize', adjustCanvasSize);

                player.turnDirection = 1;
                setTimeout(function() {
                    player.turnDirection = 0;
                }, 1500);
                window.requestAnimationFrame(mainLoop);
            };

            function mainLoop() {
                screenCtx.clearRect(0, 0, canvas.width, canvas.height);
                player.update();
                raycaster.castAll();
                player.draw();
                map.draw(); // Dibujar el mapa después de los rayos y el jugador
                window.requestAnimationFrame(mainLoop);
            }

            doc.onkeydown = function(e) {
                e = e || window.event;

                switch (e.keyCode) {
                    case 38: player.speed = 1; break;
                    case 40: player.speed = -1; break;
                    case 37: player.turnDirection = -1; break;
                    case 39: player.turnDirection = 1; break;
                }
            }

            doc.onkeyup = function(e) {
                e = e || window.event;

                switch (e.keyCode) {
                    case 38:
                    case 40: player.speed = 0; break;

                    case 37:
                    case 39: player.turnDirection = 0; break;
                }
            }

            function Player() {
                this.position = [11.4, 1.4];
                this.turnDirection = 0;
                this.rotation = 0.73;
                this.speed = 0;
                this.moveSpeed = 0.05;
                this.rotationSpeed = 2 * Math.PI / 180;
            }

            Player.prototype = {
                update: function () {
                    var step = this.speed * this.moveSpeed,
                        x, y;

                    this.rotation += this.turnDirection * this.rotationSpeed;
                    this.rotation = normalizeAngle(this.rotation);

                    x = this.position[0] + (Math.cos(this.rotation) * step);
                    y = this.position[1] + (Math.sin(this.rotation) * step);

                    if (!map.isPassableAt(x, y)) {
                        return;
                    }

                    this.position[0] = x;
                    this.position[1] = y;
                },

                draw: function drawPlayer() {
                    context.fillStyle = "red";
                    context.beginPath();
                    context.arc(
                        this.position[0] * options.scale, this.position[1] * options.scale,
                        2, 0, Math.PI * 2
                    );
                    context.fill();
                }
            };

            function renderStrip(stripID, distance, angle) {
                var height = Math.round(viewDistance / distance),
                    topOffset = ((options.screenHeight - height) / 2),
                    leftOffset = stripID * options.stripWidth,
                    alpha = (0.5 / distance) * 6;

                screenCtx.fillStyle = "hsla(198, 90%, 90%," + alpha + ")";
                screenCtx.fillRect(
                    Math.round(leftOffset),
                    Math.round(topOffset),
                    Math.round(options.stripWidth),
                    Math.round(height)
                );
            }

            function Map(map) {
                this.map = map;
                this.height = map.length;
                this.width = map[0].length;
            }

            Map.prototype = {
                isPassableAt: function isPassableAt(x, y) {
                    return this.isInScope(x, y) && this.hasSpaceAt(x, y);
                },

                hasSpaceAt: function hasSpaceAt(x, y) {
                    return this.map[Math.floor(y)][Math.floor(x)] == 0;
                },

                isInScope: function(x, y) {
                    return !(x < 0 || y < 0 || y > this.height || x > this.width);
                },

                draw: function() {
                    // Cambiar el color de relleno del minimapa para mayor contraste
                    context.fillStyle = "rgba(0, 0, 0, 0.5)"; // Fondo del minimapa
                    context.fillRect(0, 0, map.width * options.scale, map.height * options.scale);

                    context.fillStyle = "hsla(0, 0%, 75%, 1)"; // Color de las paredes en el minimapa
                    for (var y = 0; y < this.map.length; y++) {
                        for (var x = 0; x < this.map[y].length; x++) {
                            if (this.map[y][x] > 0) {
                                context.fillRect(
                                    x * options.scale,
                                    y * options.scale,
                                    options.scale,
                                    options.scale
                                );
                            }
                        }
                    }
                }
            };

            var raycaster = {
                castAll: function() {
                    for (var i = 0; i < options.rayCount; i++) {
                        var rayPosition = (-options.rayCount / 2 + i) * options.stripWidth,
                            rayViewDist = pythagoras(rayPosition, viewDistance),
                            rayAngle = Math.asin(rayPosition / rayViewDist);

                        this.cast(player.rotation + rayAngle, i);
                    }
                },

                cast: function(_angle, stripID) {
                    var angle = normalizeAngle(_angle),
                        right = (angle > Math.PI * 1.5 || angle < Math.PI * 0.5),
                        up = (angle < 0 || angle > Math.PI),
                        angleSin = Math.sin(angle),
                        angleCos = Math.cos(angle),
                        distanceVertical = 0,
                        distanceHorizontal = 0,
                        distance,
                        hit = [0, 0];

                    var slope = angleSin / angleCos,
                        _x = right ? 1 : -1,
                        _y = _x * slope,
                        x = right ? Math.ceil(player.position[0]) : Math.floor(player.position[0]),
                        y = player.position[1] + (x - player.position[0]) * slope;

                    while (x >= 0 && x < map.width && y > 0 && y < map.height) {
                        if (!map.hasSpaceAt(x + (right ? 0 : -1), y)) {
                            distance = distanceVertical = pythagorasSquared(
                                x - player.position[0],
                                y - player.position[1]
                            );
                            hit = [x, y];
                            break;
                        }
                        x += _x;
                        y += _y;
                    }

                    slope = angleCos / angleSin;
                    _y = up ? -1 : 1;
                    _x = _y * slope;
                    y = up ? Math.floor(player.position[1]) : Math.ceil(player.position[1]);
                    x = player.position[0] + (y - player.position[1]) * slope;

                    while (x >= 0 && x < map.width && y >= 0 && y < map.height) {
                        if (!map.hasSpaceAt(x, y + (up ? -1 : 0))) {
                            distanceHorizontal = pythagorasSquared(
                                x - player.position[0],
                                y - player.position[1]
                            );

                            if (!distanceVertical || distanceHorizontal < distanceVertical) {
                                distance = distanceHorizontal;
                                hit = [x, y];
                            }
                            break;
                        }
                        x += _x;
                        y += _y;
                    }

                    if (distance) {
                        renderStrip(stripID, perpendicularDistance(
                            Math.sqrt(distance), player.rotation - angle
                        ));
                        this.draw(hit);
                    }
                },

                draw: function(ray) {
                    context.strokeStyle = "yellow";
                    context.lineWidth = 0.5;
                    context.beginPath();
                    context.moveTo(player.position[0] * options.scale, player.position[1] * options.scale);
                    context.lineTo(
                        ray[0] * options.scale,
                        ray[1] * options.scale
                    );
                    context.closePath();
                    context.stroke();
                }
            };

            function normalizeAngle(angle) {
                angle %= Math.PI * 2;
                if (angle < 0) angle += Math.PI * 2;
                return angle;
            }

            function perpendicularDistance(distance, angle) {
                return distance * Math.cos(angle);
            }

            function pythagorasSquared(a, b) {
                return (a * a) + (b * b);
            }

            function pythagoras(a, b) {
                return Math.sqrt(pythagorasSquared(a, b));
            }

            Math.TAU = Math.PI * 2;

            window.requestAnimationFrame = function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            }();
        }(document));
    </script>
</body>
</html>
