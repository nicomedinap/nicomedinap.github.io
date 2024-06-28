---
layout: topbar
---

<html lang="en">
<style>
:root {
    --background: #F8F8FF;
    --text: #2C2C2C;
}

html {
    scroll-behavior: smooth;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-size: 16px;
    font-family: Poppins, sans-serif;
    min-height: 100vh;
    padding: 6rem 2rem;
    background: var(--background);
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
    transition: all 0.1s ease-in-out;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: 25rem; /* Altura del contenedor */
}

.articles article h2, .articles article p {
    margin: 0;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.articles article .article-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: opacity 0.1s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
}

.article-preview {
    padding: 1.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente para mejor legibilidad */
    z-index: 1;
}
</style>

<head>
    <meta charset="UTF-8">
    <title>Galeria de comparaciones</title>
</head>

<body>
    <div class="articles">
        <!-- Artículo 1 con cambio de imagen al pasar el mouse -->
        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/M16_HST_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg')" oncontextmenu="return false;">
                <div class="article-image" style="background-image: url('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg');"></div>
                <div class="article-preview">
                    <h2>Nebulosa del Águila (M16)</h2>
                    <p>HUBBLE-JWST</p>
                </div>
            </article>
        </a>
        <!-- Artículo 2 con cambio de imagen al pasar el mouse -->
        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/Tarantula_VISTA_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg')" oncontextmenu="return false;">
                <div class="article-image" style="background-image: url('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg');"></div>
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
            const imgDiv = element.querySelector('.article-image');
            imgDiv.style.opacity = 0;
            setTimeout(() => {
                imgDiv.style.backgroundImage = `url(${newImage})`;
                imgDiv.style.opacity = 1;
            }, 100);
        }

        // Función para revertir la imagen al quitar el mouse o dejar de tocar en dispositivos móviles
        function revertImage(element, originalImage) {
            const imgDiv = element.querySelector('.article-image');
            imgDiv.style.opacity = 0;
            setTimeout(() => {
                imgDiv.style.backgroundImage = `url(${originalImage})`;
                imgDiv.style.opacity = 1;
            }, 100);
        }
    </script>
</body>

</html>
