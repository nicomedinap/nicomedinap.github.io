---
layout: topbar
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galeria de comparaciones</title>
    <style>
        :root {
            --background: #252525;
            --text: white;
        }

        body {
            font-size: 16px;
            font-family: Poppins, sans-serif;
            min-height: 100vh;
            padding: 6rem 2rem;
            background: var(--background);
            margin: 0; /* Añadido para asegurar que no haya espacios innecesarios */
        }

        .articles {
            display: flex;
            flex-wrap: wrap;
            margin: 0 auto;
            justify-content: center;
            max-width: 1200px;
            gap: 1.5rem;
        }

        .articles a {
            text-decoration: none;
            max-width: 20rem;
            width: 100%;
        }

        .articles article {
            cursor: pointer;
            position: relative;
            display: block;
            overflow: hidden;
            border-radius: 1rem;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            height: 25rem; /* Altura del contenedor */
            transition: all 0.1s ease-in-out; /* Reducido a 0.1s para una transición más rápida */
        }

        .articles article:hover {
            transform: scale(1.02); /* Efecto de escala al pasar el ratón */
            box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px; /* Sombra más pronunciada */
        }

        .articles article .article-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 0.1s ease-in-out;
        }

        .article-preview {
            padding: 1.5rem;
            position: absolute;
            bottom: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente para mejor legibilidad */
            color: white; /* Color del texto */
            z-index: 1;
            border-radius: 0 0 1rem 1rem; /* Redondeado en la parte inferior */
            transition: background-color 0.2s ease-out; /* Transición de color de fondo */
        }

        .articles article:hover .article-preview {
            background-color: rgba(0, 0, 0, 0.7); /* Cambio de color de fondo al pasar el ratón */
        }

        .articles article h2, .articles article p {
            margin: 0;
            color: var(--text);
            transition: color 0.15s ease-out; /* Transición de color del texto */
        }

        /* Media query para ajustar el ancho de las imágenes en móvil */
        @media (max-width: 600px) {
            .articles article .article-image {
                width: 100%; /* Ajuste el ancho según sea necesario */
                max-width: 100%; /* Ajuste el máximo ancho según sea necesario */
            }

            .article-preview {
                padding: 1rem; /* Ajuste el padding del preview en móvil */
            }
        }
    </style>
</head>
<body>
    <div class="articles">

        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/ARP142_HST_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/ARP142/012.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/ARP142/021.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg')" oncontextmenu="return false;">
                <img class="article-image" src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/ARP142/012.jpg" alt="Antennae">
                <div class="article-preview">
                    <h2>Interacción de galaxias ARP 142</h2>
                    <p>HST-JWST</p>
                </div>
            </article>
        </a>


        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/Antennae_HST_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/Antennae/012.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/AntennaeGalaxies/012.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/AntennaeGalaxies/012.jpg')" oncontextmenu="return false;">
                <img class="article-image" src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/AntennaeGalaxies/012.jpg" alt="Antennae">
                <div class="article-preview">
                    <h2>Galaxias de las antenas</h2>
                    <p>HST-JWST</p>
                </div>
            </article>
        </a>

        <!-- Artículo 1 con cambio de imagen al pasar el mouse -->
        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/M16_HST_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg')" oncontextmenu="return false;">
                <img class="article-image" src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg" alt="Nebulosa del Águila (M16)">
                <div class="article-preview">
                    <h2>Nebulosa del Águila (M16)</h2>
                    <p>HUBBLE-JWST</p>
                </div>
            </article>
        </a>
        <!-- Artículo 2 con cambio de imagen al pasar el mouse -->
        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/Tarantula_VISTA_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg')" oncontextmenu="return false;">
                <img class="article-image" src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg" alt="Nebulosa de la tarántula">
                <div class="article-preview">
                    <h2>Nebulosa de la tarántula</h2>
                    <p>VISTA-JWST</p>
                </div>
            </article>
        </a>
    </div>

    <script>
        // Función para cambiar la imagen al pasar el mouse o tocar en dispositivos móviles
        function changeImage(element, newImage) {
            const img = element.querySelector('.article-image');
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = newImage;
                img.style.opacity = 1;
            }, 100);
        }

        // Función para revertir la imagen al quitar el mouse o dejar de tocar en dispositivos móviles
        function revertImage(element, originalImage) {
            const img = element.querySelector('.article-image');
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = originalImage;
                img.style.opacity = 1;
            }, 100);
        }
    </script>
</body>
</html>
