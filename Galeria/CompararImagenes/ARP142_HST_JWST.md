---
layout: topbar
---

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galaxias de interacción ARP 142</title>
    <style>
        .container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            overflow: hidden;
        }

        .image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            transform-origin: center center;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .controls {
            position: absolute;
            top: 88%;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            z-index: 3;
            background-color: rgba(255, 255, 255, 0.3);
        }

        .controls label {
            font-weight: bold;
            font-size: 10px;
        }

        .controls input[type="range"] {
            width: 50%;
        }

        #showValuesBtn {
            margin-top: 40px;
            margin-left: 40%;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #showValuesBtn:hover {
            background-color: #0056b3;
        }

        @media screen and (max-width: 500px) {
            .controls label {
                font-size: 5px;
            }

            .controls input[type="range"] {
                width: 45%;
            }

            .controls {
                top: 88%;
            }
        }

        .extra-controls {
            display: none;
        }

        .checkbox-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #007bff;
            cursor: pointer;
        }

        .info-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
        }

        .info-column {
            flex: 1;
            padding: 10px;
            border-right: 1px solid #ccc;
        }

        .info-column:last-child {
            border-right: none;
        }

        .info-column h2 {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .info-column p {
            font-size: 14px;
            margin: 5px 0;
        }

        @media screen and (max-width: 500px) {
            .info-container {
                flex-direction: column;
            }

            .info-column {
                border-right: none;
                margin-bottom: 10px;
                font-size: 10px;
            }
        }
    </style>
</head>
<body>

    <h2>La interacción de galaxias ARP 142, o "El Pinguino", usando el telescopio Hubble y JWST</h2>
    <div class="checkbox-container">
        <label for="modifyParams">Modificar Parámetros:</label>
        <input type="checkbox" id="modifyParams">
    </div>
    <div class="container">
        <div class="controls">
            <div>
                <div class="extra-controls">
                    <label for="scale1">Escala Imagen 1:</label>
                    <input type="range" id="scale1" min="0.5" max="2" step="0.05" value="1">
                    <br>
                    <label for="angle1">Ángulo Imagen 1:</label>
                    <input type="range" id="angle1" min="-90" max="90" step="0.5" value="19.5">
                    <br>
                    <label for="xpos1">Pos X Imagen 1:</label>
                    <input type="range" id="xpos1" min="-150" max="250" step="1" value="33">
                    <br>
                    <label for="ypos1">Pos Y Imagen 1:</label>
                    <input type="range" id="ypos1" min="-120" max="270" step="1" value="20">
                    <br>
                    <label for="opacity1">Opacidad Imagen 1:</label>
                    <input type="range" id="opacity1" min="0" max="1" step="0.1" value="1">
                    <br>
                </div>
            </div>
            <div>
                <div class="extra-controls">
                    <label for="scale2">Escala Imagen 2:</label>
                    <input type="range" id="scale2" min="0.5" max="4" step="0.05" value="1.55">
                    <br>
                    <label for="angle2">Ángulo Imagen 2:</label>
                    <input type="range" id="angle2" min="-90" max="90" step="0.5" value="3">
                    <br>
                    <label for="xpos2">Pos X Imagen 2:</label>
                    <input type="range" id="xpos2" min="-100" max="100" step="1" value="-27">
                    <br>
                    <label for="ypos2">Pos Y Imagen 2:</label>
                    <input type="range" id="ypos2" min="-100" max="100" step="1" value="60">
                    <br>
                </div>
                <div class="controls">
                    <label for="opacity2">Opacidad Imagen HST:</label>
                    <input type="range" id="opacity2" min="0" max="1" step="0.1" value="1">
                </div>
            </div>
        </div>
        <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/ARP142/ARP142.jpg" id="image1" class="image" alt="Imagen 1">
        <div class="image-container">
            <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg" id="image2" class="image" alt="Imagen 2">
        </div>
    </div>
    <button id="showValuesBtn">Mostrar Valores</button>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const image1 = document.getElementById('image1');
            const scaleSlider1 = document.getElementById('scale1');
            const angleSlider1 = document.getElementById('angle1');
            const opacitySlider1 = document.getElementById('opacity1');
            const xposSlider1 = document.getElementById('xpos1');
            const yposSlider1 = document.getElementById('ypos1');

            const image2 = document.getElementById('image2');
            const scaleSlider2 = document.getElementById('scale2');
            const angleSlider2 = document.getElementById('angle2');
            const opacitySlider2 = document.getElementById('opacity2');
            const xposSlider2 = document.getElementById('xpos2');
            const yposSlider2 = document.getElementById('ypos2');

            const modifyParamsCheckbox = document.getElementById('modifyParams');
            const extraControls = document.querySelectorAll('.extra-controls');

            function updateImageTransform(image, scaleSlider, angleSlider, opacitySlider, xposSlider, yposSlider) {
                const scale = scaleSlider.value;
                const angle = angleSlider.value;
                const opacity = opacitySlider.value;
                const xpos = xposSlider.value;
                const ypos = yposSlider.value;

                image.style.transform = `scale(${scale}) rotate(${angle}deg) translate(${xpos}px, ${ypos}px)`;
                image.style.opacity = opacity;
            }

            function initializeImages() {
                updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1);
                updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2);
            }

            window.addEventListener('resize', () => {
                // Evitar ejecutar initializeImages si no hay cambios significativos en el tamaño de la ventana
                const container = document.querySelector('.container');
                const currentWidth = container.offsetWidth;
                const currentHeight = container.offsetHeight;

                if (window.prevWidth !== currentWidth || window.prevHeight !== currentHeight) {
                    window.prevWidth = currentWidth;
                    window.prevHeight = currentHeight;
                    initializeImages();
                }
            });

            // Inicializar dimensiones previas
            window.prevWidth = document.querySelector('.container').offsetWidth;
            window.prevHeight = document.querySelector('.container').offsetHeight;

            modifyParamsCheckbox.addEventListener('change', () => {
                extraControls.forEach(control => {
                    control.style.display = modifyParamsCheckbox.checked ? 'block' : 'none';
                });
            });

            scaleSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            angleSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            opacitySlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            xposSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            yposSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));

            scaleSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            angleSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            opacitySlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            xposSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            yposSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));

            // Botón para mostrar valores actuales
            const showValuesBtn = document.getElementById('showValuesBtn');
            showValuesBtn.addEventListener('click', () => {
                console.log("Valores de la imagen 1:");
                console.log("Escala:", scaleSlider1.value);
                console.log("Ángulo:", angleSlider1.value);
                console.log("Opacidad:", opacitySlider1.value);
                console.log("Posición X:", xposSlider1.value);
                console.log("Posición Y:", yposSlider1.value);

                console.log("Valores de la imagen 2:");
                console.log("Escala:", scaleSlider2.value);
                console.log("Ángulo:", angleSlider2.value);
                console.log("Opacidad:", opacitySlider2.value);
                console.log("Posición X:", xposSlider2.value);
                console.log("Posición Y:", yposSlider2.value);
            });

            initializeImages();
        });
    </script>

    <div class="info-container">
        <div class="info-column">
            <h2>Información Técnica</h2>
            <p>Imagen de fondo: Telescopio James Webb (JWST)</p>
            <p><strong>Fecha de Observación:</strong> 2023</p>
            <p><strong>Instrumento:</strong>NIRcam</p>
            <p><strong>Filtros:</strong> f090w, f150w, f200w</p>
        </div>
        <div class="info-column">
            <h2>&nbsp;</h2>
            <p>Imagen superior: Telescopio Hubble (HST)</p>
            <p><strong>Fecha de Observación:</strong> 2013</p>
            <p><strong>Instrumento:</strong> ACS/WFC</p>
            <p><strong>Filtros:</strong> f475w, f606w, f814w</p>
        </div>
    </div>

</body>
</html>
