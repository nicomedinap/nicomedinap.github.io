---
layout: none
---
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <title>Predictor de Arreboles (Préboles)</title>
  <script src="https://unpkg.com/suncalc"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.2.1/dist/chartjs-plugin-annotation.min.js"></script>
  <!-- Leaflet para mapas interactivos -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  
  <link rel="stylesheet" href="https://nicomedinap.github.io/public/css/preboles.css">
  <style>

  @media (max-width: 768px) {
    .title {
        font-size: 2.8rem !important;
        letter-spacing: 1px !important;
        margin: 25px 0 20px 0 !important;
    }
  }

  @media (max-width: 480px) {
      .title {
          font-size: 2.6rem !important;
          letter-spacing: 0.5px !important;
          margin: 20px 0 15px 0 !important;
      }
  }

  .lead-with-bg {
    margin: 0 0 20px 0;  
    max-width: calc(100% - 40px);
    opacity: 0.95;
    font-size: 0.95rem;
    padding: 30px 24px;
    background: 
      /* Capa de color sobre la imagen para mejor legibilidad */
      linear-gradient(
        rgba(0, 25, 51, 0.75),  /* Azul oscuro con transparencia */
        rgba(102, 0, 0, 0.65)   /* Rojo oscuro con transparencia */
      ),
      /* Imagen de fondo */
      url('https://as2.ftcdn.net/jpg/04/31/52/97/220_F_431529701_P3LDLj8D32MgRZZ565xmaJaVByjifQ8v.jpg') 
      center center / cover no-repeat; /* Centrada y cubriendo todo */
    
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    line-height: 1.7;
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.25),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(2px); /* Ligero desenfoque */
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    min-height: 180px; /* Altura mínima */
    display: flex;
    align-items: center;
  }

  .lead-content {
    position: relative;
    z-index: 2; /* Asegura que el texto esté sobre las capas de fondo */
    max-width: 100%;
  }

  /* Icono de información opcional */
  .lead-with-bg:after {
    content: "ⓘ";
    position: absolute;
    top: 12px;
    right: 15px;
    opacity: 0.5;
    font-size: 0.9rem;
    z-index: 3;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }

  /* Para móviles */
  @media (max-width: 768px) {
    .lead-with-bg {
      padding: 25px 20px;
      min-height: 160px;
      font-size: 0.9rem;
    }
  }
  
  </style>
</head>

<body>


