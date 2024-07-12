---
layout: topbar
---

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galaxias de las antenas o "Antennae galaxies"</title>
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
            object-fit: contain; /* Asegura que la imagen no se corte */
            transform-origin: center center; /* Establece el punto de transformación en el centro de la imagen */
            transition: transform 0.3s ease, opacity 0.3s ease; /* Agrega transición para la opacidad */
        }

        .controls {
            position: absolute;
            top: 88%; /* Ajusta la posición vertical de los controles */
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 0px;
            z-index: 3;
            background-color: rgba(255, 255, 255, 0.3); /* Fondo blanco transparente */
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

        /* CSS para dispositivos móviles */
        @media screen and (max-width: 500px) {
            .controls label {
                font-size: 5px; /* Ajusta el tamaño de la fuente según tus preferencias */
            }

            .controls input[type="range"] {
                width: 45%; /* Ajusta el tamaño de los controles si es necesario */
            }
            .controls {
                top: 88%; /* Ajusta la posición vertical en dispositivos móviles */
            }

            .h1 {
                
            }
        }

        .extra-controls {
            display: none; /* Ocultar controles adicionales inicialmente */
        }

        .checkbox-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        input[type="range"]::-moz-range-thumb {
            width: 20px; /* Ancho del círculo */
            height: 20px; /* Altura del círculo */
            border-radius: 50%; /* Hacerlo circular */
            background: #007bff; /* Color del círculo */
            cursor: pointer;
        }

    </style>
</head>
<body>
    <h1>Galaxias de las antenas o "Antennae galaxies" a través de los telescopios Hubble y JWST</h1>
    <div class="checkbox-container">
        <label for="modifyParams">Modificar Parámetros:</label>
        <input type="checkbox" id="modifyParams">
    </div>
    <div class="container">
        <div class="controls">
            <div>
                <!-- Controles adicionales para la Imagen 1 -->
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
                    <!-- Control de opacidad para la Imagen 1 -->
                    <label for="opacity1">Opacidad Imagen 1:</label>
                    <input type="range" id="opacity1" min="0" max="1" step="0.1" value="1">
                    <br>
                </div>

            </div>
            <div>
                <!-- Controles adicionales para la Imagen 2 -->
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
        <!-- Imagen 1 -->
        <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/Antennae/012.jpeg" id="image1" class="image" alt="Imagen 1">
        <!-- Contenedor para la Imagen 2 -->
        <div class="image-container">
            <!-- Imagen 2 -->
            <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/AntennaeGalaxies/012.jpg" id="image2" class="image" alt="Imagen 2">
        </div>
    </div>
    <button id="showValuesBtn">Mostrar Valores</button>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Referencias a los elementos de la imagen 1 y sus controles
            const image1 = document.getElementById('image1');
            const scaleSlider1 = document.getElementById('scale1');
            const angleSlider1 = document.getElementById('angle1');
            const opacitySlider1 = document.getElementById('opacity1');
            const xposSlider1 = document.getElementById('xpos1');
            const yposSlider1 = document.getElementById('ypos1');

            // Referencias a los elementos de la imagen 2 y sus controles
            const image2 = document.getElementById('image2');
            const scaleSlider2 = document.getElementById('scale2');
            const angleSlider2 = document.getElementById('angle2');
            const opacitySlider2 = document.getElementById('opacity2');
            const xposSlider2 = document.getElementById('xpos2');
            const yposSlider2 = document.getElementById('ypos2');

            // Referencia al checkbox y los controles adicionales
            const modifyParamsCheckbox = document.getElementById('modifyParams');
            const extraControls = document.querySelectorAll('.extra-controls');

            // Función para actualizar la transformación de la imagen
            function updateImageTransform(image, scaleSlider, angleSlider, opacitySlider, xposSlider, yposSlider) {
                const scale = scaleSlider.value;
                const angle = angleSlider.value;
                const opacity = opacitySlider.value;
                const xpos = xposSlider.value;
                const ypos = yposSlider.value;

                image.style.transform = `scale(${scale}) rotate(${angle}deg) translate(${xpos}px, ${ypos}px)`;
                image.style.opacity = opacity;
            }

            // Función para mostrar u ocultar los controles adicionales
            function toggleExtraControls() {
                extraControls.forEach(control => {
                    control.style.display = modifyParamsCheckbox.checked ? 'block' : 'none';
                });
            }

            // Función para inicializar las transformaciones de las imágenes con diferentes valores en dispositivos móviles
            function initializeImages() {
                const isMobile = window.matchMedia('(max-width: 500px)').matches;

                if (isMobile) {
                    // Valores iniciales para celu
                    scaleSlider1.value = '1.3';
                    angleSlider1.value = '19.5';
                    opacitySlider1.value = '1';
                    xposSlider1.value = '10';
                    yposSlider1.value = '56';

                    scaleSlider2.value = '2';
                    angleSlider2.value = '3';
                    opacitySlider2.value = '1';
                    xposSlider2.value = '-23';
                    yposSlider2.value = '55';
                } else {
                    // Valores iniciales para pantallas más grandes
                    scaleSlider1.value = '1.1';
                    angleSlider1.value = '19.5';
                    opacitySlider1.value = '1';
                    xposSlider1.value = '33';
                    yposSlider1.value = '20';

                    scaleSlider2.value = '1.7';
                    angleSlider2.value = '3';
                    opacitySlider2.value = '1';
                    xposSlider2.value = '-27';
                    yposSlider2.value = '60';
                }

                updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1);
                updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2);
            }

            // Añadir eventos de cambio a los sliders de la imagen 1
            scaleSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            angleSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            opacitySlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            xposSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));
            yposSlider1.addEventListener('input', () => updateImageTransform(image1, scaleSlider1, angleSlider1, opacitySlider1, xposSlider1, yposSlider1));

            // Añadir eventos de cambio a los sliders de la imagen 2
            scaleSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            angleSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            opacitySlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            xposSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));
            yposSlider2.addEventListener('input', () => updateImageTransform(image2, scaleSlider2, angleSlider2, opacitySlider2, xposSlider2, yposSlider2));

            // Inicializar las transformaciones de las imágenes con los valores establecidos
            initializeImages();

            // Mostrar valores de las imágenes al hacer clic en el botón
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

            // Añadir evento de cambio al checkbox
            modifyParamsCheckbox.addEventListener('change', toggleExtraControls);
            toggleExtraControls(); // Inicializar el estado de los controles adicionales

            // Volver a inicializar las imágenes al cambiar el tamaño de la ventana
            window.addEventListener('resize', initializeImages);
        });
    </script>
</body>
</html>
