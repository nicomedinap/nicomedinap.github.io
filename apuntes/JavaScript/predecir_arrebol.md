---
layout: none
---
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Predictor de Arreboles (Préboles) </title>
<script src="https://unpkg.com/suncalc"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.2.1/dist/chartjs-plugin-annotation.min.js"></script>
<style>
  :root {
    --bg1:#001933;
    --bg2:#660000;
    --accent:#ff6600;
    --card: rgba(255,255,255,0.06);
  }
  body {
    margin:0;
    font-family:system-ui,Roboto,Arial;
    background:linear-gradient(180deg,var(--bg1),var(--bg2));
    color:white;
    min-height:100vh;
    overflow-x:hidden;
    font-size: 16px; /* Tamaño base para móviles */
    
  }

  /* === Pantalla de menú === */
  #cityMenu {
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
    gap:14px;
    padding:20px 15px;
    min-height:100vh;
    box-sizing:border-box;
  }
  .city-card {
    background:rgba(255,255,255,0.06);
    border-radius:14px;
    text-align:center;
    padding:18px 12px;
    cursor:pointer;
    transition:all .3s ease;
    box-shadow:0 4px 16px rgba(0,0,0,0.4);
    position: relative;
    overflow: hidden;
  }
  .city-card:hover {
    transform:translateY(-5px);
    background:rgba(255,255,255,0.1);
  }
  .city-name {
    font-size:1.1rem;
    font-weight:600;
    position: relative;
    z-index: 2;
  }
  .city-region {
    font-size:.85rem;
    opacity:.8;
    position: relative;
    z-index: 2;
  }
  .city-probability {
    margin-top:6px; 
    font-size:0.9rem; 
    opacity:0.85;
    position: relative;
    z-index: 2;
  }
  .probability-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #FFC107, #F44336);
    transition: width 0.5s ease;
  }

  /* === Contenedor principal === */
  #appContainer {
    display:none;
    padding:15px;
    max-width:1000px;
    margin:auto;
  }

  button.back {
    background:transparent;
    border:1px solid rgba(255,255,255,0.3);
    border-radius:8px;
    color:white;
    padding:10px 15px;
    margin-bottom:15px;
    cursor:pointer;
    font-size: 1rem;
  }

  .data-block {
    background:rgba(255,255,255,0.05);
    border-radius:12px;
    padding:12px;
    margin:10px 0;
  }
  canvas {
    background:rgba(255,255,255,0.05);
    border-radius:12px;
    padding:8px;
    max-width: 100%;
  }
  img.sat {
    max-width:100%;
    border-radius:12px;
    margin-top:8px;
  }

  /* Estilos de la parte 2 */
  .container {
    max-width:1000px;
    margin:0 auto;
    background: rgba(0,0,0,0.25);
    border-radius:14px;
    padding:15px;
    box-shadow:0 6px 30px rgba(0,0,0,0.5);
  }

  .satellite-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .satellite-wrapper img {
    display: block;
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }

  .overlay {
    position: absolute;
    color: white;
    font-family: Arial, sans-serif;
    text-shadow: 0 0 4px rgba(0,0,0,0.8);
    font-size: 0.9rem;
  }

  .overlay.orientation {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 1em;
  }

  .overlay.scale {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .scale-bar {
    width: 80px;
    height: 6px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  .overlay.instrument {
    bottom: 8px;
    right: 14px;
    font-size: 0.8em;
    opacity: 0.8;
  }

  h1 { 
    margin:0 0 8px 0; 
    font-size:1.5rem; 
  }
  p.lead { 
    margin:0 0 12px 0; 
    opacity:0.9; 
    font-size: 0.95rem;
  }

  .controls { 
    display:flex; 
    gap:10px; 
    flex-wrap:wrap; 
    margin:12px 0; 
  }

  select, button, input, textarea {
    padding:12px;
    border-radius:8px;
    border:none;
    font-size:1rem;
    box-sizing:border-box;
    min-height: 44px; /* Tamaño mínimo */
  }

  select, input { 
    background: rgba(255,255,255,0.06); 
    color: #fff; 
    width: 100%;
  }

  button { 
    background:var(--accent); 
    color:#fff; 
    cursor:pointer; 
    font-weight:600; 
    flex: 1;
    min-width: 140px;
  }

  button.ghost { 
    background: transparent; 
    border:1px solid rgba(255,255,255,0.08); 
  }

  .grid { 
    display:grid; 
    grid-template-columns:1fr 420px; 
    gap:16px; 
    align-items:start; 
  }

  .panel { 
    background:var(--card); 
    padding:15px; 
    border-radius:10px; 
  }

  #result { 
    min-height:120px; 
  }

  .sun-times { 
    display:flex; 
    gap:8px; 
    flex-wrap:wrap; 
    justify-content:flex-start; 
    margin:10px 0; 
  }
  .sun-time { 
    background: rgba(255,255,255,0.04); 
    padding:10px 12px; 
    border-radius:8px; 
    font-size: 0.95rem;
  }

  .data-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important; /* 3 columnas */
      grid-auto-flow: row !important; /* los items fluyen por filas */
      gap: 10px !important;
      width: 100% !important;
  }
  .data-item {
      background: #2a2a2a;
      padding: 8px;
      border-radius: 6px;
      font-size: 14px;
  }

  .predictions { 
    display:flex; 
    gap:10px; 
    margin-top:15px;
    flex-wrap: wrap;
  }

  .probability {
      font-size: 32px;         
      font-weight: bold;
      text-align: center;
      padding: 15px;
      border-radius: 10px;
      margin-top: 10px;
      width: 100%;
      box-sizing: border-box; 
      display: flex;
      flex-direction: column;
      justify-content: center; 
      align-items: center;     
      line-height: 1.2;        
  }

  .probability span {
      font-size: 40px;         
  }
  
  .high-prob { 
    background: rgba(255,204,0,0.18); 
    color:#ffd24d; 
  }
  .medium-prob { 
    background: rgba(255,153,102,0.12); 
    color:#ffb07a; 
  }
  .low-prob { 
    background: rgba(204,102,51,0.12); 
    color:#e09b79; 
  }

  #satelliteImage { 
    width:100%; 
    height:auto; 
    max-height: 300px;
    object-fit:cover; 
    border-radius:8px; 
    display:block; 
    margin-top:8px; 
  }

  .loading { 
    display:inline-block; 
    width:18px; 
    height:18px; 
    border:3px solid rgba(255,255,255,0.2); 
    border-top-color:#fff; 
    border-radius:50%; 
    animation:spin 1s linear infinite; 
  }
  @keyframes spin { 
    to { transform: rotate(360deg); } 
  }

  .charts { 
    display:flex; 
    gap:12px; 
    flex-direction:column; 
    margin-top:15px; 
  }
  .footer {
    background-color: #1e1e1e;
    color: #e0e0e0;
    text-align: center;
    padding: 10px;
    position: relative;
    bottom: 0px;
    width: 100%;
  }

  .footer a {
      margin: 0;
      font-size: 10px;
  }

  .footer p {
      margin: 0 0 1px 0;
      font-size: 12px;
  }

  .footer nav a {
      color: #ccc;
      text-decoration: none;
      margin: 0 2px;
      font-size: 12px;
      transition: color 0.3s ease, text-decoration 0.3s ease;
  }

  .footer nav a:hover {
      color: #1e90ff; /* Cambia a un color azul cuando el cursor está sobre el enlace */
      text-decoration: underline; /* Subraya el enlace */
  }

  .footer nav a:active {
      color: #f39c12; /* Cambia el color cuando se hace clic */
  }

  .footer nav .fa-instagram:hover {
      color: #e4405f; /* Cambia el color del icono de Instagram al pasar el cursor */
  }

  .footer nav a.fa {
      font-size: 20px;
      margin: 0 10px;
      transition: transform 0.3s ease;
  }

  .footer nav a.fa:hover {
      transform: scale(1.2); /* Agranda el icono ligeramente al pasar el cursor */
  }

  .titulo-sticky {
      position: sticky;
      top: 0;
      background: #fff;
      padding: 10px 0;
      text-align: center;
      font-size: 1.6rem;
      border-bottom: 1px solid #ddd;
      z-index: 10;
  }

  /* === MEDIA QUERIES PARA MÓVIL === */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    #cityMenu {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      padding: 15px 10px;
    }
    
    .city-card {
      padding: 15px 8px;
    }
    
    .city-name {
      font-size: 1rem;
    }
    
    .city-region {
      font-size: 0.8rem;
    }
    
    .container {
      padding: 12px;
    }
    
    .grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .panel {
      padding: 12px;
    }
    
    h1 {
      font-size: 1.3rem;
    }
    
    p.lead {
      font-size: 0.9rem;
    }
    
    .controls {
      flex-direction: column;
    }
    
    button {
      width: 100%;
    }
    
    .data-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    
    .predictions {
      flex-direction: column;
    }
    
    .probability {
      width: 100%;
      min-width: auto;
    }
    
    .sun-times {
      justify-content: space-between;
    }
    
    .sun-time {
      flex: 1;
      text-align: center;
    }
    
    .overlay {
      font-size: 0.8rem;
    }
    
    .overlay.scale {
      bottom: 15px;
    }
    
    .scale-bar {
      width: 60px;
    }
    
    .overlay.instrument {
      font-size: 0.7rem;
    }
    
    #satelliteImage {
      max-height: 250px;
    }
  }

  @media (max-width: 480px) {
    #cityMenu {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .container {
      padding: 10px;
    }
    
    .panel {
      padding: 10px;
    }
    
    h1 {
      font-size: 1.2rem;
    }
    
    .data-item {
      padding: 8px;
      font-size: 0.85rem;
    }
    
    .probability {
      padding: 10px;
      font-size: 0.9rem;
    }
    
    #satelliteImage {
      max-height: 200px;
    }
    
    .overlay.orientation {
      font-size: 0.9rem;
    }
    
    .overlay.scale {
      font-size: 0.75rem;
    }
    
    .overlay.instrument {
      font-size: 0.65rem;
    }
  }

  /* Agrega esto al CSS existente */
