/**
 * Módulo para funciones relacionadas con gráficos
 * Archivo: https://nicomedinap.github.io/preboles/chartUtils.js
 */

// Variable global para el gráfico
let cloudChart = null;

// Función para crear o actualizar el gráfico de nubes
function createCloudChart(canvasId, chartData, sunriseTime, sunsetTime, currentTime) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Destruir gráfico existente si existe
    if (cloudChart) {
        cloudChart.destroy();
    }
    
    const isMobile = window.innerWidth < 768;
    const sunriseHour = sunriseTime.getHours();
    const sunsetHour = sunsetTime.getHours();
    const currentHour = currentTime.getHours();
    
    const sunriseIndex = chartData.time.findIndex(h => parseInt(h.split(':')[0]) >= sunriseHour);
    const sunsetIndex = chartData.time.findIndex(h => parseInt(h.split(':')[0]) >= sunsetHour);
    const currentIndex = chartData.time.findIndex(h => parseInt(h.split(':')[0]) >= currentHour);
    
    // Crear leyenda
    createChartLegend(sunriseTime, sunsetTime, currentHour);
    
    // Crear nuevo gráfico
    cloudChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.time,
            datasets: createChartDatasets(chartData.clouds, isMobile)
        },
        options: getChartOptions(isMobile, chartData.time, sunriseIndex, sunsetIndex, currentIndex)
    });
    
    return cloudChart;
}

// Crear datasets para el gráfico
function createChartDatasets(cloudData, isMobile) {
    return [
        {
            label: 'Nubes bajas',
            data: cloudData.low,
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
            pointHoverRadius: isMobile ? 10 : 14
        },
        {
            label: 'Nubes medias',
            data: cloudData.mid,
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
            pointHoverRadius: isMobile ? 10 : 14
        },
        {
            label: 'Nubes altas',
            data: cloudData.high,
            borderWidth: isMobile ? 1 : 1.5,
            borderColor: '#ba68c8',
            backgroundColor: 'rgba(186, 104, 200, 0.1)',
            fill: false,
            tension: 0.3,
            pointBackgroundColor: '#ba68c8',
            pointBorderWidth: isMobile ? 0.5 : 1,
            pointStyle: 'circle',
            pointRadius: isMobile ? 6 : 8,
            pointHoverRadius: isMobile ? 10 : 14
        },
        {
            label: 'Nubosidad total',
            data: cloudData.total,
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
        }
    ];
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
                font: {
                    size: isMobile ? 18 : 20,
                    weight: 'bold',
                    family: 'Arial, sans-serif'
                },
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
                    font: {
                        size: isMobile ? 18 : 18,
                        family: 'Arial, sans-serif',
                        weight: 'normal'
                    },
                    padding: isMobile ? 8 : 19
                }
            },
            annotation: {
                annotations: getChartAnnotations(sunriseIndex, sunsetIndex, currentIndex, isMobile)
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: getTooltipCallbacks(hours, sunriseIndex, sunsetIndex, currentIndex)
            }
        },
        scales: getChartScales(isMobile, hours, sunriseIndex, sunsetIndex, currentIndex),
        interaction: { intersect: false, mode: 'index' },
        elements: { point: { radius: isMobile ? 4 : 6, hoverRadius: isMobile ? 8 : 12 } }
    };
}

// Crear anotaciones para el gráfico
function getChartAnnotations(sunriseIndex, sunsetIndex, currentIndex, isMobile) {
    return {
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
                font: {
                    size: isMobile ? 10 : 12,
                    weight: 'bold'
                },
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
                font: {
                    size: isMobile ? 10 : 12,
                    weight: 'bold'
                },
                padding: { x: 6, y: 4 }
            }
        },
        currentTimeLine: {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: currentIndex >= 0 ? currentIndex : 12,
            borderColor: '#4CAF50',
            borderWidth: 3,
            borderDash: [3, 3],
            label: {
                enabled: true,
                content: '🕐 Ahora',
                position: 'top',
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                color: '#333',
                font: {
                    size: isMobile ? 10 : 12,
                    weight: 'bold'
                },
                padding: { x: 6, y: 4 }
            }
        }
    };
}

// Callbacks para tooltips
function getTooltipCallbacks(hours, sunriseIndex, sunsetIndex, currentIndex) {
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

// Configurar escalas del gráfico
function getChartScales(isMobile, hours, sunriseIndex, sunsetIndex, currentIndex) {
    return {
        x: {
            title: {
                display: true,
                text: 'Hora del día',
                color: '#ffffff',
                font: {
                    size: isMobile ? 16 : 18,
                    weight: 'bold'
                }
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
                font: {
                    size: isMobile ? 16 : 18,
                    weight: 'bold'
                }
            },
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.08)', drawOnChartArea: true },
            ticks: {
                color: '#ffffff',
                stepSize: 20,
                callback: value => value + '%',
                font: { size: isMobile ? 14 : 16 }
            }
        }
    };
}

// Crear leyenda para el gráfico
function createChartLegend(sunriseTime, sunsetTime, currentHour) {
    const oldLegend = document.querySelector('.chart-time-legend');
    if (oldLegend) oldLegend.remove();
    
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
    if (chartsContainer.firstChild) {
        chartsContainer.insertBefore(legendContainer, chartsContainer.firstChild);
    } else {
        chartsContainer.appendChild(legendContainer);
    }
}

// Función para preparar datos para gráficos (compatible con el código existente)
function prepareChartData(cloudSeries, hours = 24) {
    if (!cloudSeries || !cloudSeries.time) {
        return createFallbackChartData(hours);
    }
    
    const slicedTime = cloudSeries.time.slice(0, hours);
    const slicedClouds = {
        total: cloudSeries.cloudcover.slice(0, hours).map(v => Math.round(v)),
        low: cloudSeries.cloudcover_low.slice(0, hours).map(v => Math.round(v)),
        mid: cloudSeries.cloudcover_mid.slice(0, hours).map(v => Math.round(v)),
        high: cloudSeries.cloudcover_high.slice(0, hours).map(v => Math.round(v))
    };
    
    // Formatear horas para el gráfico
    const formattedTime = slicedTime.map(t => {
        const d = new Date(t);
        return d.getHours() + ':00';
    });
    
    return {
        time: formattedTime,
        clouds: slicedClouds
    };
}

// Función para crear datos de fallback para gráficos
function createFallbackChartData(hours) {
    const timeArray = [];
    const cloudArray = Array(hours).fill(50);
    
    for (let i = 0; i < hours; i++) {
        timeArray.push(`${i}:00`);
    }
    
    return {
        time: timeArray,
        clouds: {
            total: cloudArray,
            low: cloudArray,
            mid: cloudArray,
            high: cloudArray.map(v => Math.max(0, v - 30))
        }
    };
}

// Función para actualizar gráficos (mantiene compatibilidad con el código existente)
function updateCharts(meteoData, sunriseTime, sunsetTime) {
    if (!meteoData.cloudSeries || !meteoData.cloudSeries.time) return;
    
    const chartData = prepareChartData(meteoData.cloudSeries);
    createCloudChart('cloudChart', chartData, sunriseTime, sunsetTime, new Date());
}

// Hacer funciones disponibles globalmente
window.updateCharts = updateCharts;
window.createCloudChart = createCloudChart;
window.prepareChartData = prepareChartData;