let cloudChart = null;
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
          pointRadius: isMobile ? 6 : 10, 
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
          pointRadius: isMobile ? 6 : 10, 
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
          pointRadius: isMobile ? 6 : 10, 
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
          pointRadius: isMobile ? 7 : 11, 
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