.charts {
  display: flex;
  gap: 12px;
  flex-direction: column;
  margin-top: 15px;
  height: 300px; /* Altura fija para móvil */
}

@media (max-width: 768px) {
  .charts {
    height: 280px; /* Un poco más bajo en móvil pero con buen espacio */
  }
}

@media (max-width: 480px) {
  .charts {
    height: 260px; /* Ajuste para pantallas muy pequeñas */
    margin-top: 12px;
  }
}
</style>
</head>
<body>

<h2 style="text-align:center; margin-top:20px;">Predictor de arreboles (Préboles)</h2>

<div id="loadingIndicator" style="text-align:center; padding:20px;">
  <div class="loading" style="width:40px; height:40px; margin:0 auto;"></div>
  <p style="margin-top:10px;">Cargando ciudades...</p>
</div>

<!-- MENÚ DE CIUDADES -->
<div id="cityMenu"></div>

<!-- CONTENEDOR DE RESULTADOS -->
<div id="appContainer">
  <button class="back" onclick="volverMenu()">← Volver</button>
  
  <!-- Contenedor principal del código 2 -->
  <div class="container">
    <h1 id="cityTitle">🌇 Predictor de Arrebol</h1>
    <p class="lead">Predicción realizada usando los datos obtenidos de Open-Meteo (https://open-meteo.com/) y construyendo un modelo simple donde se pondera la altura de las nubes.</p>

    <!-- Grid principal: lado izquierdo (funcional) y lado derecho (satélite y log) -->
    <div class="grid">
      <div>
        <div class="panel">
          <div id="result">
            <!-- Encabezado del resultado: ubicación y carga -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <div id="locationText">Seleccione ciudad</div>
                <div class="sun-times" id="sunTimes"></div>
              </div>
              <div id="loadingState"></div>
            </div>

            <!-- Grid de datos: nubosidad, PM2.5 y elevaciones -->
            <div class="data-grid" id="dataGrid">
              <div class="data-item">☁️ Nubosidad: <strong id="cloudVal">—</strong></div>
              <div class="data-item">Cantidad de elemento particulado PM2.5: <strong id="pmVal">—</strong></div>
              <div class="data-item">⬆ Elev amanecer: <strong id="sunriseElev">—</strong></div>
              <div class="data-item">⬇ Elev atardecer: <strong id="sunsetElev">—</strong></div>
            </div>

            <!-- Predicciones (probabilidades) -->
            <div class="predictions" id="predictions"></div>

            <!-- Gráfico de nubosidad (Chart.js) -->
            <div class="charts">
              <canvas id="cloudChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna lateral: imagen satelital y log -->
      <div>
        <div class="panel">
          <div><strong>Imagen satelital / nubes</strong></div>
          <div class="satellite-wrapper">
            <img id="satelliteImage" alt="Imagen satelital de nubes" />

            <!-- Etiquetas superpuestas -->
            <div class="overlay orientation">N ↑</div>
            <div class="overlay scale">
                <div class="scale-bar"></div>
                <span>60 km</span>
            </div>
            <div class="overlay instrument">Fuente: VIIRS (NASA GIBS)</div>
            </div>

            <div style="font-size:0.9rem; opacity:0.9; margin-top:8px;">
            Si falla la imagen intentará distintos proveedores. Puedes usar la imagen como referencia visual.
            </div>
        </div>

        <div class="panel" style="margin-top:12px;">
          <strong>registro</strong>
          <pre id="log" style="white-space:pre-wrap; font-size:0.85rem; margin:8px 0 0 0; max-height: 150px; overflow-y: auto;"></pre>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
/* === CIUDADES === */
const chileanCities = {
  "Arica":            { lat: -18.4783, lon: -70.3126, region: "XV Región",  altitude: 30 },
  "Iquique":          { lat: -20.2146, lon: -70.1524, region: "I Región",   altitude: 56 },
  "Antofagasta":      { lat: -23.6509, lon: -70.3975, region: "II Región",  altitude: 40 },
  "Calama":           { lat: -22.4544, lon: -68.9294, region: "II Región",  altitude: 2260 },
  "Copiapó":          { lat: -27.3667, lon: -70.3333, region: "III Región", altitude: 390 },
  "La Serena":        { lat: -29.9027, lon: -71.2519, region: "IV Región",  altitude: 28 },
  "Coquimbo":         { lat: -29.9533, lon: -71.3436, region: "IV Región",  altitude: 15 },
  "Valparaíso":       { lat: -33.0458, lon: -71.6197, region: "V Región",   altitude: 40 },
  "Viña del Mar":     { lat: -33.0245, lon: -71.5518, region: "V Región",   altitude: 20 },
  "Santiago":         { lat: -33.4489, lon: -70.6693, region: "RM",         altitude: 570 },
  "Rancagua":         { lat: -34.1701, lon: -70.7406, region: "VI Región",  altitude: 572 },
  "Talca":            { lat: -35.4264, lon: -71.6554, region: "VII Región", altitude: 102 },
  "Chillán":          { lat: -36.6066, lon: -72.1034, region: "Ñuble",      altitude: 124 },
  "Concepción":       { lat: -36.8269, lon: -73.0498, region: "VIII Región", altitude: 12 },
  "Los Ángeles":      { lat: -37.46973, lon: -72.35366, region: "VIII Región", altitude: 139 },
  "Temuco":           { lat: -38.7359, lon: -72.5907, region: "IX Región",  altitude: 114 },
  "Valdivia":         { lat: -39.8142, lon: -73.2459, region: "XIV Región", altitude: 19 },
  "Osorno":           { lat: -40.5739, lon: -73.1310, region: "X Región",   altitude: 65 },
  "Puerto Montt":     { lat: -41.4689, lon: -72.9411, region: "X Región",   altitude: 85 },
  "Punta Arenas":     { lat: -53.1638, lon: -70.9171, region: "XII Región", altitude: 34 },
};

/* === CREAR MENÚ (CON PROBABILIDADES PRECALCULADAS) === */
async function initCityMenu() {
    const menu = document.getElementById('cityMenu');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Crear esqueletos de tarjetas inmediatamente
    for (const [nombre, info] of Object.entries(chileanCities)) {
        const card = createCityCardSkeleton(nombre, info);
        menu.appendChild(card);
    }
    
    // Ocultar indicador y mostrar menú después de un breve delay
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
        menu.style.display = 'grid';
    }, 800);
    
    // Cargar datos en segundo plano
    loadAllCityData();
}

