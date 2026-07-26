---
layout: none
---

<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="
  <meta name="description"
  content="Préboles es un predictor de arreboles que estima la probabilidad de observar un amanecer o atardecer rojo utilizando datos meteorológicos en tiempo real.">width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="keywords"
  content="arrebol, atardecer, amanecer, cielo rojo, meteorología, Chile, predictor de arreboles">
  <title>Predictor de Arreboles (Préboles)</title>
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-N9ZJVJKDMB"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-N9ZJVJKDMB');
  </script>

  <!-- Dependencias externas -->
  <script src="https://unpkg.com/suncalc"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.2.1/dist/chartjs-plugin-annotation.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <link rel="stylesheet" href="https://nicomedinap.github.io/public/css/preboles_3.css">

  <style>
    .mode-toggle {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding-top: 10px;
    }
    .mode-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 6px 16px;
      color: white;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;
    }
    .mode-btn.active {
      background: var(--accent);
      border-color: transparent;
      font-weight: 600;
    }

    .coord-predict-panel { margin: 8px 0; }
  </style>
  
</head>

<body>

<!--
  <div class="mode-toggle">
    <button class="mode-btn active" data-mode="chile" onclick="setMode('chile')">🇨🇱 Chile</button>
    <button class="mode-btn" data-mode="world" onclick="setMode('world')">🌎 Mundo</button>
  </div>

  <div class="coord-predict-panel">
    <button class="toggle-btn" onclick="toggleCoordPanel()">📍 Predecir por coordenadas</button>
    <div id="coordPanelBody" style="display:none; margin-top:8px;">
      <div class="controls">
        <input type="number" id="coordLat" placeholder="Latitud" step="0.0001">
        <input type="number" id="coordLon" placeholder="Longitud" step="0.0001">
        <button onclick="predictFromManualCoords()">Predecir</button>
        <button onclick="predictFromGeolocation()">📡 Usar mi ubicación</button>
      </div>
    </div>
  </div> -->

  <div class="title-container">
    <h2 class="title">
      Préboles<span class="trebol-wrap"><span class="gradient-text trebol-arebol" id="trebolEmoji">🍀</span><span id="arrebolPercent" class="arrebol-percent">0%</span></span>    </h2>
    <div class="subtitle">
      <span class="gradient-text">PRE</span>dictor de arre<span class="gradient-text">BOLES</span>
    </div>
  </div>
  
  <div id="loadingIndicator" style="text-align:center; padding:20px;">
    <div class="loading" style="width:40px; height:40px; margin:0 auto;"></div>
    <p style="margin-top:10px;">Obteniendo datos...</p>
  </div>

  <!-- CONTENEDOR PRINCIPAL CON PESTAÑAS -->
  <div class="tabs-container">
    <div class="tabs-header">
      <button class="tab-btn active" data-tab="cities"        onclick="switchTab('cities')">🏙️ Ciudades</button>
      <button class="tab-btn"        data-tab="observatories" onclick="switchTab('observatories')" style="font-size:0.95em;display:flex;align-items:center;justify-content:center;gap:5px;">🔭 Observatorios</button>
      <button class="tab-btn"        data-tab="ranking"       onclick="switchTab('ranking')">📊 Ranking</button>
      <button class="tab-btn"        data-tab="history"       onclick="switchTab('history')">📜 Datos</button>
    </div>

    <div class="prediction-toggle">
      <button id="btnSunrise">🌅 Amanecer</button>
      <button id="btnSunset" class="active">🌇 Atardecer</button>
    </div>
    
    <div class="day-selector" id="daySelector"></div>

    <!-- Pestaña 1: Ciudades -->   
    <div id="tab-cities" class="tab-content active">
      <h2>Probabilidad de arrebol en la tarde</h2>
      <span id="fechaPrediccion"></span>
      <div id="queryDateTime" style="opacity:0.8; font-size:0.9rem; margin-bottom:10px;"></div>

      <div id="cityMenu"></div>
      <div id="appContainer">
        <button class="back" onclick="volverMenu()">← Volver</button>
        <div class="container">
          <h1 id="cityTitle">🌇 Predictor de Arrebol</h1>
          
          <!-- Contenedor principal con elementos independientes -->
          <div class="main-grid">
            <!-- 1. PREDICCIÓN (siempre primera) -->
            <div class="prediction-panel panel">
              <div id="result">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
                  <div style="flex:1; min-width:200px;">
                    <div id="locationText">Seleccione ciudad</div>
                    <div class="sun-times" id="sunTimes"></div>
                  </div>
                  <div id="loadingState"></div>
                </div>
                <div class="data-grid" id="dataGrid">
                  <div class="data-item">🌅 Nubes a puesta de sol: <strong id="sunsetClouds">—</strong></div>
                  <div class="data-item">🌡️ Temperatura: <strong id="temperature">—</strong></div>
                  <div class="data-item">💧 Humedad: <strong id="humidity">—</strong></div>
                  <div class="data-item">📊 Presión: <strong id="pressure">—</strong></div>
                </div>
                <div class="predictions" id="predictions"></div>
                
                <!-- Botones toggle para paneles -->
                <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap;">
                  <button class="toggle-btn" onclick="togglePanel('factorPanel')" id="toggleFactorBtn">
                    📊 Ver contribuciones
                  </button>
                  <button class="toggle-btn" onclick="togglePanel('uncertaintyPanel')" id="toggleUncertaintyBtn">
                    🎯 Ver incerteza
                  </button>
                </div>
                
                <!-- Panel de contribuciones por factor (oculto por defecto) -->
                <div id="factorPanel" style="margin-top:6px; display:none;"></div>
                <!-- Panel de incerteza Monte Carlo (oculto por defecto) -->
                <div id="uncertaintyPanel" style="margin-top:6px; display:none;"></div>
              </div>
            </div>
            
            <!-- 2. MAPA -->
            <div class="map-panel panel">
              <div><strong>Mapa de probabilidad de arrebol</strong></div>
              <div class="map-wrapper" style="height:550px;">
                <div id="map"></div>
                <div class="probability-legend">
                  <div class="legend-title">Probabilidad de arrebol</div>
                  <div class="legend-gradient"></div>
                  <div class="legend-labels">
                    <span>0%</span><span>50%</span><span>100%</span>
                  </div>
                </div>
                <div class="map-controls">
                  <button class="map-toggle active" id="toggleHeatmap" onclick="MapUtils.toggleHeatmap()">Hexágonos</button>
                </div>
                <div id="mapLoading" class="map-loading" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.8); color:white; padding:10px; border-radius:8px;">
                  Calculando...
                </div>
              </div>
              <div style="font-size:0.9rem; opacity:0.9; margin-top:8px;">
                Celdas hexagonales muestran la probabilidad de arrebol en la trayectoria hacia el atardecer. 
                Resolución proporcional a los datos de Open-Meteo.
                Colores más cálidos indican mayor probabilidad.
              </div>
            </div>
            
            <!-- 3. GRÁFICO -->
            <div class="chart-panel panel">
              <div class="charts" style="height:400px; width:100%;">
                <canvas id="cloudChart"></canvas>
              </div>
            </div>
            
            <!-- 4. LOG -->
            <div class="log-panel panel">
              <strong>registro</strong>
              <pre id="log" style="white-space:pre-wrap; font-size:0.85rem; margin:8px 0 0 0; max-height:150px; overflow-y:auto;"></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
        
    <!-- Pestaña 2: Ranking -->
    <div id="tab-ranking" class="tab-content">
      <div class="container">
        <h2>Ranking de Probabilidades</h2>
        <div class="info-grid">
          <div class="info-card">
            <h4>🥇 Top 10 - Mayor Probabilidad al atardecer</h4>
            <br>
            <div id="topRanking"><p>Cargando ranking...</p></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pestaña 3: Observatorios -->
    <div id="tab-observatories" class="tab-content">
      <div class="container">
        <h2>🔭 Observatorios Astronómicos en Chile</h2>
        <p class="lead" style="margin-left:auto; margin-right:auto;">Chile es la capital mundial de la astronomía. Selecciona un observatorio para ver la probabilidad de arrebol.</p>
        
        <div class="observatories-grid">
          <!-- MENÚ DE OBSERVATORIOS -->
          <div id="observatoryMenu" class="city-menu"></div>
          
          <!-- MAPA DE OBSERVATORIOS -->
          <div class="panel" style="height:600px;">
            <div><strong>📍 Ubicación de Observatorios</strong></div>
            <div class="map-wrapper" style="height:50px;">
              <div id="observatoriesMap"></div>
              <div class="map-legend" style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.7); padding:8px 12px; border-radius:6px; color:white; font-size:0.85rem;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                  <div style="width:16px; height:16px; background:#ff9800; border-radius:50%; border:2px solid white;"></div>
                  <span>Observatorio astronómico</span>
                </div>
                <div style="font-size:0.8rem; opacity:0.9;">Haz clic en un marcador para ver detalles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pestaña 4: Información -->
    <div id="tab-info" class="tab-content">
      <div class="container">
        <p class="lead-with-bg"><span class="lead-content">El arrebol es el fenómeno óptico donde la luz colorea las nubes de rojo, naranjo o rosado. Las nubes reflejan diferentes colores dependiendo del tipo de nube, y con eso es posible hacer una predicción. Elige tu ciudad y prueba tu suerte!!</span></p>

        <h2>ℹ️ Información sobre Préboles</h2>
        <div class="info-section">
          <h3>¿Qué es un arrebol?</h3>
          <p>El arrebol es un fenómeno atmosférico-óptico que ocurre durante el amanecer y atardecer, cuando la luz solar ilumina las nubes desde abajo, produciendo colores rojizos, anaranjados y rosados en el cielo.</p>
          <h4>Condiciones ideales</h4>
          <ul>
            <li>Nubes altas o medias</li>
            <li>Cielo parcialmente nublado</li>
            <li>Elevación solar entre -6° y 6°</li>
            <li>Humedad relativa moderada</li>
          </ul>
          <h4>Factores analizados</h4>
          <ul>
            <li>Nubosidad a diferentes alturas</li>
            <li>Posición solar</li>
            <li>Presión atmosférica</li>
            <li>Temperatura y humedad</li>
          </ul>

          <h3>Cómo interpretar los resultados</h3>
          <div class="info-grid">
            <div class="info-card" style="border-left:4px solid #d7191c;">
              <h4 style="color:#d7191c;">🔴 Alta probabilidad (70-100%)</h4>
              <p>Condiciones excelentes. Es muy probable que puedas observar un arrebol espectacular si las condiciones se mantienen.</p>
            </div>
            <div class="info-card" style="border-left:4px solid #fdae61;">
              <h4 style="color:#fdae61;">🟠 Media-alta (30-70%)</h4>
              <p>Buenas condiciones. Hay posibilidades significativas de ver un arrebol, especialmente si estás en un lugar despejado.</p>
            </div>
            <div class="info-card" style="border-left:4px solid #abdda4;">
              <h4 style="color:#abdda4;">🟢 Baja (0-30%)</h4>
              <p>Condiciones desfavorables. Es poco probable que observes un arrebol significativo.</p>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3 class="subsection-title">Contacto y redes sociales</h3>
          <p>Para consultas técnicas, sugerencias o reportes de observaciones:</p>
          <div class="contact-links">
            <a href="https://nicomedinap.github.io/about.html" target="_blank" class="contact-link">
              <span class="link-icon">👤</span><span class="link-text">Sobre el autor</span>
            </a>
            <a href="https://nicomedinap.github.io/2025/12/21/Preboles.html" target="_blank" class="contact-link">
              <span class="link-icon">📄</span><span class="link-text">Artículo técnico</span>
            </a>
            <a href="https://github.com/nicomedinap" target="_blank" class="contact-link github">
              <span class="link-icon">🐙</span><span class="link-text">GitHub</span>
            </a>
            <a href="https://www.instagram.com/nicomediap/" target="_blank" class="contact-link instagram">
              <span class="link-icon">📷</span><span class="link-text">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pestaña 5: Historial — contenido generado dinámicamente por renderHistoryTab() -->
    <div id="tab-history" class="tab-content"></div>

    <!-- Modal para cámara meteorológica -->
    <div id="weatherCameraModal" class="weather-camera-modal">
      <div class="weather-camera-content">
        <div class="weather-camera-header">
          <h3><span id="cameraLocationName">Cámara Meteorológica</span></h3>
          <button class="close-camera" onclick="closeWeatherCamera()">&times;</button>
        </div>
        <div class="weather-camera-body" id="cameraBody">
          <div class="weather-camera-fallback">
            <i>🌤️</i>
            <p>Cargando cámara...</p>
          </div>
        </div>
      </div>
    </div>

  </div><!-- /.tabs-container -->

  <!-- ==========================================================================
       MÓDULOS
       ========================================================================== -->

  <!-- Funciones y procedimientos -->
  <script src="https://nicomedinap.github.io/preboles/timeUtils.js"></script>
  <script src="https://nicomedinap.github.io/preboles/maps.js"></script>
  <script src="https://nicomedinap.github.io/preboles/chartUtils.js"></script>
  <script src="https://nicomedinap.github.io/preboles/redProbability.js"></script>

  <!-- UI -->
  <script src="https://nicomedinap.github.io/preboles/tarjetas.js"></script>
  <script src="https://nicomedinap.github.io/preboles/navegacion.js"></script>

  <!-- Datos -->
  <script src="https://nicomedinap.github.io/preboles/ciudades.js"></script>
  <script src="https://nicomedinap.github.io/preboles/Mundo.js"></script>

  <!-- Utilidades -->
  <script src="https://nicomedinap.github.io/preboles/ranking.js"></script>
  <script src="https://nicomedinap.github.io/preboles/GuardarDatos.js"></script>
  <script src="https://nicomedinap.github.io/preboles/prebol.js"></script>

  <!-- ==========================================================================
       MÓDULO: FUNCIÓN TOGGLE PARA PANELES
       ========================================================================== -->
  <script>

    document.addEventListener('DOMContentLoaded', () => {
      ['factorPanel', 'uncertaintyPanel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      const fb = document.getElementById('toggleFactorBtn');
      const ub = document.getElementById('toggleUncertaintyBtn');
      if (fb) fb.textContent = '📊 Ver contribuciones';
      if (ub) ub.textContent = '🎯 Ver incerteza';
    });

  </script>

  <!-- ==========================================================================
       MÓDULO: CÁMARA METEOROLÓGICA
       ========================================================================== -->
  <script>

    function openWeatherCamera(locationName) {
      const location = chileanCities[locationName];
      if (!location?.weatherCamera) {
        alert(`No hay cámara meteorológica disponible para ${locationName}`);
        return;
      }
      const modal = document.getElementById('weatherCameraModal');
      const cameraBody = document.getElementById('cameraBody');
      document.getElementById('cameraLocationName').innerHTML = `<i>📷</i> ${locationName} - Cámara de referencia`;
      cameraBody.innerHTML = '';
      const url = location.weatherCamera;

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let embedUrl = url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
        cameraBody.innerHTML = `<iframe class="weather-camera-iframe" src="${embedUrl}?autoplay=1&mute=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
        cameraBody.innerHTML = `<div style="text-align:center;"><img src="${url}" alt="Weather Camera" style="max-width:100%; max-height:60vh; border-radius:12px;"><p style="color:#ccc; margin-top:10px; font-size:0.85rem;">Imagen actualizada periódicamente</p></div>`;
      } else {
        cameraBody.innerHTML = `<iframe class="weather-camera-iframe" src="${url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        setTimeout(() => {
          const iframe = cameraBody.querySelector('.weather-camera-iframe');
          if (iframe?.contentDocument?.readyState === 'complete' && iframe.contentDocument.body.innerHTML === '') {
            iframe.style.display = 'none';
            cameraBody.insertAdjacentHTML('beforeend', `<div class="weather-camera-fallback"><i>🌍</i><p>No se pudo cargar la cámara directamente.</p><a href="${url}" target="_blank">Abrir en nueva ventana →</a></div>`);
          }
        }, 5000);
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeWeatherCamera() {
      document.getElementById('weatherCameraModal').classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        document.getElementById('cameraBody').innerHTML = '<div class="weather-camera-fallback"><i>🌤️</i><p>Cargando cámara...</p></div>';
      }, 300);
    }

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWeatherCamera(); });
    document.getElementById('weatherCameraModal').addEventListener('click', function(e) {
      if (e.target === this) closeWeatherCamera();
    });

  </script>