<div style="text-align: center; margin: 40px 0;">
    <h2 class="title" style="
        font-size: 5rem;
        font-weight: 900;
        background: linear-gradient(90deg, #FF5F00, #FF2D95, #FF0000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
        padding: 0;
        letter-spacing: 3px;
        text-transform: uppercase;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">Préboles</h2>
    
    <div style="
        font-size: 1.6rem;
        color: #FFB6C1;
        margin-top: -5px;
        letter-spacing: 8px;
        font-weight: 300;
        opacity: 0.8;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">
        <span style="
            background: linear-gradient(90deg, #FF5F00, #FF2D95, #FF0000);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
        ">PRE</span>dictor de arre<span style="
            background: linear-gradient(90deg, #FF5F00, #FF2D95, #FF0000);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
        ">BOLES</span>
    </div>
</div>

<p class="lead-with-bg">
  <span class="lead-content">
    El arrebol es el fenómeno óptico donde la luz colorea las nubes de rojo, naranjo o rosado. 
    Las nubes reflejan diferentes colores dependiendo del tipo de nube, y con eso es posible hacer una predicción. 
    Elige tu ciudad y prueba tu suerte!!
  </span>
</p>

<div id="loadingIndicator" style="text-align:center; padding:20px;">
  <div class="loading" style="width:40px; height:40px; margin:0 auto;"></div>
  <p style="margin-top:10px;">Obteniendo datos...</p>
</div>

<!-- MENÚ DE CIUDADES -->
<div id="cityMenu"></div>

<!-- CONTENEDOR DE RESULTADOS -->
<div id="appContainer">
  <button class="back" onclick="volverMenu()">← Volver</button>
  
  <!-- Contenedor principal del código 2 -->
  <div class="container">
    <h1 id="cityTitle">🌇 Predictor de Arrebol</h1>

    <!-- Grid principal: lado izquierdo (funcional) y lado derecho (mapa y log) -->
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
            <div class="charts" style="height: 400px; width: 100%;"> <!-- o 600px para más alto -->
              <canvas id="cloudChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna lateral: mapa y log -->
      <div>
        <div class="panel">
          <div><strong>Mapa de probabilidad de arrebol</strong></div>
          <div class="map-wrapper" style="height: 500px;">
            <div id="map"></div>
            
            <!-- LEYENDA CENTRADA ABAJO CON GRADIENTE ORIGINAL -->
            <div class="probability-legend">
              <div class="legend-title">Probabilidad de arrebol</div>
              <div class="legend-gradient"></div>
              <div class="legend-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <!-- CONTROLES SIMPLIFICADOS -->
            <div class="map-controls">
              <button class="map-toggle active" id="toggleHeatmap" onclick="toggleHeatmap()">Hexágonos</button>
              <button class="map-toggle active" id="toggleLabels" onclick="toggleLabels()">%</button>
            </div>

            <div id="mapLoading" class="map-loading" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 8px;">
              Calculando...
            </div>
          </div>

          <div style="font-size:0.9rem; opacity:0.9; margin-top:8px;">
            Celdas hexagonales muestran la probabilidad de arrebol en la trayectoria hacia el atardecer. 
            Resolución proporcional a los datos de Open-Meteo.
            Colores más cálidos indican mayor probabilidad.
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


<!-- Lista con ciudades -->
<script src="https://nicomedinap.github.io/preboles/ciudades.js"></script>

<script>
/* === VARIABLES GLOBALES PARA EL MAPA === */
let map = null;
let marker = null;
let heatLayer = null;
let labelLayer = null;
let heatmapEnabled = true;
let labelsEnabled = true;
let weatherDataCache = {};





/* ========== FUNCIÓN UNIFICADA PARA OBTENER DATOS METEOROLÓGICOS ========== */

// Función unificada para obtener todos los datos meteorológicos
async function getMeteoData(lat, lon) {
  try {
    // Preguntar datos una sola vez
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,pressure_msl,relativehumidity_2m,temperature_2m&timezone=auto`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.hourly) {
      return getFallbackData();
    }
    
    // Procesar datos horarios completos para nubosidad
    const cloudSeries = data.hourly;
    
    // Obtener datos actuales de presión, humedad y temperatura
    const now = new Date();
    const currentHour = now.toISOString().slice(0, 13);
    const currentIdx = data.hourly.time.findIndex(t => t.startsWith(currentHour));
    
    let currentData = {
      pressure: 1013,
      humidity: 50,
      temperature: 20,
      timestamp: new Date().toISOString()
    };
    
    if (currentIdx >= 0) {
      currentData = {
        pressure: data.hourly.pressure_msl?.[currentIdx] || 1013,
        humidity: data.hourly.relativehumidity_2m?.[currentIdx] || 50,
        temperature: data.hourly.temperature_2m?.[currentIdx] || 20,
        timestamp: data.hourly.time?.[currentIdx] || new Date().toISOString()
      };
    }
    
    return {
      cloudSeries: cloudSeries,
      current: currentData
    };
    
  } catch (e) {
    console.warn('Error obteniendo datos meteorológicos:', e);
    return getFallbackData();
  }
}

// Datos de respaldo en caso de error
function getFallbackData() {
  return {
    cloudSeries: null,
    current: {
      pressure: 1013,
      humidity: 50,
      temperature: 20,
      timestamp: new Date().toISOString()
    }
  };
}

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
    }, 3000);
    
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
    const DELAY = 300;
    
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
    const [pm25, meteoData] = await Promise.all([ 
        getPM25(info.lat, info.lon), 
        getMeteoData(info.lat, info.lon)
    ]);

    let probAtardecer = 0;
    if (meteoData.cloudSeries) {
        const now = new Date();
        const times = SunCalc.getTimes(now, info.lat, info.lon);
        const sunset = times.sunset;
        const sunsetElev = SunCalc.getPosition(sunset, info.lat, info.lon).altitude * (180/Math.PI);
        const sunsetHour = sunset.toISOString().slice(0,13);
        const idxSunset = meteoData.cloudSeries.time.findIndex(t => t.startsWith(sunsetHour));
        const targetIdx = idxSunset >= 0 ? idxSunset : 18;

        const low_e = meteoData.cloudSeries.cloudcover_low?.[targetIdx] ?? (meteoData.cloudSeries.cloudcover?.[targetIdx] ?? 50);
        const mid_e = meteoData.cloudSeries.cloudcover_mid?.[targetIdx] ?? (meteoData.cloudSeries.cloudcover?.[targetIdx] ?? 50);
        const high_e = meteoData.cloudSeries.cloudcover_high?.[targetIdx] ?? (meteoData.cloudSeries.cloudcover?.[targetIdx] ?? 20);

        probAtardecer = computeRedProbability(pm25, low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature);
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

// Función para obtener estilos basados en probabilidad (igual que las tarjetas)
function getProbabilityStyles(probability) {
    const probPercent = probability * 100;
    
    if (probPercent > 70) {
        return {
            background: "rgba(255, 80, 80, 0.55)",
            boxShadow: "0 4px 16px rgba(255, 80, 80, 0.1)",
            border: "1px solid rgba(255, 95, 0, 0.3)",
            color: "#ffffff"
        };
    } else if (probPercent > 50) {
        return {
            background: "rgba(255, 165, 0, 0.3)",
            boxShadow: "0 4px 16px rgba(255, 165, 0, 0.2)",
            border: "1px solid rgba(255, 165, 0, 0.2)",
            color: "#ffd700"
        };
    } else if (probPercent > 30) {
        return {
            background: "rgba(255, 200, 0, 0.25)",
            border: "1px solid rgba(255, 200, 0, 0.15)",
            color: "#ffcc00"
        };
    } else if (probPercent > 15) {
        return {
            background: "rgba(200, 200, 255, 0.15)",
            border: "1px solid rgba(200, 200, 255, 0.1)",
            color: "#aaaaff"
        };
    } else {
        return {
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            color: "#cccccc"
        };
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

/* ========== FUNCIONES DEL MAPA CON HEXÁGONOS ========== */

// Función para inicializar o actualizar el mapa
function initMap(lat, lon, cityName) {
  // Si el mapa ya existe, simplemente actualízalo
  if (map) {
    map.setView([lat, lon], 10);
    if (marker) {
      marker.setLatLng([lat, lon]);
      // ACTUALIZAR EL POPUP TAMBIÉN
      marker.setPopupContent(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`);
    } else {
      marker = L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`)
        .openPopup();
    }
    return;
  }
  
  // Si no existe, crea el mapa
  map = L.map('map').setView([lat, lon], 10);
  
  // Añadir capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Añadir marcador
  marker = L.marker([lat, lon]).addTo(map)
    .bindPopup(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`)
    .openPopup();
}

/* ===========================
   GEODÉSICAS Y HEXÁGONOS
   =========================== */

/**
 * Calcular punto de destino geodésico (sfera).
 * lat, lon en grados; azimuth en grados; distanceKm en km.
 * Devuelve { lat, lon } en grados.
 */
function calculateDestinationPoint(lat, lon, azimuth, distanceKm) {
  const R = 6371; // km
  const latRad = lat * Math.PI / 180;
  const lonRad = lon * Math.PI / 180;
  const azRad = azimuth * Math.PI / 180;
  const dDivR = distanceKm / R;

  const destLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(dDivR) +
    Math.cos(latRad) * Math.sin(dDivR) * Math.cos(azRad)
  );

  const destLonRad = lonRad + Math.atan2(
    Math.sin(azRad) * Math.sin(dDivR) * Math.cos(latRad),
    Math.cos(dDivR) - Math.sin(latRad) * Math.sin(destLatRad)
  );

  return {
    lat: destLatRad * 180 / Math.PI,
    lon: destLonRad * 180 / Math.PI
  };
}

/**
 * Calcula azimut de la puesta de sol (0=N, 90=E, 180=S, 270=W)
 */
function calculateSunsetAzimuth(lat, lon) {
  const now = new Date();
  const times = SunCalc.getTimes(now, lat, lon);
  const sunset = times.sunset;
  const pos = SunCalc.getPosition(sunset, lat, lon);
  // pos.azimuth: radians, measured from south? SunCalc returns azimuth in radians from south (-pi..pi)
  // Formula below converts to 0=N, 90=E convention and normalizes
  const az = (pos.azimuth * 180 / Math.PI + 180) % 360;
  return az;
}

/**
 * Calcula distancia entre dos puntos geodésicos (km)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// GENERAR 7 HEXÁGONOS BÁSICOS
async function generate7HexagonGrid(centerLat, centerLon, sunsetAzimuth) {
  const hexagons = [];
  const hexRadiusKm = 10;
  const hexWidth = Math.sqrt(3) * hexRadiusKm;
  const hexHeight = 1.5 * hexRadiusKm;
  const perpendicularAzimuth = (sunsetAzimuth + 90) % 360;
  
  // Coordenadas axiales para los 7 hexágonos
  const hexCoordinates = [
    // Hexágono central
    { q: 0, r: 0 },
    
    // 6 hexágonos alrededor
    { q: 1, r: 0 },   // Derecha
    { q: 0, r: 1 },   // Abajo-derecha
    { q: -1, r: 1 },  // Abajo-izquierda
    { q: -1, r: 0 },  // Izquierda
    { q: 0, r: -1 },  // Arriba-izquierda
    { q: 1, r: -1 }   // Arriba-derecha
  ];
  
  // Generar los 7 hexágonos
  for (const coord of hexCoordinates) {
    const { q, r } = coord;
    
    // Convertir coordenadas axiales a coordenadas cartesianas (km)
    const x = hexWidth * (q + r/2);
    const y = hexHeight * r;
    
    // Calcular punto central del hexágono
    let hexCenter;
    
    if (x === 0 && y === 0) {
      hexCenter = { lat: centerLat, lon: centerLon };
    } else {
      // Primero mover horizontalmente (perpendicular)
      let tempPoint = { lat: centerLat, lon: centerLon };
      if (x !== 0) {
        const dirX = x > 0 ? perpendicularAzimuth : (perpendicularAzimuth + 180) % 360;
        tempPoint = calculateDestinationPoint(centerLat, centerLon, dirX, Math.abs(x));
      }
      
      // Luego mover verticalmente (dirección del atardecer)
      if (y !== 0) {
        const dirY = y > 0 ? sunsetAzimuth : (sunsetAzimuth + 180) % 360;
        hexCenter = calculateDestinationPoint(tempPoint.lat, tempPoint.lon, dirY, Math.abs(y));
      } else {
        hexCenter = tempPoint;
      }
    }
    
    // Filtrar por caja de Chile
    if (hexCenter.lat >= -56 && hexCenter.lat <= -17 && hexCenter.lon >= -76 && hexCenter.lon <= -66) {
      const probability = await calculateGridPointProbability(hexCenter.lat, hexCenter.lon);
      
      // Calcular 6 vértices del hexágono
      const vertices = [];
      for (let i = 0; i < 6; i++) {
        const angle = sunsetAzimuth + (i * 60); // 60° entre vértices
        const vertex = calculateDestinationPoint(hexCenter.lat, hexCenter.lon, angle, hexRadiusKm);
        vertices.push([vertex.lat, vertex.lon]);
      }
      
      // Crear hexágono con el color del gradiente original
      const hexagon = L.polygon(vertices, {
        color: '#ffffff',
        fillColor: getGradientColorForProbability(probability),
        fillOpacity: 0.6,
        weight: 1.5,
        opacity: 0.9
      }).addTo(heatLayer);
      
      // Popup
      const distance = calculateDistance(centerLat, centerLon, hexCenter.lat, hexCenter.lon);
      hexagon.bindPopup(`
        <div style="text-align:center; min-width:150px;">
          <strong>${(probability*100).toFixed(0)}% Probabilidad</strong><br>
          Distancia: ${distance.toFixed(0)} km<br>
          <small>${hexCenter.lat.toFixed(3)}, ${hexCenter.lon.toFixed(3)}</small>
        </div>
      `);
      
      // Efectos hover
      hexagon.on('mouseover', function() { 
        this.setStyle({ fillOpacity: 0.9, weight: 2.5, color: '#ffff00' }); 
      });
      hexagon.on('mouseout', function() { 
        this.setStyle({ fillOpacity: 0.7, weight: 1.5, color: '#ffffff' }); 
      });
      
      // Etiqueta central (porcentajes)
      if (labelsEnabled) {
        const percentage = (probability * 100).toFixed(0);
        L.marker([hexCenter.lat, hexCenter.lon], {
          icon: L.divIcon({
            className: 'hexagon-label',
            html: `<div style="color:white;font-weight:900;font-size:18px;text-shadow:0 1px 3px rgba(0,0,0,0.8)">${percentage}%</div>`,
            iconSize: [50, 25],
            iconAnchor: [25, 12]
          })
        }).addTo(labelLayer);
      }
      
      hexagons.push({ lat: hexCenter.lat, lon: hexCenter.lon, probability });
    }
  }
  
  return hexagons;
}

// Calcular probabilidad para un punto específico de la grilla
async function calculateGridPointProbability(lat, lon) {
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  
  // Usar caché si está disponible
  if (weatherDataCache[cacheKey]) {
    return computeProbabilityFromData(weatherDataCache[cacheKey], lat, lon);
  }
  
  try {
    // Obtener datos meteorológicos para este punto usando getMeteoData
    const [pm25, meteoData] = await Promise.all([
      getPM25(lat, lon),
      getMeteoData(lat, lon)
    ]);
    
    const weatherData = { pm25, meteoData };
    
    // Guardar en caché
    weatherDataCache[cacheKey] = weatherData;
    
    return computeProbabilityFromData(weatherData, lat, lon);
  } catch (error) {
    console.warn(`Error calculando probabilidad para ${lat}, ${lon}:`, error);
    return 0;
  }
}

// Calcular probabilidad a partir de datos meteorológicos
function computeProbabilityFromData(weatherData, lat, lon) {
  const { pm25, meteoData } = weatherData;
  
  if (!meteoData.cloudSeries) return 0;
  
  const now = new Date();
  const times = SunCalc.getTimes(now, lat, lon);
  const sunset = times.sunset;
  const sunsetElev = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
  
  const sunsetHour = sunset.toISOString().slice(0,13);
  const idxSunset = meteoData.cloudSeries.time.findIndex(t => t.startsWith(sunsetHour));
  const targetIdx = idxSunset >= 0 ? idxSunset : 18;

  const low_e = meteoData.cloudSeries.cloudcover_low?.[targetIdx] ?? (meteoData.cloudSeries.cloudcover?.[targetIdx] ?? 50);
  const mid_e = meteoData.cloudSeries.cloudcover_mid?.[targetIdx] ?? (meteoData.cloudSeries.cloudcover?.[targetIdx] ?? 50);
  const high_e = meteoData.cloudSeries.cloudcover_high?.[targetIdx] ?? (meteoData.cloudSeries.cloudcover?.[targetIdx] ?? 20);

  return computeRedProbability(pm25, low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature);
}

// ACTUALIZAR MAPA DE CALOR
async function updateHeatmap(cityLat, cityLon) {
  if (!map || !heatmapEnabled) return;

  // Remover capas existentes
  if (heatLayer) {
    try { map.removeLayer(heatLayer); } catch(e) {}
  }
  if (labelLayer) {
    try { map.removeLayer(labelLayer); } catch(e) {}
  }

  // Crear capas nuevas
  heatLayer = L.layerGroup().addTo(map);
  labelLayer = L.layerGroup().addTo(map);

  // Mostrar indicador de carga
  document.getElementById('mapLoading').style.display = 'block';

  try {
    // Calcular dirección de la puesta de sol
    const sunsetAzimuth = calculateSunsetAzimuth(cityLat, cityLon);
    
    // Generar grilla hexagonal
    const hexagons = await generate7HexagonGrid(cityLat, cityLon, sunsetAzimuth);

  } catch (error) {
    console.error('Error actualizando mapa de calor:', error);
    log('Error creando hexágonos: ' + (error && error.message));
  } finally {
    document.getElementById('mapLoading').style.display = 'none';
  }
}

/* ========== FUNCIONES DE COLOR CON GRADIENTE ORIGINAL ========== */

// Obtener color según probabilidad usando el gradiente original
function getGradientColorForProbability(probability) {
  // Gradiente original de 5 colores
  const gradientStops = [
    { pos: 0.0, color: '#2b83ba' },   // Azul - 0%
    { pos: 0.25, color: '#abdda4' },  // Verde claro - 25%
    { pos: 0.5, color: '#ffffbf' },   // Amarillo - 50%
    { pos: 0.75, color: '#fdae61' },  // Naranja - 75%
    { pos: 1.0, color: '#d7191c' }    // Rojo - 100%
  ];
  
  // Encontrar entre qué dos stops está la probabilidad
  for (let i = 0; i < gradientStops.length - 1; i++) {
    const start = gradientStops[i];
    const end = gradientStops[i + 1];
    
    if (probability >= start.pos && probability <= end.pos) {
      // Calcular posición relativa entre los dos stops
      const t = (probability - start.pos) / (end.pos - start.pos);
      
      // Interpolar entre los dos colores
      return interpolateColor(start.color, end.color, t);
    }
  }
  
  // Fallback
  return gradientStops[gradientStops.length - 1].color;
}

// Función para interpolar entre dos colores hexadecimales
function interpolateColor(color1, color2, factor) {
  if (factor === 0) return color1;
  if (factor === 1) return color2;
  
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Función alternativa simple (para compatibilidad)
function getColorForProbability(probability) {
  return getGradientColorForProbability(probability);
}

// Mostrar/ocultar capa de calor
function toggleHeatmap() {
  heatmapEnabled = !heatmapEnabled;
  const button = document.getElementById('toggleHeatmap');
  
  if (heatmapEnabled && currentState.lat && currentState.lon) {
    button.classList.add('active');
    updateHeatmap(currentState.lat, currentState.lon);
  } else {
    button.classList.remove('active');
    if (heatLayer) {
      try { map.removeLayer(heatLayer); } catch(e) {}
      heatLayer = null;
    }
    if (labelLayer) {
      try { map.removeLayer(labelLayer); } catch(e) {}
      labelLayer = null;
    }
  }
}

// Mostrar/ocultar etiquetas
function toggleLabels() {
  labelsEnabled = !labelsEnabled;
  const button = document.getElementById('toggleLabels');
  
  if (labelsEnabled) {
    button.classList.add('active');
    if (labelLayer) {
      map.addLayer(labelLayer);
    } else if (currentState.lat && currentState.lon && heatmapEnabled) {
      updateHeatmap(currentState.lat, currentState.lon);
    }
  } else {
    button.classList.remove('active');
    if (labelLayer) {
      try { map.removeLayer(labelLayer); } catch(e) {}
    }
  }
}

/* ========== MODELO PREDICTIVO MEJORADO ========== */
function computeRedProbability(pm25, low, mid, high, elevDeg, isSunrise = false, temperature = 20) {
  const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
  const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
  const highPct = Math.max(0, Math.min(100, Number(high) || 0));

  // Factor temperatura
  const optimalTemp = 20;
  const tempSigma = 8;
  const tempScore = Math.exp(-Math.pow((temperature - optimalTemp) / tempSigma, 2));
  
  // === NUEVO: PENALIZACIÓN AGREGADA POR NUBES BAJAS ===
  // Las nubes bajas son críticas porque bloquean la visibilidad
  const lowCloudPenalty = Math.pow(lowPct / 100, 2); // Penalización cuadrática
  
  // === FACTOR NUBOSIDAD POR CAPAS (MODIFICADO) ===
  const layerScore = (
      0.10 * (lowPct / 100) +    // Reducido de 0.15 a 0.10
      0.30 * (midPct / 100) +    // Reducido de 0.35 a 0.30
      0.60 * (highPct / 100)     // Aumentado de 0.50 a 0.60
  );

  // === FACTOR GEOMETRÍA SOLAR ===
  const idealElev = -3.0;
  const geomSigma = 4.0;
  const geomScore = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));

  // === FACTOR CALIDAD DEL AIRE (PM2.5) ===
  const idealPM = 15;
  const pmSigma = 18;
  const pmScore = Math.exp(-Math.pow((pm25 - idealPM) / pmSigma, 2));

  // === FACTOR HUMEDAD ===
  const humidityScore = highPct / 100;

  // === FACTOR PRESIÓN ATMOSFÉRICA ===
  const pressureStability = 1.0 - Math.abs((lowPct + midPct) - highPct) / 200;
  const pressureScore = Math.max(0.3, Math.min(1.0, pressureStability));

  // === PESOS FINALES (ACTUALIZADOS) ===
  const wLayer = 0.45;      // Reducido de 0.55
  const wGeom  = 0.25;
  const wPM    = 0.05;
  const wHumidity = 0.05;
  const wPressure = 0.05;
  const wTemperature = 0.05;
  const wLowPenalty = 0.10; // NUEVO: peso para penalización de nubes bajas

  // Calcular score combinado
  const score = (wLayer * layerScore) + 
                (wGeom * geomScore) + 
                (wPM * pmScore) + 
                (wHumidity * humidityScore) + 
                (wPressure * pressureScore) +
                (wTemperature * tempScore) - 
                (wLowPenalty * lowCloudPenalty); // RESTA la penalización

  // Aplicar función logística para obtener probabilidad
  const logisticK = 10.0;
  const logisticMid = 0.5;
  let p = 1 / (1 + Math.exp(-logisticK * (score - logisticMid)));

  // === NUEVAS PENALIZACIONES ADICIONALES ===
  
  // 1. Penalización fuerte por nubes bajas altas
  if (lowPct > 60) {
    p *= Math.max(0.1, 1 - (lowPct / 100)); // Mínimo 10% de probabilidad
  }
  
  // 2. Penalización por cobertura total muy alta
  const totalCloud = (lowPct + midPct + highPct) / 3;
  if (totalCloud > 90) {
    p *= 0.2; // Reducción del 80% si cielo muy cubierto
  } else if (totalCloud > 70) {
    p *= 0.5; // Reducción del 50% si cielo bastante cubierto
  }
  
  // 3. Condición especial: muchas nubes bajas = visibilidad nula
  if (lowPct > 80 && totalCloud > 60) {
    p = Math.min(p, 0.15); // Máximo 15% si hay muchas nubes bajas
  }
  
  // 4. Condición óptima: pocas nubes bajas pero nubes altas
  if (lowPct < 20 && highPct > 50) {
    p = Math.min(0.99, p * 1.2); // Bonus del 20%
  }

  // Asegurar límites
  p = Math.max(0.01, Math.min(0.99, p)); // Mínimo 1%, máximo 99%

  return p;
}

