
(function() {
    'use strict';
    
    let cloudChart = null;
    
    // Función principal para actualizar gráficos
    window.updateCharts = function(meteoData, sunriseTime, sunsetTime, sunriseIndex, sunsetIndex) {
        if (!meteoData?.cloudSeries?.time) return;

        // Offset en días (0=hoy, 1=mañana...) en vez de comparar fechas:
        // así el gráfico ubica el bloque de 24h correcto sin depender de
        // que la zona horaria del dispositivo coincida con la de la ciudad
        // consultada (eso era lo que fallaba en el teléfono).
        const dayOffset = (typeof timeUtils !== 'undefined' && timeUtils.getQueryDayOffset)
            ? timeUtils.getQueryDayOffset()
            : 0;

        const dayStartIndex = (typeof timeUtils !== 'undefined' && timeUtils.getDayStartIndex)
            ? timeUtils.getDayStartIndex(meteoData, dayOffset)
            : 0;

        const chartData = prepareChartData(meteoData.cloudSeries, 24, dayStartIndex);

        // sunriseIndex/sunsetIndex vienen como índices absolutos sobre todo
        // el arreglo; hay que volverlos relativos al bloque de 24h mostrado.
        const relSunriseIndex = sunriseIndex - dayStartIndex;
        const relSunsetIndex  = sunsetIndex  - dayStartIndex;

        // La línea "🕐 Ahora" solo tiene sentido si el día mostrado es hoy (offset 0).
        const isToday = dayOffset === 0;

        createCloudChart('cloudChart', chartData, sunriseTime, sunsetTime, relSunriseIndex, relSunsetIndex, isToday ? new Date() : null);
    };

    // Y en createCloudChart:
    function createCloudChart(canvasId, chartData, sunriseTime, sunsetTime, sunriseIndex, sunsetIndex, currentTime) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;
        
        if (cloudChart) cloudChart.destroy();
        
        const isMobile = window.innerWidth < 768;
        const currentHour = currentTime ? currentTime.getHours() : null;
        const currentIndex = currentTime ? findHourIndex(chartData.time, currentHour) : -1;
        
        // Usar los índices proporcionados
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
        if (targetHour == null) return -1;
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

        const legendContainer = document.createElement('div');
        legendContainer.className = 'chart-time-legend';

        const nowRow = currentHour != null
            ? `<div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
                 <div style="width: 12px; height: 3px; background: #4CAF50; border-radius: 1px;"></div>
                 <span>🕐 Ahora ${currentHour.toString().padStart(2, '0')}:00</span>
               </div>`
            : '';

        legendContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
                <div style="width: 12px; height: 3px; background: #ffeb3b; border-radius: 1px;"></div>
                <span>🌅 Amanecer ${sunriseStr}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
                <div style="width: 12px; height: 3px; background: #ff9800; border-radius: 1px;"></div>
                <span>🌇 Puesta de sol ${sunsetStr}</span>
            </div>
            ${nowRow}
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
    // startIndex: desde dónde empieza el bloque de `hours` horas a mostrar.
    // Antes siempre era 0 (o sea, siempre "hoy"); ahora se calcula a partir
    // del día elegido en el selector (ver updateCharts más arriba).
    function prepareChartData(cloudSeries, hours = 24, startIndex = 0) {
        if (!cloudSeries?.time) {
            return { hasData: false };
        }

        const end = startIndex + hours;
        const slicedTime = cloudSeries.time.slice(startIndex, end);
        const slicedClouds = {
            total: cloudSeries.cloudcover?.slice(startIndex, end).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null),
            low: cloudSeries.cloudcover_low?.slice(startIndex, end).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null),
            mid: cloudSeries.cloudcover_mid?.slice(startIndex, end).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null),
            high: cloudSeries.cloudcover_high?.slice(startIndex, end).map(v => v !== undefined ? Math.round(v) : null) || Array(hours).fill(null)
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


    // Funcion que calcula y renderiza los paneles de contribucion
    
    function renderFactorPanel(srResult, ssResult) {
      const el = document.getElementById('factorPanel');
      if (!el) return;

      function buildCol(result, icon, label) {
        if (!result) return '<div style="flex:1"></div>';
        const prob = (typeof result === 'number') ? result : (result.probability ?? 0);
        const unc = (typeof result === 'number') ? 0 : (result.uncertainty ?? 0);
        const pct = Math.round(prob * 100);
        const color = pct >= 70 ? '#639922' : pct >= 30 ? '#BA7517' : '#c0392b';

        const normalFactors = (result.factors ?? []).filter(f => !f.isUncertainty);
        const uncertaintyFactors = (result.factors ?? []).filter(f => f.isUncertainty);
        const maxAbs = normalFactors.length ? Math.max(...normalFactors.map(f => Math.abs(f.weighted)), 0.01) : 0.01;

        let probDisplay;
        if (unc > 0.15) {
          const margin = Math.round(unc * pct * 0.5);
          probDisplay = `<div style="text-align:right;"><span style="font-size:18px;font-weight:600;color:${color};">${pct}%</span><span style="font-size:10px;opacity:0.45;display:block;">± ${margin}% incerteza</span></div>`;
        } else {
          probDisplay = `<span style="font-size:18px;font-weight:600;margin-left:auto;color:${color};">${pct}%</span>`;
        }

        let h = `<div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);">
          <span style="font-size:15px;">${icon}</span><span style="font-size:12px;opacity:0.6;">${label}</span><div style="margin-left:auto;">${probDisplay}</div></div>`;

        (result.blockers ?? []).forEach(b => {
          h += `<div style="margin-bottom:7px;"><div style="font-size:11px;opacity:0.55;margin-bottom:3px;display:flex;justify-content:space-between;gap:6px;">
            <span>⛔ ${b.label}</span><span style="opacity:0.5;white-space:nowrap;">${b.detail}</span></div>
            <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
            <div style="width:100%;height:100%;background:#c0392b;border-radius:3px;opacity:0.8;"></div></div></div>`;
        });

        normalFactors.forEach(f => {
          const isNeg = f.weighted < 0, isZero = Math.abs(f.weighted) < 0.0005;
          const barColor = isZero ? 'rgba(255,255,255,0.12)' : isNeg ? '#e07b7b' : '#97C459';
          const w = Math.min(100, Math.abs(f.weighted) / maxAbs * 100);
          const sign = isNeg ? '−' : isZero ? '' : '+';
          const val = isZero ? '—' : `${sign}${(Math.abs(f.weighted) * 100).toFixed(1)}`;
          const valColor = isNeg ? '#e07b7b' : isZero ? 'rgba(255,255,255,0.25)' : '#97C459';
          h += `<div style="display:grid;grid-template-columns:1fr 34px;align-items:center;gap:6px;margin-bottom:7px;">
            <div><div style="font-size:11px;opacity:0.55;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${f.label}</div>
            <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
            <div style="width:${w}%;height:100%;background:${barColor};border-radius:3px;transition:width 0.35s ease;"></div></div></div>
            <div style="font-size:11px;font-weight:600;text-align:right;color:${valColor};">${val}</div></div>`;
        });

        if (unc > 0.15 && uncertaintyFactors.length) {
          const uncPct = Math.round(unc * 100);
          const uncColor = unc > 0.6 ? '#e07b7b' : unc > 0.3 ? '#e0a44a' : '#97C459';
          const uncMsg = unc > 0.6 ? 'Baja irradiancia — ¿horizonte bloqueado?' : unc > 0.3 ? 'Irradiancia moderada — incerteza media' : 'Irradiancia aceptable';
          h += `<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.07);">
            <div style="font-size:11px;opacity:0.55;margin-bottom:5px;display:flex;justify-content:space-between;">
            <span>⚡ Incerteza (irradiancia)</span><span style="opacity:0.6;">${uncPct}%</span></div>
            <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;margin-bottom:5px;">
            <div style="width:${uncPct}%;height:100%;border-radius:3px;background: repeating-linear-gradient(45deg,${uncColor},${uncColor} 3px,transparent 3px,transparent 6px);transition:width 0.35s ease;"></div></div>
            <div style="font-size:10px;opacity:0.4;">${uncMsg}</div></div>`;
        }
        h += `</div>`;
        return h;
      }

      el.innerHTML = `
        <div style="display:flex;gap:16px;padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;">
          ${buildCol(srResult, '🌅', 'Amanecer')}
          <div style="width:1px;background:rgba(255,255,255,0.08);flex-shrink:0;"></div>
          ${buildCol(ssResult, '🌇', 'Atardecer')}
        </div>
        <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;">
          <span style="font-size:10px;opacity:0.35;display:flex;align-items:center;gap:4px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#97C459;display:inline-block;"></span>Contribuye
          </span>
          <span style="font-size:10px;opacity:0.35;display:flex;align-items:center;gap:4px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#e07b7b;display:inline-block;"></span>Penaliza
          </span>
          <span style="font-size:10px;opacity:0.35;display:flex;align-items:center;gap:4px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#c0392b;display:inline-block;"></span>Bloqueante
          </span>
          <span style="font-size:10px;opacity:0.35;display:flex;align-items:center;gap:4px;">
            <span style="width:8px;height:8px;border-radius:2px;background: repeating-linear-gradient(45deg,#e0a44a,#e0a44a 2px,transparent 2px,transparent 5px);display:inline-block;"></span>Incerteza
          </span>
          <span style="font-size:10px;opacity:0.25;">contribución ponderada ×100</span>
        </div>`;
    }

    function togglePanel(panelId) {
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const btnId = panelId === 'factorPanel' ? 'toggleFactorBtn' : 'toggleUncertaintyBtn';
      const btn = document.getElementById(btnId);
      const isHidden = panel.style.display === 'none' || panel.style.display === '';
      if (isHidden) {
        panel.style.display = 'block';
        if (btn) { btn.classList.add('active'); btn.textContent = btn.textContent.replace('Ver', 'Ocultar'); }
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        panel.style.display = 'none';
        if (btn) { btn.classList.remove('active'); btn.textContent = btn.textContent.replace('Ocultar', 'Ver'); }
      }
    }

    /* ------------------------------------------------------------------
       RENDERIZADOR DEL PANEL DE INCERTEZA
       ------------------------------------------------------------------ */
    function displayUncertainty(result, containerId) {
      const container = document.getElementById(containerId);
      if (!container || !result || typeof result === 'number' || !result.variableUncertainties) {
        if (container) container.innerHTML = '';
        return;
      }

      const { confidence, variableUncertainties, probability, confidenceInterval, nSimulations } = result;
      const pct = (probability * 100).toFixed(0);
      const uncPct = (confidence.std * 100).toFixed(1);
      const cls = confidence.level === 'Alta' ? 'uncertainty-low' :
                  confidence.level === 'Media' ? 'uncertainty-medium' : 'uncertainty-high';

      const names = { low: 'Nubes bajas', mid: 'Nubes medias', high: 'Nubes altas',
                     temperature: 'Temperatura', pressure: 'Presión',
                     humidity: 'Humedad', shortwave: 'Irradiancia' };

      let html = `
        <div style="background:rgba(255,255,255,0.05); border-radius:10px; padding:14px; border:1px solid rgba(255,255,255,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.9rem; font-weight:500;">📊 Incerteza de la predicción</span>
              <span class="uncertainty-badge ${cls}">${confidence.level}</span>
            </div>
            <span style="font-size:0.75rem; opacity:0.5;">${nSimulations} sim.</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:1.2rem; font-weight:600;">${pct}%</span>
            <span style="font-size:0.85rem; opacity:0.7;">±${uncPct}%</span>
          </div>
          <div class="confidence-bar">
            <div class="confidence-bar-fill" style="width:${Math.min(100, (1 - confidence.std) * 100)}%; background:${confidence.color};"></div>
            <div class="confidence-bar-marker" style="left:${Math.min(100, probability * 100)}%;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; opacity:0.5; margin-bottom:8px;">
            <span>${(result.p05 * 100).toFixed(0)}%</span><span>IC 90%</span><span>${(result.p95 * 100).toFixed(0)}%</span>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
            <span style="background:rgba(255,255,255,0.08); padding:2px 10px; border-radius:12px; font-size:0.75rem;">&gt;70%: ${(result.probAbove70 * 100).toFixed(0)}%</span>
            <span style="background:rgba(255,255,255,0.08); padding:2px 10px; border-radius:12px; font-size:0.75rem;">&gt;50%: ${(result.probAbove50 * 100).toFixed(0)}%</span>
            <span style="background:rgba(255,255,255,0.08); padding:2px 10px; border-radius:12px; font-size:0.75rem;">&gt;30%: ${(result.probAbove30 * 100).toFixed(0)}%</span>
          </div>
          <div style="margin-top:10px; border-top:1px solid rgba(255,255,255,0.06); padding-top:10px;">
            <div style="font-size:0.7rem; opacity:0.4; margin-bottom:6px;">Incerteza por variable</div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:4px;">`;
      for (const [key, info] of Object.entries(variableUncertainties)) {
        const label = names[key] || key;
        const rel = info.relativeUncertainty.toFixed(0);
        const color = rel > 50 ? '#F44336' : rel > 25 ? '#FFC107' : '#4CAF50';
        html += `
          <div style="background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:4px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.7rem; opacity:0.6;">${label}</span>
            <span style="font-size:0.7rem; color:${color};">${info.value.toFixed(1)} ±${info.std.toFixed(1)} <span style="font-size:0.6rem; opacity:0.4;">(${rel}%)</span></span>
          </div>`;
      }
      html += `</div></div></div>`;
      container.innerHTML = html;
    }


    window.togglePanel = togglePanel;
    window.renderFactorPanel = renderFactorPanel;
    window.displayUncertainty = displayUncertainty

})(window)
