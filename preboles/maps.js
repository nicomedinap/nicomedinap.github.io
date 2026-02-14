// preboles/maps.js
/**
 * Módulo de mapa para Préboles
 * Contiene todas las funciones de Leaflet, hexágonos y geometría
 * 
 * Dependencias globales: L (Leaflet), SunCalc
 */

// ============================================================================
// VARIABLES GLOBALES DEL MAPA
// ============================================================================

let map = null;
let marker = null;
let heatLayer = null;
let labelLayer = null;
let heatmapEnabled = true;
let labelsEnabled = true;
let weatherDataCache = {};

// ============================================================================
// FUNCIONES DE LIMPIEZA
// ============================================================================

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

// ============================================================================
// INICIALIZACIÓN DEL MAPA
// ============================================================================

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

// ============================================================================
// FUNCIONES DE GEOMETRÍA
// ============================================================================

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

// ============================================================================
// GENERACIÓN DE HEXÁGONOS
// ============================================================================

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

// ============================================================================
// CÁLCULO DE PROBABILIDAD PARA PUNTOS DEL MAPA
// ============================================================================

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

// ============================================================================
// ACTUALIZACIÓN DEL MAPA DE CALOR
// ============================================================================

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
        // Necesitamos la función log, pero no está en este scope
        if (typeof log === 'function') {
            log('Error creando hexágonos: ' + (error && error.message));
        }
    } finally {
        document.getElementById('mapLoading').style.display = 'none';
    }
}

// ============================================================================
// FUNCIONES DE COLOR Y ESTILO
// ============================================================================

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

// ============================================================================
// FUNCIONES DE CONTROL (TOGGLES)
// ============================================================================

function toggleHeatmap() {
    heatmapEnabled = !heatmapEnabled;
    const button = document.getElementById('toggleHeatmap');
    
    if (heatmapEnabled && currentState && currentState.lat && currentState.lon) {
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
        else if (currentState && currentState.lat && currentState.lon && heatmapEnabled) updateHeatmap(currentState.lat, currentState.lon);
    } else {
        button.classList.remove('active');
        if (labelLayer) try { map.removeLayer(labelLayer); } catch(e) {}
    }
}

// ============================================================================
// EXPORTAR AL ÁMBITO GLOBAL
// ============================================================================

// Crear objeto global Maps con todas las funciones
window.Maps = {
    // Variables (getters/setters)
    getMap: () => map,
    getHeatLayer: () => heatLayer,
    getLabelLayer: () => labelLayer,
    isHeatmapEnabled: () => heatmapEnabled,
    isLabelsEnabled: () => labelsEnabled,
    
    // Funciones de limpieza
    clearMapLayers: clearMapLayers,
    
    // Inicialización
    initMap: initMap,
    
    // Geometría
    calculateDestinationPoint: calculateDestinationPoint,
    calculateSunsetAzimuth: calculateSunsetAzimuth,
    calculateDistance: calculateDistance,
    
    // Hexágonos
    generate7HexagonGrid: generate7HexagonGrid,
    calculateGridPointProbability: calculateGridPointProbability,
    computeProbabilityFromData: computeProbabilityFromData,
    
    // Actualización
    updateHeatmap: updateHeatmap,
    
    // Colores
    getGradientColorForProbability: getGradientColorForProbability,
    interpolateColor: interpolateColor,
    
    // Controles
    toggleHeatmap: toggleHeatmap,
    toggleLabels: toggleLabels,
    
    // Cache
    clearCache: () => { weatherDataCache = {}; }
};

console.log('✅ Maps.js cargado correctamente');