/* ========== INTERFAZ PRINCIPAL ========== */

// Estado compartido actual
let currentState = {
    lat: null, lon: null, cityName: '', hourly: null, pm25: null, 
    preds: { sunrise: 0, sunset: 0 }, sunTimes: null, 
    sunriseElev: null, sunsetElev: null, meteoData: null
};

// Elemento para log visible en UI
const logEl = document.getElementById('log');

let cloudChart = null;

function log(msg) {
  const line = `[${new Date().toLocaleString()}] ${msg}`;
  console.log(line);
  logEl.textContent = line + '\n' + logEl.textContent;
}

/* ============================
   Workflow principal: predictRedSunset
   ============================ */

// Función principal: ejecuta la recolección de datos y calcula probabilidades
async function predictRedSunset(lat, lon, cityName='') {
  log(`Predicción para ${cityName || `${lat},${lon}`}`);

  try {
    // Inicializar o actualizar el mapa
    initMap(lat, lon, cityName);
    
    // Obtener datos meteorológicos usando la función unificada
    const [pm25, meteoData] = await Promise.all([ 
      getPM25(lat, lon), 
      getMeteoData(lat, lon)
    ]);
    
    // Actualizar estado global
    currentState.lat = lat; 
    currentState.lon = lon; 
    currentState.cityName = cityName;
    currentState.hourly = meteoData.cloudSeries; 
    currentState.pm25 = pm25;
    currentState.meteoData = meteoData;

    // Calcular tiempos solares
    const now = new Date();
    const times = SunCalc.getTimes(now, lat, lon);
    currentState.sunTimes = times;
    const sunrise = times.sunrise;
    const sunset  = times.sunset;
    const sunriseElev = SunCalc.getPosition(sunrise, lat, lon).altitude * (180/Math.PI);
    const sunsetElev  = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
    currentState.sunriseElev = sunriseElev;
    currentState.sunsetElev = sunsetElev;

    // Encontrar índices horarios
    const hrs = meteoData.cloudSeries?.time || [];
    const idxSunrise = hrs.findIndex(t => t.startsWith(sunrise.toISOString().slice(0,13)));
    const idxSunset  = hrs.findIndex(t => t.startsWith(sunset.toISOString().slice(0,13)));
    const idxS = idxSunrise >=0 ? idxSunrise : 6;
    const idxE = idxSunset  >=0 ? idxSunset  : 20;

    // Extraer valores de nubosidad
    const low_s  = meteoData.cloudSeries?.cloudcover_low?.[idxS]  ?? (meteoData.cloudSeries?.cloudcover?.[idxS] ?? 50);
    const mid_s  = meteoData.cloudSeries?.cloudcover_mid?.[idxS]  ?? (meteoData.cloudSeries?.cloudcover?.[idxS] ?? 50);
    const high_s = meteoData.cloudSeries?.cloudcover_high?.[idxS] ?? (meteoData.cloudSeries?.cloudcover?.[idxS] ?? 20);
    const tot_s  = meteoData.cloudSeries?.cloudcover?.[idxS] ?? Math.round((low_s + mid_s + high_s)/3);

    const low_e  = meteoData.cloudSeries?.cloudcover_low?.[idxE]  ?? (meteoData.cloudSeries?.cloudcover?.[idxE] ?? 50);
    const mid_e  = meteoData.cloudSeries?.cloudcover_mid?.[idxE]  ?? (meteoData.cloudSeries?.cloudcover?.[idxE] ?? 50);
    const high_e = meteoData.cloudSeries?.cloudcover_high?.[idxE] ?? (meteoData.cloudSeries?.cloudcover?.[idxE] ?? 20);
    const tot_e  = meteoData.cloudSeries?.cloudcover?.[idxE] ?? Math.round((low_e + mid_e + high_e)/3);

    // Calcular probabilidades
    const sunriseProb = computeRedProbability(pm25, low_s, mid_s, high_s, sunriseElev, true, meteoData.current.temperature);
    const sunsetProb  = computeRedProbability(pm25, low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature);

    currentState.preds.sunrise = sunriseProb;
    currentState.preds.sunset = sunsetProb;

    // Actualizar UI
    document.getElementById('loadingState').innerHTML = '';
    
    const dataTime = new Date(meteoData.current.timestamp);
    const fechaStr = dataTime.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const horaStr = dataTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

    document.getElementById('dataGrid').innerHTML = `
      <div class="data-item">☁️ Nubosidad: <strong>${Math.round(tot_e)}%</strong></div>
      <div class="data-item">🌫 PM2.5: <strong>${pm25.toFixed(1)} µg/m³</strong></div>
      <div class="data-item">⬆ Elev amanecer: <strong>${sunriseElev.toFixed(1)}°</strong></div>
      <div class="data-item">⬇ Elev atardecer: <strong>${sunsetElev.toFixed(1)}°</strong></div>
    `;

    document.getElementById('locationText').innerHTML = `
      📍 ${cityName || `(${lat.toFixed(2)}, ${lon.toFixed(2)})`}<br>
      <small style="opacity:0.8; font-size:0.9rem;">📅 Datos: ${fechaStr} 🕒 ${horaStr}</small>
    `;

    document.getElementById('sunTimes').innerHTML = `
      <div class="sun-time">🌅 Amanecer: ${sunrise.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
      <div class="sun-time">🌇 Atardecer: ${sunset.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
    `;

    const predBlock = document.getElementById('predictions');

    // Obtener estilos para cada probabilidad (igual que las tarjetas)
    const sunriseStyles = getProbabilityStyles(sunriseProb);
    const sunsetStyles = getProbabilityStyles(sunsetProb);

    // Crear el HTML con estilos inline usando los mismos colores que las tarjetas
    predBlock.innerHTML = `
      <div class="probability" style="
          background: ${sunriseStyles.background};
          border: ${sunriseStyles.border};
          box-shadow: ${sunriseStyles.boxShadow || 'none'};
          color: ${sunriseStyles.color};
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s;
          flex: 1;
      ">
        🌅 Amanecer: ${(sunriseProb*100).toFixed(0)}%
        ${sunriseProb > 0.8 ? '<div style="display:inline-block; margin-left:10px; animation: fire 1s infinite alternate;">🔥</div>' : ''}
      </div>
      <div class="probability" style="
          background: ${sunsetStyles.background};
          border: ${sunsetStyles.border};
          box-shadow: ${sunsetStyles.boxShadow || 'none'};
          color: ${sunsetStyles.color};
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s;
          flex: 1;
      ">
        🌇 Atardecer: ${(sunsetProb*100).toFixed(0)}%
        ${sunsetProb > 0.8 ? '<div style="display:inline-block; margin-left:10px; animation: fire 1s infinite alternate;">🔥</div>' : ''}
      </div>
    `;

    // Estilo del contenedor principal (opcional, para darle coherencia)
    predBlock.style.cssText = `
        display: flex;
        gap: 15px;
        margin: 20px 0;
        transition: all 0.3s ease;
        border-radius: 12px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    // Si ambas probabilidades son altas, darle un efecto especial al contenedor
    if (sunriseProb > 0.7 && sunsetProb > 0.7) {
        predBlock.style.background = "linear-gradient(135deg, rgba(255, 80, 80, 0.15), rgba(255, 95, 0, 0.1))";
        predBlock.style.border = "1px solid rgba(255, 95, 0, 0.3)";
        predBlock.style.boxShadow = "0 4px 20px rgba(255, 80, 80, 0.15)";
    } else if (sunriseProb > 0.7 || sunsetProb > 0.7) {
        // Si al menos una es alta
        predBlock.style.background = "linear-gradient(135deg, rgba(255, 80, 80, 0.1), rgba(255, 165, 0, 0.05))";
        predBlock.style.border = "1px solid rgba(255, 165, 0, 0.2)";
    }

    // Añadir animación para fuego si no está definida
    if ((sunriseProb > 0.8 || sunsetProb > 0.8) && !document.querySelector('style#fire-animation')) {
        const style = document.createElement('style');
        style.id = 'fire-animation';
        style.textContent = `
            @keyframes fire {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.2); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    // Actualizar gráfico
    if (meteoData.cloudSeries && meteoData.cloudSeries.time) {
      const times24 = meteoData.cloudSeries.time.slice(0,24).map(t => {
        const d = new Date(t);
        return d.getHours() + ':00';
      });
      const clouds = {
        total: meteoData.cloudSeries.cloudcover.slice(0,24).map(v => Math.round(v)),
        low: meteoData.cloudSeries.cloudcover_low.slice(0,24).map(v => Math.round(v)),
        mid: meteoData.cloudSeries.cloudcover_mid.slice(0,24).map(v => Math.round(v)),
        high: meteoData.cloudSeries.cloudcover_high.slice(0,24).map(v => Math.round(v)),
      };
      updateCloudChart(times24, clouds, sunrise, sunset);
    }

    // Actualizar mapa de calor
    if (heatmapEnabled) {
      await updateHeatmap(lat, lon);
    }

    // Escribir log
    log(`% arrebol: amanecer ${(sunriseProb*100).toFixed(1)}%, atardecer ${(sunsetProb*100).toFixed(1)}%`);
    log(`Presión ${meteoData.current.pressure.toFixed(0)} hPa, Humedad ${meteoData.current.humidity.toFixed(0)}%`);
    log(`Temp: ${meteoData.current.temperature.toFixed(1)}°C`);

  } catch (e) {
    document.getElementById('loadingState').innerHTML = '';
    log('Error en predictRedSunset: ' + (e && e.message));
    alert('Error al obtener datos. Revisa la consola.');
  }
}

