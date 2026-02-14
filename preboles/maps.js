// preboles/maps.js
/**
 * Módulo unificado del mapa de Préboles
 * Versión: Script global (compatible con carga <script src>)
 * 
 * Expone un objeto global: window.Maps
 * 
 * Dependencias globales: L (Leaflet), SunCalc
 */

(function(global) {
    'use strict';

    // ============================================================================
    // VARIABLES PRIVADAS
    // ============================================================================
    let mapInstance = null;
    let markerInstance = null;
    let heatLayerInstance = null;
    let labelLayerInstance = null;
    let heatmapEnabled = true;
    let labelsEnabled = true;
    let probabilityCache = new Map();

    // ============================================================================
    // GEOMETRÍA Y CÁLCULOS GEOGRÁFICOS
    // ============================================================================

    /**
     * Calcula el azimut del atardecer para una ubicación
     */
    function calculateSunsetAzimuth(lat, lon) {
        const now = new Date();
        const times = SunCalc.getTimes(now, lat, lon);
        const sunset = times.sunset;
        const position = SunCalc.getPosition(sunset, lat, lon);
        return (position.azimuth * 180 / Math.PI + 180) % 360;
    }

    /**
     * Calcula la distancia entre dos puntos (Haversine)
     */
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(lat1 * Math.PI / 180) *
                  Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    /**
     * Calcula un punto de destino dado origen, azimut y distancia
     */
    function calculateDestinationPoint(lat, lon, azimuth, distanceKm) {
        const R = 6371;
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
     * Calcula los vértices de un hexágono
     */
    function calculateHexagonVertices(centerLat, centerLon, orientationAzimuth, radiusKm) {
        const vertices = [];
        for (let i = 0; i < 6; i++) {
            const angle = orientationAzimuth + (i * 60);
            const vertex = calculateDestinationPoint(centerLat, centerLon, angle, radiusKm);
            vertices.push([vertex.lat, vertex.lon]);
        }
        return vertices;
    }

    /**
     * Genera los centros de la cuadrícula de 7 hexágonos
     */
    function generateHexagonGridCenters(centerLat, centerLon, sunsetAzimuth, hexRadiusKm = 10) {
        const hexWidth = Math.sqrt(3) * hexRadiusKm;
        const hexHeight = 1.5 * hexRadiusKm;
        const perpendicularAzimuth = (sunsetAzimuth + 90) % 360;
        
        const axialCoords = [
            { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 0, r: 1 }, 
            { q: -1, r: 1 }, { q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 }
        ];

        return axialCoords.map(({ q, r }) => {
            const x = hexWidth * (q + r / 2);
            const y = hexHeight * r;

            let center;
            if (x === 0 && y === 0) {
                center = { lat: centerLat, lon: centerLon };
            } else {
                let tempPoint = { lat: centerLat, lon: centerLon };
                if (x !== 0) {
                    const dirX = x > 0 ? perpendicularAzimuth : (perpendicularAzimuth + 180) % 360;
                    tempPoint = calculateDestinationPoint(centerLat, centerLon, dirX, Math.abs(x));
                }
                if (y !== 0) {
                    const dirY = y > 0 ? sunsetAzimuth : (sunsetAzimuth + 180) % 360;
                    center = calculateDestinationPoint(tempPoint.lat, tempPoint.lon, dirY, Math.abs(y));
                } else {
                    center = tempPoint;
                }
            }

            return { q, r, lat: center.lat, lon: center.lon };
        }).filter(c => c.lat >= -56 && c.lat <= -17 && c.lon >= -76 && c.lon <= -66);
    }

    // ============================================================================
    // ESTILOS VISUALES (privadas)
    // ============================================================================

    function interpolateColor(color1, color2, factor) {
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

    function getGradientColorForProbability(probability) {
        const stops = [
            { pos: 0.0, color: '#2b83ba' },
            { pos: 0.25, color: '#abdda4' },
            { pos: 0.5, color: '#ffffbf' },
            { pos: 0.75, color: '#fdae61' },
            { pos: 1.0, color: '#d7191c' }
        ];

        if (probability <= 0) return stops[0].color;
        if (probability >= 1) return stops[stops.length - 1].color;

        for (let i = 0; i < stops.length - 1; i++) {
            const start = stops[i];
            const end = stops[i + 1];
            if (probability >= start.pos && probability <= end.pos) {
                const t = (probability - start.pos) / (end.pos - start.pos);
                return interpolateColor(start.color, end.color, t);
            }
        }
        return stops[stops.length - 1].color;
    }

    function getHexagonStyle(probability, isHovered = false) {
        return {
            color: isHovered ? '#ffff00' : '#ffffff',
            weight: isHovered ? 2.5 : 1.5,
            opacity: 0.9,
            fillColor: getGradientColorForProbability(probability),
            fillOpacity: isHovered ? 0.9 : 0.7
        };
    }

    function getPercentageLabelStyle(percentage) {
        return L.divIcon({
            className: 'hexagon-label',
            html: `<div style="
                color: white;
                font-weight: 900;
                font-size: 18px;
                text-shadow: 0 1px 3px rgba(0,0,0,0.8);
                background: rgba(0,0,0,0.5);
                padding: 2px 6px;
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,0.3);
            ">${percentage}%</div>`,
            iconSize: [50, 25],
            iconAnchor: [25, 12]
        });
    }

    // ============================================================================
    // FUNCIONES PRIVADAS DE CREACIÓN
    // ============================================================================

    async function createHexagon(layer, lat, lon, orientationAzimuth, radiusKm, probability, distance) {
        const vertices = calculateHexagonVertices(lat, lon, orientationAzimuth, radiusKm);
        
        const hexagon = L.polygon(vertices, getHexagonStyle(probability, false))
            .addTo(layer);

        hexagon.bindPopup(`
            <div style="text-align:center; min-width:150px;">
                <strong>${(probability * 100).toFixed(0)}% Probabilidad</strong><br>
                Distancia: ${distance.toFixed(0)} km<br>
                <small>${lat.toFixed(3)}, ${lon.toFixed(3)}</small>
            </div>
        `);

        hexagon.on('mouseover', function() {
            this.setStyle(getHexagonStyle(probability, true));
        });
        
        hexagon.on('mouseout', function() {
            this.setStyle(getHexagonStyle(probability, false));
        });

        return hexagon;
    }

    function createLabel(layer, lat, lon, probability) {
        const percentage = (probability * 100).toFixed(0);
        L.marker([lat, lon], {
            icon: getPercentageLabelStyle(percentage)
        }).addTo(layer);
    }

    // ============================================================================
    // API PÚBLICA
    // ============================================================================

    const Maps = {
        // =========================================
        // Inicialización y control del mapa
        // =========================================
        
        /**
         * Inicializa o actualiza el mapa
         */
        initMap: function(lat, lon, cityName, containerId = 'map') {
            if (!mapInstance) {
                mapInstance = L.map(containerId).setView([lat, lon], 10);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 18
                }).addTo(mapInstance);
            } else {
                mapInstance.setView([lat, lon], 10);
            }

            if (markerInstance) {
                markerInstance.setLatLng([lat, lon]);
                markerInstance.setPopupContent(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`);
                markerInstance.openPopup();
            } else {
                markerInstance = L.marker([lat, lon])
                    .addTo(mapInstance)
                    .bindPopup(`<b>${cityName}</b><br>Lat: ${lat.toFixed(4)}<br>Lon: ${lon.toFixed(4)}`)
                    .openPopup();
            }

            return mapInstance;
        },

        /**
         * Obtiene la instancia del mapa
         */
        getMap: function() {
            return mapInstance;
        },

        /**
         * Limpia todas las capas del mapa
         */
        clearMapLayers: function() {
            if (heatLayerInstance) {
                mapInstance?.removeLayer(heatLayerInstance);
                heatLayerInstance = null;
            }
            if (labelLayerInstance) {
                mapInstance?.removeLayer(labelLayerInstance);
                labelLayerInstance = null;
            }
            probabilityCache.clear();
        },

        /**
         * Destruye el mapa completamente
         */
        destroyMap: function() {
            this.clearMapLayers();
            if (mapInstance) {
                mapInstance.remove();
                mapInstance = null;
                markerInstance = null;
            }
        },

        // =========================================
        // Controles de capas
        // =========================================

        /**
         * Activa/desactiva el heatmap
         */
        toggleHeatmap: function() {
            heatmapEnabled = !heatmapEnabled;
            if (!heatmapEnabled && heatLayerInstance) {
                mapInstance?.removeLayer(heatLayerInstance);
            }
            return heatmapEnabled;
        },

        /**
         * Activa/desactiva las etiquetas
         */
        toggleLabels: function() {
            labelsEnabled = !labelsEnabled;
            if (labelsEnabled && labelLayerInstance) {
                mapInstance?.addLayer(labelLayerInstance);
            } else if (labelLayerInstance) {
                mapInstance?.removeLayer(labelLayerInstance);
            }
            return labelsEnabled;
        },

        /**
         * Verifica si el heatmap está activo
         */
        isHeatmapEnabled: function() {
            return heatmapEnabled;
        },

        /**
         * Verifica si las etiquetas están activas
         */
        isLabelsEnabled: function() {
            return labelsEnabled;
        },

        // =========================================
        // Generación de hexágonos
        // =========================================

        /**
         * Dibuja la cuadrícula de hexágonos
         */
        drawHexagonGrid: async function(centerLat, centerLon, sunsetAzimuth, probabilityCalculator, showLabels = true) {
            if (!heatLayerInstance) {
                heatLayerInstance = L.layerGroup().addTo(mapInstance);
            }
            if (showLabels && labelsEnabled && !labelLayerInstance) {
                labelLayerInstance = L.layerGroup().addTo(mapInstance);
            }

            const centers = generateHexagonGridCenters(centerLat, centerLon, sunsetAzimuth);

            for (const center of centers) {
                const cacheKey = `${center.lat.toFixed(4)},${center.lon.toFixed(4)}`;
                let probability = probabilityCache.get(cacheKey);
                
                if (probability === undefined) {
                    probability = await probabilityCalculator(center.lat, center.lon);
                    probabilityCache.set(cacheKey, probability);
                }

                const distance = calculateDistance(centerLat, centerLon, center.lat, center.lon);

                await createHexagon(
                    heatLayerInstance,
                    center.lat,
                    center.lon,
                    sunsetAzimuth,
                    10,
                    probability,
                    distance
                );

                if (showLabels && labelsEnabled && labelLayerInstance) {
                    createLabel(labelLayerInstance, center.lat, center.lon, probability);
                }
            }
        },

        /**
         * Actualiza el mapa de calor (función principal)
         */
        updateHeatmap: async function(lat, lon, probabilityCalculator, showLabels = true) {
            if (!mapInstance || !heatmapEnabled) return;
            
            this.clearMapLayers();
            
            const sunsetAzimuth = calculateSunsetAzimuth(lat, lon);
            
            await this.drawHexagonGrid(
                lat,
                lon,
                sunsetAzimuth,
                probabilityCalculator,
                showLabels && labelsEnabled
            );
        },

        // =========================================
        // Utilidades geográficas (expuestas por si se necesitan)
        // =========================================

        calculateSunsetAzimuth: calculateSunsetAzimuth,
        calculateDistance: calculateDistance,
        calculateDestinationPoint: calculateDestinationPoint,
        generateHexagonGridCenters: generateHexagonGridCenters
    };

    // Exponer al ámbito global
    global.Maps = Maps;

})(window);