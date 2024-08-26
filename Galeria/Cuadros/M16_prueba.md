<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            height: 100vh;
        }

        /* Estilos para el contenedor de las pestañas */
        .tab-container {
            width: 200px;
            background-color: #333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        /* Estilos para las pestañas */
        .tab {
            width: 100%;
            padding: 15px;
            text-align: center;
            color: white;
            cursor: pointer;
            border-bottom: 1px solid #444;
            transition: background-color 0.3s ease;
        }

        .tab:hover {
            background-color: #555;
        }

        /* Estilo para la pestaña activa */
        .tab.active {
            background-color: #555;
            border-left: 5px solid #FFD700; /* Marca visual en la pestaña activa */
        }

        /* Estilos para el contenido principal */
        .main-content {
            position: relative;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f4f4f4;
        }

        .main-content img {
            max-width: 100%;
            max-height: 100%;
        }

        /* Estilos para el contenido relacionado superpuesto */
        .related-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8); /* Fondo semi-transparente */
            color: white;
            display: none;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .related-content.visible {
            display: flex;
            opacity: 1;
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>

    <div class="tab-container">
        <div class="tab" onclick="toggleContent('related1', this)">Versiones alternativas</div>
        <div class="tab" onclick="toggleContent('related2', this)">Aladin </div>
        <div class="tab" onclick="toggleContent('related3', this)">Información técnica</div>
    </div>

    <div class="main-content">
        <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_4.jpg" alt="Imagen Principal">
        
    <div id="related1" class="related-content">
            <!-- Contenido de la aplicación 1 -->
            <!-- <h1>Aplicación 1</h1>-->
            <iframe src="https://nicomedinap.github.io/Galeria/JWST/MostrarImagenesM16.html"></iframe>
            <!-- <p>Contenido de la aplicación 1.</p>-->
        </div>


        <div id="related2" class="related-content">
            <!-- Contenido de la aplicación 2 -->
            <iframe src="https://nicomedinap.github.io/aladin/ZoomM16.html"></iframe>
        </div>

        <div id="related3" class="related-content">
            <!-- Contenido de la aplicación 3 -->
            <h1>Aplicación 3</h1>
            <p>Contenido de la aplicación 3.</p>
        </div>
    </div>

    <script>
        function toggleContent(id, tabElement) {
            var content = document.getElementById(id);
            var isVisible = content.classList.contains('visible');

            // Replegar todos los contenidos y eliminar la clase 'active' de todas las pestañas
            var contents = document.querySelectorAll('.related-content');
            var tabs = document.querySelectorAll('.tab');
            contents.forEach(function(otherContent) {
                otherContent.classList.remove('visible');
                otherContent.style.display = 'none';
            });
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });

            // Si el contenido no estaba visible, mostrarlo y marcar la pestaña como activa
            if (!isVisible) {
                content.style.display = 'flex';
                setTimeout(function() {
                    content.classList.add('visible');
                }, 10); // Pequeño retardo para asegurar la transición
                tabElement.classList.add('active');
            }
        }
    </script>

</body>
</html>
