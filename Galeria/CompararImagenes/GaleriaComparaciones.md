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
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.articles article h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.6rem;
    color: var(--text);
    transition: color 0.15s ease-out;
}

.articles article img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.2s ease-in-out;
}

.article-preview {
    padding: 1.5rem;
    background: white;
}

.articles figure {
    width: 100%;
    height: 14rem;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<head>
    <meta charset="UTF-8">
    <title>Cards</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" type='text/css'>
</head>

<body>
    <div class="articles">
        <!-- Artículo 1 con cambio de imagen al pasar el mouse -->
        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/M16_HST_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg')">
                <figure>
                    <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/HST/M16/210.jpg" alt="M16">
                </figure>
                <div class="article-preview">
                    <h2>Nebulosa del Águila (M16)</h2>
                    <p>
                        M16
                    </p>
                </div>
            </article>
        </a>
        <!-- Artículo 2 con cambio de imagen al pasar el mouse -->
        <a href="https://nicomedinap.github.io/Galeria/CompararImagenes/Tarantula_VISTA_JWST.html">
            <article onmouseover="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" onmouseout="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg')" ontouchstart="changeImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/NGC2070/4.jpg')" ontouchend="revertImage(this, 'https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg')">
                <figure>
                    <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/VISTA/VMC/Tarantula/012.jpg" alt="Nebulosa de la tarántula">
                </figure>
                <div class="article-preview">
                    <h2>Nebulosa de la tarántula</h2>
                    <p>
                        La Tarántula
                    </p>
                </div>
            </article>
        </a>
    </div>

    <script>
        // Función para cambiar la imagen al pasar el mouse o tocar en dispositivos móviles
        function changeImage(element, newImage) {
            const img = element.querySelector('img');
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = newImage;
                img.style.opacity = 1;
            }, 200);
        }

        // Función para revertir la imagen al quitar el mouse o dejar de tocar en dispositivos móviles
        function revertImage(element, originalImage) {
            const img = element.querySelector('img');
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = originalImage;
                img.style.opacity = 1;
            }, 200);
        }
    </script>
</body>

</html>