<!--
  <script>
    window.PrebolesMode = window.PrebolesMode || 'chile'; // 'chile' | 'world'

    function getActiveLocations() {
      return window.PrebolesMode === 'world' ? (window.WorldCities || {}) : window.chileanCities;
    }
    window.getActiveLocations = getActiveLocations;

    function setMode(mode) {
      if (mode === window.PrebolesMode) return;
      window.PrebolesMode = mode;

      document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

      // Observatorios, Ranking y Datos son contenido específico de Chile.
      const chileOnlyTabs = ['observatories', 'ranking', 'history'];
      chileOnlyTabs.forEach(tab => {
        const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
        if (btn) btn.style.display = mode === 'world' ? 'none' : '';
      });
      if (mode === 'world' && chileOnlyTabs.includes(getCurrentTab())) switchTab('cities');

      closeDetailView();
      mountCityCardView();
    }
    window.setMode = setMode;
  </script> -->



  <!-- ==========================================================================
       SCRIPT PRINCIPAL
       ========================================================================== -->
  <script>

    /* ==========================================================================
       CONFIGURACIONES Y CONSTANTES
       ========================================================================== */
    const BATCH_SIZE = 3;
    const DELAY = 500;
    const API_CACHE = {};

    const DEFAULT_UNCERTAINTY = {
      cloudcover_low: { std: 18, min: 0, max: 100, distribution: 'beta' },
      cloudcover_mid: { std: 15, min: 0, max: 100, distribution: 'beta' },
      cloudcover_high: { std: 12, min: 0, max: 100, distribution: 'beta' },
      temperature_2m: { std: 2.5, min: -20, max: 45, distribution: 'normal' },
      pressure_msl: { std: 4, min: 950, max: 1050, distribution: 'normal' },
      relativehumidity_2m: { std: 10, min: 0, max: 100, distribution: 'beta' },
      shortwave_radiation: { std: 25, min: 0, max: 1200, distribution: 'lognormal' }
    };



    let map = null, marker = null, heatLayer = null, labelLayer = null;
    let heatmapEnabled = true, labelsEnabled = true, weatherDataCache = {};

    let currentState = {
      lat: null, lon: null, cityName: '', hourly: null,
      preds: { sunrise: 0, sunset: 0 }, sunTimes: null,
      sunriseElev: null, sunsetElev: null, meteoData: null
    };

    let currentLocation = {
      type: null, name: '', lat: null, lon: null, data: null, originalTab: null
    };

    function log(msg) {
      const line = `[${new Date().toLocaleString()}] ${msg}`;
      console.log(line);
      const el = document.getElementById('log');
      if (el) el.textContent = line + '\n' + el.textContent;
    }

    window.prebolesResultados = {};



    // Botón "atrás"/"adelante" del navegador: si la URL vuelve a tener
    // ?ciudad=X, reabre esa ciudad; si no, cierra el detalle sin volver
    // a tocar el historial (el navegador ya lo hizo).
    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const ciudad = params.get('ciudad');

      if (ciudad && chileanCities[ciudad]) {
        const tipo = params.get('tipo') || 'city';
        showPrediction(ciudad, tipo, false);
      } else {
        closeDetailView();
      }
    });

    /* ====================================
       MAPA DE OBSERVATORIOS
       ==================================== */
    function initObservatoriesMap() {
      const mapContainer = document.getElementById('observatoriesMap');
      if (!mapContainer || mapContainer._leaflet_id) return;
      const obsMap = L.map('observatoriesMap').setView([-30, -70], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(obsMap);
      Object.entries(chileanCities).filter(([, info]) => info.type === 'observatory').forEach(([name, obs]) => {
        const customIcon = L.divIcon({
          className: 'observatory-icon',
          html: `<div style="background:#ff9800;width:24px;height:24px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:12px;color:white;">🔭</div>`,
          iconSize: [24, 24], iconAnchor: [12, 12]
        });
        L.marker([obs.lat, obs.lon], { icon: customIcon }).addTo(obsMap).bindPopup(`
          <div style="min-width:200px;">
            <strong>${name}</strong><br><small>${obs.region}</small><br>
            <hr style="margin:5px 0;opacity:0.3;">
            <strong>Altitud:</strong> ${obs.altitude ? obs.altitude.toLocaleString() : 'N/A'} m<br>
            ${obs.operator ? `<strong>Operador:</strong> ${obs.operator}<br>` : ''}
            <button onclick="showPrediction('${name}', 'observatory')" style="margin-top:5px;padding:5px 10px;background:#ff6600;border:none;border-radius:4px;color:white;cursor:pointer;font-size:12px;width:100%;">Ver predicción</button>
          </div>`);
      });
    }

    /* ==========================================================================
       OBTENCIÓN DE DATOS METEOROLÓGICOS
       ========================================================================== */
    async function getMeteoData(lat, lon) {
      const cacheKey = `meteo_${lat.toFixed(2)}_${lon.toFixed(2)}`;
      if (API_CACHE[cacheKey]) return API_CACHE[cacheKey];
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,pressure_msl,relativehumidity_2m,temperature_2m,dewpoint_2m,windspeed_300hPa,windspeed_500hPa,windspeed_850hPa,shortwave_radiation&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.hourly) return getFallbackData();
        const currentHour = new Date().toISOString().slice(0, 13);
        const idx = data.hourly.time.findIndex(t => t.startsWith(currentHour));
        const current = idx >= 0 ? {
          pressure: data.hourly.pressure_msl?.[idx] ?? 1013,
          humidity: data.hourly.relativehumidity_2m?.[idx] ?? 50,
          temperature: data.hourly.temperature_2m?.[idx] ?? 20,
          dewpoint: data.hourly.dewpoint_2m?.[idx] ?? 10,
          timestamp: data.hourly.time?.[idx] ?? new Date().toISOString()
        } : { pressure: 1013, humidity: 50, temperature: 20, dewpoint: 10, timestamp: new Date().toISOString() };
        const result = { cloudSeries: data.hourly, current };
        API_CACHE[cacheKey] = result;
        return result;
      } catch (e) {
        console.warn('Error obteniendo datos meteorológicos:', e);
        return getFallbackData();
      }
    }

    function getFallbackData() {
      return { cloudSeries: null, current: { pressure: 1013, humidity: 50, temperature: 20, dewpoint: 10, timestamp: new Date().toISOString() } };
    }

    /* ==========================================================================
       PREDICCIÓN PRINCIPAL
       ========================================================================== */
    async function collectTrainingData(cityName, lat, lon, sunriseResult, sunsetResult, sunriseElev, sunsetElev, sunrise, sunset, optimalSunsetTime, sunriseData, sunsetData, meteoData) {
      try {
        if (typeof dataCollector === 'undefined') return;
        const srProb = (typeof sunriseResult === 'number') ? sunriseResult : sunriseResult.probability;
        const ssProb = (typeof sunsetResult === 'number') ? sunsetResult : sunsetResult.probability;
        dataCollector.collectPrediction({
          locationName: cityName, locationType: currentLocation.type || 'city', lat, lon,
          altitude: chileanCities[cityName]?.altitude ?? 0,
          sunriseProb: srProb, sunsetProb: ssProb, sunriseElev, sunsetElev,
          sunriseTime: sunrise?.toISOString() ?? null, sunsetTime: sunset?.toISOString() ?? null,
          optimalArrebolTime: optimalSunsetTime ?? null,
          cloudsAtSunset: { low: sunsetData?.low ?? 0, mid: sunsetData?.mid ?? 0, high: sunsetData?.high ?? 0, total: sunsetData?.total ?? 0 },
          cloudsAtSunrise: { low: sunriseData?.low ?? 0, mid: sunriseData?.mid ?? 0, high: sunriseData?.high ?? 0, total: sunriseData?.total ?? 0 },
          weatherData: { temperature: meteoData.current.temperature, humidity: meteoData.current.humidity, pressure: meteoData.current.pressure, dewpoint: meteoData.current.dewpoint },
          timestamp: new Date().toISOString(), actualArrebol: null,
          uncertainty: (typeof sunsetResult === 'object' && sunsetResult.confidence) ? {
            sunrise: sunriseResult.uncertainty, sunset: sunsetResult.uncertainty,
            sunriseCI: sunriseResult.confidenceInterval, sunsetCI: sunsetResult.confidenceInterval,
            nSimulations: sunsetResult.nSimulations
          } : null
        });
        log('📊 Datos recolectados');
      } catch (e) {
        log(`⚠ Error en recolección de datos: ${e.message}`);
      }
    }

    async function predictRedSunset(lat, lon, cityName = '') {
      updateQueryDateTime();
      log(`Predicción para ${cityName || `${lat},${lon}`}`);
      try {
        MapUtils.clearMapLayers();
        MapUtils.initMap(lat, lon, cityName);

        const altitude = chileanCities[cityName]?.altitude ?? 0;
        const result = await computeCityPrediction(lat, lon, { nSimulations: 20, returnFactors: true, altitude });
        
        if (!result) throw new Error('No se pudieron obtener datos meteorológicos.');

        const { meteoData, sunsetMoment, sunriseMoment } = result;
        const sunsetProbResult  = result.sunset;
        const sunriseProbResult = result.sunrise;

        const now   = timeUtils.localNoonDate(timeUtils.getQueryDate());
        const times = SunCalc.getTimes(now, lat, lon);
        const { sunrise, sunset } = times;

        const sunriseData      = sunriseMoment.data;
        const sunsetData       = sunsetMoment.data;
        const sunriseElev      = sunriseMoment.elevDeg;
        const sunsetElev       = sunsetMoment.elevDeg;
        const optimalSunsetTime = sunsetMoment.optimalTime;

        log(`✓ Atardecer: ${optimalSunsetTime.toLocaleTimeString('es-CL')}`);
        log(`  Nubes: Bajas=${Math.round(sunsetData.low)}% Med=${Math.round(sunsetData.mid)}% Alt=${Math.round(sunsetData.high)}%`);
        log(`  Irradiancia: ${Math.round(sunsetData.shortwave ?? 0)} W/m²`);

        currentState = {
          lat, lon, cityName,
          hourly: meteoData.cloudSeries,
          meteoData,
          sunTimes: times,
          sunriseElev, sunsetElev,
          sunriseMoment,
          preds: { sunrise: sunriseProbResult.probability, sunset: sunsetProbResult.probability },
          sunriseData, sunsetData,
          optimalSunsetTime,
          altitude
        };

        // Expone la última predicción calculada.
        window.lastPrediction = {
            cityName,
            sunrise: Math.round(sunriseProbResult.probability * 100),
            sunset: Math.round(sunsetProbResult.probability * 100)
        };

        // Para que Playwright pueda acceder a toda la info.
        window.prebolesPredicciones ??= {};
        window.prebolesPredicciones[cityName] = {
            lat, lon,
            sunrise: Math.round(sunriseProbResult.probability * 100),
            sunset: Math.round(sunsetProbResult.probability * 100),
            sunriseConfidence: sunriseProbResult.confidence,
            sunsetConfidence: sunsetProbResult.confidence
        };

        await collectTrainingData(cityName, lat, lon, sunriseProbResult, sunsetProbResult, sunriseElev, sunsetElev, sunrise, sunset, optimalSunsetTime, sunriseData, sunsetData, meteoData);

        updateUI(cityName, lat, lon, meteoData, sunrise, sunset, sunriseData, sunsetData, sunriseProbResult, sunsetProbResult, optimalSunsetTime);
        updateCharts(meteoData, sunrise, sunset, timeUtils.getSunsetIndex(meteoData, lat, lon, true), timeUtils.getSunsetIndex(meteoData, lat, lon, false));
        if (heatmapEnabled) await MapUtils.updateHeatmap(lat, lon, altitude);

        log(`% arrebol: amanecer ${(sunriseProbResult.probability * 100).toFixed(1)}% ±${(sunriseProbResult.confidence.std * 100).toFixed(1)}%`);
        log(`% arrebol: atardecer ${(sunsetProbResult.probability * 100).toFixed(1)}% ±${(sunsetProbResult.confidence.std * 100).toFixed(1)}%`);
        log(`Confianza atardecer: ${sunsetProbResult.confidence.level}`);
        log(`Máximo arrebol estimado: ${optimalSunsetTime.toLocaleTimeString('es-CL')}`);
      } catch (e) {
        document.getElementById('loadingState').innerHTML = '';
        log('Error en predictRedSunset: ' + e?.message);
        console.error(e);
      }
    }

    /* ==========================================================================
       ACTUALIZACIÓN DE UI
       ========================================================================== */
    function updateUI(cityName, lat, lon, meteoData, sunrise, sunset, sunriseData, sunsetData, sunriseResult, sunsetResult, optimalSunsetTime) {
      document.getElementById('loadingState').innerHTML = '';
      const locationInfo = chileanCities[cityName];

      document.getElementById('dataGrid').innerHTML = '';

      let locationHTML = `📍 ${cityName}`;
      if (locationInfo) {
        const typeLabels = { observatory: '🔭 Observatorio Astronómico', park: '🌳 Parque Nacional' };
        locationHTML += `<br><small style="opacity:0.8;font-size:0.9rem;">${typeLabels[locationInfo.type] ? typeLabels[locationInfo.type] + '<br>' : ''}${locationInfo.altitude ? `Altitud: ${locationInfo.altitude.toLocaleString()} m • ` : ''}${locationInfo.operator ? `Operador: ${locationInfo.operator} • ` : ''}Región: ${locationInfo.region}</small>`;
      }

      const cameraBtn = locationInfo?.weatherCamera
        ? `<button class="weather-camera-btn" onclick="openWeatherCamera('${cityName.replace(/'/g, "\\'")}')"><span>📷</span> Ver cámara en directo</button>`
        : '';

      document.getElementById('locationText').innerHTML = `
        <div class="location-header-row">
          <div>${locationHTML}</div>
          <div>${cameraBtn}</div>
        </div>`;

      const srCloudUI = sunriseData?.total != null ? `${Math.round(sunriseData.total)}%` : '—';
      const ssCloudUI = sunsetData?.total != null ? `${Math.round(sunsetData.total)}%` : '—';

      document.getElementById('sunTimes').innerHTML = `
        <div class="sun-time">
          🌅 Amanecer: ${sunrise.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}
          <div class="sun-time-clouds">Nubes: ☁ ${srCloudUI}</div>
        </div>
        <div class="sun-time">
          🌇 Atardecer: ${sunset.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}
          <div class="sun-time-clouds">Nubes: ☁ ${ssCloudUI}</div>
        </div>`;

      updatePredictions(sunriseResult, sunsetResult, currentState.sunriseMoment?.optimalTime, optimalSunsetTime, sunriseData, sunsetData);
      renderFactorPanel(sunriseResult, sunsetResult);
      displayUncertainty(sunsetResult, 'uncertaintyPanel');

      const factorBtn = document.getElementById('toggleFactorBtn');
      const uncertBtn = document.getElementById('toggleUncertaintyBtn');
      if (factorBtn && document.getElementById('factorPanel').style.display === 'none') {
        factorBtn.textContent = '📊 Ver contribuciones';
        factorBtn.classList.remove('active');
      }
      if (uncertBtn && document.getElementById('uncertaintyPanel').style.display === 'none') {
        uncertBtn.textContent = '🎯 Ver incerteza';
        uncertBtn.classList.remove('active');
      }
    }

    /* ==========================================================================
       FUNCIÓN UPDATE PREDICTIONS
       ========================================================================== */
    function updatePredictions(sunriseResult, sunsetResult, optimalSunriseTime, optimalSunsetTime, sunriseData, sunsetData) {
      console.log('DEBUG optimalSunsetTime recibido:', optimalSunsetTime?.toLocaleTimeString('es-CL', {hour:'2-digit',minute:'2-digit',second:'2-digit'}));
      const predBlock = document.getElementById('predictions');
      const srProb = (typeof sunriseResult === 'number') ? sunriseResult : sunriseResult.probability;
      const ssProb = (typeof sunsetResult === 'number') ? sunsetResult : sunsetResult.probability;
      const hasMC = typeof sunsetResult === 'object' && sunsetResult.confidenceInterval;
      const sunriseStyles = getProbabilityStyles(srProb);
      const sunsetStyles = getProbabilityStyles(ssProb);

      const srTime = optimalSunriseTime ? optimalSunriseTime.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'}) : '--:--';
      const ssTime = optimalSunsetTime ? optimalSunsetTime.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'}) : '--:--';
      const srCloud = sunriseData?.total != null ? `${Math.round(sunriseData.total)}%` : '—';
      const ssCloud = sunsetData?.total != null ? `${Math.round(sunsetData.total)}%` : '—';
      const metaStyle = 'font-size:1rem;opacity:0.75;margin-top:5px;white-space:nowrap;';

      if (hasMC) {
        const srUnc = (sunriseResult.confidence?.std * 100 ?? 0).toFixed(1);
        const ssUnc = (sunsetResult.confidence?.std * 100 ?? 0).toFixed(1);
        
        predBlock.innerHTML = `
          <div class="mc-grid">
            <div class="probability mc-box" style="background:${sunriseStyles.background};border:${sunriseStyles.border};box-shadow:${sunriseStyles.boxShadow ?? 'none'};color:${sunriseStyles.color};">
              <div style="font-size:1.1rem;">🌅 Amanecer</div>
              <div class="mc-row">
                <span class="mc-percent">${(srProb*100).toFixed(0)}%</span>
                <span class="mc-percent mc-unc">±${srUnc}%</span>
              </div>
              <div style="${metaStyle}">🕐 ${srTime}</div>
            </div>
            <div class="probability mc-box" style="background:${sunsetStyles.background};border:${sunsetStyles.border};box-shadow:${sunsetStyles.boxShadow ?? 'none'};color:${sunsetStyles.color};">
              <div style="font-size:1.1rem;">🌇 Atardecer</div>
              <div class="mc-row">
                <span class="mc-percent">${(ssProb*100).toFixed(0)}%</span>
                <span class="mc-percent mc-unc">±${ssUnc}%</span>
              </div>
              <div style="${metaStyle}">🕐 ${ssTime}</div>
            </div>
          </div>`;
      } else {
        predBlock.innerHTML = `
          <div class="probability" style="background:${sunriseStyles.background};border:${sunriseStyles.border};box-shadow:${sunriseStyles.boxShadow ?? 'none'};color:${sunriseStyles.color};">
            🌅 Amanecer: ${(srProb*100).toFixed(0)}%
            <div style="${metaStyle}">🕐 ${srTime} · ☁ ${srCloud}</div>
          </div>
          <div class="probability" style="background:${sunsetStyles.background};border:${sunsetStyles.border};box-shadow:${sunsetStyles.boxShadow ?? 'none'};color:${sunsetStyles.color};">
            🌇 Atardecer: ${(ssProb*100).toFixed(0)}%
            <div style="${metaStyle}">🕐 ${ssTime} · ☁ ${ssCloud}</div>
          </div>`;
      }

      Object.assign(predBlock.style, {
        display: 'flex', gap: '15px', margin: '10px 0',
        transition: 'all 0.3s ease', borderRadius: '12px', padding: '12px',
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'
      });

      if (srProb > 0.7 && ssProb > 0.7) {
        predBlock.style.background = 'linear-gradient(135deg, rgba(255,80,80,0.15), rgba(255,95,0,0.1))';
        predBlock.style.border = '1px solid rgba(255,95,0,0.3)';
        predBlock.style.boxShadow = '0 4px 20px rgba(255,80,80,0.15)';
      } else if (srProb > 0.7 || ssProb > 0.7) {
        predBlock.style.background = 'linear-gradient(135deg, rgba(255,80,80,0.1), rgba(255,165,0,0.05))';
        predBlock.style.border = '1px solid rgba(255,165,0,0.2)';
      }

      if ((srProb > 0.8 || ssProb > 0.8) && !document.querySelector('style#fire-animation')) {
        const style = document.createElement('style');
        style.id = 'fire-animation';
        style.textContent = '@keyframes fire { 0% { transform:scale(1); opacity:0.8; } 100% { transform:scale(1.2); opacity:1; } }';
        document.head.appendChild(style);
      }
    }

    /* ==========================================================================
       CÁLCULO DE TODAS LAS CIUDADES EN BACKGROUND
       ========================================================================== */
    async function calcularTodasLasCiudades() {
      const cities = Object.keys(chileanCities);
      console.log(`🌎 Calculando ${cities.length} ciudades en background...`);
      for (const name of cities) {
        const city = chileanCities[name];
        try {
          const result = await computeCityPrediction(city.lat, city.lon, { nSimulations: 50, returnFactors: false, altitude: city.altitude ?? 0 });
          if (!result) continue;

          const { meteoData, sunsetMoment, sunriseMoment } = result;
          const sunsetData  = sunsetMoment.data;
          const sunriseData = sunriseMoment.data;
          const sunsetElev  = sunsetMoment.elevDeg;
          const sunriseElev = sunriseMoment.elevDeg;
          const optimalSunsetTime = sunsetMoment.optimalTime;

          const now   = timeUtils.localNoonDate();
          const times = SunCalc.getTimes(now, city.lat, city.lon);
          const { sunrise, sunset } = times;

          const srProb = typeof result.sunrise === 'number' ? result.sunrise : result.sunrise.probability;
          const ssProb = typeof result.sunset  === 'number' ? result.sunset  : result.sunset.probability;

          dataCollector.collectPrediction({
            locationName: name, locationType: city.type || 'city',
            lat: city.lat, lon: city.lon, altitude: city.altitude ?? 0,
            sunriseProb: srProb, sunsetProb: ssProb, sunriseElev, sunsetElev,
            sunriseTime: sunrise?.toISOString() ?? null, sunsetTime: sunset?.toISOString() ?? null,
            optimalArrebolTime: optimalSunsetTime ?? null,
            cloudsAtSunset: { low: sunsetData?.low ?? 0, mid: sunsetData?.mid ?? 0, high: sunsetData?.high ?? 0, total: sunsetData?.total ?? 0 },
            cloudsAtSunrise: { low: sunriseData?.low ?? 0, mid: sunriseData?.mid ?? 0, high: sunriseData?.high ?? 0, total: sunriseData?.total ?? 0 },
            weatherData: { temperature: meteoData.current.temperature, humidity: meteoData.current.humidity, pressure: meteoData.current.pressure, dewpoint: meteoData.current.dewpoint }
          });
          await new Promise(r => setTimeout(r, 300));
        } catch (e) {
          console.warn(`Error calculando ${name}:`, e.message);
        }
      }
      console.log('✅ Todas las ciudades calculadas');
      if (typeof renderAllCitiesTable === 'function') renderAllCitiesTable();
    }



    // Si el día cambia mientras se está viendo una ciudad, el menú de
    // tarjetas queda desactualizado pero NO se recalcula de inmediato
    // (sería recalcular decenas de ciudades que ni se están mostrando).
    // Se marca aquí, y se resuelve al volver al menú (ver closeDetailView).
    let _cardsStale = { cities: false, observatories: false };

    // Bloqueo simple: mientras un cambio de día se está aplicando, se
    // ignoran clics nuevos. Esto evita que dos cálculos (predictRedSunset /
    // mountCityCardView) corran en paralelo escribiendo sobre el mismo
    // estado/DOM — que era la causa de que a veces "ganara" un resultado
    // viejo aunque el botón activo ya mostrara el día correcto.
    let _dayChangeApplying = false;

    document.addEventListener('DOMContentLoaded', () => {
      updateQueryDateTime();
      renderDaySelector();
      mountCityCardView();
      setTimeout(calcularTodasLasCiudades, 4000);

      // Deep link: si la URL trae ?ciudad=X, abre esa ciudad directamente.
      const initParams = new URLSearchParams(window.location.search);
      const initCiudad = initParams.get('ciudad');

      if (initCiudad && chileanCities[initCiudad]) {
        const initTipo = initParams.get('tipo') || 'city';
        showPrediction(initCiudad, initTipo, false); // false: la URL ya trae el parámetro, no la dupliquemos
      }

      // --- Toggle amanecer / atardecer en las tarjetas ---
      const btnSunset  = document.getElementById('btnSunset');
      const btnSunrise = document.getElementById('btnSunrise');
 
      btnSunset.onclick = () => {
        window.cardPredictionMode = 'sunset';
        btnSunset.classList.add('active');
        btnSunrise.classList.remove('active');
        window.refreshCardProbabilities();
 
        // Si hay un mapa de hexágonos activo (vista detallada de una ciudad),
        // redibujarlo. No vuelve a pedir datos: calculateGridPointProbability
        // ya tiene ambos valores cacheados.
        if (currentState.lat && currentState.lon) {
          MapUtils.updateHeatmap(currentState.lat, currentState.lon, currentState.altitude ?? 0);
        }
      };
 
      btnSunrise.onclick = () => {
        window.cardPredictionMode = 'sunrise';
        btnSunrise.classList.add('active');
        btnSunset.classList.remove('active');
        window.refreshCardProbabilities();
 
        if (currentState.lat && currentState.lon) {
          MapUtils.updateHeatmap(currentState.lat, currentState.lon, currentState.altitude ?? 0);
        }
      };
    });

    const seleccionarCiudad = nombre => showPrediction(nombre, 'city');
    const seleccionarObservatorio = nombre => showPrediction(nombre, 'observatory');
    const selectCityFromRanking = nombre => showPrediction(nombre, 'city');

    function probClass(p) {
      if (p > 0.7) return 'high-prob';
      if (p < 0.3) return 'low-prob';
      return 'medium-prob';
    }

    window.getMeteoData = getMeteoData;
    window.computeRedProbability = computeRedProbability;
    window.timeUtils = timeUtils;
    window.chileanCities = chileanCities;
    window.updateCharts = updateCharts;
    window.getProbabilityStyles = getProbabilityStyles;
    window.displayUncertainty = displayUncertainty;

  </script>

  <footer class="footer">
    <p><span class="gradient-text">Préboles 2026</span>. Nicolás Medina Peña.</p>
    <nav>
      <a href="#" onclick="switchTab('info'); return false;" style="cursor:pointer;"><u>ℹ️ Información</u></a>
      <a href="https://nicomedinap.github.io/about.html" target="_blank"><u>Sobre el autor</u></a>
      <a href="https://nicomedinap.github.io/2025/12/21/Preboles.html" target="_blank"><u>Sobre el modelo predictivo y los datos</u></a>
    </nav>
  </footer>
</body>
</html>