function updateCloudChart(hours, cloudVals, sunriseTime, sunsetTime) {
  const ctx = document.getElementById('cloudChart').getContext('2d');
  if (cloudChart) cloudChart.destroy();
  
  const sunriseHour = sunriseTime.getHours();
  const sunsetHour = sunsetTime.getHours();
  const now = new Date();
  const currentHour = now.getHours();
  
  // Encontrar índices para las líneas verticales
  const sunriseIndex = hours.findIndex(h => {
    const hour = parseInt(h.split(':')[0]);
    return hour >= sunriseHour;
  });
  
  const sunsetIndex = hours.findIndex(h => {
    const hour = parseInt(h.split(':')[0]);
    return hour >= sunsetHour;
  });
  
  const currentIndex = hours.findIndex(h => {
    const hour = parseInt(h.split(':')[0]);
    return hour >= currentHour;
  });

  const isMobile = window.innerWidth < 768;
  
  // Primero crear la leyenda explicativa
  createChartLegend(sunriseTime, sunsetTime, currentHour);
  
  cloudChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [
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
          pointStyle: 'circle',
          pointRadius: isMobile ? 6 : 8, 
          pointHoverRadius: isMobile ? 10 : 14, 
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
          pointStyle: 'circle',
          pointRadius: isMobile ? 6 : 8, 
          pointHoverRadius: isMobile ? 10 : 14, 
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
          pointStyle: 'circle',
          pointRadius: isMobile ? 6 : 8, 
          pointHoverRadius: isMobile ? 10 : 14, 
        },
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
          pointStyle: 'circle',
          pointRadius: isMobile ? 7 : 9, 
          pointHoverRadius: isMobile ? 11 : 15, 
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: isMobile ? 1.2 : 1.3,
      plugins: { 
        title: {
          display: true,
          text: 'Nubosidad por Hora del Día en %ciudad',
          color: '#ffffff',
          font: {
            size: isMobile ? 18 : 20,
            weight: 'bold',
            family: 'Arial, sans-serif'
          },
          padding: {
            top: 5,
            bottom: 2 // Reducido para dejar espacio a la leyenda
          }
        },
        legend: { 
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 6,
            boxHeight: 6,
            color: '#ffffff',
            font: {
              size: isMobile ? 18 : 18,
              family: 'Arial, sans-serif',
              weight: 'normal'
            },
            padding: isMobile ? 8 : 19
          }
        },
        annotation: {
          annotations: {
            sunriseLine: {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: sunriseIndex >= 0 ? sunriseIndex : 6,
              borderColor: '#ffeb3b',
              borderWidth: 3,
              borderDash: [5, 5],
              label: { 
                enabled: true, 
                content: '🌅 Amanecer',
                position: 'top',
                backgroundColor: 'rgba(255, 235, 59, 0.7)',
                color: '#333',
                font: { size: isMobile ? 10 : 12, weight: 'bold' },
                padding: { x: 6, y: 4 }
              }
            },
            sunsetLine: {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: sunsetIndex >= 0 ? sunsetIndex : 18,
              borderColor: '#ff9800',
              borderWidth: 3,
              borderDash: [5, 5],
              label: { 
                enabled: true, 
                content: '🌇 Atardecer',
                position: 'top',
                backgroundColor: 'rgba(255, 152, 0, 0.7)',
                color: '#333',
                font: { size: isMobile ? 10 : 12, weight: 'bold' },
                padding: { x: 6, y: 4 }
              }
            },
            currentTimeLine: {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: currentIndex >= 0 ? currentIndex : hours.length / 2,
              borderColor: '#4CAF50',
              borderWidth: 3,
              borderDash: [3, 3],
              label: { 
                enabled: true, 
                content: '🕐 Ahora',
                position: 'top',
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                color: '#333',
                font: { size: isMobile ? 10 : 12, weight: 'bold' },
                padding: { x: 6, y: 4 }
              }
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            },
            // Añadir información adicional en el tooltip
            afterBody: function(context) {
              const index = context[0].dataIndex;
              const hour = hours[index];
              
              // Verificar si esta hora coincide con eventos importantes
              const lines = [];
              
              if (index === sunriseIndex) {
                lines.push('🌅 Hora del amanecer');
              }
              if (index === sunsetIndex) {
                lines.push('🌇 Hora del atardecer');
              }
              if (index === currentIndex) {
                lines.push('🕐 Hora actual aproximada');
              }
              
              return lines;
            }
          }
        }
      },
      scales: {
        x: { 
          title: {
            display: true,
            text: 'Hora del día',
            color: '#ffffff',
            font: { size: isMobile ? 16 : 18, weight: 'bold' }
          },
          grid: { 
            color: 'rgba(255,255,255,0.08)',
            drawOnChartArea: true
          }, 
          ticks: { 
            color: '#ffffff',
            maxRotation: isMobile ? 45 : 0,
            autoSkip: true,
            maxTicksLimit: isMobile ? 12 : 24,
            font: {
              size: isMobile ? 14 : 16
            },
            // Destacar horas importantes en las etiquetas
            callback: function(value, index) {
              const hour = hours[index];
              if (index === sunriseIndex) {
                return `🌅 ${hour}`;
              } else if (index === sunsetIndex) {
                return `🌇 ${hour}`;
              } else if (index === currentIndex) {
                return `🕐 ${hour}`;
              }
              return hour;
            }
          } 
        },
        y: { 
          title: {
            display: true,
            text: 'Cantidad de nubes',
            color: '#ffffff',
            font: { size: isMobile ? 16 : 18, weight: 'bold' }
          },
          beginAtZero: true, 
          max: 100, 
          grid: { 
            color: 'rgba(255,255,255,0.08)',
            drawOnChartArea: true
          }, 
          ticks: { 
            color: '#ffffff',
            stepSize: 20, // Esto fuerza incrementos de 20%
            callback: function(value) {
              return value + '%';
            },
            font: {
              size: isMobile ? 14 : 16
            }
          } 
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      elements: {
        point: {
          radius: isMobile ? 4 : 6,
          hoverRadius: isMobile ? 8 : 12
        }
      }
    }
  });
}

