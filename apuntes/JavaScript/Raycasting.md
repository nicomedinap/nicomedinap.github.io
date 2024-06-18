<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raycasting Game</title>
    <style>
        @import "compass/css3";

        body, html {
            background: black;
            text-align: center;
            color: white;
            font-family: sans-serif;
        }
        h1 {
            margin-bottom: 0;
        }
        p {
            color: #444;
            font-size: 10pt;
            margin-top: 0;
            margin-bottom: 10px;
        }

        canvas {
            margin: 10px auto;
            display: block;
        }
    </style>
</head>
<body>
    <h1>Raycasting Game</h1>
    <p>Use the arrow keys to move around.</p>
    <script>
        (function(doc) {
            var canvas = document.createElement('canvas'),
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
                context = canvas.getContext("2d"),
                screenStrips = [],
                screen = doc.createElement("canvas"),
                screenCtx = screen.getContext("2d"),
                player,
                map,
                options = {
                    scale: 16,
                    screenWidth: 620,
                    screenHeight: 1200,
                    stripWidth: 3,
                    rayCount: 120,
                },
                colors = ["#aaa", "#red"],
                fov = 70 * Math.PI / 180,
                numRays = Math.ceil(options.screenWidth / options.stripWidth),
                viewDistance = (options.screenWidth / 2) / Math.tan((fov / 2));

            // Initialize
            window.onload = function init() {
                map = new Map(mapData);
                player = new Player();

                canvas.width = map.width * options.scale;
                canvas.height = map.height * options.scale;

                // setup screen
                screen.id = "screen";
                screen.width = options.screenWidth;
                screen.height = options.screenHeight;

                doc.body.appendChild(screen);

                player.turnDirection = 1;
                setTimeout(function() {
                    player.turnDirection = 0;
                }, 1500);
                window.requestAnimFrame(mainLoop);
            };

            function mainLoop() {
                context.fillStyle = "black";
                context.clearRect(0, 0, canvas.width, canvas.height);
                screenCtx.clearRect(0, 0, screen.width, screen.height);
                player.update();
                map.draw();
                player.draw();
                raycaster.castAll();

                window.requestAnimFrame(mainLoop);
            }

            // Keybindings
            doc.onkeydown = function(e) {
                e = e || window.event;

                switch (e.keyCode) { // which key was pressed?
                    case 38: player.speed = 1; break; // up
                    case 40: player.speed = -1; break; // down
                    case 37: player.turnDirection = -1; break; // left
                    case 39: player.turnDirection = 1; break; // right
                }
            }

            doc.onkeyup = function(e) {
                e = e || window.event;

                switch (e.keyCode) {
                    case 38: // fall through
                    case 40: player.speed = 0; break;

                    case 37: // fall through
                    case 39: player.turnDirection = 0; break;
                }
            }

            // Player
            function Player() {
                this.position = [11.4, 1.4];
                this.turnDirection = 0;
                this.rotation = 0.73;
                this.speed = 0;
                this.moveSpeed = 0.05;
                this.rotationSpeed = 2 * Math.TAU / 180;
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
                        // not passable
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
                        2, 0, Math.TAU
                    );
                    context.fill();
                }
            };

            function renderStrip(stripID, distance, angle) {
                var height = Math.round(viewDistance / distance),
                    topOffset = ((options.screenHeight - height) / 2),
                    leftOffset = stripID * options.stripWidth,
                    alpha = (0.5 / distance) * 6;

                screenCtx.fillStyle = "hsla(198, 50%, 50%," + alpha + ")";
                screenCtx.fillRect(
                    fround(leftOffset),
                    fround(topOffset),
                    fround(options.stripWidth),
                    fround(height)
                );
            }

            // Map
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
                    context.fillStyle = "hsla(0, 0%, 5%, 1)";

                    for (var y = 0; y < this.height; y++) {
                        for (var x = 0; x < this.width; x++) {
                            if (this.map[y][x] != 0) {
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

            // raycaster
            raycaster = {
                castAll: function castAll() {
                    var strip = 0;
                    for (var i = 0; i < options.rayCount; i++) {
                        var rayPosition = (-options.rayCount / 2 + i) * options.stripWidth,
                            rayViewDist = pythagoras(rayPosition, viewDistance),
                            rayAngle = Math.asin(rayPosition / rayViewDist);

                        this.cast(player.rotation + rayAngle, i);
                    }
                },

                cast: function(_angle, stripID) {
                    var angle = normalizeAngle(_angle),
                        right = (angle > Math.TAU * 0.75 || angle < Math.TAU * 0.25),
                        up = (angle < 0 || angle > Math.PI),
                        angleSin = Math.sin(angle),
                        angleCos = Math.cos(angle),
                        distanceVertical = 0,
                        distanceHorizontal = 0,
                        distance,
                        hit = [0, 0],
                        texture = [0, 0],
                        wall = [0, 0];

                    // check vertical walls
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

                    // check horizontal walls
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
                        ), texture[0]);
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

            // convenience methods
            function fround(v) { return (0.5 + v) | 0; }
            function normalizeAngle(angle) {
                angle %= Math.TAU;
                if (angle < 0) angle += Math.TAU;
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
            window.requestAnimFrame = function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(a) {
                        window.setTimeout(a, 1E3 / 60);
                    }
            }();
        }(document));
    </script>
</body>
</html>