function createCityCardSkeleton(nombre, info) {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
        <div class="city-name">${nombre}</div>
        <div class="city-region">${info.region}</div>
        <div class="city-probability">
            <span class="loading"></span> Calculando...
        </div>
        <div class="probability-bar" style="width: 0%"></div>
    `;
    card.onclick = () => seleccionarCiudad(nombre);
    return card;
}

async function loadAllCityData() {
    const cities = Object.entries(chileanCities);
    const BATCH_SIZE = 3;
    const DELAY = 1500;
    
    for (let i = 0; i < cities.length; i += BATCH_SIZE) {
        const batch = cities.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(
            batch.map(async ([nombre, info]) => {
                try {
                    await updateCityCardData(nombre, info);
                } catch (error) {
                    console.warn(`Error cargando ${nombre}:`, error);
                    markCityCardAsError(nombre);
                }
            })
        );
        await new Promise(resolve => setTimeout(resolve, DELAY));
    }
}

async function updateCityCardData(nombre, info) {
    const [pm25, hourly, pressureData] = await Promise.all([ 
        getPM25(info.lat, info.lon), 
        getCloudCoverSeries(info.lat, info.lon),
        getPressureHumidity(info.lat, info.lon) 
    ]);

    let probAtardecer = 0;
    if (hourly) {
        const now = new Date();
        const times = SunCalc.getTimes(now, info.lat, info.lon);
        const sunset = times.sunset;
        const sunsetElev = SunCalc.getPosition(sunset, info.lat, info.lon).altitude * (180/Math.PI);
        const sunsetHour = sunset.toISOString().slice(0,13);
        const idxSunset = hourly.time.findIndex(t => t.startsWith(sunsetHour));
        const targetIdx = idxSunset >= 0 ? idxSunset : 18;

        const low_e = hourly.cloudcover_low?.[targetIdx] ?? (hourly.cloudcover?.[targetIdx] ?? 50);
        const mid_e = hourly.cloudcover_mid?.[targetIdx] ?? (hourly.cloudcover?.[targetIdx] ?? 50);
        const high_e = hourly.cloudcover_high?.[targetIdx] ?? (hourly.cloudcover?.[targetIdx] ?? 20);

        probAtardecer = computeRedProbability(pm25, low_e, mid_e, high_e, sunsetElev, false, pressureData.temperature);
        probAtardecer = Math.round(probAtardecer * 100);
    }

    updateCityCardUI(nombre, probAtardecer);
}

function updateCityCardUI(nombre, probAtardecer) {
    const cards = document.querySelectorAll('.city-card');
    const card = Array.from(cards).find(c => c.querySelector('.city-name').textContent === nombre);
    
    if (!card) return;
    
    card.querySelector('.city-probability').innerHTML = `Prob. arrebol: <strong>${probAtardecer}%</strong>`;
    card.querySelector('.probability-bar').style.width = `${probAtardecer}%`;
    
    // Aplicar estilos según probabilidad
    if (probAtardecer > 70) {
        card.style.background = "rgba(255, 80, 80, 0.55)";
        card.style.boxShadow = "0 4px 16px rgba(255, 80, 80, 0.1)";
    } else if (probAtardecer > 50) {
        card.style.background = "rgba(255, 165, 0, 0.3)";
        card.style.boxShadow = "0 4px 16px rgba(255, 165, 0, 0.2)";
    } else if (probAtardecer > 30) {
        card.style.background = "rgba(255, 200, 0, 0.25)";
    } else if (probAtardecer > 15) {
        card.style.background = "rgba(200, 200, 255, 0.15)";
    } else {
        card.style.background = "rgba(255, 255, 255, 0.05)";
    }
}

function markCityCardAsError(nombre) {
    const cards = document.querySelectorAll('.city-card');
    const card = Array.from(cards).find(c => c.querySelector('.city-name').textContent === nombre);
    
    if (card) {
        card.querySelector('.city-probability').innerHTML = '<em>Error al cargar</em>';
        card.style.background = "rgba(255, 0, 0, 0.1)";
    }
}

/* boton para volver a elegir ciudad */
function volverMenu() {
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('cityMenu').style.display = 'grid';
    localStorage.removeItem('lastCity');
}

async function seleccionarCiudad(nombre){
  const city=chileanCities[nombre];
  document.getElementById('cityMenu').style.display='none';
  document.getElementById('appContainer').style.display='block';
  document.getElementById('cityTitle').textContent=`Sobre ${nombre}`;
  localStorage.setItem('lastCity',nombre);
  await predictRedSunset(city.lat, city.lon, nombre);
}


// Obtiene PM2.5 desde OpenAQ (si disponible), o valor por defecto
async function getPM25(lat, lon) {
  const url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=15000&limit=20`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pm = data.results?.flatMap(r => r.measurements || []).find(m => m.parameter === 'pm25');
    return pm ? pm.value : 12;
  } catch (e) {
    console.warn('OpenAQ error', e);
    return 12;
  }
}