function createChartLegend(sunriseTime, sunsetTime, currentHour) {
  // Formatear horas
  const sunriseStr = sunriseTime.toLocaleTimeString('es-CL', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  const sunsetStr = sunsetTime.toLocaleTimeString('es-CL', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  const currentStr = `${currentHour.toString().padStart(2, '0')}:00`;
  
  // Buscar y eliminar leyenda anterior si existe
  const oldLegend = document.querySelector('.chart-time-legend');
  if (oldLegend) {
    oldLegend.remove();
  }
  
  // Crear contenedor para la leyenda
  const legendContainer = document.createElement('div');
  legendContainer.className = 'chart-time-legend';
  
  // Elementos de la leyenda MÁS COMPACTA
  legendContainer.innerHTML = `
    <div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
      <div style="width: 12px; height: 3px; background: #ffeb3b; border-radius: 1px;"></div>
      <span>🌅 Amanecer ${sunriseStr}</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
      <div style="width: 12px; height: 3px; background: #ff9800; border-radius: 1px;"></div>
      <span>🌇 Puesta de sol ${sunsetStr}</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
      <div style="width: 12px; height: 3px; background: #4CAF50; border-radius: 1px;"></div>
      <span>🕐 Ahora ${currentStr}</span>
    </div>
  `;
  
  // Insertar la leyenda en el contenedor .charts
  const chartsContainer = document.querySelector('.charts');
  const canvas = document.getElementById('cloudChart');
  
  // Insertar al principio del contenedor (antes del canvas)
  if (chartsContainer.firstChild) {
    chartsContainer.insertBefore(legendContainer, chartsContainer.firstChild);
  } else {
    chartsContainer.appendChild(legendContainer);
  }
}

// Exportar funciones de gráficos
window.updateCloudChart = updateCloudChart;
window.createChartLegend = createChartLegend;

/* ============================
   Small helpers
   ============================ */

// Clase de probabilidad para estilos (alto/medio/bajo)
function probClass(p) {
  if (p > 0.7) return 'high-prob';
  if (p < 0.4) return 'low-prob';
  return 'medium-prob';
}

// Ejecutar al cargar
initCityMenu();

</script>

<footer class="footer">
    <p>Préboles 2025. Nicolás Medina Peña.</p>
    <nav>
        <a href="https://nicomedinap.github.io/about.html" target="_blank"> <u>Sobre el autor</u></a>
        <a href="https://nicomedinap.github.io/2025/12/21/Preboles.html" target="_blank"> <u>Sobre el modelo predictivo y los datos</u></a>
    </nav>
</footer>

</body>
</html>