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
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.2.1/dist/chartjs-plugin-annotation.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <link rel="stylesheet" href="https://nicomedinap.github.io/public/css/preboles_2.css">

  <style>
    
  </style>
  
</head>

<body>
  <div class="title-container">
    <h2 class="title">Préboles</h2>
    <div class="subtitle">
      <span class="gradient-text">PRE</span>dictor de arre<span class="gradient-text">BOLES</span>
    </div>
  </div>

  <!--
  <p class="lead-with-bg"><span class="lead-content">El arrebol es el fenómeno óptico donde la luz colorea las nubes de rojo, naranjo o rosado. Las nubes reflejan diferentes colores dependiendo del tipo de nube, y con eso es posible hacer una predicción. Elige tu ciudad y prueba tu suerte!!</span></p>
  -->
  
  <div id="loadingIndicator" style="text-align:center; padding:20px;">
    <div class="loading" style="width:40px; height:40px; margin:0 auto;"></div>
    <p style="margin-top:10px;">Obteniendo datos...</p>
  </div>

  <!-- CONTENEDOR PRINCIPAL CON PESTAÑAS -->
  <div class="tabs-container">
  <div class="tabs-header">
    <button class="tab-btn active" data-tab="cities" onclick="switchTab('cities')">🏙️ Ciudades</button>
    <button class="tab-btn" data-tab="observatories" onclick="switchTab('observatories')" style="font-size: 0.95em; display: flex; align-items: center; justify-content: center; gap: 5px;"> 🔭 Observatorios</button>
    <button class="tab-btn" data-tab="ranking" onclick="switchTab('ranking')">📊 Ranking</button>
    <button class="tab-btn" data-tab="info" onclick="switchTab('info')">ℹ️ Información</button>
  </div>
    
    <!-- Pestaña 1: Ciudades -->   
    <div id="tab-cities" class="tab-content active">
      
      <h2> Probabilidad de arrebol en la tarde</h2>

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
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap;">
                  <div style="flex: 1; min-width: 200px;">
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
              </div>
            </div>
            
            <!-- 2. MAPA -->
            <div class="map-panel panel">
              <div><strong>Mapa de probabilidad de arrebol</strong></div>
              <div class="map-wrapper" style="height: 550px;">
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
            
            <!-- 3. GRÁFICO -->
            <div class="chart-panel panel">
              <div class="charts" style="height: 400px; width: 100%;">
                <canvas id="cloudChart"></canvas>
              </div>
            </div>
            
            <!-- 4. LOG -->
            <div class="log-panel panel">
              <strong>registro</strong>
              <pre id="log" style="white-space:pre-wrap; font-size:0.85rem; margin:8px 0 0 0; max-height: 150px; overflow-y: auto;"></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
        
    <!-- Pestaña 2: Ranking -->
    <div id="tab-ranking" class="tab-content">
      <div class="container">
        <h2> Ranking de Probabilidades</h2>
        <!--  <p class="lead" style="margin-left: auto; margin-right: auto;" >Las ciudades con mayor probabilidad de arrebol según las condiciones actuales.</p> -->
        <div class="info-grid">
          <div class="info-card">
            <h4>🥇 Top 10 - Mayor Probabilidad</h4>
            <div id="topRanking"><p>Cargando ranking...</p></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pestaña 3: Observatorios -->
    <div id="tab-observatories" class="tab-content">
      <div class="container">
        <h2>🔭 Observatorios Astronómicos en Chile</h2>
        <p class="lead" style="margin-left: auto; margin-right: auto;">Chile es la capital mundial de la astronomía. Selecciona un observatorio para ver la probabilidad de arrebol.</p>
        
        <div class="observatories-grid">
          <!-- MENÚ DE OBSERVATORIOS -->
          <div id="observatoryMenu" class="city-menu"></div>
          
          <!-- MAPA DE OBSERVATORIOS -->
          <div class="panel" style="height: 600px;">
            <div><strong>📍 Ubicación de Observatorios</strong></div>
            <div class="map-wrapper" style="height: 50px;">
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

    <!-- Pestaña 4: Información -->
    <div id="tab-info" class="tab-content">
      <div class="container">

        <p class="lead-with-bg"><span class="lead-content">El arrebol es el fenómeno óptico donde la luz colorea las nubes de rojo, naranjo o rosado. Las nubes reflejan diferentes colores dependiendo del tipo de nube, y con eso es posible hacer una predicción. Elige tu ciudad y prueba tu suerte!!</span></p>

        <h2>ℹ️ Información sobre Préboles</h2>
        <div class="info-section">
          <h3> ¿Qué es un arrebol?</h3>
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
          <h3> Cómo interpretar los resultados</h3>
          <div class="info-grid">
            <div class="info-card" style="border-left: 4px solid #d7191c;">
              <h4 style="color: #d7191c;">🔴 Alta probabilidad (70-100%)</h4>
              <p>Condiciones excelentes. Es muy probable que puedas observar un arrebol espectacular si las condiciones se mantienen.</p>
            </div>
            <div class="info-card" style="border-left: 4px solid #fdae61;">
              <h4 style="color: #fdae61;">🟠 Media-alta (30-70%)</h4>
              <p>Buenas condiciones. Hay posibilidades significativas de ver un arrebol, especialmente si estás en un lugar despejado.</p>
            </div>
            <div class="info-card" style="border-left: 4px solid #abdda4;">
              <h4 style="color: #abdda4;">🟢 Baja (0-30%)</h4>
              <p>Condiciones desfavorables. Es poco probable que observes un arrebol significativo.</p>
            </div>
          </div>
        </div>
        <div class="info-section">
          <h3 class="subsection-title">Contacto y redes sociales</h3>
          <p>Para consultas técnicas, sugerencias o reportes de observaciones:</p>
          
          <div class="contact-links">
            <a href="https://nicomedinap.github.io/about.html" target="_blank" class="contact-link">
              <span class="link-icon">👤</span>
              <span class="link-text">Sobre el autor</span>
            </a>
            
            <a href="https://nicomedinap.github.io/2025/12/21/Preboles.html" target="_blank" class="contact-link">
              <span class="link-icon">📄</span>
              <span class="link-text">Artículo técnico</span>
            </a>
                      
            <a href="https://github.com/nicomedinap" target="_blank" class="contact-link github">
              <span class="link-icon">🐙</span>
              <span class="link-text">GitHub</span>
            </a>
            
            <a href="https://www.instagram.com/nicomediap/" target="_blank" class="contact-link instagram">
              <span class="link-icon">📷</span>
              <span class="link-text">Instagram</span>
            </a>
        
        </div>
      </div>
    </div>
  </div>