// Pide serie horaria de nubosidad (total y por capas) desde Open-Meteo
async function getCloudCoverSeries(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high&timezone=auto`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.hourly;
  } catch (e) {
    console.warn('open-meteo error', e);
    return null;
  }
}

// Helper para cargar una imagen con promesa
async function loadImage(src) {
  return new Promise((resolve,reject)=>{
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = ()=>resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Intenta cargar una imagen satelital de varias fuentes y la muestra en el <img>
async function getSatelliteImage(lat, lon) {
  const imgEl = document.getElementById('satelliteImage');

  const delta = 0.2;

  const sources = [
    `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&FORMAT=image/jpeg&HEIGHT=512&WIDTH=512&CRS=EPSG:4326&BBOX=${lat-delta},${lon-delta},${lat+delta},${lon+delta}`,
    `https://tile.openweathermap.org/map/clouds_new/5/${Math.floor((lon+180)/360*32)}/${Math.floor((90-lat)/180*32)}.png?appid=demo`,
  ];

  for (let s of sources) {
    try {
      await loadImage(s);
      imgEl.src = s;
      imgEl.style.display = 'block';
      return;
    } catch (e) {
      console.warn('sat source failed', s, e);
    }
  }
  imgEl.style.display = 'none';
}

// Función principal para calcular probabilidades de arrebol MEJORADA
function computeRedProbability(pm25, low, mid, high, elevDeg, isSunrise = false, temperature = 20) {
  const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
  const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
  const highPct = Math.max(0, Math.min(100, Number(high) || 0));

  //Factor temperatura
  const optimalTemp = 20;
  const tempSigma = 8;
  const tempScore = Math.exp(-Math.pow((temperature - optimalTemp) / tempSigma, 2));
  
  // === FACTOR NUBOSIDAD POR CAPAS (PESO MÁXIMO - Sunset Model) ===
  // Basado en: "we weighted moisture the most" y "weighted high clouds the most"
  const layerScore = (
      0.15 * (lowPct / 100) +    // Nubes bajas: menos peso (restringen luz)
      0.35 * (midPct / 100) +    // Nubes medias: peso medio  
      0.50 * (highPct / 100)     // Nubes altas: máximo peso (como "pantalla de cine")
  );

  // === FACTOR GEOMETRÍA SOLAR ===
  const idealElev = -3.0;
  const geomSigma = 4.0;
  const geomScore = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));

  // === FACTOR CALIDAD DEL AIRE (PM2.5) ===
  const idealPM = 15;
  const pmSigma = 18;
  const pmScore = Math.exp(-Math.pow((pm25 - idealPM) / pmSigma, 2));

  // === FACTOR 4: HUMEDAD (PROXY BASADO EN NUBES ALTAS) ===
  // Basado en: "we weighted moisture the most" - usamos nubes altas como proxy de humedad alta
  const humidityScore = highPct / 100;

  // === FACTOR 5: PRESIÓN ATMOSFÉRICA (PROXY BASADO EN ESTABILIDAD) ===
  // Basado en: "Pressure, as well as the change in pressure over time was the next highest weighted factor"
  // Usamos la distribución de nubes como proxy de estabilidad de presión
  const pressureStability = 1.0 - Math.abs((lowPct + midPct) - highPct) / 200;
  const pressureScore = Math.max(0.3, Math.min(1.0, pressureStability));

  // === PESOS FINALES (basados en Sunset Model) ===
  const wLayer = 0.55;     // Reducido de 0.40
  const wGeom  = 0.25;     // Reducido de 0.20  
  const wPM    = 0.05;     // Reducido de 0.10
  const wHumidity = 0.05;  // Reducido de 0.15
  const wPressure = 0.05;  // 
  const wTemperature = 0.05; // Nuevo peso

  // Calcular score combinado
  const score = (wLayer * layerScore) + 
                (wGeom * geomScore) + 
                (wPM * pmScore) + 
                (wHumidity * humidityScore) + 
                (wPressure * pressureScore) +
                 (wTemperature * tempScore); 

  // Aplicar función logística para obtener probabilidad
  const logisticK = 10.0;
  const logisticMid = 0.5;
  let p = 1 / (1 + Math.exp(-logisticK * (score - logisticMid)));

  // Penalización para condiciones muy desfavorables
  const totalCloud = (lowPct + midPct + highPct) / 3;
  if (totalCloud > 95) p *= 0.3; // Nubosidad muy densa
  if (highPct < 10 && totalCloud < 20) p *= 0.5; // Cielo muy despejado (no hay scattering)

  // Reducción para amanecer
  // if (isSunrise) p *= 0.9;

  p = Math.max(0, Math.min(0.99, p));

  return p;
}

