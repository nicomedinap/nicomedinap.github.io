/**
 * Módulo para funciones relacionadas con gráficos
 * Archivo: https://nicomedinap.github.io/preboles/chartUtils.js
 */

(function() {
    'use strict';
    
    let cloudChart = null;
    const FALLBACK_CLOUD_VALUE = 50;
    
    // Función principal para actualizar gráficos
    window.updateCharts = function(meteoData, sunriseTime, sunsetTime) {
        if (!meteoData?.cloudSeries?.time) return;
        
        const chartData = prepareChartData(meteoData.cloudSeries);
        createCloudChart('cloudChart', chartData, sunriseTime, sunsetTime, new Date());
    };
    
    // Crear gráfico de nubes
    function createCloudChart(canvasId, chartData, sunriseTime, sunsetTime, currentTime) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;
        
        if (cloudChart) cloudChart.destroy();
        
        const isMobile = window.innerWidth < 768;
        const sunriseHour = sunriseTime.getHours();
        const sunsetHour = sunsetTime.getHours();
        const currentHour = currentTime.getHours();
        
        const sunriseIndex = findHourIndex(chartData.time, sunriseHour);
        const sunsetIndex = findHourIndex(chartData.time, sunsetHour);
        const currentIndex = findHourIndex(chartData.time, currentHour);
        
        createChartLegend(sunriseTime, sunsetTime, currentHour);
        
        cloudChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.time,
                datasets: createChartDatasets(chartData.clouds, isMobile)
            },
            options: getChartOptions(isMobile, chartData.time, sunriseIndex, sunsetIndex, currentIndex)
        });
    }
    
    // Encontrar índice de hora
    function findHourIndex(hours, targetHour) {
        return hours.findIndex(h => parseInt(h.split(':')[0]) >= targetHour);
    }
    
    // Crear datasets
    function createChartDatasets(cloudData, isMobile) {
        return [
            createDataset('Nubes bajas', cloudData.low, '#4fc3f7', [4, 3], isMobile),
            createDataset('Nubes medias', cloudData.mid, '#ffb74d', [2, 3], isMobile),
            createDataset('Nubes altas', cloudData.high, '#ba68c8', null, isMobile),
            createTotalDataset('Nubosidad total', cloudData.total, isMobile)
        ];
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
    
    // Preparar datos para gráficos
    function prepareChartData(cloudSeries, hours = 24) {
        if (!cloudSeries?.time) {
            return createFallbackChartData(hours);
        }
        
        const slicedTime = cloudSeries.time.slice(0, hours);
        const slicedClouds = {
            total: cloudSeries.cloudcover?.slice(0, hours).map(v => Math.round(v || FALLBACK_CLOUD_VALUE)) || [],
            low: cloudSeries.cloudcover_low?.slice(0, hours).map(v => Math.round(v || FALLBACK_CLOUD_VALUE)) || [],
            mid: cloudSeries.cloudcover_mid?.slice(0, hours).map(v => Math.round(v || FALLBACK_CLOUD_VALUE)) || [],
            high: cloudSeries.cloudcover_high?.slice(0, hours).map(v => Math.round(v || Math.max(0, FALLBACK_CLOUD_VALUE - 30))) || []
        };
        
        return {
            time: slicedTime.map(t => {
                const d = new Date(t);
                return `${d.getHours()}:00`;
            }),
            clouds: slicedClouds
        };
    }
    
    // Crear datos de fallback
    function createFallbackChartData(hours) {
        const timeArray = Array.from({ length: hours }, (_, i) => `${i}:00`);
        const cloudArray = Array(hours).fill(FALLBACK_CLOUD_VALUE);
        
        return {
            time: timeArray,
            clouds: {
                total: [...cloudArray],
                low: [...cloudArray],
                mid: [...cloudArray],
                high: cloudArray.map(v => Math.max(0, v - 30))
            }
        };
    }
})();