(function(global) {
    'use strict';

    var ML_STORAGE_KEY     = 'preboles_ml_data_v2';
    var ML_MAX_RECORDS     = 2000;
    var ML_THRESHOLD_KEY   = 'preboles_ml_threshold_v1';

    // esperamos a que pasen RENDER_DEBOUNCE_MS sin
    // llamadas nuevas antes de renderizar de verdad.
    var RENDER_DEBOUNCE_MS  = 900;
    var renderDebounceTimer = null;
    var isCalculating       = false;

    function nowISO() { return new Date().toISOString(); }

    function scheduleRender() {
        isCalculating = true;
        renderHistoryTab(); // refresca contenido/contador, pero con el selector bloqueado
        if (renderDebounceTimer) clearTimeout(renderDebounceTimer);
        renderDebounceTimer = setTimeout(function() {
            renderDebounceTimer = null;
            isCalculating = false;
            renderHistoryTab();
        }, RENDER_DEBOUNCE_MS);
    }

    function loadData() {
        try {
            return JSON.parse(localStorage.getItem(ML_STORAGE_KEY) || '[]');
        } catch(e) {
            console.warn('⚠ Error leyendo localStorage:', e);
            return [];
        }
    }

    function saveData(data) {
        try {
            var toSave = data.length > ML_MAX_RECORDS ? data.slice(-ML_MAX_RECORDS) : data;
            localStorage.setItem(ML_STORAGE_KEY, JSON.stringify(toSave));
            return toSave;
        } catch(e) {
            console.warn('⚠ localStorage lleno, recortando a 500 registros…');
            var trimmed = data.slice(-500);
            localStorage.setItem(ML_STORAGE_KEY, JSON.stringify(trimmed));
            return trimmed;
        }
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function toHHMM(value) {
        if (!value) return null;
        try {
            return new Date(value).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        } catch(e) { return null; }
    }

    function optimalTimeToString(value) {
        if (!value) return null;
        if (value instanceof Date) return value.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        return String(value);
    }

    // Umbral de probabilidad 
    // 
    function loadThreshold() {
        var v = localStorage.getItem(ML_THRESHOLD_KEY);
        var n = v !== null ? parseFloat(v) : 0.6;
        return isNaN(n) ? 0.6 : n;
    }

    function saveThreshold(v) {
        localStorage.setItem(ML_THRESHOLD_KEY, String(v));
    }

    window.setLabelingThreshold = function(v) {
        saveThreshold(parseFloat(v));
        renderHistoryTab();
    };

    // Guardar una predicción
    function collectPrediction(raw) {
        var data = loadData();
        var now  = new Date();
        var sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString();

        var exists = data.some(function(r) {
            return r.locationName === (raw.locationName || null) && r.timestamp > sixHoursAgo;
        });

        if (exists) {
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i].locationName === (raw.locationName || null) && data[i].timestamp > sixHoursAgo) {
                    data[i].sunriseProb        = raw.sunriseProb  != null ? raw.sunriseProb  : data[i].sunriseProb;
                    data[i].sunsetProb         = raw.sunsetProb   != null ? raw.sunsetProb   : data[i].sunsetProb;
                    data[i].sunriseElev        = raw.sunriseElev  != null ? raw.sunriseElev  : data[i].sunriseElev;
                    data[i].sunsetElev         = raw.sunsetElev   != null ? raw.sunsetElev   : data[i].sunsetElev;
                    data[i].sunriseTime        = toHHMM(raw.sunriseTime);
                    data[i].sunsetTime         = toHHMM(raw.sunsetTime);
                    data[i].optimalArrebolTime = optimalTimeToString(raw.optimalArrebolTime);
                    if (raw.cloudsAtSunset) {
                        data[i].sunsetCloudsLow   = raw.cloudsAtSunset.low   || 0;
                        data[i].sunsetCloudsMid   = raw.cloudsAtSunset.mid   || 0;
                        data[i].sunsetCloudsHigh  = raw.cloudsAtSunset.high  || 0;
                        data[i].sunsetCloudsTotal = raw.cloudsAtSunset.total || 0;
                    }
                    if (raw.cloudsAtSunrise) {
                        data[i].sunriseCloudsLow   = raw.cloudsAtSunrise.low   || 0;
                        data[i].sunriseCloudsM     = raw.cloudsAtSunrise.mid   || 0;
                        data[i].sunriseCloudsHigh  = raw.cloudsAtSunrise.high  || 0;
                        data[i].sunriseCloudsTotal = raw.cloudsAtSunrise.total || 0;
                    }
                    if (raw.weatherData) {
                        data[i].temperature = raw.weatherData.temperature;
                        data[i].humidity    = raw.weatherData.humidity;
                        data[i].pressure    = raw.weatherData.pressure;
                        data[i].dewpoint    = raw.weatherData.dewpoint;
                    }
                    data[i].updatedAt = nowISO();
                    saveData(data);
                    console.log('Registro actualizado [' + data[i].locationName + ']');
                    scheduleRender();
                    return data[i];
                }
            }
        }

        var record = {
            id:                 generateUUID(),
            timestamp:          now.toISOString(),
            date:               now.toISOString().slice(0, 10),
            hour:               now.getHours(),
            weekday:            now.getDay(),
            locationName:       raw.locationName     || null,
            locationType:       raw.locationType     || 'city',
            lat:                raw.lat              != null ? raw.lat      : null,
            lon:                raw.lon              != null ? raw.lon      : null,
            altitude:           raw.altitude         != null ? raw.altitude : null,
            sunriseProb:        raw.sunriseProb      != null ? raw.sunriseProb : null,
            sunsetProb:         raw.sunsetProb       != null ? raw.sunsetProb  : null,
            sunriseElev:        raw.sunriseElev      != null ? raw.sunriseElev : null,
            sunsetElev:         raw.sunsetElev       != null ? raw.sunsetElev  : null,
            sunriseTime:        toHHMM(raw.sunriseTime),
            sunsetTime:         toHHMM(raw.sunsetTime),
            optimalArrebolTime: optimalTimeToString(raw.optimalArrebolTime),
            sunriseCloudsLow:   raw.cloudsAtSunrise ? (raw.cloudsAtSunrise.low   || 0) : null,
            sunriseCloudsM:     raw.cloudsAtSunrise ? (raw.cloudsAtSunrise.mid   || 0) : null,
            sunriseCloudsHigh:  raw.cloudsAtSunrise ? (raw.cloudsAtSunrise.high  || 0) : null,
            sunriseCloudsTotal: raw.cloudsAtSunrise ? (raw.cloudsAtSunrise.total || 0) : null,
            sunsetCloudsLow:    raw.cloudsAtSunset  ? (raw.cloudsAtSunset.low    || 0) : null,
            sunsetCloudsMid:    raw.cloudsAtSunset  ? (raw.cloudsAtSunset.mid    || 0) : null,
            sunsetCloudsHigh:   raw.cloudsAtSunset  ? (raw.cloudsAtSunset.high   || 0) : null,
            sunsetCloudsTotal:  raw.cloudsAtSunset  ? (raw.cloudsAtSunset.total  || 0) : null,
            temperature:        raw.weatherData ? (raw.weatherData.temperature || null) : null,
            humidity:           raw.weatherData ? (raw.weatherData.humidity    || null) : null,
            pressure:           raw.weatherData ? (raw.weatherData.pressure    || null) : null,
            dewpoint:           raw.weatherData ? (raw.weatherData.dewpoint    || null) : null,
            actualArrebol:      null,
            userRating:         null,
            userNotes:          null,
            updatedAt:          nowISO()
        };

        data.push(record);
        data = saveData(data);
        console.log('Registro guardado [' + record.locationName + '] id=' + record.id);
        scheduleRender();
        return record;
    }

    // Etiquetar un registro
    function updateLabel(id, actualArrebol, userRating, userNotes) {
        var data  = loadData();
        var found = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].actualArrebol = actualArrebol;
                data[i].userRating    = userRating != null ? userRating : null;
                data[i].userNotes     = userNotes  != null ? userNotes  : null;
                data[i].updatedAt     = nowISO();
                found = true;
                break;
            }
        }
        if (found) { saveData(data); renderHistoryTab(); }
        return found;
    }

    // Getters
    function getAllData()  { return loadData(); }
    function getCount()   { return loadData().length; }
    function getLast(n)   { var d = loadData(); return d.slice(-(n || 10)).reverse(); }
    function clearAll()   { localStorage.removeItem(ML_STORAGE_KEY); }

    // Estadísticas resumidas
    function getStats() {
        var data = loadData();
        if (!data.length) return null;
        var sumProb = 0, labeled = 0, byType = {}, names = {};
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            sumProb += r.sunsetProb || 0;
            if (r.actualArrebol !== null && r.actualArrebol !== undefined) labeled++;
            byType[r.locationType] = (byType[r.locationType] || 0) + 1;
            names[r.locationName]  = true;
        }
        return {
            total:         data.length,
            labeled:       labeled,
            unique:        Object.keys(names).length,
            byType:        byType,
            avgSunsetProb: (sumProb / data.length).toFixed(3),
            firstDate:     data[0] ? data[0].date : null,
            lastDate:      data[data.length - 1] ? data[data.length - 1].date : null
        };
    }

    // ================================
    // Descarga de archivo
    // ================================
    function downloadBlob(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a   = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            URL.revokeObjectURL(url);
            if (a.parentNode) a.parentNode.removeChild(a);
        }, 1000);
    }

    var CSV_COLS = [
        'id','timestamp','date','hour','weekday',
        'locationName','locationType','lat','lon','altitude',
        'sunriseProb','sunsetProb',
        'sunriseElev','sunsetElev','sunriseTime','sunsetTime','optimalArrebolTime',
        'sunriseCloudsLow','sunriseCloudsM','sunriseCloudsHigh','sunriseCloudsTotal',
        'sunsetCloudsLow','sunsetCloudsMid','sunsetCloudsHigh','sunsetCloudsTotal',
        'temperature','humidity','pressure','dewpoint',
        'actualArrebol','userRating','userNotes','updatedAt'
    ];

    function escapeCSV(v) {
        if (v === null || v === undefined) return '';
        var s = String(v);
        if (s.indexOf(',') !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1)
            return '"' + s.replace(/"/g, '""') + '"';
        return s;
    }

    function exportCSV() {
        var data = loadData();
        if (!data.length) { alert('No hay datos para exportar. Visita algunas ciudades primero.'); return; }
        var rows = [CSV_COLS.join(',')];
        for (var i = 0; i < data.length; i++) {
            rows.push(CSV_COLS.map(function(c) { return escapeCSV(data[i][c]); }).join(','));
        }
        downloadBlob(new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' }),
            'preboles_historial_' + new Date().toISOString().slice(0,10) + '.csv');
    }

    function exportJSON() {
        var data = loadData();
        if (!data.length) { alert('No hay datos para exportar. Visita algunas ciudades primero.'); return; }
        var payload = {
            meta: { exported: new Date().toISOString(), total: data.length,
                    schema_ver: '2.1', description: 'Datos de predicción de arrebol – Préboles' },
            records: data
        };
        downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
            'preboles_historial_' + new Date().toISOString().slice(0,10) + '.json');
    }

    // ================================
    // Bloque de ayuda / auto-explicación
    // ================================
    function buildHelpBlock() {
        return (
            '<details style="margin-bottom:14px;">' +
            '<summary style="cursor:pointer;font-size:0.8rem;opacity:0.6;user-select:none;">' +
                'ℹ️ ¿Qué es esta sección?' +
            '</summary>' +
            '<div style="font-size:0.78rem;opacity:0.65;line-height:1.55;margin-top:8px;padding:10px 12px;background:rgba(255,255,255,0.04);border-radius:8px;">' +
                '<p style="margin:0 0 8px;">Sección de uso interno, con el fin de cuantificar los parámetros atmosféricos de las ciudades al momento del arrebol. Cada vez que visitas una ciudad, la app guarda automáticamente la predicción de arrebol (el color del cielo al amanecer/atardecer) para poder comparar después con lo que realmente ocurrió — esto sirve para entrenar y mejorar el modelo.</p>' +
                '<p style="margin:0;">El <strong>umbral</strong> controla desde qué probabilidad predicha aparece una ciudad en la lista. Bájalo a 0% si quieres revisar también casos de baja probabilidad — a veces son los más interesantes para el modelo, porque muestran dónde se equivocó.</p>' +
            '</div>' +
            '</details>'
        );
    }

    // ================================
    // Lista vertical de etiquetado
    // umbral configurable (por defecto 60%, ajustable desde la UI)
    // ================================
    function buildThresholdSelector(current, disabled) {
        var opts = [0, 0.2, 0.4, 0.6, 0.8];
        return (
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">' +
            '<label style="font-size:0.72rem;opacity:0.55;">Umbral mínimo de probabilidad:</label>' +
            '<select' + (disabled ? ' disabled' : '') + ' onchange="window.setLabelingThreshold(this.value)" style="background:rgba(255,255,255,0.08);color:inherit;border:1px solid rgba(255,255,255,0.15);border-radius:6px;padding:3px 8px;font-size:0.75rem;' + (disabled ? 'opacity:0.45;cursor:not-allowed;' : '') + '">' +
            opts.map(function(o) {
                return '<option value="' + o + '"' + (Math.abs(o - current) < 0.001 ? ' selected' : '') + '>' +
                    (o === 0 ? '0% (todas)' : (o * 100) + '%') + '</option>';
            }).join('') +
            '</select>' +
            (disabled ? '<span style="font-size:0.68rem;opacity:0.4;">calculando ciudades…</span>' : '') +
            '</div>'
        );
    }

    function buildLabelingList(data) {
        var threshold = loadThreshold();

        var pending = data.filter(function(r) {
            return (r.actualArrebol === null || r.actualArrebol === undefined)
                && (r.sunsetProb || 0) >= threshold;
        }).sort(function(a, b) {
            return (b.sunsetProb || 0) - (a.sunsetProb || 0);
        });

        var labeled = data.filter(function(r) {
            return r.actualArrebol !== null && r.actualArrebol !== undefined;
        }).sort(function(a, b) {
            return b.timestamp > a.timestamp ? 1 : -1;
        });

        // Estilo base de botón — compacto, adaptable
        var BTN = [
            'border:none',
            'border-radius:5px',
            'cursor:pointer',
            'font-size:0.7rem',
            'font-weight:600',
            'padding:4px 8px',
            'line-height:1.3',
            'white-space:nowrap',
            'flex-shrink:0',
            'min-width:32px'
        ].join(';');

        // pendientes: — tabla responsiva con scroll horizontal
        var pendingHTML = '';
        if (!pending.length) {
            pendingHTML =
                '<p style="font-size:0.8rem;opacity:0.45;text-align:center;padding:12px 0;margin:0;">' +
                'Sin ciudades pendientes sobre ese umbral.' +
                '</p>';
        } else {
            pendingHTML =
                '<div style="overflow-x:auto;margin:0 -2px;padding:0 2px;">' +
                '<table style="width:100%;border-collapse:collapse;font-size:0.75rem;">' +
                '<thead>' +
                '<tr style="opacity:0.5;border-bottom:1px solid rgba(255,255,255,0.1);">' +
                '<th style="text-align:left;padding:8px 4px;font-weight:500;">Ciudad</th>' +
                '<th style="text-align:center;padding:8px 4px;font-weight:500;">Fecha</th>' +
                '<th style="text-align:center;padding:8px 4px;font-weight:500;">Prob</th>' +
                '<th style="text-align:center;padding:8px 4px;font-weight:500;">Acciones</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                pending.map(function(r) {
                    var pct    = (r.sunsetProb * 100).toFixed(0);
                    var pctClr = r.sunsetProb > 0.8 ? '#ff6f60' : (r.sunsetProb > 0.6 ? '#ffb74d' : '#90a4ae');
                    var fechaParts = (r.date || '').split('-');
                    var fechaCorta = fechaParts.length === 3
                        ? fechaParts[2] + '/' + fechaParts[1]
                        : (r.date || '—');
                    return (
                        '<tr style="border-bottom:1px solid rgba(255,255,255,0.06);">' +
                        '<td style="padding:8px 4px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + (r.locationName || '') + '">' +
                            (r.locationName || '—') +
                        '</td>' +
                        '<td style="padding:8px 4px;text-align:center;white-space:nowrap;">' + fechaCorta + '</td>' +
                        '<td style="padding:8px 4px;text-align:center;font-weight:700;color:' + pctClr + ';">' + pct + '%</td>' +
                        '<td style="padding:8px 4px;text-align:center;white-space:nowrap;">' +
                            '<div style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;">' +
                            '<button onclick="window.labelFromCard(\'' + r.id + '\',1)"   style="' + BTN + ';background:#2e7d32;color:#fff;" title="Sí, hubo arrebol">✅</button>' +
                            '<button onclick="window.labelFromCard(\'' + r.id + '\',0.5)" style="' + BTN + ';background:#e65100;color:#fff;" title="Regular/parcial">🙄</button>' +
                            '<button onclick="window.labelFromCard(\'' + r.id + '\',0)"   style="' + BTN + ';background:#b71c1c;color:#fff;" title="No hubo arrebol">❌</button>' +
                            '</div>' +
                        '</td>' +
                        '</tr>'
                    );
                }).join('') +
                '</tbody>' +
                '</table>' +
                '</div>';
        }

        // Etiquetados colapsados - versión responsiva
        var labeledHTML = '';
        if (labeled.length) {
            var iconMap = { '1': '✅', '0.5': '🙄', '0': '❌' };

            labeledHTML =
                '<details style="margin-top:12px;">' +
                '<summary style="cursor:pointer;font-size:0.75rem;opacity:0.45;user-select:none;list-style:none;padding:6px 0;">' +
                    '📋 ' + labeled.length + ' ya etiquetados' +
                '</summary>' +
                '<div style="margin-top:8px;overflow-x:auto;">' +
                '<table style="width:100%;border-collapse:collapse;font-size:0.7rem;">' +
                '<tbody>' +
                labeled.slice(0, 30).map(function(r) {
                    var icon = iconMap[String(r.actualArrebol)] || '—';
                    var pct  = r.sunsetProb != null ? (r.sunsetProb * 100).toFixed(0) + '%' : '—';
                    var fechaCorta = (r.date || '').slice(5, 10).replace('-', '/');
                    return (
                        '<tr style="border-bottom:1px solid rgba(255,255,255,0.04);">' +
                        '<td style="padding:6px 4px;white-space:nowrap;">' + icon + '</td>' +
                        '<td style="padding:6px 4px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + (r.locationName || '') + '">' +
                            (r.locationName || '—') +
                        '</td>' +
                        '<td style="padding:6px 4px;white-space:nowrap;text-align:right;opacity:0.5;">' + fechaCorta + '</td>' +
                        '<td style="padding:6px 4px;white-space:nowrap;text-align:right;opacity:0.5;">' + pct + '</td>' +
                        '<td style="padding:6px 4px;text-align:center;">' +
                            '<button onclick="window.unlabelRecord(\'' + r.id + '\')" ' +
                                'style="background:none;border:1px solid rgba(255,255,255,0.2);border-radius:4px;' +
                                'color:rgba(255,255,255,0.5);cursor:pointer;font-size:0.65rem;padding:2px 8px;white-space:nowrap;">↩ Desetiquetar</button>' +
                        '</td>' +
                        '</tr>'
                    );
                }).join('') +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</details>';
        }

        var pendingCount = pending.length
            ? ' <span style="font-size:0.7rem;opacity:0.5;font-weight:400;">(' + pending.length + ')</span>'
            : '';

        return (
            '<div class="info-card" style="width:100%;box-sizing:border-box;overflow:hidden;">' +
                '<h4 style="margin-bottom:8px;">🏷️ Por etiquetar' + pendingCount + '</h4>' +
                buildThresholdSelector(threshold, isCalculating) +
                pendingHTML +
                labeledHTML +
            '</div>'
        );
    }

    // ================================
    // Renderizar la pestaña historial
    // ================================
    function renderHistoryTab() {
        var container = document.getElementById('tab-history');
        if (!container) return;
        if (!container.classList.contains('active')) return;

        var data = loadData();

        container.innerHTML =
            '<div class="container">' +
            '<h2>📜 Historial</h2>' +
            buildHelpBlock() +
            '<div style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px;">' +

                (data.length
                    ? buildLabelingList(data)
                    : '<div class="info-card" style="width:100%;box-sizing:border-box;text-align:center;padding:24px;opacity:0.6;">' +
                        '<div style="font-size:2.5rem;margin-bottom:8px;">🌅</div>' +
                        '<p style="margin:0;">Aún no hay registros.</p>' +
                        '<p style="font-size:0.85rem;margin:4px 0 0;">Cada ciudad que visites quedará guardada automáticamente aquí.</p>' +
                      '</div>'
                ) +

                '<div class="info-card" style="width:100%;box-sizing:border-box;">' +
                    '<h4>💾 Exportar</h4>' +
                    (data.length === 0
                        ? '<p style="font-size:0.82rem;opacity:0.5;">Visita ciudades para acumular datos.</p>'
                        : '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
                            '<button onclick="window.exportMLDataCSV()" class="btn-small" style="background:#4CAF50;">📥 CSV (' + data.length + ')</button>' +
                            '<button onclick="window.exportMLDataJSON()" class="btn-small" style="background:#2196F3;">📄 JSON</button>' +
                          '</div>'
                    ) +
                '</div>' +

            '</div></div>';
    }

    function showStats() { renderHistoryTab(); }

    function injectStyles() {
        if (document.getElementById('ml-collector-styles')) return;
        var s = document.createElement('style');
        s.id  = 'ml-collector-styles';
        s.textContent =
            '.stat-box{display:flex;flex-direction:column;align-items:center;background:rgba(255,255,255,0.07);border-radius:10px;padding:10px 6px;}' +
            '.stat-val{font-size:1.4rem;font-weight:700;line-height:1;}' +
            '.stat-label{font-size:0.7rem;opacity:0.7;margin-top:4px;text-align:center;}';
        document.head.appendChild(s);
    }

    injectStyles();

    global.dataCollector = {
        collectPrediction: collectPrediction,
        updateLabel:       updateLabel,
        getAllData:        getAllData,
        getCount:          getCount,
        getLast:           getLast,
        clearAll:          clearAll,
        getStats:          getStats,
        exportCSV:         exportCSV,
        exportJSON:        exportJSON,
        showStats:         showStats,
        renderHistoryTab:  renderHistoryTab,
        getThreshold:      loadThreshold,
        setThreshold:      saveThreshold
    };

})(window);

