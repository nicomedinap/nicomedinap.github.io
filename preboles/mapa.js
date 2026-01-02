/* ====================================================
   LIBRERÍA MAPA.JS - Funciones relacionadas con mapas
   ==================================================== */

/* === VARIABLES GLOBALES PARA EL MAPA === */
let map = null;
let marker = null;
let heatLayer = null;
let labelLayer = null;
let heatmapEnabled = true;
let labelsEnabled = true;
let weatherDataCache = {};

/* ========== FUNCIONES DEL MAPA CON HEXÁGONOS ========== */

/**
 * Inicializar o actualizar el mapa Leaflet
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @param {string} cityName - Nombre de la ciudad
 */
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
 * @param {number} lat - Latitud inicial en grados
 * @param {number} lon - Longitud inicial en grados
 * @param {number} azimuth - Azimut en grados (0=N, 90=E, 180=S, 270=W)
 * @param {number} distanceKm - Distancia en kilómetros
 * @returns {Object} Objeto con {lat, lon} en grados
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
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @returns {number} Azimut en grados
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
 * @param {number} lat1 - Latitud punto 1
 * @param {number} lon1 - Longitud punto 1
 * @param {number} lat2 - Latitud punto 2
 * @param {number} lon2 - Longitud punto 2
 * @returns {number} Distancia en kilómetros
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

/**
 * Genera una grilla de 7 hexágonos alrededor de un punto central
 * @param {number} centerLat - Latitud central
 * @param {number} centerLon - Longitud central
 * @param {number} sunsetAzimuth - Azimut de la puesta de sol
 * @returns {Array} Array de hexágonos con sus propiedades
 */
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

/**
 * Calcula probabilidad para un punto específico de la grilla
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @returns {number} Probabilidad entre 0 y 1
 */
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

/**
 * Calcula probabilidad a partir de datos meteorológicos
 * @param {Object} weatherData - Datos meteorológicos
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @returns {number} Probabilidad entre 0 y 1
 */
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

/**
 * Actualiza el mapa de calor con hexágonos
 * @param {number} cityLat - Latitud de la ciudad
 * @param {number} cityLon - Longitud de la ciudad
 */
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
    if (typeof log === 'function') {
      log('Error creando hexágonos: ' + (error && error.message));
    }
  } finally {
    document.getElementById('mapLoading').style.display = 'none';
  }
}

/* ========== FUNCIONES DE COLOR CON GRADIENTE ORIGINAL ========== */

/**
 * Obtener color según probabilidad usando el gradiente original
 * @param {number} probability - Probabilidad entre 0 y 1
 * @returns {string} Color en formato hexadecimal
 */
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

/**
 * Interpolar entre dos colores hexadecimales
 * @param {string} color1 - Color inicial (hexadecimal)
 * @param {string} color2 - Color final (hexadecimal)
 * @param {number} factor - Factor de interpolación (0-1)
 * @returns {string} Color interpolado en formato hexadecimal
 */
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

/**
 * Función alternativa simple (para compatibilidad)
 * @param {number} probability - Probabilidad entre 0 y 1
 * @returns {string} Color en formato hexadecimal
 */
function getColorForProbability(probability) {
  return getGradientColorForProbability(probability);
}

/**
 * Mostrar/ocultar capa de calor
 */
function toggleHeatmap() {
  heatmapEnabled = !heatmapEnabled;
  const button = document.getElementById('toggleHeatmap');
  
  if (heatmapEnabled && window.currentState && window.currentState.lat && window.currentState.lon) {
    button.classList.add('active');
    updateHeatmap(window.currentState.lat, window.currentState.lon);
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

/**
 * Mostrar/ocultar etiquetas
 */
function toggleLabels() {
  labelsEnabled = !labelsEnabled;
  const button = document.getElementById('toggleLabels');
  
  if (labelsEnabled) {
    button.classList.add('active');
    if (labelLayer) {
      map.addLayer(labelLayer);
    } else if (window.currentState && window.currentState.lat && window.currentState.lon && heatmapEnabled) {
      updateHeatmap(window.currentState.lat, window.currentState.lon);
    }
  } else {
    button.classList.remove('active');
    if (labelLayer) {
      try { map.removeLayer(labelLayer); } catch(e) {}
    }
  }
}

/**
 * Limpiar todas las capas del mapa
 */
function clearMapLayers() {
  if (heatLayer) {
    try { map.removeLayer(heatLayer); } catch(e) {}
    heatLayer = null;
  }
  if (labelLayer) {
    try { map.removeLayer(labelLayer); } catch(e) {}
    labelLayer = null;
  }
  if (marker) {
    try { map.removeLayer(marker); } catch(e) {}
    marker = null;
  }
}

/**
 * Destruir completamente el mapa
 */
function destroyMap() {
  if (map) {
    map.remove();
    map = null;
    marker = null;
    heatLayer = null;
    labelLayer = null;
  }
}

/* ========== EXPORTAR FUNCIONES AL ÁMBITO GLOBAL ========== */

// Exportar funciones para uso global
window.initMap = initMap;
window.calculateDestinationPoint = calculateDestinationPoint;
window.calculateSunsetAzimuth = calculateSunsetAzimuth;
window.calculateDistance = calculateDistance;
window.generate7HexagonGrid = generate7HexagonGrid;
window.calculateGridPointProbability = calculateGridPointProbability;
window.computeProbabilityFromData = computeProbabilityFromData;
window.updateHeatmap = updateHeatmap;
window.getGradientColorForProbability = getGradientColorForProbability;
window.interpolateColor = interpolateColor;
window.getColorForProbability = getColorForProbability;
window.toggleHeatmap = toggleHeatmap;
window.toggleLabels = toggleLabels;
window.clearMapLayers = clearMapLayers;
window.destroyMap = destroyMap;

// Exportar variables globales para que otras librerías puedan acceder
window.map = map;
window.marker = marker;
window.heatLayer = heatLayer;
window.labelLayer = labelLayer;
window.heatmapEnabled = heatmapEnabled;
window.labelsEnabled = labelsEnabled;
window.weatherDataCache = weatherDataCache;
