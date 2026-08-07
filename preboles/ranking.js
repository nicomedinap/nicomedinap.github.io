(function() {
    'use strict';
    
    //Colores
    function getProbabilityColor(percent) {
        if (percent > 70) return '#d7191c';
        if (percent > 30) return '#ff850cff';
        return '#abdda4';
    }
    
    // ============================================================================
    // FUNCIONES PRINCIPALES
    // ============================================================================
    
    async function calculateFullRanking() {
        const citiesOnly = Object.entries(window.chileanCities || {}).filter(([_, info]) => 
            !info.type
        );

        const CONCURRENCY_LIMIT = 4;
        const results = [];
        
        let index = 0;

        async function worker() {
            while (index < citiesOnly.length) {
                const currentIndex = index++;
                const [cityName, cityInfo] = citiesOnly[currentIndex];

                try {
                    const result = await calculateCityProbability(cityName, cityInfo);
                    if (result) results.push(result);
                } catch (error) {
                    console.warn(`Error: ${cityName}`, error);
                }
            }
        }

        const workers = Array.from({ length: CONCURRENCY_LIMIT }, () => worker());
        await Promise.all(workers);

        results.sort((a, b) => b.probability - a.probability);
        return results;
    }
    
    async function calculateCityProbability(cityName, cityInfo) {
        if (!getMeteoData || !timeUtils.getSunsetDataWithInterpolation || !computeRedProbability) return null;
        
        const meteoData = await getMeteoData(cityInfo.lat, cityInfo.lon);
        if (!meteoData.cloudSeries) return null;

        // El ranking siempre es para HOY, sin importar el día elegido 
        const sunsetResult = timeUtils.getSunsetDataWithInterpolation(
            meteoData, cityInfo.lat, cityInfo.lon, false, cityInfo.altitude ?? 0, new Date()
        );
        if (!sunsetResult) return null;

        const d = sunsetResult.data;

        // Firma correcta de computeRedProbability: (low, mid, high, elevDeg,
        // isSunrise, temperature, pressure, humidity, dewPoint, shortwave,
        // uncertaintyData, nSimulations, returnFactors)
        const probAtardecer = computeRedProbability(
            d.low,
            d.mid,
            d.high,
            sunsetResult.elevDeg,
            false,                                                // isSunrise
            d.temperature ?? meteoData.current.temperature,
            d.pressure    ?? meteoData.current.pressure,
            d.humidity    ?? meteoData.current.humidity,
            d.dewpoint    ?? meteoData.current.dewpoint,
            d.shortwave   ?? null,
            null, // uncertaintyData: sin Monte Carlo, ranking rápido
            null, // nSimulations
            false // returnFactors: solo queremos el número
        );
        
        return {
            name: cityName,
            region: cityInfo.region,
            probability: probAtardecer,
            percent: Math.round(probAtardecer * 100),
            optimalTime: sunsetResult.optimalTime,
            shortwave: d.shortwave ?? null
        };
    }
    
    // ============================================================================
    // RENDER
    // ============================================================================

    // Fecha para la que es válido el ranking 
    function _rankingDateLabel() {
        const dateStr = new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
        return `${dateStr}`;
    }

    function _formatIrradiance(shortwave) {
        if (shortwave == null || !isFinite(shortwave)) return '—';
        const val = Math.round(shortwave);

        // Misma fórmula que irradCorr en computeProbability (idealSW=60,
        // tooLow=15, tooHigh=200), para que la etiqueta refleje exactamente
        // lo que el modelo está premiando/penalizando, con su asimetría.
        const swClamped = Math.max(0, Math.min(1200, val));
        const idealSW = 60, tooHigh = 200, tooLow = 15;
        let irradCorr = swClamped >= idealSW
            ? Math.exp(-Math.pow((swClamped - idealSW) / (tooHigh - idealSW) * 2, 2))
            : Math.exp(-Math.pow((swClamped - idealSW) / (idealSW - tooLow) * 2, 2));
        irradCorr = Math.max(0.30, Math.min(1.0, irradCorr));

        let label;
        if (irradCorr >= 0.85)      label = 'Excelente';
        else if (irradCorr >= 0.65) label = 'Buena';
        else if (irradCorr >= 0.40) label = 'Moderada';
        else                        label = 'Mala';

        return `${label}<span class="subline">${val} W/m²</span>`;
    }

    // Formato "18.05 h" en 24 horas, sin depender del locale del
    // dispositivo (algunos SO ignoran el 24h de es-CL y muestran am/pm).
    function _formatOptimalTime(date) {
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        return `${h}.${m} h`;
    }

    async function calculateRankings() {
        const container = document.getElementById('topRanking');
        if (!container) return;
        
        container.innerHTML = '<div class="rank-loading">Calculando ranking...</div>';
        
        const cities = await calculateFullRanking();
        
        if (cities.length === 0) {
            container.innerHTML = '<p>❌ No se pudo calcular el ranking</p>';
            return;
        }
        
        // CAMBIO: Mostrar 15 ciudades en lugar de 10
        const top12 = cities.slice(0, 12);
        
        let html = `
            <div class="rank-container">
                <div class="rank-header">
                    <span>Ranking válido para: ${_rankingDateLabel()}</span>
                </div>
                <table class="rank-table">
                    <thead>
                        <tr>
                            <th>Lugar</th>
                            <th>Ciudad</th>
                            <th>Probabilidad </th>
                            <th>Visibilidad</th>
                            <th>
                                Hora máximo
                                <span class="subline">arrebol</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        top12.forEach((city, i) => {
            const rank = i + 1;
            const color = getProbabilityColor(city.percent);
            const textColor = city.percent > 70 ? '#fff' : '#222';
            
            const timeStr = city.optimalTime ? _formatOptimalTime(city.optimalTime) : '--';
            
            html += `
                <tr onclick="showPrediction('${city.name.replace(/'/g, "\\'")}', 'city')">
                    <td class="rank-num">${rank}</td>
                    <td class="city-name-tabla${city.name.length > 8 ? ' city-name-tabla--long' : ''}">${city.name}</td>
                    <td class="prob-cell">
                        <span class="prob-pill" style="background:${color}; color:${textColor}">
                            ${city.percent}%
                        </span>
                    </td>
                    <td class="irr-cell">${_formatIrradiance(city.shortwave)}</td>
                    <td class="time-cell">${timeStr}</td>
                </tr>
            `;
        });
        
        container.innerHTML = html;
        addStyles();
    }
    
    // ============================================================================
    // ESTILOS
    // ============================================================================
    
    function addStyles() {
        if (document.getElementById('rank-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'rank-styles';
        style.textContent = `
            .rank-container {
                background: rgba(0,0,0,0);
                border-radius: 0 px;
                overflow: hidden;
                backdrop-filter: blur(6px);
            }
            .rank-header {
                font-size: 1rem;
                background: rgba(255, 81, 0, 0);
                flex-direction: column;
                padding: 10px 15px;
                display: flex;
                justify-content: space-between;
                font-weight: bold;
                color: #ff6600;
            }
            .rank-date {
                font-size: 0.8rem;
                opacity: 0.7;
            }
            .rank-table {
                font-size: 0.9rem;
                table-layout: fixed;
                width: 100%;
                border-collapse: collapse;
                background: transparent;
            }
            .rank-table thead,
            .rank-table tbody,
            .rank-table tr {
                background: transparent;
            }
            .rank-table th,
            .rank-table td {
                padding: 2px 4px;
                border-bottom: 0.55px solid rgba(255,255,255,0.08);
            }
            .rank-table th {
                color: #ffaa66;
                font-size: 0.8rem;
                font-weight: normal;
            }
            .rank-table tr {
                cursor: pointer;
                transition: background 0.2s;
            }
            .rank-table tr:hover {
                background: rgba(255,255,255,0.05);
            }
            .rank-num {
                font-size: 0.8rem;
                width: 60px;
                font-weight: bold;
                color: #fbe34bf6;
            }
            .rank-table th,
            .rank-table td {
                text-align: center;
            }
            .city-name-tabla {
                font-size: 0.95rem;
                font-weight: 600;
                text-align: left;
            }

            .city-name-tabla--long {
                font-size: 0.78rem;
            }
            
            .prob-cell {
                text-align: center;
                width: 80px;
            }
            .prob-pill {
                font-size: 1rem;
                padding: 5px 6px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
                color: #222;
                min-width: 42px;
                text-align: center;
            }
            .time-cell {
                font-size: 0.7rem;
                font-family: monospace;
            }
            .rank-footer {
                padding: 10px 15px;
                display: flex;
                justify-content: space-between;
                font-size: 0.75rem;
                opacity: 0.7;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            .rank-loading {
                text-align: center;
                padding: 40px;
                opacity: 0.7;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // ============================================================================
    // EXPORTAR
    // ============================================================================
    
    window.calculateRankings = calculateRankings;
})();
