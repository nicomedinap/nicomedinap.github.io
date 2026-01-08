---
layout: none
---
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <title>Predictor de Arreboles (Préboles)</title>
  
  <!-- Dependencias externas -->
  <script src="https://unpkg.com/suncalc"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.2.1/dist/chartjs-plugin-annotation.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <link rel="stylesheet" href="https://nicomedinap.github.io/public/css/preboles_2.css">

  <style>
    .observatories-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
      height: calc(100vh - 250px);
      min-height: 600px;
    }

    @media (max-width: 1024px) {
      .observatories-grid {
        grid-template-columns: 1fr;
        height: auto;
      }
    }

    .observatory-icon {
      background: transparent !important;
      border: none !important;
    }

    .observatory-popup .leaflet-popup-content {
      min-width: 200px !important;
    }

    #observatoriesMap {
      width: 100%;
      height: 100%;
      min-height: 550px;
      border-radius: 8px;
    }

    .map-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      height: 100%;
    }

    #observatoryMenu {
      display: flex;
      flex-direction: column;
      gap: 15px;
      overflow-y: auto;
      max-height: 100%;
      padding-right: 10px;
    }

    #observatoryMenu .city-card {
      width: 100%;
      margin: 0;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }

    #observatoryMenu .city-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    #observatoryMenu .city-name {
      font-size: 1.1rem;
      font-weight: 600;
    }

    #observatoryMenu .city-region {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    #observatoryMenu::-webkit-scrollbar {
      width: 6px;
    }

    #observatoryMenu::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    #observatoryMenu::-webkit-scrollbar-thumb {
      background: rgba(255, 152, 0, 0.5);
      border-radius: 3px;
    }

    #observatoryMenu::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 152, 0, 0.7);
    }

    /* Indicador visual del tipo de ubicación */
    .location-type-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: bold;
      margin-left: 8px;
      vertical-align: middle;
    }
    
    .badge-observatory {
      background: linear-gradient(135deg, #ff9800, #ff6600);
      color: white;
    }
    
    .badge-park {
      background: linear-gradient(135deg, #4CAF50, #2E7D32);
      color: white;
    }
    
    .badge-city {
      background: linear-gradient(135deg, #2196F3, #0D47A1);
      color: white;
    }
    
    /* Ajustes para el título */
    #cityTitle {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  </style>
  
</head>

<body>
  <div class="title-container">
    <h2 class="title">Préboles</h2>
    <div class="subtitle">
      <span class="gradient-text">PRE</span>dictor de arre<span class="gradient-text">BOLES</span>
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

  <!-- CONTENEDOR PRINCIPAL CON PESTAÑAS -->
  <div class="tabs-container">
  <div class="tabs-header">
    <button class="tab-btn active" data-tab="cities" onclick="switchTab('cities')">🏙️ Ciudades</button>
    <button class="tab-btn" data-tab="observatories" onclick="switchTab('observatories')">🔭 Observatorios</button>
    <button class="tab-btn" data-tab="ranking" onclick="switchTab('ranking')">📊 Ranking</button>
    <button class="tab-btn" data-tab="info" onclick="switchTab('info')">ℹ️ Información</button>
  </div>
    
    <!-- Pestaña 1: Ciudades -->
    <div id="tab-cities" class="tab-content active">
      <div id="cityMenu"></div>
      <div id="appContainer">
        <button class="back" onclick="volverMenu()">← Volver</button>
        <div class="container">
          <h1 id="cityTitle">🌇 Predictor de Arrebol</h1>
          <div class="grid">
            <div>
              <div class="panel">
                <div id="result">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 200px;">
                      <div id="locationText">Seleccione ciudad</div>
                      <div class="sun-times" id="sunTimes"></div>
                    </div>
                    <div id="loadingState"></div>
                  </div>
                  <div class="data-grid" id="dataGrid">
                    <div class="data-item">☁️ Nubosidad: <strong id="cloudVal">—</strong></div>
                    <div class="data-item">⬆ Elev amanecer: <strong id="sunriseElev">—</strong></div>
                    <div class="data-item">⬇ Elev atardecer: <strong id="sunsetElev">—</strong></div>
                  </div>
                  <div class="predictions" id="predictions"></div>
                  <div class="charts" style="height: 400px; width: 100%;">
                    <canvas id="cloudChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="panel">
                <div><strong>Mapa de probabilidad de arrebol</strong></div>
                <div class="map-wrapper" style="height: 500px;">
                  <div id="map"></div>
                  <div class="probability-legend">
                    <div class="legend-title">Probabilidad de arrebol</div>
                    <div class="legend-gradient"></div>
                    <div class="legend-labels">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
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
    </div>
    
    <!-- Pestaña 2: Observatorios -->
    <div id="tab-observatories" class="tab-content">
      <div class="container">
        <h2>🔭 Observatorios Astronómicos en Chile</h2>
        <p class="lead">Chile es la capital mundial de la astronomía. Selecciona un observatorio para ver la probabilidad de arrebol.</p>
        
        <div class="observatories-grid">
          <!-- MENÚ DE OBSERVATORIOS -->
          <div id="observatoryMenu" class="city-menu"></div>
          
          <!-- MAPA DE OBSERVATORIOS -->
          <div class="panel" style="height: 600px;">
            <div><strong>📍 Ubicación de Observatorios</strong></div>
            <div class="map-wrapper" style="height: 550px;">
              <div id="observatoriesMap"></div>
              <div class="map-legend" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 8px 12px; border-radius: 6px; color: white; font-size: 0.85rem;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <div style="width: 16px; height: 16px; background: #ff9800; border-radius: 50%; border: 2px solid white;"></div>
                  <span>Observatorio astronómico</span>
                </div>
                <div style="font-size: 0.8rem; opacity: 0.9;">Haz clic en un marcador para ver detalles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pestaña 3: Ranking -->
    <div id="tab-ranking" class="tab-content">
      <div class="container">
        <h2>📊 Ranking de Probabilidades</h2>
        <p class="lead">Las ciudades con mayor y menor probabilidad de arrebol según las condiciones actuales.</p>
        <div class="info-grid">
          <div class="info-card">
            <h4>🥇 Top 10 - Mayor Probabilidad</h4>
            <div id="topRanking"><p>Cargando ranking...</p></div>
          </div>
        <!--  <div class="info-card"> -->
        <!--    <h4>📉 Top 10 - Menor Probabilidad</h4> -->
        <!--    <div id="bottomRanking"><p>Cargando ranking...</p></div> -->
        </div>
      </div>
        <!--<div class="info-section">-->
        <!--  <h3>📈 Estadísticas Generales</h3>-->
        <!--  <div class="data-grid" id="rankingStats">-->
        <!--    <div class="data-item">Ciudad más alta: <strong id="highestCity">--</strong></div>-->
        <!--    <div class="data-item">Ciudad más baja: <strong id="lowestCity">--</strong></div>-->
        <!--    <div class="data-item">Promedio nacional: <strong id="averageProb">--</strong></div>-->
         <!--   <div class="data-item">Total analizado: <strong id="totalCities">--</strong></div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div class="info-section">-->
        <!--  <h3>🏆 Mejores Regiones</h3>-->
        <!--  <div id="regionsRanking"></div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    
    <!-- Pestaña 4: Información -->
    <div id="tab-info" class="tab-content">
      <div class="container">
        <h2>ℹ️ Información sobre Préboles</h2>
        <p class="lead">Todo lo que necesitas saber sobre el predictor de arreboles y cómo interpretar los resultados.</p>
        <div class="info-section">
          <h3>❓ ¿Qué es un arrebol?</h3>
          <p>El arrebol es un fenómeno atmosférico-óptico que ocurre durante el amanecer y atardecer, cuando la luz solar ilumina las nubes desde abajo, produciendo colores rojizos, anaranjados y rosados en el cielo.</p>
          <div class="info-grid">
            <div class="info-card">
              <h4>🌅 Condiciones ideales</h4>
              <ul>
                <li>Nubes altas o medias</li>
                <li>Cielo parcialmente nublado</li>
                <li>Elevación solar entre -6° y 6°</li>
                <li>Humedad relativa moderada</li>
              </ul>
            </div>
            <div class="info-card">
              <h4>⚙️ Factores analizados</h4>
              <ul>
                <li>Nubosidad a diferentes alturas</li>
                <li>Posición solar</li>
                <li>Presión atmosférica</li>
                <li>Temperatura y humedad</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="info-section">
          <h3>🎯 Cómo interpretar los resultados</h3>
          <div class="info-grid">
            <div class="info-card" style="border-left: 4px solid #d7191c;">
              <h4 style="color: #d7191c;">🔴 Alta probabilidad (70-100%)</h4>
              <p>Condiciones excelentes. Es muy probable que puedas observar un arrebol espectacular si las condiciones se mantienen.</p>
            </div>
            <div class="info-card" style="border-left: 4px solid #fdae61;">
              <h4 style="color: #fdae61;">🟠 Media-alta (50-70%)</h4>
              <p>Buenas condiciones. Hay posibilidades significativas de ver un arrebol, especialmente si estás en un lugar despejado.</p>
            </div>
            <div class="info-card" style="border-left: 4px solid #ffffbf;">
              <h4 style="color: #ffffbf;">🟡 Media (30-50%)</h4>
              <p>Condiciones moderadas. Podrías ver algún color en el cielo, pero quizás no tan intenso.</p>
            </div>
            <div class="info-card" style="border-left: 4px solid #abdda4;">
              <h4 style="color: #abdda4;">🟢 Baja (0-30%)</h4>
              <p>Condiciones desfavorables. Es poco probable que observes un arrebol significativo.</p>
            </div>
          </div>
        </div>
        <div class="info-section">
          <h3>📞 Contacto y Sugerencias</h3>
          <p>Si tienes preguntas, sugerencias o quieres reportar un arrebol que observaste, contáctanos:</p>
          <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;">
            <a href="https://nicomedinap.github.io/about.html" target="_blank" style="background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 6px; color: white; text-decoration: none;">👤 Sobre el autor</a>
            <a href="https://nicomedinap.github.io/2025/12/21/Preboles.html" target="_blank" style="background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 6px; color: white; text-decoration: none;">📖 Artículo técnico</a>
            <a href="mailto:nicolas.medina@example.com" style="background: var(--accent); padding: 10px 15px; border-radius: 6px; color: white; text-decoration: none;">✉️ Contactar por email</a>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- modulos -->
<script src="https://nicomedinap.github.io/preboles/ciudades.js"></script>
<!-- <script src="https://nicomedinap.github.io/preboles/redProbability.js"></script> -->
<script src="https://nicomedinap.github.io/preboles/chartUtils.js"></script>

<!-- Script principal -->
<script>
    /* ==========================================================================
       CONFIGURACIONES Y CONSTANTES
       ========================================================================== */
    const BATCH_SIZE = 3;
    const DELAY = 300;
    const API_CACHE = {};
    
    /* ==========================================================================
       VARIABLES GLOBALES PARA EL MAPA Y ESTADO
       ========================================================================== */
    let map = null, marker = null, heatLayer = null, labelLayer = null;
    let heatmapEnabled = true, labelsEnabled = true, weatherDataCache = {};
    
    /* ==========================================================================
       ESTADO DE LA APLICACIÓN
       ========================================================================== */
    let currentState = {
      lat: null, lon: null, cityName: '', hourly: null,
      preds: { sunrise: 0, sunset: 0 }, sunTimes: null, 
      sunriseElev: null, sunsetElev: null, meteoData: null
    };

    let currentLocation = {
      type: null, // 'city', 'observatory', 'park', etc.
      name: '',
      lat: null,
      lon: null,
      data: null,
      originalTab: null // Para recordar desde qué pestaña venimos
    };

    const logEl = document.getElementById('log');
    // REMOVER: let cloudChart = null; // Ya está definido en chartUtils.js

    /* ==========================================================================
       FUNCIONES DE REGISTRO
       ========================================================================== */
    function log(msg) {
      const line = `[${new Date().toLocaleString()}] ${msg}`;
      console.log(line);
      logEl.textContent = line + '\n' + logEl.textContent;
    }

    /* ==========================================================================
      SISTEMA DE PESTAÑAS MEJORADO (CORREGIDO)
      ========================================================================== */
    function switchTab(tabName) {
      // 1. Ocultar todas las pestañas
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // 2. Desactivar todos los botones
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // 3. Activar la pestaña correspondiente
      const tabElement = document.getElementById(`tab-${tabName}`);
      if (tabElement) {
        tabElement.classList.add('active');
      }
      
      // 4. Activar el botón correspondiente
      const tabButtonMap = {
        'cities': '🏙️ Ciudades',
        'observatories': '🔭 Observatorios',
        'ranking': '📊 Ranking',
        'info': 'ℹ️ Información'
      };
      
      const tabButtons = document.querySelectorAll('.tab-btn');
      tabButtons.forEach(btn => {
        if (btn.textContent.trim() === tabButtonMap[tabName]) {
          btn.classList.add('active');
        }
      });
      
      // 5. SI ESTAMOS EN PREDICCIÓN, SOLO MANEJAR EL CAMBIO DE PESTAÑA
      // NO OCULTAR/MOSTRAR NADA AUTOMÁTICAMENTE
      const isViewingPrediction = document.getElementById('appContainer').style.display === 'block';
      
      if (isViewingPrediction) {
        // Si estamos viendo una predicción y cambiamos de pestaña,
        // solo cambiar la pestaña pero mantener la predicción visible si estamos en "cities"
        if (tabName !== 'cities') {
          // Si cambiamos a otra pestaña que no sea "cities", ocultar la predicción
          document.getElementById('appContainer').style.display = 'none';
          
          // Pero NO mostrar automáticamente ningún menú
          // El menú se mostrará cuando el usuario haga clic en "Volver"
        }
        // Si cambiamos a "cities" y estamos viendo una predicción, mantenerla visible
      } else {
        // Si NO estamos viendo una predicción, manejar los menús normalmente
        if (tabName === 'cities') {
          document.getElementById('cityMenu').style.display = 'grid';
          document.getElementById('appContainer').style.display = 'none';
        } else if (tabName === 'observatories') {
          // Para observatorios, solo asegurarnos de que el menú de ciudades esté oculto
          document.getElementById('cityMenu').style.display = 'none';
          document.getElementById('appContainer').style.display = 'none';
        } else {
          // Para otras pestañas, ocultar ambos
          document.getElementById('cityMenu').style.display = 'none';
          document.getElementById('appContainer').style.display = 'none';
        }
      }
      
      // 6. Inicializar contenido si es necesario
      if (tabName === 'observatories') {
        setTimeout(() => {
          initObservatoryMenu();
        }, 50);
      }
      if (tabName === 'ranking') {
        calculateRankings();
      }
    }

    /* ==========================================================================
       FUNCION UNIVERSAL PARA MOSTRAR PREDICCIÓN
       ========================================================================== */
    async function showPrediction(locationName, locationType = 'city') {
      const location = chileanCities[locationName];
      if (!location) return;
      
      // Guardar el tipo de ubicación y la pestaña original
      currentLocation = {
        type: locationType,
        name: locationName,
        lat: location.lat,
        lon: location.lon,
        data: location,
        originalTab: getCurrentTab()
      };
      
      // Cambiar a la pestaña de ciudades (donde está la interfaz de predicción)
      switchTab('cities');
      
      // Ocultar menú de ciudades y mostrar el predictor
      document.getElementById('cityMenu').style.display = 'none';
      document.getElementById('appContainer').style.display = 'block';
      
      // Actualizar el título según el tipo de ubicación
      let titlePrefix = '';
      let badgeClass = '';
      switch(locationType) {
        case 'observatory':
          titlePrefix = '🔭 ';
          badgeClass = 'badge-observatory';
          break;
        case 'park':
          titlePrefix = '🌳 ';
          badgeClass = 'badge-park';
          break;
        default:
          titlePrefix = '🌇 ';
          badgeClass = 'badge-city';
      }
      
      const badge = badgeClass ? `<span class="location-type-badge ${badgeClass}">${locationType === 'observatory' ? 'Observatorio' : locationType === 'park' ? 'Parque' : 'Ciudad'}</span>` : '';
      document.getElementById('cityTitle').innerHTML = `${titlePrefix}${locationName} ${badge}`;
      
      localStorage.setItem('lastCity', locationName);
      localStorage.setItem('locationType', locationType);
      
      await predictRedSunset(location.lat, location.lon, locationName);
    }

    // Función para obtener la pestaña actual
    function getCurrentTab() {
      const activeTab = document.querySelector('.tab-content.active');
      if (!activeTab) return 'cities';
      
      const tabId = activeTab.id;
      if (tabId === 'tab-cities') return 'cities';
      if (tabId === 'tab-observatories') return 'observatories';
      if (tabId === 'tab-ranking') return 'ranking';
      if (tabId === 'tab-info') return 'info';
      return 'cities';
    }

    // Modificar la función volverMenu para que regrese a la pestaña original
    function volverMenu() {
      // Ocultar el predictor
      document.getElementById('appContainer').style.display = 'none';
      
      // Mostrar el menú correspondiente
      if (currentLocation.originalTab === 'cities') {
        document.getElementById('cityMenu').style.display = 'grid';
        // Si estábamos en ciudades, mantener esa pestaña activa
        switchTab('cities');
      } else if (currentLocation.originalTab === 'observatories') {
        // Si veníamos de observatorios, regresar a esa pestaña
        switchTab('observatories');
      } else {
        // Por defecto, mostrar ciudades
        document.getElementById('cityMenu').style.display = 'grid';
        switchTab('cities');
      }
      
      // Limpiar el estado
      currentLocation = {
        type: null,
        name: '',
        lat: null,
        lon: null,
        data: null,
        originalTab: null
      };
      
      localStorage.removeItem('lastCity');
      localStorage.removeItem('locationType');
    }

    /* ==========================================================================
       FUNCIONES PARA CARGAR OBSERVATORIOS (ACTUALIZADAS)
       ========================================================================== */
    let observatoriesLoading = false;

    async function initObservatoryMenu() {
      const menu = document.getElementById('observatoryMenu');
      if (!menu) return;
      
      if (observatoriesLoading) return;
      
      observatoriesLoading = true;
      menu.innerHTML = '<p>Cargando observatorios...</p>';
      
      try {
        const observatories = Object.entries(chileanCities).filter(([nombre, info]) => 
          info.type === 'observatory'
        );
        
        menu.innerHTML = '';
        for (const [nombre, info] of observatories) {
          const card = document.createElement('div');
          card.className = 'city-card';
          card.innerHTML = `
            <div class="city-name">🔭 ${nombre.replace('Observatorio ', '')}</div>
            <div class="city-region">${info.region}<br><small>Altitud: ${info.altitude ? info.altitude.toLocaleString() : 'N/A'} m</small></div>
            <div class="city-probability"><span class="loading"></span> Calculando...</div>
            <div class="probability-bar" style="width: 0%"></div>
          `;
          card.onclick = () => showPrediction(nombre, 'observatory');
          menu.appendChild(card);
        }
        
        if (document.getElementById('tab-observatories').classList.contains('active')) {
          await loadObservatoryData(observatories);
          
          setTimeout(() => {
            if (document.getElementById('tab-observatories').classList.contains('active')) {
              initObservatoriesMap();
            }
          }, 100);
        }
      } catch (error) {
        console.error('Error inicializando menú de observatorios:', error);
        menu.innerHTML = '<p>Error cargando observatorios. Intenta nuevamente.</p>';
      } finally {
        observatoriesLoading = false;
      }
    }

    async function loadObservatoryData(observatories) {
      const BATCH_SIZE = 3;
      const DELAY = 300;
      
      if (!document.getElementById('tab-observatories').classList.contains('active')) {
        return;
      }
      
      for (let i = 0; i < observatories.length; i += BATCH_SIZE) {
        if (!document.getElementById('tab-observatories').classList.contains('active')) {
          break;
        }
        
        const batch = observatories.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(
          batch.map(async ([nombre, info]) => {
            try { 
              await updateObservatoryCardData(nombre, info); 
            } catch (error) { 
              markObservatoryCardAsError(nombre, true); 
            }
          })
        );
        await new Promise(resolve => setTimeout(resolve, DELAY));
      }
    }

    async function updateObservatoryCardData(nombre, info) {
      if (!document.getElementById('tab-observatories').classList.contains('active')) {
        return;
      }
      
      const meteoData = await getMeteoData(info.lat, info.lon);
      if (!meteoData.cloudSeries) return;

      const sunset = SunCalc.getTimes(new Date(), info.lat, info.lon).sunset;
      const sunsetElev = SunCalc.getPosition(sunset, info.lat, info.lon).altitude * (180/Math.PI);
      const sunsetHour = sunset.toISOString().slice(0,13);
      const idxSunset = meteoData.cloudSeries.time.findIndex(t => t.startsWith(sunsetHour));
      const targetIdx = idxSunset >= 0 ? idxSunset : 18;

      // USAR SOLO DATOS REALES - Si no hay datos, no calcular
      const low_e = meteoData.cloudSeries.cloudcover_low?.[targetIdx];
      const mid_e = meteoData.cloudSeries.cloudcover_mid?.[targetIdx];
      const high_e = meteoData.cloudSeries.cloudcover_high?.[targetIdx];
      
      // Si no tenemos datos específicos por altura, usar nubosidad total
      const cloudcover_total = meteoData.cloudSeries.cloudcover?.[targetIdx];
      
      // Solo calcular si tenemos datos
      if ((low_e !== undefined || mid_e !== undefined || high_e !== undefined) || cloudcover_total !== undefined) {
        // Pasar los datos reales (pueden ser undefined)
        const probAtardecer = computeRedProbability(low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature, meteoData.current.pressure);
        updateObservatoryCardUI(nombre, Math.round(probAtardecer * 100), info);
      }
    }


    function updateObservatoryCardUI(nombre, probAtardecer, info) {
      if (!document.getElementById('tab-observatories').classList.contains('active')) {
        return;
      }
      
      const cards = document.querySelectorAll('#observatoryMenu .city-card');
      const card = Array.from(cards).find(c => c.querySelector('.city-name').textContent.includes(nombre.replace('Observatorio ', '')));
      if (!card) return;
      
      card.querySelector('.city-probability').innerHTML = `Prob. arrebol: <strong>${probAtardecer}%</strong>`;
      card.querySelector('.probability-bar').style.width = `${probAtardecer}%`;
      
      const styles = getProbabilityStyles(probAtardecer / 100);
      card.style.background = styles.background;
      card.style.boxShadow = styles.boxShadow || 'none';
    }

    function markObservatoryCardAsError(nombre, isObservatory = false) {
      const selector = isObservatory ? '#observatoryMenu .city-card' : '.city-card';
      const cards = document.querySelectorAll(selector);
      const card = Array.from(cards).find(c => {
        const nameElement = c.querySelector('.city-name');
        return nameElement && nameElement.textContent.includes(nombre.replace('Observatorio ', ''));
      });
      
      if (card) {
        card.querySelector('.city-probability').innerHTML = '<em>Error al cargar</em>';
        card.style.background = "rgba(255, 0, 0, 0.1)";
      }
    }

    function initObservatoriesMap() {
      const mapContainer = document.getElementById('observatoriesMap');
      if (!mapContainer || mapContainer._leaflet_id) return;
      
      const obsMap = L.map('observatoriesMap').setView([-30, -70], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(obsMap);
      
      const observatories = Object.entries(chileanCities).filter(([nombre, info]) => 
        info.type === 'observatory'
      );
      
      for (const [name, obs] of observatories) {
        const customIcon = L.divIcon({
          className: 'observatory-icon',
          html: `<div style="background: #ff9800; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">🔭</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        
        L.marker([obs.lat, obs.lon], { icon: customIcon })
          .addTo(obsMap)
          .bindPopup(`
            <div style="min-width: 200px;">
              <strong>${name}</strong><br>
              <small>${obs.region}</small><br>
              <hr style="margin: 5px 0; opacity: 0.3;">
              <strong>Altitud:</strong> ${obs.altitude ? obs.altitude.toLocaleString() : 'N/A'} m<br>
              ${obs.operator ? `<strong>Operador:</strong> ${obs.operator}<br>` : ''}
              <button onclick="showPrediction('${name}', 'observatory')" style="margin-top: 5px; padding: 5px 10px; background: #ff6600; border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 12px; width: 100%;">
                Ver predicción
              </button>
            </div>
          `);
      }
      
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri'
      }).addTo(obsMap);
    }

    /* ==========================================================================
       FUNCIONES PRINCIPALES DE LA APLICACIÓN (ACTUALIZADAS)
       ========================================================================== */
    async function getMeteoData(lat, lon) {
      const cacheKey = `meteo_${lat.toFixed(2)}_${lon.toFixed(2)}`;
      if (API_CACHE[cacheKey]) return API_CACHE[cacheKey];
      
      try {
        // SOLO solicitamos los datos que realmente necesitamos
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,pressure_msl,relativehumidity_2m,temperature_2m&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (!data.hourly) return getFallbackData();
        
        const now = new Date();
        const currentHour = now.toISOString().slice(0, 13);
        const currentIdx = data.hourly.time.findIndex(t => t.startsWith(currentHour));
        
        const currentData = currentIdx >= 0 ? {
          pressure: data.hourly.pressure_msl?.[currentIdx] || 1013,
          humidity: data.hourly.relativehumidity_2m?.[currentIdx] || 50,
          temperature: data.hourly.temperature_2m?.[currentIdx] || 20,
          timestamp: data.hourly.time?.[currentIdx] || new Date().toISOString()
        } : { pressure: 1013, humidity: 50, temperature: 20, timestamp: new Date().toISOString() };
        
        const result = { cloudSeries: data.hourly, current: currentData };
        API_CACHE[cacheKey] = result;
        return result;
      } catch (e) {
        console.warn('Error obteniendo datos meteorológicos:', e);
        return getFallbackData();
      }
    }

    function getFallbackData() {
      return {
        cloudSeries: null,
        current: { pressure: 1013, humidity: 50, temperature: 20, timestamp: new Date().toISOString() }
      };
    }

    /* ==========================================================================
       INTERFAZ DE USUARIO - CIUDADES (ACTUALIZADAS)
       ========================================================================== */
    async function initCityMenu() {
      const menu = document.getElementById('cityMenu');
      const loadingIndicator = document.getElementById('loadingIndicator');
      
      const citiesOnly = Object.entries(chileanCities).filter(([nombre, info]) => 
        !info.type || info.type !== 'observatory'
      );
      
      for (const [nombre, info] of citiesOnly) {
        menu.appendChild(createCityCardSkeleton(nombre, info));
      }
      
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
        menu.style.display = 'grid';
      }, 3000);
      
      loadAllCityData();
    }

    function createCityCardSkeleton(nombre, info) {
      const card = document.createElement('div');
      card.className = 'city-card';
      card.innerHTML = `
        <div class="city-name">${nombre}</div>
        <div class="city-region">${info.region}</div>
        <div class="city-probability"><span class="loading"></span> Calculando...</div>
        <div class="probability-bar" style="width: 0%"></div>
      `;
      card.onclick = () => showPrediction(nombre, 'city');
      return card;
    }

    async function loadAllCityData() {
      const citiesOnly = Object.entries(chileanCities).filter(([nombre, info]) => 
        !info.type || info.type !== 'observatory'
      );
      
      for (let i = 0; i < citiesOnly.length; i += BATCH_SIZE) {
        const batch = citiesOnly.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(batch.map(async ([nombre, info]) => {
          try { await updateCityCardData(nombre, info); } 
          catch (error) { markCityCardAsError(nombre); }
        }));
        await new Promise(resolve => setTimeout(resolve, DELAY));
      }
    }

    async function updateCityCardData(nombre, info) {
      const meteoData = await getMeteoData(info.lat, info.lon);
      if (!meteoData.cloudSeries) return;

      const sunset = SunCalc.getTimes(new Date(), info.lat, info.lon).sunset;
      const sunsetElev = SunCalc.getPosition(sunset, info.lat, info.lon).altitude * (180/Math.PI);
      const sunsetHour = sunset.toISOString().slice(0,13);
      const idxSunset = meteoData.cloudSeries.time.findIndex(t => t.startsWith(sunsetHour));
      const targetIdx = idxSunset >= 0 ? idxSunset : 18;

      // USAR SOLO DATOS REALES
      const low_e = meteoData.cloudSeries.cloudcover_low?.[targetIdx];
      const mid_e = meteoData.cloudSeries.cloudcover_mid?.[targetIdx];
      const high_e = meteoData.cloudSeries.cloudcover_high?.[targetIdx];
      const cloudcover_total = meteoData.cloudSeries.cloudcover?.[targetIdx];
      
      // Solo calcular si tenemos datos
      if ((low_e !== undefined || mid_e !== undefined || high_e !== undefined) || cloudcover_total !== undefined) {
        const probAtardecer = computeRedProbability(low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature, meteoData.current.pressure);
        updateCityCardUI(nombre, Math.round(probAtardecer * 100));
      }
    }

    function updateCityCardUI(nombre, probAtardecer) {
      const cards = document.querySelectorAll('.city-card');
      const card = Array.from(cards).find(c => c.querySelector('.city-name').textContent === nombre);
      if (!card) return;
      
      card.querySelector('.city-probability').innerHTML = `Prob. arrebol: <strong>${probAtardecer}%</strong>`;
      card.querySelector('.probability-bar').style.width = `${probAtardecer}%`;
      
      const styles = getProbabilityStyles(probAtardecer / 100);
      card.style.background = styles.background;
      card.style.boxShadow = styles.boxShadow || 'none';
    }

    function getProbabilityStyles(probability) {
      const probPercent = probability * 100;
      if (probPercent > 70) return { background: "rgba(255, 80, 80, 0.55)", boxShadow: "0 4px 16px rgba(255, 80, 80, 0.1)" };
      if (probPercent > 50) return { background: "rgba(255, 165, 0, 0.3)", boxShadow: "0 4px 16px rgba(255, 165, 0, 0.2)" };
      if (probPercent > 30) return { background: "rgba(255, 200, 0, 0.25)" };
      if (probPercent > 15) return { background: "rgba(200, 200, 255, 0.15)" };
      return { background: "rgba(255, 255, 255, 0.05)" };
    }

    /* ==========================================================================
       FUNCIONES DEL MAPA
       ========================================================================== */
    function initMap(lat, lon, cityName) {
      if (map) {
        map.setView([lat, lon], 10);
        if (marker) {
          marker.setLatLng([lat, lon]);
          marker.setPopupContent(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`);
        } else {
          marker = L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`)
            .openPopup();
        }
        return;
      }
      
      map = L.map('map').setView([lat, lon], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      marker = L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`)
        .openPopup();
    }

    function calculateDestinationPoint(lat, lon, azimuth, distanceKm) {
      const R = 6371;
      const latRad = lat * Math.PI / 180;
      const lonRad = lon * Math.PI / 180;
      const azRad = azimuth * Math.PI / 180;
      const dDivR = distanceKm / R;

      const destLatRad = Math.asin(Math.sin(latRad) * Math.cos(dDivR) + Math.cos(latRad) * Math.sin(dDivR) * Math.cos(azRad));
      const destLonRad = lonRad + Math.atan2(Math.sin(azRad) * Math.sin(dDivR) * Math.cos(latRad), Math.cos(dDivR) - Math.sin(latRad) * Math.sin(destLatRad));

      return { lat: destLatRad * 180 / Math.PI, lon: destLonRad * 180 / Math.PI };
    }

    function calculateSunsetAzimuth(lat, lon) {
      const now = new Date();
      const sunset = SunCalc.getTimes(now, lat, lon).sunset;
      const pos = SunCalc.getPosition(sunset, lat, lon);
      return (pos.azimuth * 180 / Math.PI + 180) % 360;
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    }

    async function generate7HexagonGrid(centerLat, centerLon, sunsetAzimuth) {
      const hexRadiusKm = 10;
      const hexWidth = Math.sqrt(3) * hexRadiusKm;
      const hexHeight = 1.5 * hexRadiusKm;
      const perpendicularAzimuth = (sunsetAzimuth + 90) % 360;
      
      const hexCoordinates = [
        { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 0, r: 1 }, 
        { q: -1, r: 1 }, { q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 }
      ];
      
      for (const coord of hexCoordinates) {
        const { q, r } = coord;
        const x = hexWidth * (q + r/2);
        const y = hexHeight * r;
        
        let hexCenter;
        if (x === 0 && y === 0) {
          hexCenter = { lat: centerLat, lon: centerLon };
        } else {
          let tempPoint = { lat: centerLat, lon: centerLon };
          if (x !== 0) {
            const dirX = x > 0 ? perpendicularAzimuth : (perpendicularAzimuth + 180) % 360;
            tempPoint = calculateDestinationPoint(centerLat, centerLon, dirX, Math.abs(x));
          }
          if (y !== 0) {
            const dirY = y > 0 ? sunsetAzimuth : (sunsetAzimuth + 180) % 360;
            hexCenter = calculateDestinationPoint(tempPoint.lat, tempPoint.lon, dirY, Math.abs(y));
          } else {
            hexCenter = tempPoint;
          }
        }
        
        if (hexCenter.lat >= -56 && hexCenter.lat <= -17 && hexCenter.lon >= -76 && hexCenter.lon <= -66) {
          const probability = await calculateGridPointProbability(hexCenter.lat, hexCenter.lon);
          
          const vertices = [];
          for (let i = 0; i < 6; i++) {
            const angle = sunsetAzimuth + (i * 60);
            const vertex = calculateDestinationPoint(hexCenter.lat, hexCenter.lon, angle, hexRadiusKm);
            vertices.push([vertex.lat, vertex.lon]);
          }
          
          const hexagon = L.polygon(vertices, {
            color: '#ffffff',
            fillColor: getGradientColorForProbability(probability),
            fillOpacity: 0.6,
            weight: 1.5,
            opacity: 0.9
          }).addTo(heatLayer);
          
          const distance = calculateDistance(centerLat, centerLon, hexCenter.lat, hexCenter.lon);
          hexagon.bindPopup(`
            <div style="text-align:center; min-width:150px;">
              <strong>${(probability*100).toFixed(0)}% Probabilidad</strong><br>
              Distancia: ${distance.toFixed(0)} km<br>
              <small>${hexCenter.lat.toFixed(3)}, ${hexCenter.lon.toFixed(3)}</small>
            </div>
          `);
          
          hexagon.on('mouseover', () => hexagon.setStyle({ fillOpacity: 0.9, weight: 2.5, color: '#ffff00' }));
          hexagon.on('mouseout', () => hexagon.setStyle({ fillOpacity: 0.7, weight: 1.5, color: '#ffffff' }));
          
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
        }
      }
    }

    async function calculateGridPointProbability(lat, lon) {
      const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
      if (weatherDataCache[cacheKey]) return computeProbabilityFromData(weatherDataCache[cacheKey], lat, lon);
      
      try {
        const meteoData = await getMeteoData(lat, lon);
        const weatherData = { meteoData };
        weatherDataCache[cacheKey] = weatherData;
        return computeProbabilityFromData(weatherData, lat, lon);
      } catch (error) {
        console.warn(`Error calculando probabilidad para ${lat}, ${lon}:`, error);
        return 0;
      }
    }


    // redProbability.js - VERSIÓN CON RAYLEIGH PURO
    function computeRedProbability(low, mid, high, elevDeg, isSunrise = false, temperature = 20, pressure = 1013) {
      
      const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
      const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
      const highPct = Math.max(0, Math.min(100, Number(high) || 0));

      // ============================================
      // 1. IMPLEMENTACIÓN PURA DE DISPERSIÓN RAYLEIGH
      // ============================================
      const P0 = 1013; // Presión de referencia (nivel del mar)
      const P = Math.max(950, Math.min(1050, Number(pressure) || P0));
      
      // gamma = 1 para gas ideal
      const gamma = 1.0;
      const rayleighIntensity = Math.pow(P / P0, gamma);
      
      // Normalizamos entre 0 y 1 para P ∈ [950, 1050] hPa
      const P_min = 950;
      const P_max = 1050;
      const rayleighMin = Math.pow(P_min / P0, gamma);  // = 0.938
      const rayleighMax = Math.pow(P_max / P0, gamma);  // = 1.037
      // normalizado
      const rayleighFactor = (rayleighIntensity - rayleighMin) / (rayleighMax - rayleighMin);

      const layerScore = (
        0.05 * (lowPct / 100) +
        0.25 * (midPct / 100) +
        0.70 * (highPct / 100)
      );

      // Penalizacion por nubes bajas
      const lowCloudPenalty = Math.pow(lowPct / 100, 2);

      const idealElev = isSunrise ? 3.0 : -3.0;
      const geomSigma = 4.0;
      const geomScore = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));

      // Modelo
      const score =
        0.6 * layerScore +
        0.20 * geomScore +
      //  0.05 * humidityScore +
        0.10 * rayleighFactor - 
        0.10 * lowCloudPenalty;

      let p = 1 / (1 + Math.exp(-8 * (score - 0.45)));

      // ============================================
      // REGLAS ESPECIALES
      // ============================================

      //if (lowPct > 60) p *= Math.max(0.1, 1 - lowPct / 100);

      // const totalCloud = (lowPct + midPct + highPct) / 3;
      // if (totalCloud > 90) p *= 0.2;
      // else if (totalCloud > 70) p *= 0.5;

      //if (lowPct > 80 && totalCloud > 60) p = Math.min(p, 0.15);
      //if (lowPct < 20 && highPct > 50) p = Math.min(0.99, p * 1.2);

      return Math.max(0.01, Math.min(0.99, p));
    }

    // Exponer globalmente
    window.computeRedProbability = computeRedProbability;

    function computeProbabilityFromData(weatherData, lat, lon) {
      const { meteoData } = weatherData;
      if (!meteoData.cloudSeries) return 0;
      
      const sunset = SunCalc.getTimes(new Date(), lat, lon).sunset;
      const sunsetElev = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
      const sunsetHour = sunset.toISOString().slice(0,13);
      const idxSunset = meteoData.cloudSeries.time.findIndex(t => t.startsWith(sunsetHour));
      const targetIdx = idxSunset >= 0 ? idxSunset : 18;

      const low_e = meteoData.cloudSeries.cloudcover_low?.[targetIdx];
      const mid_e = meteoData.cloudSeries.cloudcover_mid?.[targetIdx];
      const high_e = meteoData.cloudSeries.cloudcover_high?.[targetIdx];
      
      return computeRedProbability(low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature, meteoData.current.pressure);
    }

    async function updateHeatmap(cityLat, cityLon) {
      if (!map || !heatmapEnabled) return;
      
      if (heatLayer) try { map.removeLayer(heatLayer); } catch(e) {}
      if (labelLayer) try { map.removeLayer(labelLayer); } catch(e) {}
      
      heatLayer = L.layerGroup().addTo(map);
      labelLayer = L.layerGroup().addTo(map);
      document.getElementById('mapLoading').style.display = 'block';
      
      try {
        const sunsetAzimuth = calculateSunsetAzimuth(cityLat, cityLon);
        await generate7HexagonGrid(cityLat, cityLon, sunsetAzimuth);
      } catch (error) {
        console.error('Error actualizando mapa de calor:', error);
        log('Error creando hexágonos: ' + (error && error.message));
      } finally {
        document.getElementById('mapLoading').style.display = 'none';
      }
    }

    function getGradientColorForProbability(probability) {
      const gradientStops = [
        { pos: 0.0, color: '#2b83ba' }, { pos: 0.25, color: '#abdda4' },
        { pos: 0.5, color: '#ffffbf' }, { pos: 0.75, color: '#fdae61' },
        { pos: 1.0, color: '#d7191c' }
      ];
      
      for (let i = 0; i < gradientStops.length - 1; i++) {
        const start = gradientStops[i], end = gradientStops[i + 1];
        if (probability >= start.pos && probability <= end.pos) {
          const t = (probability - start.pos) / (end.pos - start.pos);
          return interpolateColor(start.color, end.color, t);
        }
      }
      return gradientStops[gradientStops.length - 1].color;
    }

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

    function toggleHeatmap() {
      heatmapEnabled = !heatmapEnabled;
      const button = document.getElementById('toggleHeatmap');
      
      if (heatmapEnabled && currentState.lat && currentState.lon) {
        button.classList.add('active');
        updateHeatmap(currentState.lat, currentState.lon);
      } else {
        button.classList.remove('active');
        if (heatLayer) { try { map.removeLayer(heatLayer); } catch(e) {} heatLayer = null; }
        if (labelLayer) { try { map.removeLayer(labelLayer); } catch(e) {} labelLayer = null; }
      }
    }

    function toggleLabels() {
      labelsEnabled = !labelsEnabled;
      const button = document.getElementById('toggleLabels');
      
      if (labelsEnabled) {
        button.classList.add('active');
        if (labelLayer) map.addLayer(labelLayer);
        else if (currentState.lat && currentState.lon && heatmapEnabled) updateHeatmap(currentState.lat, currentState.lon);
      } else {
        button.classList.remove('active');
        if (labelLayer) try { map.removeLayer(labelLayer); } catch(e) {}
      }
    }

    /* ==========================================================================
       PREDICCIÓN PRINCIPAL
       ========================================================================== */
    async function predictRedSunset(lat, lon, cityName = '') {
      log(`Predicción para ${cityName || `${lat},${lon}`}`);

      try {
        initMap(lat, lon, cityName);
        const meteoData = await getMeteoData(lat, lon);
        
        currentState = { ...currentState, lat, lon, cityName, hourly: meteoData.cloudSeries, meteoData };
        
        const now = new Date();
        const times = SunCalc.getTimes(now, lat, lon);
        currentState.sunTimes = times;
        
        const sunrise = times.sunrise, sunset = times.sunset;
        const sunriseElev = SunCalc.getPosition(sunrise, lat, lon).altitude * (180/Math.PI);
        const sunsetElev = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
        currentState.sunriseElev = sunriseElev;
        currentState.sunsetElev = sunsetElev;

        const hrs = meteoData.cloudSeries?.time || [];
        const idxSunrise = hrs.findIndex(t => t.startsWith(sunrise.toISOString().slice(0,13)));
        const idxSunset = hrs.findIndex(t => t.startsWith(sunset.toISOString().slice(0,13)));
        const idxS = idxSunrise >=0 ? idxSunrise : 6;
        const idxE = idxSunset >=0 ? idxSunset : 20;

        // USAR SOLO DATOS REALES - pueden ser undefined
        const low_s = meteoData.cloudSeries?.cloudcover_low?.[idxS];
        const mid_s = meteoData.cloudSeries?.cloudcover_mid?.[idxS];
        const high_s = meteoData.cloudSeries?.cloudcover_high?.[idxS];
        const cloudcover_total_s = meteoData.cloudSeries?.cloudcover?.[idxS];
        const tot_s = cloudcover_total_s ?? (low_s !== undefined || mid_s !== undefined || high_s !== undefined ? 
                  Math.round(((low_s || 0) + (mid_s || 0) + (high_s || 0))/3) : 0);

        const low_e = meteoData.cloudSeries?.cloudcover_low?.[idxE];
        const mid_e = meteoData.cloudSeries?.cloudcover_mid?.[idxE];
        const high_e = meteoData.cloudSeries?.cloudcover_high?.[idxE];
        const cloudcover_total_e = meteoData.cloudSeries?.cloudcover?.[idxE];
        const tot_e = cloudcover_total_e ?? (low_e !== undefined || mid_e !== undefined || high_e !== undefined ? 
                  Math.round(((low_e || 0) + (mid_e || 0) + (high_e || 0))/3) : 0);

        // Usar los datos reales (pueden ser undefined)
        const sunriseProb = computeRedProbability(low_s, mid_s, high_s, sunriseElev, true, meteoData.current.temperature, meteoData.current.pressure);
        const sunsetProb = computeRedProbability(low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature, meteoData.current.pressure);
        currentState.preds = { sunrise: sunriseProb, sunset: sunsetProb };

        updateUI(cityName, lat, lon, meteoData, sunrise, sunset, sunriseElev, sunsetElev, tot_e, sunriseProb, sunsetProb);
        
        // ACTUALIZAR GRÁFICOS USANDO LA FUNCIÓN DEL MÓDULO
        updateCharts(meteoData, sunrise, sunset);
        
        if (heatmapEnabled) await updateHeatmap(lat, lon);
        
        log(`% arrebol: amanecer ${(sunriseProb*100).toFixed(1)}%, atardecer ${(sunsetProb*100).toFixed(1)}%`);
        log(`Presión ${meteoData.current.pressure.toFixed(0)} hPa, Humedad ${meteoData.current.humidity.toFixed(0)}%`);
        log(`Temp: ${meteoData.current.temperature.toFixed(1)}°C`);

      } catch (e) {
        document.getElementById('loadingState').innerHTML = '';
        log('Error en predictRedSunset: ' + (e && e.message));
        alert('Error al obtener datos. Revisa la consola.');
      }
    }

    /* ==========================================================================
       FUNCIONES DE INTERFAZ DE USUARIO (ACTUALIZADAS)
       ========================================================================== */
    function updateUI(cityName, lat, lon, meteoData, sunrise, sunset, sunriseElev, sunsetElev, tot_e, sunriseProb, sunsetProb) {
      document.getElementById('loadingState').innerHTML = '';
      
      const dataTime = new Date(meteoData.current.timestamp);
      const fechaStr = dataTime.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const horaStr = dataTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

      document.getElementById('dataGrid').innerHTML = `
        <div class="data-item">☁️ Nubosidad: <strong>${Math.round(tot_e)}%</strong></div>
        <div class="data-item">⬆ Elev amanecer: <strong>${sunriseElev.toFixed(1)}°</strong></div>
        <div class="data-item">⬇ Elev atardecer: <strong>${sunsetElev.toFixed(1)}°</strong></div>
      `;

      const locationInfo = chileanCities[cityName];
      let locationHTML = `📍 ${cityName}`;
      
      // Mostrar información específica según el tipo
      if (locationInfo) {
        locationHTML += `<br><small style="opacity:0.8; font-size:0.9rem;">`;
        
        if (locationInfo.type === 'observatory') {
          locationHTML += `🔭 Observatorio Astronómico<br>`;
        } else if (locationInfo.type === 'park') {
          locationHTML += `🌳 Parque Nacional<br>`;
        }
        
        if (locationInfo.altitude) locationHTML += `Altitud: ${locationInfo.altitude.toLocaleString()} m • `;
        if (locationInfo.operator) locationHTML += `Operador: ${locationInfo.operator} • `;
        locationHTML += `Región: ${locationInfo.region}`;
        locationHTML += `</small>`;
      }
      
      locationHTML += `<br><small style="opacity:0.8; font-size:0.9rem;">📅 Datos: ${fechaStr} 🕒 ${horaStr}</small>`;
      
      document.getElementById('locationText').innerHTML = locationHTML;

      document.getElementById('sunTimes').innerHTML = `
        <div class="sun-time">🌅 Amanecer: ${sunrise.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
        <div class="sun-time">🌇 Atardecer: ${sunset.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
      `;

      updatePredictions(sunriseProb, sunsetProb);
    }

    function updatePredictions(sunriseProb, sunsetProb) {
      const predBlock = document.getElementById('predictions');
      const sunriseStyles = getProbabilityStyles(sunriseProb);
      const sunsetStyles = getProbabilityStyles(sunsetProb);

      predBlock.innerHTML = `
        <div class="probability" style="background: ${sunriseStyles.background}; border: ${sunriseStyles.border}; box-shadow: ${sunriseStyles.boxShadow || 'none'}; color: ${sunriseStyles.color};">
          🌅 Amanecer: ${(sunriseProb*100).toFixed(0)}%
          ${sunriseProb > 0.8 ? '<div style="display:inline-block; margin-left:10px; animation: fire 1s infinite alternate;">🔥</div>' : ''}
        </div>
        <div class="probability" style="background: ${sunsetStyles.background}; border: ${sunsetStyles.border}; box-shadow: ${sunsetStyles.boxShadow || 'none'}; color: ${sunsetStyles.color};">
          🌇 Atardecer: ${(sunsetProb*100).toFixed(0)}%
          ${sunsetProb > 0.8 ? '<div style="display:inline-block; margin-left:10px; animation: fire 1s infinite alternate;">🔥</div>' : ''}
        </div>
      `;

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

      if (sunriseProb > 0.7 && sunsetProb > 0.7) {
        predBlock.style.background = "linear-gradient(135deg, rgba(255, 80, 80, 0.15), rgba(255, 95, 0, 0.1))";
        predBlock.style.border = "1px solid rgba(255, 95, 0, 0.3)";
        predBlock.style.boxShadow = "0 4px 20px rgba(255, 80, 80, 0.15)";
      } else if (sunriseProb > 0.7 || sunsetProb > 0.7) {
        predBlock.style.background = "linear-gradient(135deg, rgba(255, 80, 80, 0.1), rgba(255, 165, 0, 0.05))";
        predBlock.style.border = "1px solid rgba(255, 165, 0, 0.2)";
      }

      if ((sunriseProb > 0.8 || sunsetProb > 0.8) && !document.querySelector('style#fire-animation')) {
        const style = document.createElement('style');
        style.id = 'fire-animation';
        style.textContent = `@keyframes fire { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.2); opacity: 1; } }`;
        document.head.appendChild(style);
      }
    }

    /* ==========================================================================
       FUNCIONES PARA RANKING (ACTUALIZADAS)
       ========================================================================== */
    async function calculateRankings() {
      const topRanking = document.getElementById('topRanking');
      const rankingStats = document.getElementById('rankingStats');
      const regionsRanking = document.getElementById('regionsRanking');
      
      if (!topRanking) return;
      
      topRanking.innerHTML = '<p>Calculando ranking...</p>';
      const cityProbabilities = [];
      
      const citiesOnly = Object.entries(chileanCities).filter(([nombre, info]) => 
        !info.type || info.type !== 'observatory'
      );
      
      for (const [cityName, cityInfo] of citiesOnly) {
        try {
          const meteoData = await getMeteoData(cityInfo.lat, cityInfo.lon);
          
          if (meteoData.cloudSeries) {
            const sunset = SunCalc.getTimes(new Date(), cityInfo.lat, cityInfo.lon).sunset;
            const sunsetElev = SunCalc.getPosition(sunset, cityInfo.lat, cityInfo.lon).altitude * (180/Math.PI);
            const sunsetHour = sunset.toISOString().slice(0,13);
            const idxSunset = meteoData.cloudSeries.time.findIndex(t => t.startsWith(sunsetHour));
            const targetIdx = idxSunset >= 0 ? idxSunset : 18;

            // USAR SOLO DATOS REALES
            const low_e = meteoData.cloudSeries.cloudcover_low?.[targetIdx];
            const mid_e = meteoData.cloudSeries.cloudcover_mid?.[targetIdx];
            const high_e = meteoData.cloudSeries.cloudcover_high?.[targetIdx];
            
            // Solo calcular si tenemos datos
            if (low_e !== undefined || mid_e !== undefined || high_e !== undefined) {
              const probAtardecer = computeRedProbability(low_e, mid_e, high_e, sunsetElev, false, meteoData.current.temperature, meteoData.current.pressure);
              const probabilityPercent = Math.round(probAtardecer * 100);
              
              // Agregar al array de probabilidades (ESTO FALTABA)
              cityProbabilities.push({
                name: cityName,
                region: cityInfo.region,
                probability: probAtardecer,
                percent: probabilityPercent
              });
            }
          }
        } catch (error) { 
          console.warn(`Error calculando probabilidad para ${cityName}:`, error); 
        }
        // Pequeña pausa para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      if (cityProbabilities.length > 0) {
        cityProbabilities.sort((a, b) => b.probability - a.probability);
        updateRankingTable(cityProbabilities, topRanking);
        
        // Solo actualizar si los elementos existen
        if (rankingStats) {
          updateRankingStats(cityProbabilities, rankingStats);
        }
        
        if (regionsRanking) {
          updateRegionsRanking(cityProbabilities, regionsRanking);
        }
      }
    }

    function updateRankingTable(cityProbabilities, topRanking) {
      const top10 = cityProbabilities.slice(0, 10);
      
      topRanking.innerHTML = createRankingTable(top10);
    }

    function createRankingTable(cities) {
      let html = '<table class="ranking-table"><tr><th>#</th><th>Ciudad</th><th>Región</th><th>Probabilidad</th></tr>';
      cities.forEach((city, index) => {
        const rank = index + 1;
        const color = getProbabilityColor(city.percent);
        html += `
          <tr onclick="showPrediction('${city.name}', 'city')" style="cursor: pointer;">
            <td class="rank">${rank}</td>
            <td>${city.name}</td>
            <td>${city.region}</td>
            <td style="color: ${color}"><strong>${city.percent}%</strong></td>
          </tr>
        `;
      });
      return html + '</table>';
    }

    function getProbabilityColor(percent) {
      if (percent > 70) return '#d7191c';
      if (percent > 50) return '#fdae61';
      if (percent > 30) return '#ffffbf';
      return '#abdda4';
    }

    function updateRankingStats(cityProbabilities, rankingStats) {
      const total = cityProbabilities.length;
      if (total === 0) return;
      
      const average = cityProbabilities.reduce((sum, city) => sum + city.percent, 0) / total;
      const highest = cityProbabilities[0];
      const lowest = cityProbabilities[cityProbabilities.length - 1];
      
      rankingStats.innerHTML = `
        <div class="data-item">Ciudad más alta: <strong>${highest.name} (${highest.percent}%)</strong></div>
        <div class="data-item">Ciudad más baja: <strong>${lowest.name} (${lowest.percent}%)</strong></div>
        <div class="data-item">Promedio nacional: <strong>${average.toFixed(1)}%</strong></div>
        <div class="data-item">Total analizado: <strong>${total} ciudades</strong></div>
      `;
    }

    function updateRegionsRanking(cityProbabilities, regionsRanking) {
      const regions = {};
      cityProbabilities.forEach(city => {
        if (!regions[city.region]) regions[city.region] = { total: 0, sum: 0, cities: [] };
        regions[city.region].total++;
        regions[city.region].sum += city.percent;
        regions[city.region].cities.push(city);
      });
      
      const regionAverages = Object.entries(regions).map(([name, data]) => ({
        name,
        average: data.sum / data.total,
        count: data.total,
        bestCity: data.cities[0]
      })).sort((a, b) => b.average - a.average);
      
      let regionsHtml = '<table class="ranking-table"><tr><th>Región</th><th>Promedio</th><th>Ciudades</th><th>Mejor Ciudad</th></tr>';
      regionAverages.forEach(region => {
        regionsHtml += `
          <tr>
            <td><strong>${region.name}</strong></td>
            <td>${region.average.toFixed(1)}%</td>
            <td>${region.count}</td>
            <td>${region.bestCity.name} (${region.bestCity.percent}%)</td>
          </tr>
        `;
      });
      regionsRanking.innerHTML = regionsHtml + '</table>';
    }


    function getProbabilityColor(percent) {
      if (percent > 70) return '#d7191c';
      if (percent > 50) return '#fdae61';
      if (percent > 30) return '#ffffbf';
      return '#abdda4';
    }

    function updateRankingStats(cityProbabilities, rankingStats) {
      const total = cityProbabilities.length;
      const average = cityProbabilities.reduce((sum, city) => sum + city.percent, 0) / total;
      const highest = cityProbabilities[0];
      const lowest = cityProbabilities[cityProbabilities.length - 1];
      
      rankingStats.innerHTML = `
        <div class="data-item">Ciudad más alta: <strong>${highest.name} (${highest.percent}%)</strong></div>
        <div class="data-item">Ciudad más baja: <strong>${lowest.name} (${lowest.percent}%)</strong></div>
        <div class="data-item">Promedio nacional: <strong>${average.toFixed(1)}%</strong></div>
        <div class="data-item">Total analizado: <strong>${total} ciudades</strong></div>
      `;
    }

    function updateRegionsRanking(cityProbabilities, regionsRanking) {
      const regions = {};
      cityProbabilities.forEach(city => {
        if (!regions[city.region]) regions[city.region] = { total: 0, sum: 0, cities: [] };
        regions[city.region].total++;
        regions[city.region].sum += city.percent;
        regions[city.region].cities.push(city);
      });
      
      const regionAverages = Object.entries(regions).map(([name, data]) => ({
        name,
        average: data.sum / data.total,
        count: data.total,
        bestCity: data.cities[0]
      })).sort((a, b) => b.average - a.average);
      
      let regionsHtml = '<table class="ranking-table"><tr><th>Región</th><th>Promedio</th><th>Ciudades</th><th>Mejor Ciudad</th></tr>';
      regionAverages.forEach(region => {
        regionsHtml += `
          <tr>
            <td><strong>${region.name}</strong></td>
            <td>${region.average.toFixed(1)}%</td>
            <td>${region.count}</td>
            <td>${region.bestCity.name} (${region.bestCity.percent}%)</td>
          </tr>
        `;
      });
      regionsRanking.innerHTML = regionsHtml + '</table>';
    }

    /* ==========================================================================
       INICIALIZACIÓN DE LA APLICACIÓN
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', function() {
      initCityMenu();
      
      // Verificar si hay una ubicación guardada
      const lastCity = localStorage.getItem('lastCity');
      const locationType = localStorage.getItem('locationType');
      
      if (lastCity && chileanCities[lastCity]) {
        setTimeout(() => {
          showPrediction(lastCity, locationType || 'city');
        }, 500);
      }
    });

    /* ==========================================================================
       FUNCIONES DE COMPATIBILIDAD (PARA MANTENER FUNCIONES EXISTENTES)
       ========================================================================== */
    // Estas funciones se mantienen para compatibilidad con el código existente
    async function seleccionarCiudad(nombre) {
      await showPrediction(nombre, 'city');
    }

    async function seleccionarObservatorio(nombre) {
      await showPrediction(nombre, 'observatory');
    }

    function selectCityFromRanking(cityName) {
      showPrediction(cityName, 'city');
    }

    function probClass(p) {
      if (p > 0.7) return 'high-prob';
      if (p < 0.4) return 'low-prob';
      return 'medium-prob';
    }
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