/* ============================
   UI/Estado
   ============================ */

// Estado compartido actual
let currentState = {
    lat: null, lon: null, cityName: '', hourly: null, pm25: null, 
    preds: { sunrise: 0, sunset: 0 }, sunTimes: null, 
    sunriseElev: null, sunsetElev: null, pressureData: null
};

// Elemento para log visible en UI
const logEl = document.getElementById('log');

// Función auxiliar para volcar mensajes en el log y consola
function log(msg) {
  const line = `[${new Date().toLocaleString()}] ${msg}`;
  console.log(line);
  logEl.textContent = line + '\n' + logEl.textContent;
}

/* Chart instances: variables globales para Chart.js */
let cloudChart = null;

// Actualiza el gráfico de nubosidad con indicadores de amanecer/atardecer (optimizado para móvil)
function updateCloudChart(hours, cloudVals, sunriseTime, sunsetTime) {
  const ctx = document.getElementById('cloudChart').getContext('2d');
  if (cloudChart) cloudChart.destroy();
  
  // Convertir horas a formato de 24h para comparación
  const sunriseHour = sunriseTime.getHours();
  const sunsetHour = sunsetTime.getHours();
  
  // Encontrar los índices más cercanos en el array de horas
  const sunriseIndex = hours.findIndex(h => {
    const hour = parseInt(h.split(':')[0]);
    return hour >= sunriseHour;
  });
  
  const sunsetIndex = hours.findIndex(h => {
    const hour = parseInt(h.split(':')[0]);
    return hour >= sunsetHour;
  });

  // Configuración responsive para móvil
  const isMobile = window.innerWidth < 768;
  
  cloudChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [
        {
          label: 'Nubosidad total',
          data: cloudVals.total,
          borderWidth: isMobile ? 1.5 : 2,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255,255,255,0.1)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#ff6600',
          pointBorderWidth: isMobile ? 1 : 2,
          pointRadius: isMobile ? 5 : 8,
          pointHoverRadius: isMobile ? 3 : 6
        },
        {
          label: 'Nubes bajas',
          data: cloudVals.low,
          borderWidth: isMobile ? 1 : 1.5,
          borderColor: '#4fc3f7',
          backgroundColor: 'rgba(79, 195, 247, 0.1)',
          fill: false,
          tension: 0.3,
          borderDash: [4, 3],
          pointBackgroundColor: '#4fc3f7',
          pointBorderWidth: isMobile ? 0.5 : 1,
          pointRadius: isMobile ? 5 : 8,
          pointHoverRadius: isMobile ? 2.5 : 5
        },
        {
          label: 'Nubes medias',
          data: cloudVals.mid,
          borderWidth: isMobile ? 1 : 1.5,
          borderColor: '#ffb74d',
          backgroundColor: 'rgba(255, 183, 77, 0.1)',
          fill: false,
          tension: 0.3,
          borderDash: [2, 3],
          pointBackgroundColor: '#ffb74d',
          pointBorderWidth: isMobile ? 0.5 : 1,
          pointRadius: isMobile ? 5 : 8,
          pointHoverRadius: isMobile ? 2.5 : 5
        },
        {
          label: 'Nubes altas',
          data: cloudVals.high,
          borderWidth: isMobile ? 1 : 1.5,
          borderColor: '#ba68c8',
          backgroundColor: 'rgba(186, 104, 200, 0.1)',
          fill: false,
          tension: 0.3,
          pointBackgroundColor: '#ba68c8',
          pointBorderWidth: isMobile ? 0.5 : 1,
          pointRadius: isMobile ? 5 : 8,
          pointHoverRadius: isMobile ? 2.5 : 5
        }
      ]
    },
    options: {
      layout: {
        padding: {
          top: isMobile ? 10 : 15,
          right: isMobile ? 5 : 10,
          bottom: isMobile ? 5 : 10,
          left: isMobile ? 5 : 10
        }
      },
      plugins: { 
        legend: { 
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: isMobile ? 10 : 12,
            padding: isMobile ? 12 : 15,
            font: {
              size: isMobile ? 10 : 11,
              weight: 'normal'
            },
            color: '#ffffff',
            usePointStyle: true,
            pointStyle: 'circle'
          } 
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#ff6600',
          borderWidth: 1,
          titleFont: {
            size: isMobile ? 11 : 12
          },
          bodyFont: {
            size: isMobile ? 10 : 11
          },
          padding: isMobile ? 8 : 10
        },
        annotation: {
          annotations: {
            sunriseLine: {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: sunriseIndex >= 0 ? sunriseIndex : 6,
              borderColor: '#ffeb3b',
              borderWidth: isMobile ? 2 : 2.5,
              borderDash: [4, 3],
              label: {
                enabled: true,
                content: isMobile ? '🌅' : '🌅 Amanecer',
                position: 'start',
                backgroundColor: 'rgba(255, 235, 59, 0.9)',
                color: '#000000',
                font: {
                  weight: 'bold',
                  size: isMobile ? 9 : 10
                },
                padding: isMobile ? 3 : 4
              }
            },
            sunsetLine: {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: sunsetIndex >= 0 ? sunsetIndex : 18,
              borderColor: '#ff9800',
              borderWidth: isMobile ? 2 : 2.5,
              borderDash: [4, 3],
              label: {
                enabled: true,
                content: isMobile ? '🌇' : '🌇 Atardecer',
                position: 'end',
                backgroundColor: 'rgba(255, 152, 0, 0.9)',
                color: '#000000',
                font: {
                  weight: 'bold',
                  size: isMobile ? 9 : 10
                },
                padding: isMobile ? 3 : 4
              }
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255,255,255,0.08)',
            drawTicks: false
          },
          ticks: {
            color: '#ffffff',
            maxRotation: 0,
            font: {
              size: isMobile ? 15 : 18
            },
            callback: function(value, index) {
              // En móvil mostrar cada 4 horas, en desktop cada 3
              const interval = isMobile ? 4 : 3;
              return index % interval === 0 ? this.getLabelForValue(value) : '';
            }
          },
          title: {
            display: true,
            text: 'Hora del día',
            color: '#ffffff',
            font: {
              size: isMobile ? 15 : 18,
              weight: 'bold'
            },
            padding: { top: 5, bottom: 5 }
          }
        },
        y: { 
          beginAtZero: true, 
          max: 100,
          min: 0,
          grid: {
            color: 'rgba(255,255,255,0.08)',
            drawTicks: false
          },
          ticks: {
            color: '#ffffff',
            font: {
              size: isMobile ? 15 : 18
            },
            callback: function(value) {
              return value + '%';
            },
            // Más espacio entre ticks en móvil
            stepSize: isMobile ? 25 : 20
          },
          title: {
            display: true,
            text: 'Nubosidad (%)',
            color: '#ffffff',
            font: {
              size: isMobile ? 15 : 18,
              weight: 'bold'
            },
            padding: { top: 5, bottom: 5 }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: isMobile ? 1.8 : 3.7, // Más alto en móvil
      interaction: {
        intersect: false,
        mode: 'index'
      },
      elements: {
        point: {
          radius: isMobile ? 1.5 : 2.5,
          hoverRadius: isMobile ? 3 : 5
        },
        line: {
          tension: 0.3 // Líneas más suaves
        }
      }
    }
  });
}

