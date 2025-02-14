---
layout: topbar
---
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telescopios Espaciales</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        header {
            text-align: center;
            background: #222;
            color: #fff;
            padding: 20px 0;
            width: 100%;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .container {
            max-width: 800px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
        .card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 90%;
            display: flex;
            align-items: center;
            overflow: hidden;
            transition: transform 0.2s;
        }
        .card:hover {
            transform: scale(1.01);
        }
        .card img {
            width: 40%;
            height: 100%;
            object-fit: cover;
        }
        .card-content {
            padding: 15px;
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .card-content h3 {
            margin: 0 0 10px;
            font-size: 1.4rem;
            color: #222;
        }
        .card-content p {
            margin: 0 0 15px;
            font-size: 0.95rem;
            color: #555;
        }
        .card-content ul {
            padding-left: 20px;
            margin: 0 0 15px;
            color: #555;
            font-size: 0.9rem;
            text-align: left;
        }
        .card-content a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
        }
        .card-content a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header>
        <h1>Sobre los telescopios</h1>
        <p>Descubre más sobre el Hubble, el JWST y VISTA</p>
    </header>
    <div class="container">
        <!-- Tarjeta Hubble -->
        <div class="card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg" alt="Telescopio Espacial Hubble">
            <div class="card-content">
                <h3>Telescopio Espacial Hubble (HST)</h3>
                <p>El Hubble, lanzado en 1990, es uno de los telescopios más icónicos de la historia. Ha producido imágenes espectaculares que revolucionaron la astronomía.</p>
                <ul>
                    <li><b>Órbita:</b> 547 km sobre la Tierra.</li>
                    <li><b>Filtros:</b> Visible, ultravioleta y cercano al infrarrojo.</li>
                    <li><b>Objetivo:</b> Estudio de galaxias, agujeros negros y exoplanetas.</li>
                </ul>
                <a href="https://science.nasa.gov/mission/hubble" target="_blank">Más información sobre el Hubble</a>
            </div>
        </div>
        <!-- Tarjeta JWST -->
        <div class="card">
            <img src="https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/06/james-webb-telescope-pictures-mqx4ltsbjytvsfbp.jpeg?size=*:900" alt="Telescopio Espacial James Webb">
            <div class="card-content">
                <h3>Telescopio Espacial James Webb (JWST)</h3>
                <p>El JWST, lanzado en 2021, es el telescopio infrarrojo más avanzado, diseñado para explorar las primeras etapas del universo.</p>
                <ul>
                    <li><b>Órbita:</b> Punto Lagrange L2, a 1.5 millones de km de la Tierra.</li>
                    <li><b>Filtros:</b> Espectro infrarrojo medio y cercano.</li>
                    <li><b>Objetivo:</b> Formación de galaxias, estrellas y análisis de atmósferas de exoplanetas.</li>
                </ul>
                <a href="https://science.nasa.gov/mission/webb/" target="_blank">Más información sobre el JWST</a>
            </div>
        </div>
        <!-- Tarjeta VISTA -->
        <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1Y5pRBnW0849E4AHJa7UGlL5JXkEj01usw&s" alt="Telescopio VISTA">
            <div class="card-content">
                <h3>Telescopio VISTA</h3>
                <p>Ubicado en el observatorio Paranal, Chile. El telescopio VISTA explora el universo infrarrojo y realiza mapeos del cielo para revelar los misterios que están escondidos en el polvo galáctico.</p>
                <ul>
                    <li><b>Ubicación:</b> Observatorio Paranal, Chile.</li>
                    <li><b>Filtros:</b> Espectro infrarrojo cercano.</li>
                    <li><b>Objetivo:</b> Estudio de formación estelar, galaxias y mapeos 3D del universo.</li>
                </ul>
                <a href="https://www.eso.org/public/teles-instr/paranal-observatory/surveytelescopes/vista/" target="_blank">Más información sobre VISTA</a>
            </div>
        </div>
    </div>
</body>
</html>
