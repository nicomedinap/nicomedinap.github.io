<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nebulosa de la tarántula, usando el VISTA y el JWST</title>
    <style>
        .container {
            position: relative;
            width: 100%;
            max-width: 800px; /* Limitar el ancho máximo para que se vea bien en diferentes pantallas */
            margin: 0 auto; /* Centrar el contenedor */
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
            object-fit: cover;
            transform-origin: center center; /* Establece el punto de transformación en el centro de la imagen */
            transition: transform 0.3s ease, opacity 0.3s ease; /* Agrega transición para la opacidad */
        }

        .controls {
            position: absolute;
            top: 87%; /* Ajusta abajo */
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 0px;
            z-index: 3;
            background-color: rgba(255, 255, 255, 0.5); /* Fondo blanco transparente */
        }

        .controls label {
            font-weight: bold;
            font-size: 15px;
        }

        .controls input[type="range"] {
            width: 150px;
        }

        #showValuesBtn {
            margin-top: 20px;
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

        /* CSS para dispositivos móviles */
        @media screen and (max-width: 600px) {
            .controls label {
                font-size: 6px; /* Ajusta el tamaño de la fuente según tus preferencias */
            }

            .controls input[type="range"] {
                width: 50%; /* Ajusta el tamaño de los controles si es necesario */
            }
            .controls {
                top: 80%; /* Ajusta abajo */
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
    </style>
</head>
<body>
    <h1>Nebulosa de la tarántula, usando el VISTA y el JWST</h1>
    <div class="checkbox-container">
        <label for="modifyParams">Modificar Parámetros:</label>
        <input type="checkbox" id="modifyParams">
    </div>
    <div class="container">
        <div class="controls">
            <div>
                <div class="extra-controls">
                    <label for="scale1">Escala Imagen 1:</label>
                    <input type="range" id="scale1" min="0.5" max="2" step="0.1" value="1.3">
                    <br>
                    <label for="angle1">Ángulo Imagen 1:</label>
                    <input type="range" id="angle1" min="-90" max="90" step="1" value="-3">
                    <br>
                    <label for="xpos1">Pos X Imagen 1:</label>
                    <input type="range" id="xpos1" min="-50" max="50" step="1" value="1">
                    <br>
                    <label for="ypos1">Pos Y Imagen 1:</label>
                    <input type="range" id="ypos1" min="-20" max="70" step="1" value="13">
                    <br>
                </div>
                <label for="opacity1">Opacidad Imagen 1:</label>
                <input type="range" id="opacity1" min="0" max="1" step="0.1" value="1">
            </div>
            <div>
                <div class="extra-controls">
                    <label for="scale2">Escala Imagen 2:</label>
                    <input type="range" id="scale2" min="0.5" max="2" step="0.1" value="1.5">
                    <br>
                    <label for="angle2">Ángulo Imagen 2:</label>
                    <input type="range" id="angle2" min="-90" max="90" step="1" value="-16">
                    <br>
                    <label for="xpos2">Pos X Imagen 2:</label>
                    <input type="range" id="xpos2" min="-50" max="50" step="1" value="-0">
                    <br>
                    <label for="ypos2">Pos Y Imagen 2:</label>
                    <input type="range" id="ypos2" min="-50" max="60" step="1" value="-45">
                    <br>
                </div>
                <label for="opacity2">Opacidad Imagen 2:</label>
                <input type="range" id="opacity2" min="0" max="1" step="0.1" value="1">
            </div>
        </div>
        <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg" id="image1" class="image" alt="Imagen 1">
        <div class="image-container">
            <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg" id="image2" class="image" alt="Imagen 2">
        </div>
    </div>
    <button id="showValuesBtn">Mostrar Valores</button>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const image1 = document.getElementById('image1');
            const image2 = document.getElementById('image2');
            const scaleSlider1 = document.getElementById('scale1');
            const angleSlider1 = document.getElementById('angle1');
            const opacitySlider1 = document.getElementById('opacity1');
            const xposSlider1 = document.getElementById('xpos1');
            const yposSlider1 = document.getElementById('ypos1');

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

            function toggleExtraControls() {
                extraControls.forEach(control => {
                    control.style.display = modifyParamsCheckbox.checked ? 'block' : 'none';
                });
            }

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

            // Inicializar las transformaciones de las imágenes con los valores establecidos
            updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1);
            updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2);

            const showValuesBtn = document.getElementById('showValuesBtn');
            showValuesBtn.addEventListener('click', () => {
                const valuesImage1 = `Valores de la Imagen 1:
                    Escala: ${scaleSlider1.value}
                    Ángulo: ${angleSlider1.value}
                    Opacidad: ${opacitySlider1.value}
                    Posición X: ${xposSlider1.value}
                    Posición Y: ${yposSlider1.value}`;

                const valuesImage2 = `Valores de la Imagen 2:
                    Escala: ${scaleSlider2.value}
                    Ángulo: ${angleSlider2.value}
                    Opacidad: ${opacitySlider2.value}
                    Posición X: ${xposSlider2.value}
                    Posición Y: ${yposSlider2.value}`;

                alert(valuesImage1 + "\n\n" + valuesImage2);
            });

            modifyParamsCheckbox.addEventListener('change', toggleExtraControls);
            toggleExtraControls(); // Inicializar el estado de los controles adicionales
        });
    </script>
</body>
</html>