/* 
============================
Workflow principal: predictRedSunset
============================ 
*/
// Obtener datos de presión y humedad

async function getPressureHumidity(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=pressure_msl,relativehumidity_2m,temperature_2m&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.hourly) {
            const now = new Date();
            const currentHour = now.toISOString().slice(0,13);
            const currentIdx = data.hourly.time.findIndex(t => t.startsWith(currentHour));
            
            if (currentIdx >= 0) {
                return {
                    pressure: data.hourly.pressure_msl?.[currentIdx] || 1013,
                    humidity: data.hourly.relativehumidity_2m?.[currentIdx] || 50,
                    temperature: data.hourly.temperature_2m?.[currentIdx] || 20,
                    timestamp: data.hourly.time?.[currentIdx] || new Date().toISOString()
                };
            }
        }
    } catch (e) {
        console.warn('Error obteniendo presión/humedad/temperatura:', e);
    }
    
    return {
        pressure: 1013,
        humidity: 50,
        temperature: 20,
        timestamp: new Date().toISOString()
    };
}

/* ============================
   Workflow principal: predictRedSunset
   ============================ */

// Función principal: ejecuta la recolección de datos y calcula probabilidades
async function predictRedSunset(lat, lon, cityName='') {
  // Mostrar ubicación en UI (nombre de ciudad o coordenadas)
  // document.getElementById('locationText').textContent = `📍 ${cityName || `(${lat.toFixed(2)}, ${lon.toFixed(2)})`}`;
  log(`Predicción para ${cityName || `${lat},${lon}`}`);

  try {
    // Obtener PM2.5, nubosidad, presión y humedad en paralelo
    const [pm25, hourly, pressureData] = await Promise.all([ 
      getPM25(lat, lon), 
      getCloudCoverSeries(lat, lon),
      getPressureHumidity(lat, lon)
    ]);
    
    // Actualizar estado global
    currentState.lat = lat; 
    currentState.lon = lon; 
    currentState.cityName = cityName;
    currentState.hourly = hourly; 
    currentState.pm25 = pm25;
    currentState.pressureData = pressureData;

    // Calcular tiempos solares (SunCalc retorna objetos Date)
    const now = new Date();
    const times = SunCalc.getTimes(now, lat, lon);
    currentState.sunTimes = times;
    const sunrise = times.sunrise;
    const sunset  = times.sunset;
    // Elevación solar en grados (SunCalc devuelve radianes)
    const sunriseElev = SunCalc.getPosition(sunrise, lat, lon).altitude * (180/Math.PI);
    const sunsetElev  = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
    currentState.sunriseElev = sunriseElev;
    currentState.sunsetElev = sunsetElev;

    // localizar índices horarios cercanos a sunrise/sunset en la serie hourly
    const hrs = hourly?.time || [];
    const idxSunrise = hrs.findIndex(t => t.startsWith(sunrise.toISOString().slice(0,13)));
    const idxSunset  = hrs.findIndex(t => t.startsWith(sunset.toISOString().slice(0,13)));

    // Fallbacks: índices por defecto si no encontramos índice exacto
    const idxS = idxSunrise >=0 ? idxSunrise : 6;
    const idxE = idxSunset  >=0 ? idxSunset  : 20;

    // Extraer valores por capas (low/mid/high) para amanecer (s) y atardecer (e)
    const low_s  = hourly?.cloudcover_low?.[idxS]  ?? (hourly?.cloudcover?.[idxS] ?? 50);
    const mid_s  = hourly?.cloudcover_mid?.[idxS]  ?? (hourly?.cloudcover?.[idxS] ?? 50);
    const high_s = hourly?.cloudcover_high?.[idxS] ?? (hourly?.cloudcover?.[idxS] ?? 20);
    const tot_s  = hourly?.cloudcover?.[idxS] ?? Math.round((low_s + mid_s + high_s)/3);

    const low_e  = hourly?.cloudcover_low?.[idxE]  ?? (hourly?.cloudcover?.[idxE] ?? 50);
    const mid_e  = hourly?.cloudcover_mid?.[idxE]  ?? (hourly?.cloudcover?.[idxE] ?? 50);
    const high_e = hourly?.cloudcover_high?.[idxE] ?? (hourly?.cloudcover?.[idxE] ?? 20);
    const tot_e  = hourly?.cloudcover?.[idxE] ?? Math.round((low_e + mid_e + high_e)/3);

    // Calcular probabilidades para amanecer y atardecer usando el modelo
    const sunriseProb = computeRedProbability(pm25, low_s, mid_s, high_s, sunriseElev, true, pressureData.temperature);
    const sunsetProb  = computeRedProbability(pm25, low_e, mid_e, high_e, sunsetElev, false, pressureData.temperature);

    // Guardar probabilidades en el estado global
    currentState.preds.sunrise = sunriseProb;
    currentState.preds.sunset = sunsetProb;

    // Actualizar UI: quitar loading y mostrar métricas
    document.getElementById('loadingState').innerHTML = '';
    
    // Formatear fecha y hora de los datos
    const dataTime = new Date(pressureData.timestamp);
    const fechaStr = dataTime.toLocaleDateString('es-CL', { 
      day: '2-digit', month: '2-digit', year: 'numeric' 
    });
    const horaStr = dataTime.toLocaleTimeString('es-CL', { 
      hour: '2-digit', minute: '2-digit' 
    });

    // Actualizar el grid de datos con la nueva información
    document.getElementById('dataGrid').innerHTML = `
      <div class="data-item">☁️ Nubosidad: <strong>${Math.round(tot_e)}%</strong></div>
      <div class="data-item">🌫 PM2.5: <strong>${pm25.toFixed(1)} µg/m³</strong></div>
      <div class="data-item">🌡 Temperatura: <strong>${pressureData.temperature.toFixed(1)}°C</strong></div>
      <div class="data-item">📊 Presión: <strong>${pressureData.pressure.toFixed(0)} hPa</strong></div>
      <div class="data-item">💧 Humedad: <strong>${pressureData.humidity.toFixed(0)}%</strong></div>
      <div class="data-item">⬆ Elev amanecer: <strong>${sunriseElev.toFixed(1)}°</strong></div>
      <div class="data-item">⬇ Elev atardecer: <strong>${sunsetElev.toFixed(1)}°</strong></div>
    `;

    // Mostrar información de fecha y hora de los datos
    document.getElementById('locationText').innerHTML = `
      📍 ${cityName || `(${lat.toFixed(2)}, ${lon.toFixed(2)})`}<br>
      <small style="opacity:0.8; font-size:0.9rem;">📅 Datos: ${fechaStr} 🕒 ${horaStr}</small>
    `;

    // Mostrar horarios de amanecer/atardecer en UI (formato local)
    document.getElementById('sunTimes').innerHTML = `
      <div class="sun-time">🌅 Amanecer: ${sunrise.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
      <div class="sun-time">🌇 Atardecer: ${sunset.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
    `;

    // Mostrar bloques de probabilidad (estilizados)
    const predBlock = document.getElementById('predictions');
    predBlock.innerHTML = `
      <div class="probability ${probClass(sunriseProb)}">🌅 Amanecer: ${(sunriseProb*100).toFixed(0)}%</div>
      <div class="probability ${probClass(sunsetProb)}">🌇 Atardecer: ${(sunsetProb*100).toFixed(0)}%</div>
    `;

    // Actualizar gráfico horario si hourly está disponible
    if (hourly && hourly.time) {
      const times24 = hourly.time.slice(0,24).map(t => {
        const d = new Date(t);
        return d.getHours() + ':00';
      });
      // Construir objeto clouds con arrays truncados a 24h
      const clouds = {
        total: hourly.cloudcover.slice(0,24).map(v => Math.round(v)),
        low: hourly.cloudcover_low.slice(0,24).map(v => Math.round(v)),
        mid: hourly.cloudcover_mid.slice(0,24).map(v => Math.round(v)),
        high: hourly.cloudcover_high.slice(0,24).map(v => Math.round(v)),
      };
      updateCloudChart(times24, clouds, sunrise, sunset);
    }

    // Intentar cargar imagen satelital (FoV reducido)
    getSatelliteImage(lat, lon).catch(e => console.warn('sat image fail', e));

    // Binarizar predicción con umbral 0.5 para almacenamiento
    currentState.predictedSunrise = sunriseProb > 0.5;
    currentState.predictedSunset = sunsetProb > 0.5;

    // Escribir log con síntesis de predicción
    log(`% arrebol: amanecer ${(sunriseProb*100).toFixed(1)}%, atardecer ${(sunsetProb*100).toFixed(1)}%`);
    log(`Presión ${pressureData.pressure.toFixed(0)} hPa, Humedad ${pressureData.humidity.toFixed(0)}%`);
    log(`Temp: ${pressureData.temperature.toFixed(1)}°C`);
    // log(`Fecha datos: ${fechaStr} ${horaStr}`);


  } catch (e) {
    // Manejo de errores en flujo principal
    document.getElementById('loadingState').innerHTML = '';
    log('Error en predictRedSunset: ' + e.message);
    alert('Error al obtener datos. Revisa la consola.');
  }
}