<!-- modulos -->
<script src="https://nicomedinap.github.io/preboles/ciudades.js"></script>
<script src="https://nicomedinap.github.io/preboles/redProbability.js"></script>
<!--<script src="https://nicomedinap.github.io/preboles/chartUtils.js"></script>

<!-- Script principal -->
<script>

/**
 * Módulo para funciones relacionadas con gráficos
 * Archivo: https://nicomedinap.github.io/preboles/chartUtils.js
 */

    (function() {
        'use strict';
        
        let cloudChart = null;
        
        // Función principal para actualizar gráficos
        window.updateCharts = function(meteoData, sunriseTime, sunsetTime, sunriseIndex, sunsetIndex) {
            if (!meteoData?.cloudSeries?.time) return;
            
            const chartData = prepareChartData(meteoData.cloudSeries);
            createCloudChart('cloudChart', chartData, sunriseTime, sunsetTime, sunriseIndex, sunsetIndex, new Date());
        };

        // Y en createCloudChart:
        function createCloudChart(canvasId, chartData, sunriseTime, sunsetTime, sunriseIndex, sunsetIndex, currentTime) {
            const ctx = document.getElementById(canvasId)?.getContext('2d');
            if (!ctx) return;
            
            if (cloudChart) cloudChart.destroy();
            
            const isMobile = window.innerWidth < 768;
            const currentHour = currentTime.getHours();
            const currentIndex = findHourIndex(chartData.time, currentHour);
            
            // Usar los índices proporcionados (no calcularlos nuevamente)
            console.log(`Gráfico: Índices recibidos - Amanecer:${sunriseIndex}, Atardecer:${sunsetIndex}`);
            
            createChartLegend(sunriseTime, sunsetTime, currentHour, sunriseIndex, sunsetIndex, currentIndex);
            
            if (chartData.hasData) {
                cloudChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartData.time,
                        datasets: createChartDatasets(chartData.clouds, isMobile)
                    },
                    options: getChartOptions(isMobile, chartData.time, sunriseIndex, sunsetIndex, currentIndex)
                });
            } else {
                // Mostrar mensaje de no datos
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('No hay datos de nubes disponibles', ctx.canvas.width/2, ctx.canvas.height/2);
            }
        }
        
        // Encontrar índice de hora
        function findHourIndex(hours, targetHour) {
            return hours.findIndex(h => parseInt(h.split(':')[0]) >= targetHour);
        }
        
        // Crear datasets
        function createChartDatasets(cloudData, isMobile) {
            const datasets = [];
            
            // Solo agregar datasets que tengan datos
            if (cloudData.low && cloudData.low.some(v => v !== null)) {
                datasets.push(createDataset('Nubes bajas', cloudData.low, '#4fc3f7', [4, 3], isMobile));
            }
            
            if (cloudData.mid && cloudData.mid.some(v => v !== null)) {
                datasets.push(createDataset('Nubes medias', cloudData.mid, '#ffb74d', [2, 3], isMobile));
            }
            
            if (cloudData.high && cloudData.high.some(v => v !== null)) {
                datasets.push(createDataset('Nubes altas', cloudData.high, '#ba68c8', null, isMobile));
            }
            
            if (cloudData.total && cloudData.total.some(v => v !== null)) {
                datasets.push(createTotalDataset('Nubosidad total', cloudData.total, isMobile));
            }
            
            return datasets;
        }
        
        // Crear dataset individual
        function createDataset(label, data, color, borderDash, isMobile) {
            return {
                label,
                data,
                borderWidth: isMobile ? 1 : 1.5,
                borderColor: color,
                backgroundColor: `${color}1a`,
                fill: false,
                tension: 0.3,
                borderDash: borderDash || undefined,
                pointBackgroundColor: color,
                pointBorderWidth: isMobile ? 0.5 : 1,
                pointStyle: 'circle',
                pointRadius: isMobile ? 6 : 8,
                pointHoverRadius: isMobile ? 10 : 14
            };
        }
        
        // Crear dataset para nubosidad total
        function createTotalDataset(label, data, isMobile) {
            return {
                label,
                data,
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
                pointHoverRadius: isMobile ? 11 : 15
            };
        }
        
        // Obtener opciones del gráfico
        function getChartOptions(isMobile, hours, sunriseIndex, sunsetIndex, currentIndex) {
            return {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: isMobile ? 1.2 : 1.3,
                plugins: {
                    title: {
                        display: true,
                        text: 'Nubosidad por Hora del Día',
                        color: '#ffffff',
                        font: { size: isMobile ? 18 : 20, weight: 'bold' },
                        padding: { top: 5, bottom: 2 }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 6,
                            boxHeight: 6,
                            color: '#ffffff',
                            font: { size: isMobile ? 18 : 18 },
                            padding: isMobile ? 8 : 19
                        }
                    },
                    annotation: {
                        annotations: createChartAnnotations(sunriseIndex, sunsetIndex, currentIndex, isMobile)
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: createTooltipCallbacks(hours, sunriseIndex, sunsetIndex, currentIndex)
                    }
                },
                scales: createChartScales(isMobile, hours, sunriseIndex, sunsetIndex, currentIndex),
                interaction: { intersect: false, mode: 'index' },
                elements: { point: { radius: isMobile ? 4 : 6, hoverRadius: isMobile ? 8 : 12 } }
            };
        }
        
        // Crear anotaciones
        function createChartAnnotations(sunriseIndex, sunsetIndex, currentIndex, isMobile) {
            const annotations = {};
            
            if (sunriseIndex >= 0) {
                annotations.sunriseLine = createAnnotation(sunriseIndex, '#ffeb3b', '🌅 Amanecer', isMobile);
            }
            
            if (sunsetIndex >= 0) {
                annotations.sunsetLine = createAnnotation(sunsetIndex, '#ff9800', '🌇 Atardecer', isMobile);
            }
            
            if (currentIndex >= 0) {
                annotations.currentTimeLine = createAnnotation(currentIndex, '#4CAF50', '🕐 Ahora', isMobile, [3, 3]);
            }
            
            return annotations;
        }
        
        // Crear anotación individual
        function createAnnotation(value, color, content, isMobile, borderDash = [5, 5]) {
            return {
                type: 'line',
                mode: 'vertical',
                scaleID: 'x',
                value,
                borderColor: color,
                borderWidth: 3,
                borderDash,
                label: {
                    enabled: true,
                    content,
                    position: 'top',
                    backgroundColor: `${color}b3`,
                    color: '#333',
                    font: { size: isMobile ? 10 : 12, weight: 'bold' },
                    padding: { x: 6, y: 4 }
                }
            };
        }
        
        // Callbacks para tooltips
        function createTooltipCallbacks(hours, sunriseIndex, sunsetIndex, currentIndex) {
            return {
                label: context => `${context.dataset.label}: ${context.parsed.y}%`,
                afterBody: context => {
                    const index = context[0].dataIndex;
                    const lines = [];
                    if (index === sunriseIndex) lines.push('🌅 Hora del amanecer');
                    if (index === sunsetIndex) lines.push('🌇 Hora del atardecer');
                    if (index === currentIndex) lines.push('🕐 Hora actual aproximada');
                    return lines;
                }
            };
        }
        
        // Configurar escalas
        function createChartScales(isMobile, hours, sunriseIndex, sunsetIndex, currentIndex) {
            return {
                x: {
                    title: {
                        display: true,
                        text: 'Hora del día',
                        color: '#ffffff',
                        font: { size: isMobile ? 16 : 18, weight: 'bold' }
                    },
                    grid: { color: 'rgba(255,255,255,0.08)', drawOnChartArea: true },
                    ticks: {
                        color: '#ffffff',
                        maxRotation: isMobile ? 45 : 0,
                        autoSkip: true,
                        maxTicksLimit: isMobile ? 12 : 24,
                        font: { size: isMobile ? 14 : 16 },
                        callback: (value, index) => {
                            const hour = hours[index];
                            if (index === sunriseIndex) return `🌅 ${hour}`;
                            if (index === sunsetIndex) return `🌇 ${hour}`;
                            if (index === currentIndex) return `🕐 ${hour}`;
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
                    grid: { color: 'rgba(255,255,255,0.08)', drawOnChartArea: true },
                    ticks: {
                        color: '#ffffff',
                        stepSize: 20,
                        callback: value => `${value}%`,
                        font: { size: isMobile ? 14 : 16 }
                    }
                }
            };
        }
        
        // Crear leyenda
        function createChartLegend(sunriseTime, sunsetTime, currentHour) {
            const oldLegend = document.querySelector('.chart-time-legend');
            if (oldLegend) oldLegend.remove();
            
            const sunriseStr = formatTime(sunriseTime);
            const sunsetStr = formatTime(sunsetTime);
            const currentStr = `${currentHour.toString().padStart(2, '0')}:00`;
            
            const legendContainer = document.createElement('div');
            legendContainer.className = 'chart-time-legend';
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
            
            const chartsContainer = document.querySelector('.charts');
            if (chartsContainer) {
                chartsContainer.insertBefore(legendContainer, chartsContainer.firstChild);
            }
        }
        
        // Formatear hora
        function formatTime(date) {
            return date.toLocaleTimeString('es-CL', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            });
        }
        
        // Preparar datos para gráficos - VERSIÓN CORREGIDA
        function prepareChartData(cloudSeries, hours = 24) {
            if (!cloudSeries?.time) {
                return { hasData: false };
            }
            
            const slicedTime = cloudSeries.time.slice(0, hours);
            const slicedClouds = {
                total: cloudSeries.cloudcover?.slice(0, hours).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null),
                low: cloudSeries.cloudcover_low?.slice(0, hours).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null),
                mid: cloudSeries.cloudcover_mid?.slice(0, hours).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null),
                high: cloudSeries.cloudcover_high?.slice(0, hours).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null)
            };
            
            // Verificar si hay al menos algún dato
            const hasData = Object.values(slicedClouds).some(dataArray => 
                dataArray.some(v => v !== null)
            );
            
            return {
                hasData,
                time: slicedTime.map(t => {
                    const d = new Date(t);
                    return `${d.getHours()}:00`;
                }),
                clouds: slicedClouds
            };
        }
    })();




    // Función para interpolar linealmente entre dos valores
    function linearInterpolate(y1, y2, fraction) {
        if (y1 === undefined || y2 === undefined) return y1 !== undefined ? y1 : y2 !== undefined ? y2 : 0;
        return y1 + (y2 - y1) * fraction;
    }

    // Función para encontrar las dos horas más cercanas a un tiempo específico
    function findClosestTimes(times, targetTime) {
        if (!times || times.length === 0) return { prevTime: null, nextTime: null, prevIndex: -1, nextIndex: -1 };
        
        const targetMs = targetTime.getTime();
        let prevIndex = -1;
        let nextIndex = -1;
        
        // Buscar la hora anterior y posterior más cercanas
        for (let i = 0; i < times.length; i++) {
            const timeMs = new Date(times[i]).getTime();
            
            if (timeMs <= targetMs) {
                prevIndex = i;
            }
            if (timeMs >= targetMs && nextIndex === -1) {
                nextIndex = i;
            }
        }
        
        // Si no encontramos hora anterior, usar la primera
        if (prevIndex === -1 && nextIndex > 0) {
            prevIndex = nextIndex;
        }
        
        // Si no encontramos hora siguiente, usar la última
        if (nextIndex === -1 && prevIndex < times.length - 1) {
            nextIndex = prevIndex + 1;
        } else if (nextIndex === -1) {
            nextIndex = prevIndex;
        }
        
        // Si ambas son iguales, ajustar
        if (prevIndex === nextIndex) {
            if (prevIndex > 0) prevIndex = prevIndex - 1;
            else if (nextIndex < times.length - 1) nextIndex = nextIndex + 1;
        }
        
        return {
            prevTime: prevIndex >= 0 ? new Date(times[prevIndex]) : null,
            nextTime: nextIndex >= 0 ? new Date(times[nextIndex]) : null,
            prevIndex: prevIndex,
            nextIndex: nextIndex
        };
    }

    // Función para interpolar datos meteorológicos en un tiempo específico
    function interpolateMeteoData(meteoData, targetTime) {
        if (!meteoData?.cloudSeries?.time || meteoData.cloudSeries.time.length < 2) {
            return null;
        }
        
        const { prevTime, nextTime, prevIndex, nextIndex } = findClosestTimes(meteoData.cloudSeries.time, targetTime);
        
        if (!prevTime || !nextTime || prevIndex === -1 || nextIndex === -1) {
            return null;
        }
        
        // Calcular fracción para interpolación (0 a 1)
        const prevMs = prevTime.getTime();
        const nextMs = nextTime.getTime();
        const targetMs = targetTime.getTime();
        
        let fraction = 0;
        if (nextMs > prevMs) {
            fraction = (targetMs - prevMs) / (nextMs - prevMs);
            // Asegurar que esté entre 0 y 1
            fraction = Math.max(0, Math.min(1, fraction));
        }
        
        // Función auxiliar para interpolar un array
        const interpolateArray = (arr) => {
            if (!arr || arr.length === 0) return 0;
            const val1 = arr[prevIndex] !== undefined ? arr[prevIndex] : 0;
            const val2 = arr[nextIndex] !== undefined ? arr[nextIndex] : val1;
            return linearInterpolate(val1, val2, fraction);
        };
        
        // Interpolar todos los datos necesarios
        return {
            time: targetTime,
            low: interpolateArray(meteoData.cloudSeries.cloudcover_low),
            mid: interpolateArray(meteoData.cloudSeries.cloudcover_mid),
            high: interpolateArray(meteoData.cloudSeries.cloudcover_high),
            total: interpolateArray(meteoData.cloudSeries.cloudcover),
            temperature: interpolateArray(meteoData.cloudSeries.temperature_2m),
            humidity: interpolateArray(meteoData.cloudSeries.relativehumidity_2m),
            pressure: interpolateArray(meteoData.cloudSeries.pressure_msl),
            // Información de depuración
            _debug: {
                prevIndex,
                nextIndex,
                fraction: Math.round(fraction * 1000) / 1000,
                prevTime: prevTime.toLocaleTimeString('es-CL'),
                nextTime: nextTime.toLocaleTimeString('es-CL'),
                targetTime: targetTime.toLocaleTimeString('es-CL')
            }
        };
    }

    // Función principal para obtener datos interpolados del atardecer
    function getSunsetDataWithInterpolation(meteoData, lat, lon) {
        if (!meteoData?.cloudSeries) return null;
        
        // Obtener hora exacta del máximo arrebol
        const optimalSunsetTime = calculateTimeToMinus2Degrees(lat, lon, false);
        
        // Interpolar datos para esa hora exacta
        const interpolatedData = interpolateMeteoData(meteoData, optimalSunsetTime);
        
        if (interpolatedData) {
            console.log(`✓ Atardecer interpolado para ${optimalSunsetTime.toLocaleTimeString('es-CL')}:`, {
                horaAnterior: interpolatedData._debug.prevTime,
                horaSiguiente: interpolatedData._debug.nextTime,
                fraccion: interpolatedData._debug.fraction,
                nubesBajas: Math.round(interpolatedData.low),
                nubesMedias: Math.round(interpolatedData.mid),
                nubesAltas: Math.round(interpolatedData.high)
            });
            
            return {
                data: interpolatedData,
                optimalTime: optimalSunsetTime,
                elevDeg: SunCalc.getPosition(optimalSunsetTime, lat, lon).altitude * (180/Math.PI)
            };
        }
        
        // Fallback: usar datos no interpolados
        return null;
    }


      // Función para calcular el tiempo hasta que el sol alcance -2 grados
    function calculateTimeToMinus2Degrees(lat, lon, isSunrise = false) {
        const now = new Date();
        const times = SunCalc.getTimes(now, lat, lon);
        const sunset = times.sunset;
        const sunrise = times.sunrise;
        
        // Empezar desde la puesta/amanecer y buscar cuando la elevación sea -3°
        const targetTime = isSunrise ? sunrise : sunset;
        const targetElevation = isSunrise ? 2 : -2; // 1° para amanecer, -1° para atardecer
        
        // Usar búsqueda binaria para encontrar el momento exacto
        let low = isSunrise ? new Date(sunrise.getTime() - 3600000) : new Date(sunset.getTime());
        let high = isSunrise ? new Date(sunrise.getTime() + 3600000) : new Date(sunset.getTime() + 7200000); // 2 horas después
        let mid;
        
        // Búsqueda por aproximación
        for (let i = 0; i < 20; i++) { // 20 iteraciones para precisión
            mid = new Date((low.getTime() + high.getTime()) / 2);
            const elev = SunCalc.getPosition(mid, lat, lon).altitude * (180/Math.PI);
            
            if (Math.abs(elev - targetElevation) < 0.01) { // Precisión de 0.01°
                break;
            }
            
            if ((isSunrise && elev < targetElevation) || (!isSunrise && elev > targetElevation)) {
                low = mid;
            } else {
                high = mid;
            }
        }
        
        return mid;
    }

    // Función para calcular el tiempo restante en formato legible
    function formatTimeRemaining(targetTime) {
        const now = new Date();
        const diffMs = targetTime.getTime() - now.getTime();
        
        if (diffMs <= 0) {
            return " ";
        }
        
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMinutes / 60);
        const remainingMinutes = diffMinutes % 60;
        
        if (diffHours > 0) {
            return `en ${diffHours}h ${remainingMinutes}m`;
        } else if (diffMinutes > 0) {
            return `en ${diffMinutes}m`;
        } else {
            return "¡muy pronto!";
        }
    }

    // Función para calcular si ya pasó el momento óptimo
    function getOptimalTimeStatus(targetTime, isSunrise = false) {
        const now = new Date();
        const diffMs = targetTime.getTime() - now.getTime();
        const eventType = isSunrise ? "amanecer" : "atardecer";
        
        if (diffMs > 0) {
            return {
                status: "pending",
                message: `Máximo arrebol ${formatTimeRemaining(targetTime)}`,
                color: "#4CAF50", // Verde
            };
        } else if (diffMs > -1800000) { // Menos de 30 minutos después
            return {
                status: "just_passed",
                message: `El máximo del arrebol acaba de pasar (hace ${Math.abs(Math.floor(diffMs / 60000))}m)`,
                color: "#FF9800" // Naranja
            };
        } else {
            return {
                status: "passed",
                message: ` `,
                color: "#9E9E9E", // Gris
            };
        }
    }
  
    function clearMapLayers() {
        console.log("Limpiando capas del mapa...");
        
        // Limpiar heatLayer
        if (heatLayer) {
            try {
                heatLayer.clearLayers();
                if (map && map.hasLayer(heatLayer)) {
                    map.removeLayer(heatLayer);
                }
            } catch (e) {
                console.warn("Error limpiando heatLayer:", e);
            }
            heatLayer = null;
        }
        
        // Limpiar labelLayer
        if (labelLayer) {
            try {
                labelLayer.clearLayers();
                if (map && map.hasLayer(labelLayer)) {
                    map.removeLayer(labelLayer);
                }
            } catch (e) {
                console.warn("Error limpiando labelLayer:", e);
            }
            labelLayer = null;
        }
    }

    // Función actualizada para updateHeatmap que limpia antes de generar
    async function updateHeatmap(cityLat, cityLon) {
        if (!map || !heatmapEnabled) return;
        
        // 1. Limpiar capas anteriores
        clearMapLayers();
        
        // 2. Crear nuevas capas
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

    // Función para obtener el índice exacto de la puesta de sol
    function getSunsetIndex(meteoData, lat, lon, isSunrise = false) {
        if (!meteoData?.cloudSeries?.time || meteoData.cloudSeries.time.length === 0) {
            console.warn('No hay datos de series temporales');
            return isSunrise ? 6 : 18; // Fallback según sea amanecer o atardecer
        }
        
        // 1. Obtener hora de amanecer/atardecer LOCAL
        const now = new Date();
        const times = SunCalc.getTimes(now, lat, lon);
        const targetTime = isSunrise ? times.sunrise : times.sunset;
                
        // 2. Convertir a formato YYYY-MM-DDTHH:00
        const year = targetTime.getFullYear();
        const month = String(targetTime.getMonth() + 1).padStart(2, '0');
        const day = String(targetTime.getDate()).padStart(2, '0');
        const hour = String(targetTime.getHours()).padStart(2, '0');
        
        const targetFormatted = `${year}-${month}-${day}T${hour}:00`;
        // console.log(`DEBUG - Formato buscado (${isSunrise ? 'amanecer' : 'atardecer'}):`, targetFormatted);
        
        // 3. Buscar en los datos
        const hrs = meteoData.cloudSeries.time;
        
        // Primero buscar exacto
        for (let i = 0; i < hrs.length; i++) {
            if (hrs[i] === targetFormatted) {
                console.log(`✓ Índice ${isSunrise ? 'amanecer' : 'atardecer'} encontrado: ${i} (${hrs[i]})`);
                return i;
            }
        }
        
        // Si no encuentra exacto, buscar por hora más cercana
        console.log(`⚠ No se encontró hora exacta de ${isSunrise ? 'amanecer' : 'atardecer'}, buscando más cercana...`);
        const targetTimeMs = targetTime.getTime();
        let closestIndex = isSunrise ? 6 : 18; // Fallback apropiado
        let minDiff = Infinity;
        
        for (let i = 0; i < hrs.length; i++) {
            const hourTime = new Date(hrs[i]).getTime();
            const diff = Math.abs(hourTime - targetTimeMs);
            
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }
        
        console.log(`✓ Usando índice más cercano para ${isSunrise ? 'amanecer' : 'atardecer'}: ${closestIndex} (${hrs[closestIndex]})`);
        console.log(`  Diferencia: ${Math.round(minDiff / 60000)} minutos`);
        
        return closestIndex;
    }

    // Función para obtener datos en un índice específico
    function getDataAtIndex(meteoData, index) {
        if (!meteoData?.cloudSeries || index < 0 || index >= meteoData.cloudSeries.time?.length) {
            return null;
        }
        
        return {
            time: meteoData.cloudSeries.time[index],
            low: meteoData.cloudSeries.cloudcover_low?.[index],
            mid: meteoData.cloudSeries.cloudcover_mid?.[index],
            high: meteoData.cloudSeries.cloudcover_high?.[index],
            total: meteoData.cloudSeries.cloudcover?.[index],
            temperature: meteoData.cloudSeries.temperature_2m?.[index],
            humidity: meteoData.cloudSeries.relativehumidity_2m?.[index],
            pressure: meteoData.cloudSeries.pressure_msl?.[index]
        };
    }


    /* ==========================================================================
       CONFIGURACIONES Y CONSTANTES
       ========================================================================== */
    const BATCH_SIZE = 3;
    const DELAY = 500;
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
      SISTEMA DE PESTAÑAS MEJORADO
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
      const isViewingPrediction = document.getElementById('appContainer').style.display === 'block';
      
      if (isViewingPrediction) {
        // Si estamos viendo una predicción y cambiamos de pestaña,
        // solo cambiar la pestaña pero mantener la predicción visible si estamos en "cities"
        if (tabName !== 'cities') {
          // Si cambiamos a otra pestaña que no sea "cities", ocultar la predicción
          document.getElementById('appContainer').style.display = 'none';
        }
        // Si cambiamos a "cities" y estamos viendo una predicción, mantenerla visible
      } else {
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
       FUNCION PARA MOSTRAR PREDICCIÓN
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

      // Limpiar el mapa
      clearMapLayers();
      
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

    /* ====================================
       FUNCIONES PARA CARGAR OBSERVATORIOS 
       ==================================== */
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

        // USAR INTERPOLACIÓN para obtener datos más precisos del atardecer
        const sunsetResult = getSunsetDataWithInterpolation(meteoData, info.lat, info.lon);
        
        if (sunsetResult) {
            const probAtardecer = computeRedProbability(
                sunsetResult.data.low, sunsetResult.data.mid, sunsetResult.data.high, 
                sunsetResult.elevDeg, false, 
                sunsetResult.data.temperature || meteoData.current.temperature,
                sunsetResult.data.pressure || meteoData.current.pressure,
                sunsetResult.data.humidity || meteoData.current.humidity
            );
            updateObservatoryCardUI(nombre, Math.round(probAtardecer * 100), info);
        } else {
            // Fallback: usar método anterior
            const sunsetIndex = getSunsetIndex(meteoData, info.lat, info.lon, false);
            const sunset = SunCalc.getTimes(new Date(), info.lat, info.lon).sunset;
            const sunsetElev = SunCalc.getPosition(sunset, info.lat, info.lon).altitude * (180/Math.PI);
            const sunsetData = getDataAtIndex(meteoData, sunsetIndex);
            
            if (sunsetData?.low !== undefined || sunsetData?.mid !== undefined || sunsetData?.high !== undefined) {
                const probAtardecer = computeRedProbability(
                    sunsetData.low, sunsetData.mid, sunsetData.high, 
                    sunsetElev, false, 
                    sunsetData.temperature || meteoData.current.temperature,
                    sunsetData.pressure || meteoData.current.pressure,
                    sunsetData.humidity || meteoData.current.humidity
                );
                updateObservatoryCardUI(nombre, Math.round(probAtardecer * 100), info);
            }
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
      
    }

    /* ==========================================================================
       FUNCIONES PRINCIPALES DE LA APLICACIÓN 
       ========================================================================== */
    async function getMeteoData(lat, lon) {
      const cacheKey = `meteo_${lat.toFixed(2)}_${lon.toFixed(2)}`;
      if (API_CACHE[cacheKey]) return API_CACHE[cacheKey];
      
      try {
        // SOLO solicitamos los datos que realmente necesitamos
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,pressure_msl,relativehumidity_2m,temperature_2m,dewpoint_2m&timezone=auto`;        const res = await fetch(url);
        const data = await res.json();
        
        if (!data.hourly) return getFallbackData();
        
        const now = new Date();
        const currentHour = now.toISOString().slice(0, 13);
        const currentIdx = data.hourly.time.findIndex(t => t.startsWith(currentHour));
        
        const currentData = currentIdx >= 0 ? {
          pressure: data.hourly.pressure_msl?.[currentIdx] || 1013,
          humidity: data.hourly.relativehumidity_2m?.[currentIdx] || 50,
          temperature: data.hourly.temperature_2m?.[currentIdx] || 20,
          dewpoint: data.hourly.dewpoint_2m?.[currentIdx] || 10, // NUEVO
          timestamp: data.hourly.time?.[currentIdx] || new Date().toISOString()
        } : { 
          pressure: 1013, 
          humidity: 50, 
          temperature: 20, 
          dewpoint: 10, // VALOR POR DEFECTO
          timestamp: new Date().toISOString() 
        };
        
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
       INTERFAZ DE USUARIO - CIUDADES 
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

        // USAR INTERPOLACIÓN para obtener datos más precisos del atardecer
        const sunsetResult = getSunsetDataWithInterpolation(meteoData, info.lat, info.lon);
        
        if (sunsetResult) {
            const probAtardecer = computeRedProbability(
                sunsetResult.data.low, sunsetResult.data.mid, sunsetResult.data.high, 
                sunsetResult.elevDeg, false,
                sunsetResult.data.temperature || meteoData.current.temperature,
                sunsetResult.data.pressure || meteoData.current.pressure,
                sunsetResult.data.humidity || meteoData.current.humidity
            );
            updateCityCardUI(nombre, Math.round(probAtardecer * 100));
        } else {
            // Fallback: usar método anterior
            const sunsetIndex = getSunsetIndex(meteoData, info.lat, info.lon, false);
            const sunset = SunCalc.getTimes(new Date(), info.lat, info.lon).sunset;
            const sunsetElev = SunCalc.getPosition(sunset, info.lat, info.lon).altitude * (180/Math.PI);
            const sunsetData = getDataAtIndex(meteoData, sunsetIndex);
            
            const probAtardecer = computeRedProbability(
                sunsetData?.low, sunsetData?.mid, sunsetData?.high, 
                sunsetElev, false,
                sunsetData?.temperature || meteoData.current.temperature,
                sunsetData?.pressure || meteoData.current.pressure,
                sunsetData?.humidity || meteoData.current.humidity
            );
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
        let background, border, color = '#ffffff', boxShadow;
        
        if (probPercent > 70) {
            background = "rgba(255, 80, 80, 0.55)";
            boxShadow = "0 4px 16px rgba(255, 80, 80, 0.1)";
            border = "1px solid rgba(255, 80, 80, 0.3)";
        } else if (probPercent > 50) {
            background = "rgba(255, 165, 0, 0.3)";
            boxShadow = "0 4px 16px rgba(255, 165, 0, 0.2)";
            border = "1px solid rgba(255, 165, 0, 0.2)";
        } else if (probPercent > 30) {
            background = "rgba(255, 200, 0, 0.25)";
            border = "1px solid rgba(255, 200, 0, 0.2)";
        } else if (probPercent > 15) {
            background = "rgba(200, 200, 255, 0.15)";
            border = "1px solid rgba(200, 200, 255, 0.1)";
        } else {
            background = "rgba(255, 255, 255, 0.05)";
            border = "1px solid rgba(255, 255, 255, 0.05)";
        }
        
        return { background, border, color, boxShadow };
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
                    <small>${hexCenter.lat.toFixed(3)}, ${hexCenter.lon.toFixed(3)}</small><br>
                    <small style="color:#888; font-size:0.8em;">Cálculo interpolado a la hora exacta</small>
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
        if (weatherDataCache[cacheKey]) {
            return computeProbabilityFromData(weatherDataCache[cacheKey], lat, lon);
        }
        
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

    // redProbability.js, para
    
    function computeProbabilityFromData(weatherData, lat, lon) {
        const { meteoData } = weatherData;
        if (!meteoData.cloudSeries) return 0;
        
        // USAR INTERPOLACIÓN para obtener datos precisos del atardecer
        const sunsetResult = getSunsetDataWithInterpolation(meteoData, lat, lon);
        
        if (sunsetResult) {
            // Usar datos interpolados
            const sunsetProb = computeRedProbability(
                sunsetResult.data.low, sunsetResult.data.mid, sunsetResult.data.high,
                sunsetResult.elevDeg, false,
                sunsetResult.data.temperature || meteoData.current.temperature,
                sunsetResult.data.pressure || meteoData.current.pressure,
                sunsetResult.data.humidity || meteoData.current.humidity
            );
            
            console.log(`Heatmap ${lat},${lon}: Interpolado, prob=${(sunsetProb*100).toFixed(1)}%`);
            return sunsetProb;
        } else {
            // Fallback: usar datos del índice del atardecer (método anterior)
            const sunsetIndex = getSunsetIndex(meteoData, lat, lon, false);
            const sunset = SunCalc.getTimes(new Date(), lat, lon).sunset;
            const sunsetElev = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
            
            const low_e = meteoData.cloudSeries.cloudcover_low?.[sunsetIndex];
            const mid_e = meteoData.cloudSeries.cloudcover_mid?.[sunsetIndex];
            const high_e = meteoData.cloudSeries.cloudcover_high?.[sunsetIndex];
            
            console.log(`Heatmap ${lat},${lon}: Índice atardecer=${sunsetIndex}, datos: low=${low_e}, mid=${mid_e}, high=${high_e}`);
            
            return computeRedProbability(low_e, mid_e, high_e, sunsetElev, false, 
                                        meteoData.current.temperature, meteoData.current.pressure, meteoData.current.humidity);
        }
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
            clearMapLayers();
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
    // Función actualizada para predictRedSunset
    async function predictRedSunset(lat, lon, cityName = '') {
        log(`Predicción para ${cityName || `${lat},${lon}`}`);

        try {
            // Limpiar mapa antes de cargar nueva ciudad
            clearMapLayers();
            
            initMap(lat, lon, cityName);
            const meteoData = await getMeteoData(lat, lon);
            
            // Obtener tiempos solares
            const now = new Date();
            const times = SunCalc.getTimes(now, lat, lon);
            const sunrise = times.sunrise;
            const sunset = times.sunset;
            
            // 1. AMANECER: usar datos normales (sin interpolación)
            const sunriseIndex = getSunsetIndex(meteoData, lat, lon, true);
            const sunriseData = getDataAtIndex(meteoData, sunriseIndex);
            const sunriseElev = SunCalc.getPosition(sunrise, lat, lon).altitude * (180/Math.PI);
            
            // 2. ATARDECER: usar interpolación para máxima precisión
            const sunsetResult = getSunsetDataWithInterpolation(meteoData, lat, lon);
            let sunsetData, sunsetElev, sunsetProb, optimalSunsetTime;
            
            if (sunsetResult) {
                // Usar datos interpolados
                sunsetData = sunsetResult.data;
                sunsetElev = sunsetResult.elevDeg;
                optimalSunsetTime = sunsetResult.optimalTime;
                
                // Calcular probabilidad con datos interpolados
                sunsetProb = computeRedProbability(
                    sunsetData.low, sunsetData.mid, sunsetData.high,
                    sunsetElev, false,
                    sunsetData.temperature || meteoData.current.temperature,
                    sunsetData.pressure || meteoData.current.pressure,
                    sunsetData.humidity || meteoData.current.humidity
                );
                
                log(`✓ Atardecer interpolado a las ${optimalSunsetTime.toLocaleTimeString('es-CL')}`);
                log(`  Nubes: Bajas=${Math.round(sunsetData.low)}%, Medias=${Math.round(sunsetData.mid)}%, Altas=${Math.round(sunsetData.high)}%`);
            } else {
                // Fallback: usar datos no interpolados
                const sunsetIndex = getSunsetIndex(meteoData, lat, lon, false);
                sunsetData = getDataAtIndex(meteoData, sunsetIndex);
                sunsetElev = SunCalc.getPosition(sunset, lat, lon).altitude * (180/Math.PI);
                optimalSunsetTime = calculateTimeToMinus2Degrees(lat, lon, false);
                
                sunsetProb = computeRedProbability(
                    sunsetData?.low, sunsetData?.mid, sunsetData?.high,
                    sunsetElev, false,
                    sunsetData?.temperature || meteoData.current.temperature,
                    sunsetData?.pressure || meteoData.current.pressure,
                    sunsetData?.humidity || meteoData.current.humidity
                );
                
                log(`⚠ Usando datos no interpolados para atardecer`);
            }
            
            // Calcular probabilidad del amanecer
            const sunriseProb = computeRedProbability(
                sunriseData?.low, sunriseData?.mid, sunriseData?.high, 
                sunriseElev, true, 
                sunriseData?.temperature || meteoData.current.temperature,
                sunriseData?.pressure || meteoData.current.pressure,
                sunriseData?.humidity || meteoData.current.humidity
            );
            
            // Actualizar estado
            currentState = { 
                lat, lon, cityName, 
                hourly: meteoData.cloudSeries, 
                meteoData,
                sunTimes: times,
                sunriseElev, sunsetElev,
                preds: { sunrise: sunriseProb, sunset: sunsetProb },
                sunriseData,
                sunsetData,
                optimalSunsetTime: optimalSunsetTime
            };
            
            // Actualizar UI con información del máximo arrebol
            updateUI(cityName, lat, lon, meteoData, sunrise, sunset, 
                    sunriseData, sunsetData, sunriseProb, sunsetProb, optimalSunsetTime);
            
            // ACTUALIZAR GRÁFICOS (usar índices normales para compatibilidad)
            updateCharts(meteoData, sunrise, sunset, sunriseIndex, getSunsetIndex(meteoData, lat, lon, false));
            
            if (heatmapEnabled) await updateHeatmap(lat, lon);
            
            log(`% arrebol: amanecer ${(sunriseProb*100).toFixed(1)}%, atardecer ${(sunsetProb*100).toFixed(1)}%`);
            log(`Máximo arrebol estimado: ${optimalSunsetTime.toLocaleTimeString('es-CL')}`);

        } catch (e) {
            document.getElementById('loadingState').innerHTML = '';
            log('Error en predictRedSunset: ' + (e && e.message));
            console.error(e);
        }
    }

    /* =================================
       FUNCIONES DE INTERFAZ DE USUARIO
       ================================= */
    function updateUI(cityName, lat, lon, meteoData, sunrise, sunset, 
                    sunriseData, sunsetData, sunriseProb, sunsetProb, optimalSunsetTime) {
        document.getElementById('loadingState').innerHTML = '';
        
        const dataTime = new Date(meteoData.current.timestamp);
        const fechaStr = dataTime.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const horaStr = dataTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

        // Mostrar datos específicos de cada hora
        const sunriseCloudTotal = sunriseData?.total || 0;
        const sunsetCloudTotal = sunsetData?.total || 0;
        
        const sunriseTemp = sunriseData?.temperature || meteoData.current.temperature;
        const sunsetTemp = sunsetData?.temperature || meteoData.current.temperature;
        
        const sunriseHumidity = sunriseData?.humidity || meteoData.current.humidity;
        const sunsetHumidity = sunsetData?.humidity || meteoData.current.humidity;

        // Actualizar dataGrid con información del máximo arrebol
        document.getElementById('dataGrid').innerHTML = `
            <div class="data-item">🌅 Nubes amanecer: <strong>${Math.round(sunriseCloudTotal)}%</strong></div>
            <div class="data-item">🌇 Nubes atardecer: <strong>${Math.round(sunsetCloudTotal)}%</strong></div>
            ${optimalSunsetTime ? `<div class="data-item">⏰ Máximo arrebol: <strong>${optimalSunsetTime.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}</strong></div>` : ''}
        `;

        const locationInfo = chileanCities[cityName];
        let locationHTML = `📍 ${cityName}`;
        
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

        // Mostrar horas con información del máximo
        const optimalStr = optimalSunsetTime ? 
            `<br><small style="opacity:0.7; font-size:0.8rem;">Máximo arrebol: ${optimalSunsetTime.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}</small>` : '';
        
        document.getElementById('sunTimes').innerHTML = `
            <div class="sun-time">🌅 Amanecer: ${sunrise.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}</div>
            <div class="sun-time">🌇 Atardecer: ${sunset.toLocaleTimeString('es-CL',{hour:'2-digit', minute:'2-digit'})}${optimalStr}</div>
        `;

        updatePredictions(sunriseProb, sunsetProb);
    }

        /* ==========================================================================
      FUNCIÓN UPDATE PREDICTIONS
      ========================================================================== */
    function updatePredictions(sunriseProb, sunsetProb) {
        const predBlock = document.getElementById('predictions');
        const sunriseStyles = getProbabilityStyles(sunriseProb);
        const sunsetStyles = getProbabilityStyles(sunsetProb);

        predBlock.innerHTML = `
            <div class="probability" style="background: ${sunriseStyles.background}; border: ${sunriseStyles.border}; box-shadow: ${sunriseStyles.boxShadow || 'none'}; color: ${sunriseStyles.color};">
                🌅 Amanecer: ${(sunriseProb*100).toFixed(0)}%
            </div>
            <div class="probability" style="background: ${sunsetStyles.background}; border: ${sunriseStyles.border}; box-shadow: ${sunsetStyles.boxShadow || 'none'}; color: ${sunsetStyles.color};">
                🌇 Atardecer: ${(sunsetProb*100).toFixed(0)}%
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
       FUNCIONES PARA RANKING 
       ========================================================================== */
    async function calculateRankings() {
        const topRanking = document.getElementById('topRanking');
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
                    // USAR INTERPOLACIÓN para obtener datos más precisos del atardecer
                    const sunsetResult = getSunsetDataWithInterpolation(meteoData, cityInfo.lat, cityInfo.lon);
                    
                    let probAtardecer = 0;
                    let optimalSunsetTime = calculateTimeToMinus2Degrees(cityInfo.lat, cityInfo.lon, false);
                    
                    if (sunsetResult) {
                        // Usar datos interpolados
                        probAtardecer = computeRedProbability(
                            sunsetResult.data.low, sunsetResult.data.mid, sunsetResult.data.high, 
                            sunsetResult.elevDeg, false, 
                            sunsetResult.data.temperature || meteoData.current.temperature,
                            sunsetResult.data.pressure || meteoData.current.pressure,
                            sunsetResult.data.humidity || meteoData.current.humidity
                        );
                        optimalSunsetTime = sunsetResult.optimalTime;
                    } else {
                        // Fallback: usar datos no interpolados
                        const sunsetIndex = getSunsetIndex(meteoData, cityInfo.lat, cityInfo.lon, false);
                        const sunset = SunCalc.getTimes(new Date(), cityInfo.lat, cityInfo.lon).sunset;
                        const sunsetElev = SunCalc.getPosition(sunset, cityInfo.lat, cityInfo.lon).altitude * (180/Math.PI);
                        const sunsetData = getDataAtIndex(meteoData, sunsetIndex);
                        
                        probAtardecer = computeRedProbability(
                            sunsetData?.low, sunsetData?.mid, sunsetData?.high, 
                            sunsetElev, false, 
                            sunsetData?.temperature || meteoData.current.temperature,
                            sunsetData?.pressure || meteoData.current.pressure,
                            sunsetData?.humidity || meteoData.current.humidity
                        );
                    }
                    
                    const probabilityPercent = Math.round(probAtardecer * 100);
                    const sunsetStatus = getOptimalTimeStatus(optimalSunsetTime, false);
                    
                    cityProbabilities.push({
                        name: cityName,
                        region: cityInfo.region,
                        probability: probAtardecer,
                        percent: probabilityPercent,
                        optimalTime: optimalSunsetTime,
                        timeStatus: sunsetStatus,
                        dataUsed: { 
                            interpolated: sunsetResult !== null,
                            low: sunsetResult?.data?.low,
                            mid: sunsetResult?.data?.mid,
                            high: sunsetResult?.data?.high 
                        }
                    });
                }
            } catch (error) { 
                console.warn(`Error calculando probabilidad para ${cityName}:`, error); 
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        if (cityProbabilities.length > 0) {
            cityProbabilities.sort((a, b) => b.probability - a.probability);
            updateRankingTable(cityProbabilities, topRanking);
        }
    }

    function updateRankingTable(cityProbabilities, topRanking) {
      const top10 = cityProbabilities.slice(0, 10);
      
      topRanking.innerHTML = createRankingTable(top10);
    }

    function createRankingTable(cities) {
        let html = '<table class="ranking-table"><tr><th>#</th><th>Ciudad</th><th>Prob.</th><th>Máximo del arrebol</th></tr>';
        cities.forEach((city, index) => {
            const rank = index + 1;
            const color = getProbabilityColor(city.percent);
            const optimalTimeStr = city.optimalTime.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'});
            
            html += `
                <tr onclick="showPrediction('${city.name}', 'city')" style="cursor: pointer;">
                    <td class="rank">${rank}</td>
                    <td>${city.name}</td>
                    <td style="color: ${color}"><strong>${city.percent}%</strong></td>
                    <td><small>${optimalTimeStr}</small></td>
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
      if (p < 0.3) return 'low-prob';
      return 'medium-prob';
    }
  </script>

  <footer class="footer">
    <p><span class="gradient-text">Préboles 2026</span>. Nicolás Medina Peña.</p>
    <nav>
      <a href="https://nicomedinap.github.io/about.html" target="_blank"> <u>Sobre el autor</u></a>
      <a href="https://nicomedinap.github.io/2025/12/21/Preboles.html" target="_blank"> <u>Sobre el modelo predictivo y los datos</u></a>
    </nav>
  </footer>