// ================================================================
// Funciones globales — versión defensiva
// ================================================================
window.exportMLDataCSV = function() {
    if (typeof dataCollector !== 'undefined' && dataCollector.exportCSV)
        dataCollector.exportCSV();
    else alert('Exportador no disponible');
};

window.exportMLDataJSON = function() {
    if (typeof dataCollector !== 'undefined' && dataCollector.exportJSON)
        dataCollector.exportJSON();
    else alert('Exportador no disponible');
};

window.showMLStats = function() {
    if (typeof dataCollector !== 'undefined' && dataCollector.renderHistoryTab)
        dataCollector.renderHistoryTab();
    else console.warn('⚠ dataCollector no disponible');
};

window.renderHistoryTab = function() {
    if (typeof dataCollector !== 'undefined' && dataCollector.renderHistoryTab)
        dataCollector.renderHistoryTab();
    else console.warn('⚠ dataCollector no disponible');
};

window.clearMLData = function() {
    if (typeof dataCollector === 'undefined') { alert('Módulo no disponible'); return; }
    if (confirm('¿Borrar los ' + dataCollector.getCount() + ' registros guardados? Esta acción no se puede deshacer.')) {
        dataCollector.clearAll();
        dataCollector.renderHistoryTab();
    }
};

window.labelRecord = function(id, value) {
    if (typeof dataCollector !== 'undefined' && dataCollector.updateLabel)
        dataCollector.updateLabel(id, value, null, null);
    else console.warn('⚠ dataCollector no disponible');
};

window.labelFromCard = function(id, value) {
    if (typeof dataCollector === 'undefined') return;
    dataCollector.updateLabel(id, value, null, null);
};

window.unlabelRecord = function(id) {
    if (typeof dataCollector === 'undefined') return;
    dataCollector.updateLabel(id, null, null, null);
};

console.log('✅ Historial ML inicializado correctamente');