/* ============================
   Small helpers
   ============================ */

// Clase de probabilidad para estilos (alto/medio/bajo)
function probClass(p) {
  if (p > 0.7) return 'high-prob';
  if (p < 0.4) return 'low-prob';
  return 'medium-prob';
}

/* ============================
   Botones: location
   ============================ 

// Botón "Usar ubicación" (geolocalización del navegador)
document.getElementById('btnLoc').addEventListener('click', ()=> {
  if (!navigator.geolocation) { alert('Geolocalización no soportada'); return; }
  document.getElementById('loadingState').innerHTML = '<span class="loading"></span>';
  navigator.geolocation.getCurrentPosition(async pos => {
    await predictRedSunset(pos.coords.latitude, pos.coords.longitude, 'Tu ubicación');
  }, err => {
    document.getElementById('loadingState').innerHTML = '';
    alert('No se pudo obtener ubicación: ' + (err.message || err.code));
  }, { timeout: 10000 });
});*/

// Ejecutar al cargar
initCityMenu();

</script>

<footer class="footer">
    <p>Préboles 2025. Nicolás Medina Peña.</p>
    <nav>
        <a href="https://nicomedinap.github.io/about.html" target="_blank"> <u>Sobre el autor</u></a>
        <a href="https://www.privacy-policy-link.com" target="_blank"> <u>Sobre el modelo predictivo</u></a>
        <a href="https://nicomedinap.github.io/apuntes/Telescopios.html" target="_blank"> <u>Sobre los datos</u></a>
        <a href="https://www.instagram.com/nicomediap/" target="_blank" class="fa fa-instagram"></a>
    </nav>
</footer>

</body>
</html>