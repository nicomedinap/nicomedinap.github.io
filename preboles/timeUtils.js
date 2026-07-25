(function(global) {
    'use strict';


    // ================================
    // ESTADO GLOBAL: día consultado
    // Por defecto "hoy". El selector de días en index.html llama a
    // setQueryDate() cuando el usuario elige +1, +2... +5 días.
    // ================================
    function getQueryDate() {
        return global.PrebolesQueryDate || new Date();
    }

    function setQueryDate(date) {
        global.PrebolesQueryDate = localNoonDate(date);
        return global.PrebolesQueryDate;
    }

    function resetQueryDateToToday() {
        setQueryDayOffset(0);
        return setQueryDate(new Date());
    }

    // Además de la fecha (necesaria para SunCalc: amanecer/atardecer sí
    // dependen de una fecha calendario real), guardamos el offset en días
    // (0 = hoy, 1 = mañana...) como fuente de verdad para ubicar el bloque
    // de 24h en el arreglo horario. Usar el offset directo evita reconstruir
    // fechas y compararlas como texto, que es lo que fallaba cuando la zona
    // horaria del dispositivo no coincide con la de la ciudad consultada.
    function setQueryDayOffset(offset) {
        global.PrebolesQueryDayOffset = offset;
    }

    function getQueryDayOffset() {
        return global.PrebolesQueryDayOffset ?? 0;
    }

    global.PrebolesQueryDate = null;
    global.PrebolesQueryDayOffset = 0;
    resetQueryDateToToday();


    // ================================
    // localNoonDate
    // Ancla el "hoy" al mediodía local para evitar que SunCalc "ruede" al
    // día siguiente cuando la medianoche UTC cae en horario diurno local
    // (en Chile, UTC-4, eso pasa desde las 20:00 hora local en adelante).
    // ================================
    function localNoonDate(date = new Date()) {
        const d = new Date(date);
        d.setHours(12, 0, 0, 0);
        return d;
    }


    function isSameLocalDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth()    === d2.getMonth()    &&
               d1.getDate()     === d2.getDate();
    }

    // ================================
    // Interpolación lineal
    // ================================
    function linearInterpolate(y1, y2, fraction) {
        if (y1 == null || y2 == null) return y1 ?? y2 ?? null;
        return y1 + (y2 - y1) * fraction;
    }

    function findClosestTimes(times, targetTime) {
        if (!times || times.length === 0) return { prevTime: null, nextTime: null, prevIndex: -1, nextIndex: -1 };

        const targetMs = targetTime.getTime();
        let prevIndex = -1;
        let nextIndex = -1;

        for (let i = 0; i < times.length; i++) {
            const timeMs = new Date(times[i]).getTime();
            if (timeMs <= targetMs) prevIndex = i;
            if (timeMs >= targetMs && nextIndex === -1) nextIndex = i;
        }

        if (prevIndex === -1 && nextIndex > 0)              prevIndex = nextIndex;
        if (nextIndex === -1 && prevIndex < times.length-1) nextIndex = prevIndex + 1;
        else if (nextIndex === -1)                           nextIndex = prevIndex;

        if (prevIndex === nextIndex) {
            if (prevIndex > 0)                       prevIndex--;
            else if (nextIndex < times.length - 1)   nextIndex++;
        }

        return {
            prevTime:  prevIndex >= 0 ? new Date(times[prevIndex]) : null,
            nextTime:  nextIndex >= 0 ? new Date(times[nextIndex]) : null,
            prevIndex,
            nextIndex
        };
    }

    // ================================
    // interpolateMeteoData
    // Interpola TODOS los campos horarios en un tiempo exacto.
    // Incluye viento por capas, irradiancia solar y punto de rocío.
    // ================================
    function interpolateMeteoData(meteoData, targetTime) {
        if (!meteoData?.cloudSeries?.time || meteoData.cloudSeries.time.length < 2) return null;

        const { prevTime, nextTime, prevIndex, nextIndex } =
            timeUtils.findClosestTimes(meteoData.cloudSeries.time, targetTime);

        if (!prevTime || !nextTime || prevIndex === -1 || nextIndex === -1) return null;

        const prevMs   = prevTime.getTime();
        const nextMs   = nextTime.getTime();
        const targetMs = targetTime.getTime();
        const fraction = nextMs > prevMs
            ? Math.max(0, Math.min(1, (targetMs - prevMs) / (nextMs - prevMs)))
            : 0;

        const interp = (arr) => {
            if (!arr || arr.length === 0) return null;
            const v1 = arr[prevIndex] ?? 0;
            const v2 = arr[nextIndex] ?? v1;
            return timeUtils.linearInterpolate(v1, v2, fraction);
        };

        return {
            time: targetTime,

            // Nubes
            low:   interp(meteoData.cloudSeries.cloudcover_low),
            mid:   interp(meteoData.cloudSeries.cloudcover_mid),
            high:  interp(meteoData.cloudSeries.cloudcover_high),
            total: interp(meteoData.cloudSeries.cloudcover),

            // Meteorología superficial
            temperature: interp(meteoData.cloudSeries.temperature_2m),
            humidity:    interp(meteoData.cloudSeries.relativehumidity_2m),
            pressure:    interp(meteoData.cloudSeries.pressure_msl),
            dewpoint:    interp(meteoData.cloudSeries.dewpoint_2m), // NUEVO: necesario para computeRedProbability

            // Viento por capas de nubes
            wind300: interp(meteoData.cloudSeries.windspeed_300hPa),
            wind500: interp(meteoData.cloudSeries.windspeed_500hPa),
            wind850: interp(meteoData.cloudSeries.windspeed_850hPa),

            // Irradiancia solar en superficie
            shortwave: interp(meteoData.cloudSeries.shortwave_radiation),

            _debug: {
                prevIndex, nextIndex,
                fraction: Math.round(fraction * 1000) / 1000,
                prevTime:   prevTime.toLocaleTimeString('es-CL'),
                nextTime:   nextTime.toLocaleTimeString('es-CL'),
                targetTime: targetTime.toLocaleTimeString('es-CL')
            }
        };
    }

    // ================================
    // getSunsetDataWithInterpolation
    // Generalizada: sirve tanto para atardecer como amanecer.
    // isSunrise = false (atardecer, comportamiento original) por defecto,
    // ================================
    function getSunsetDataWithInterpolation(meteoData, lat, lon, isSunrise = false, altitude = 0, targetDate = getQueryDate()) {
        if (!meteoData?.cloudSeries) return null;

        const optimalTime      = calculateTimeToMinus2Degrees(lat, lon, isSunrise, altitude, targetDate);
        const interpolatedData = interpolateMeteoData(meteoData, optimalTime);

        if (interpolatedData) {
            console.log(`✓ ${isSunrise ? 'Amanecer' : 'Atardecer'} interpolado para ${optimalTime.toLocaleTimeString('es-CL')}:`, {
                horaAnterior: interpolatedData._debug.prevTime,
                horaSiguiente: interpolatedData._debug.nextTime,
                fraccion:     interpolatedData._debug.fraction,
                nubesBajas:   Math.round(interpolatedData.low),
                nubesMedias:  Math.round(interpolatedData.mid),
                nubesAltas:   Math.round(interpolatedData.high),
                wind300:      Math.round(interpolatedData.wind300 ?? 0) + ' km/h',
                wind500:      Math.round(interpolatedData.wind500 ?? 0) + ' km/h',
                wind850:      Math.round(interpolatedData.wind850 ?? 0) + ' km/h',
                shortwave:    Math.round(interpolatedData.shortwave ?? 0) + ' W/m²'
            });

            return {
                data:        interpolatedData,
                optimalTime: optimalTime,
                elevDeg: SunCalc.getPosition(optimalTime, lat, lon).altitude 
            };
        }

        return null;
    }

    // ================================
    // calculateTimeToMinus2Degrees
    // ================================
    function calculateTimeToMinus2Degrees(lat, lon, isSunrise = false, altitude = 0, targetDate = getQueryDate()) {
        const now    = localNoonDate(targetDate);
        const times  = SunCalc.getTimes(now, lat, lon);

        // "Dip" del horizonte: un observador en altura ve el horizonte marino
        // deprimido bajo la línea geométrica de 0°, así que la luz rasante
        // sigue pegando en nubes altas un poco más tarde al atardecer (o
        // empieza un poco más temprano al amanecer) de lo que predice un
        // horizonte a nivel del mar. dip(°) ≈ 0.0293·√altura(m).
        // Con altitude=0 (ciudades costeras/nivel del mar) esto no cambia nada.
        const dip = 0.0293 * Math.sqrt(Math.max(0, altitude || 0));
        const targetElevation = -(2 + dip); // mismo valor para ambos casos:
                                            // el sol a 2°(+dip) bajo el horizonte real

        let low  = isSunrise
            ? new Date(times.sunrise.getTime() - 3600000)
            : new Date(times.sunset.getTime());
        let high = isSunrise
            ? new Date(times.sunrise.getTime() + 3600000)
            : new Date(times.sunset.getTime() + 7200000);
        let mid;

        for (let i = 0; i < 20; i++) {
            mid = new Date((low.getTime() + high.getTime()) / 2);
            const elevDeg = SunCalc.getPosition(mid, lat, lon).altitude;
            console.log(`iter ${i}: mid=${mid.toLocaleTimeString('es-CL')} elevDeg=${elevDeg} target=${targetElevation} low=${low.toLocaleTimeString('es-CL')} high=${high.toLocaleTimeString('es-CL')}`);
            if (Math.abs(elevDeg - targetElevation) < 0.01) break;
            if ((isSunrise && elevDeg < targetElevation) || (!isSunrise && elevDeg > targetElevation)) low = mid;
            else high = mid;
        }

        return mid;
    }

    // ================================
    // getSunsetIndex
    // ================================
    function getSunsetIndex(meteoData, lat, lon, isSunrise = false, targetDate = getQueryDate()) {
        if (!meteoData?.cloudSeries?.time || meteoData.cloudSeries.time.length === 0) {
            return isSunrise ? 6 : 18;
        }

        const now        = localNoonDate(targetDate);
        const times      = SunCalc.getTimes(now, lat, lon);
        const targetTime = isSunrise ? times.sunrise : times.sunset;

        const year  = targetTime.getFullYear();
        const month = String(targetTime.getMonth() + 1).padStart(2, '0');
        const day   = String(targetTime.getDate()).padStart(2, '0');
        const hour  = String(targetTime.getHours()).padStart(2, '0');
        const targetFormatted = `${year}-${month}-${day}T${hour}:00`;

        const hrs = meteoData.cloudSeries.time;

        for (let i = 0; i < hrs.length; i++) {
            if (hrs[i] === targetFormatted) {
                console.log(`✓ Índice ${isSunrise ? 'amanecer' : 'atardecer'} encontrado: ${i} (${hrs[i]})`);
                return i;
            }
        }

        const targetMs = targetTime.getTime();
        let closestIndex = isSunrise ? 6 : 18;
        let minDiff = Infinity;

        for (let i = 0; i < hrs.length; i++) {
            const diff = Math.abs(new Date(hrs[i]).getTime() - targetMs);
            if (diff < minDiff) { minDiff = diff; closestIndex = i; }
        }

        console.log(`✓ Índice más cercano ${isSunrise ? 'amanecer' : 'atardecer'}: ${closestIndex} (${hrs[closestIndex]}, Δ${Math.round(minDiff/60000)} min)`);
        return closestIndex;
    }

    // ================================
    // getDayStartIndex
    // Índice de la hora 00:00 del día objetivo dentro del arreglo horario.
    // Lo usa el gráfico de nubosidad para mostrar el bloque de 24h del día
    // elegido en vez de siempre las primeras 24 horas del arreglo.
    // ================================
    function getDayStartIndex(meteoData, offsetOrDate = getQueryDayOffset()) {
        if (!meteoData?.cloudSeries?.time || meteoData.cloudSeries.time.length === 0) return 0;

        const hrs = meteoData.cloudSeries.time;

        // Camino robusto (el que se usa siempre ahora): Open-Meteo entrega
        // datos horarios uniformes que arrancan en la hora 00:00 del día 0,
        // así que el día N siempre empieza en el índice N*24. No depende
        // de comparar fechas como texto, así que es inmune a diferencias
        // de zona horaria entre el dispositivo y la ciudad consultada.
        if (typeof offsetOrDate === 'number') {
            const idx = offsetOrDate * 24;
            return idx < hrs.length ? idx : 0;
        }

        // Compatibilidad: si alguien todavía llama a esta función pasando
        // un Date en vez de un offset, se mantiene el comportamiento anterior.
        const targetDate = offsetOrDate;
        const year  = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day   = String(targetDate.getDate()).padStart(2, '0');
        const wantedExact  = `${year}-${month}-${day}T00:00`;
        const wantedPrefix = `${year}-${month}-${day}`;

        const exactIdx = hrs.indexOf(wantedExact);
        if (exactIdx !== -1) return exactIdx;

        const prefixIdx = hrs.findIndex(h => h.startsWith(wantedPrefix));
        return prefixIdx !== -1 ? prefixIdx : 0;
    }

    // ================================
    // getDataAtIndex
    // Extrae todos los campos del array horario en un índice dado.
    // Incluye viento por capas, irradiancia solar y punto de rocío.
    // ================================
    function getDataAtIndex(meteoData, index) {
        if (!meteoData?.cloudSeries || index < 0 || index >= meteoData.cloudSeries.time?.length) return null;

        const s = meteoData.cloudSeries;
        return {
            time: s.time[index],

            // Nubes
            low:   s.cloudcover_low?.[index]  ?? null,
            mid:   s.cloudcover_mid?.[index]   ?? null,
            high:  s.cloudcover_high?.[index]  ?? null,
            total: s.cloudcover?.[index]        ?? null,

            // Meteorología superficial
            temperature: s.temperature_2m?.[index]        ?? null,
            humidity:    s.relativehumidity_2m?.[index]   ?? null,
            pressure:    s.pressure_msl?.[index]          ?? null,
            dewpoint:    s.dewpoint_2m?.[index]           ?? null, // NUEVO

            // Viento por capas
            wind300: s.windspeed_300hPa?.[index] ?? null,
            wind500: s.windspeed_500hPa?.[index] ?? null,
            wind850: s.windspeed_850hPa?.[index] ?? null,

            // Irradiancia solar
            shortwave: s.shortwave_radiation?.[index] ?? null
        };
    }

    // ================================
    // API pública
    // ================================
    global.timeUtils = {
        linearInterpolate,
        findClosestTimes,
        interpolateMeteoData,
        getSunsetDataWithInterpolation,
        calculateTimeToMinus2Degrees,
        getSunsetIndex,
        getDayStartIndex,
        getDataAtIndex,
        localNoonDate,
        isSameLocalDay,
        getQueryDate,
        setQueryDate,
        resetQueryDateToToday,
        getQueryDayOffset,
        setQueryDayOffset
    };

})(window);