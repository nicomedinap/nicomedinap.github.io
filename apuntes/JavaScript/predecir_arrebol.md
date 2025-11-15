---
layout: none
---
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>🌇 Predictor de Arrebol</title>
<script src="https://unpkg.com/suncalc"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
  }

  /* === Pantalla de menú === */
  #cityMenu {
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:18px;
    padding:30px;
    min-height:100vh;
    box-sizing:border-box;
  }
  .city-card {
    background:rgba(255,255,255,0.06);
    border-radius:14px;
    text-align:center;
    padding:20px;
    cursor:pointer;
    transition:all .3s ease;
    box-shadow:0 4px 16px rgba(0,0,0,0.4);
  }
  .city-card:hover {
    transform:translateY(-5px);
    background:rgba(255,255,255,0.1);
  }
  .city-name {
    font-size:1.2rem;
    font-weight:600;
  }
  .city-region {
    font-size:.9rem;
    opacity:.8;
  }

  /* === Contenedor principal === */
  #appContainer {
    display:none;
    padding:20px;
    max-width:1000px;
    margin:auto;
  }

  button.back {
    background:transparent;
    border:1px solid rgba(255,255,255,0.3);
    border-radius:8px;
    color:white;
    padding:6px 12px;
    margin-bottom:10px;
    cursor:pointer;
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
  }
  img.sat {
    max-width:100%;
    border-radius:12px;
    margin-top:8px;
  }

  /* Estilos del código 2 */
  .container {
    max-width:1000px;
    margin:0 auto;
    background: rgba(0,0,0,0.25);
    border-radius:14px;
    padding:18px;
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
    width: 90%;
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
  }

  .overlay.orientation {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 1.1em;
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
    width: 100px;
    height: 6px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  .overlay.instrument {
    bottom: 8px;
    right: 14px;
    font-size: 0.85em;
    opacity: 0.8;
  }

  h1 { margin:0 0 8px 0; font-size:1.6rem; }
  p.lead { margin:0 0 12px 0; opacity:0.9; }

  .controls { display:flex; gap:10px; flex-wrap:wrap; margin:12px 0; }

  select, button, input, textarea {
    padding:10px;
    border-radius:8px;
    border:none;
    font-size:0.95rem;
    box-sizing:border-box;
  }

  select, input { background: rgba(255,255,255,0.06); color: #fff; min-width:220px; }

  button { background:var(--accent); color:#fff; cursor:pointer; font-weight:600; }

  button.ghost { background: transparent; border:1px solid rgba(255,255,255,0.08); }

  .grid { display:grid; grid-template-columns:1fr 420px; gap:16px; align-items:start; }

  .panel { background:var(--card); padding:12px; border-radius:10px; }

  #result { min-height:120px; }

  .sun-times { display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-start; margin:10px 0; }
  .sun-time { background: rgba(255,255,255,0.04); padding:8px 12px; border-radius:8px; }

  .data-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:8px; margin-top:8px; }
  .data-item { background: rgba(255,255,255,0.02); padding:8px; border-radius:8px; text-align:center; }

  .predictions { display:flex; gap:8px; margin-top:12px; }
  .probability { padding:10px; border-radius:8px; min-width:130px; text-align:center; font-weight:700; }
  .high-prob { background: rgba(255,204,0,0.18); color:#ffd24d; }
  .medium-prob { background: rgba(255,153,102,0.12); color:#ffb07a; }
  .low-prob { background: rgba(204,102,51,0.12); color:#e09b79; }

  #satelliteImage { width:500px; height:500px; object-fit:cover; border-radius:8px; display:block; margin-top:8px; }

  .loading { display:inline-block; width:18px; height:18px; border:3px solid rgba(255,255,255,0.2); border-top-color:#fff; border-radius:50%; animation:spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .charts { display:flex; gap:12px; flex-direction:column; margin-top:10px; }
  canvas { background: rgba(255,255,255,0.02); border-radius:8px; padding:8px; }

  @media (max-width:900px) {
    .grid { grid-template-columns: 1fr; }
    select, input { min-width:100%; }
  }
</style>
</head>
<body>

<!-- MENÚ DE CIUDADES -->
<div id="cityMenu"></div>

<!-- CONTENEDOR DE RESULTADOS -->
<div id="appContainer">
  <button class="back" onclick="volverMenu()">← Volver</button>
  
  <!-- Contenedor principal del código 2 -->
  <div class="container">
    <h1 id="cityTitle">🌇 Predictor de Arrebol</h1>
    <p class="lead">Predicción automática (PM2.5 + nubosidad por capas + geometría solar).</p>

    <!-- Controles: selector de ciudad y botones -->
    <div class="controls">
      <div style="display:flex; gap:8px;">
        <button id="btnLoc" class="ghost">📍 Usar ubicación</button>
      </div>
    </div>

    <!-- Grid principal: lado izquierdo (funcional) y lado derecho (satélite y log) -->
    <div class="grid">
      <div>
        <div class="panel">
          <div id="result">
            <!-- Encabezado del resultado: ubicación y carga -->
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div id="locationText">Seleccione ciudad o use ubicación</div>
                <div class="sun-times" id="sunTimes"></div>
              </div>
              <div id="loadingState"></div>
            </div>

            <!-- Grid de datos: nubosidad, PM2.5 y elevaciones -->
            <div class="data-grid" id="dataGrid">
              <div class="data-item">☁️ Nubosidad: <strong id="cloudVal">—</strong></div>
              <div class="data-item">🌫 PM2.5: <strong id="pmVal">—</strong></div>
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
          <strong>Detalles técnicos / registro</strong>
          <pre id="log" style="white-space:pre-wrap; font-size:0.85rem; margin:8px 0 0 0;"></pre>
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

async function precalcularProbabilidades() {
  for (const [nombre, info] of Object.entries(chileanCities)) {

    // Traer nubes y PM para ahora
    const clouds = await getCloudCoverSeries(info.lat, info.lon);
    const pm25 = await getPM25(info.lat, info.lon);

    if (!clouds) {
      info.menuProb = 0;
      continue;
    }

    // hora del sistema → índice
    const hora = new Date().getHours();
    const idx = hora;

    const low  = clouds.cloudcover_low[idx];
    const mid  = clouds.cloudcover_mid[idx];
    const high = clouds.cloudcover_high[idx];

    // geometría solar
    const sun = SunCalc.getPosition(new Date(), info.lat, info.lon);
    const elevDeg = sun.altitude * 180 / Math.PI;

    // probabilidad usando tu fórmula
    const p = computeRedProbability(pm25, low, mid, high, elevDeg, false);

    // Guardar probabilidad en objeto
    info.menuProb = p;
  }
}


/* === CREAR MENÚ (CON PROBABILIDADES PRECALCULADAS) === */
async function crearMenu() {
  await precalcularProbabilidades();

  const menu = document.getElementById('cityMenu');
  menu.innerHTML = "";

  for (const [nombre, info] of Object.entries(chileanCities)) {
    const p = info.menuProb ?? 0;

    let color;
    if (p > 0.66) color = "rgba(255,120,0,0.45)";
    else if (p > 0.33) color = "rgba(255,120,0,0.25)";
    else color = "rgba(255,255,255,0.06)";

    const card = document.createElement('div');
    card.className = 'city-card';
    card.style.background = color;

    card.innerHTML = `
      <div class="city-name">${nombre}</div>
      <div class="city-region">${info.region}</div>
      <div style="margin-top:6px; font-size:0.9rem; opacity:0.9;">
        Prob: ${(p*100).toFixed(0)}%
      </div>
    `;

    card.onclick = () => seleccionarCiudad(nombre);
    menu.appendChild(card);
  }
}

crearMenu();


/* === MANEJO DE CIUDAD === */

/* boton para volver a elegir ciudad */
function volverMenu(){
  document.getElementById('appContainer').style.display='none';
  document.getElementById('cityMenu').style.display='grid';
  localStorage.removeItem('lastCity');
}

async function seleccionarCiudad(nombre){
  const city=chileanCities[nombre];

  document.getElementById('cityMenu').style.display='none';
  document.getElementById('appContainer').style.display='block';
  document.getElementById('cityTitle').textContent=`🌇 ${nombre}`;
  localStorage.setItem('lastCity',nombre);

  await predictRedSunset(city.lat, city.lon, nombre);
}

/* Funciones del codigo principal */

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

  const delta = 0.5;

  const sources = [
    `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&FORMAT=image/jpeg&HEIGHT=512&WIDTH=512&CRS=EPSG:4326&BBOX=${lat-delta},${lon-delta},${lat+delta},${lon+delta}`,
    `https://tile.openweathermap.org/map/clouds_new/5/${Math.floor((lon+180)/360*32)}/${Math.floor((90-lat)/180*32)}.png?appid=demo`,
    'https://cdn.statically.io/img/www.meteored.cl/noticias/wp-content/uploads/2021/06/satelite-chile.jpg'
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

// Función principal para calcular probabilidades de arrebol
function computeRedProbability(pm25, low, mid, high, elevDeg, isSunrise = false) {
  const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
  const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
  const highPct = Math.max(0, Math.min(100, Number(high) || 0));
  const TOTAL_CLOUD_PERCENT = (lowPct + midPct + highPct) / 3;
  if (TOTAL_CLOUD_PERCENT < 5) return 0.0;

  const cc = TOTAL_CLOUD_PERCENT;
  const cloudPeakCenter = 50;
  const cloudSigma = 18;
  const cloudFactor = Math.exp(-Math.pow((cc - cloudPeakCenter) / cloudSigma, 2));
  const cloudPenalty = (cc < 10) ? 0.05 : (cc > 85) ? 0.25 : 1.0;
  const cloudScore = cloudFactor * cloudPenalty;

  const layerScore = (
      0.20 * (lowPct / 100) +
      0.50 * (midPct / 100) +
      0.90 * (highPct / 100)
  );

  const idealElev = -3.0;
  const geomSigma = 4.0;
  const geomRaw = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));
  const highSunPenalty = elevDeg > 20 ? 0.2 : 1.0;
  const lowSunPenalty  = elevDeg < -18 ? 0.15 : 1.0;
  const geomScore = geomRaw * highSunPenalty * lowSunPenalty;

  const idealPM = 15;
  const pmSigma = 18;
  const pmScore = Math.exp(-Math.pow((pm25 - idealPM) / pmSigma, 2));

  const wCloud = 0.40;
  const wLayer = 0.18;
  const wGeom  = 0.30;
  const wPM    = 0.12;

  const score = (wCloud * cloudScore) + (wLayer * layerScore) + (wGeom * geomScore) + (wPM * pmScore);

  const logisticK = 10.0;
  const logisticMid = 0.5;
  let p = 1 / (1 + Math.exp(-logisticK * (score - logisticMid)));

  if (isSunrise) p *= 0.9;

  p = Math.max(0, Math.min(0.99, p));

  return p;
}

/* ============================
   UI/Estado
   ============================ */

// Estado compartido actual
let currentState = {
  lat: null, lon: null, cityName: '', hourly: null, pm25: null, preds: { sunrise: 0, sunset: 0 },
  sunTimes: null, sunriseElev: null, sunsetElev: null
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

// Actualiza el gráfico de nubosidad (horario) con labels y valores por capa
function updateCloudChart(hours, cloudVals) {
  const ctx = document.getElementById('cloudChart').getContext('2d');
  if (cloudChart) cloudChart.destroy();
  cloudChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: 'Nubosidad total (%)',
        data: cloudVals.total,
        borderWidth:2,
        fill:false,
        tension:0.2
      },{
        label: 'Bajas (%)',
        data: cloudVals.low,
        borderDash:[5,5],
        borderWidth:1,
        fill:false,
        tension:0.2
      },{
        label: 'Medias (%)',
        data: cloudVals.mid,
        borderDash:[2,4],
        borderWidth:1,
        fill:false,
        tension:0.2
      },{
        label: 'Altas (%)',
        data: cloudVals.high,
        borderWidth:1,
        fill:false,
        tension:0.2
      }]
    },
    options: {
      plugins: { legend: { position:'bottom', labels:{boxWidth:15} } },
      scales: {
        y: { beginAtZero:true, max:100 }
      }
    }
  });
}

/* ============================
   Workflow principal: predictRedSunset
   ============================ */

// Función principal: ejecuta la recolección de datos y calcula probabilidades
async function predictRedSunset(lat, lon, cityName='') {
  // Mostrar loading en UI
  document.getElementById('loadingState').innerHTML = '<span class="loading"></span>';
  // Mostrar ubicación en UI (nombre de ciudad o coordenadas)
  document.getElementById('locationText').textContent = `📍 ${cityName || `(${lat.toFixed(2)}, ${lon.toFixed(2)})`}`;
  log(`Iniciando predicción para ${cityName || `${lat},${lon}`}`);

  try {
    // Obtener PM2.5 y la serie horaria de nubosidad en paralelo
    const [pm25, hourly] = await Promise.all([ getPM25(lat, lon), getCloudCoverSeries(lat, lon) ]);
    // Actualizar estado global
    currentState.lat = lat; currentState.lon = lon; currentState.cityName = cityName;
    currentState.hourly = hourly; currentState.pm25 = pm25;

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
    const sunriseProb = computeRedProbability(pm25, low_s, mid_s, high_s, sunriseElev, true);
    const sunsetProb  = computeRedProbability(pm25, low_e, mid_e, high_e, sunsetElev, false);

    // Guardar probabilidades en el estado global
    currentState.preds.sunrise = sunriseProb;
    currentState.preds.sunset = sunsetProb;

    // Actualizar UI: quitar loading y mostrar métricas
    document.getElementById('loadingState').innerHTML = '';
    document.getElementById('cloudVal').textContent = `${Math.round(tot_e)}% (hoy)`;
    document.getElementById('pmVal').textContent = `${pm25.toFixed(1)} µg/m³`;
    document.getElementById('sunriseElev').textContent = `${sunriseElev.toFixed(1)}°`;
    document.getElementById('sunsetElev').textContent = `${sunsetElev.toFixed(1)}°`;

    // Mostrar horarios de amanecer/atardecer en UI (formato local)
    document.getElementById('sunTimes').innerHTML = `
      <div class="sun-time">🌅 ${sunrise.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
      <div class="sun-time">🌇 ${sunset.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
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
      updateCloudChart(times24, clouds);
    }

    // Intentar cargar imagen satelital (FoV reducido)
    getSatelliteImage(lat, lon).catch(e => console.warn('sat image fail', e));

    // Binarizar predicción con umbral 0.5 para almacenamiento
    currentState.predictedSunrise = sunriseProb > 0.5;
    currentState.predictedSunset = sunsetProb > 0.5;

    // Escribir log con síntesis de predicción
    log(`Predicciones: amanecer ${(sunriseProb*100).toFixed(1)}%, atardecer ${(sunsetProb*100).toFixed(1)}%`);

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
   ============================ */

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
});

</script>
</body>
</html>