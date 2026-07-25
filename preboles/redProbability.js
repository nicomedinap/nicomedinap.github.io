    /* ------------------------------------------------------------------
       NÚCLEO DETERMINISTA — calcula una probabilidad a partir de valores
       ------------------------------------------------------------------ */
    function computeProbability(low, mid, high, elevDeg, isSunrise, temp, press, hum, shortwave, returnFactors) {
      const lowPct = Math.max(0, Math.min(100, Number(low) || 0));
      const midPct = Math.max(0, Math.min(100, Number(mid) || 0));
      const highPct = Math.max(0, Math.min(100, Number(high) || 0));
      const sw = (shortwave !== null && shortwave !== undefined) ? Number(shortwave) : null;

      /* Factor nubes: 60% altas + 40% medias */
      const F_N = 0.60 * (highPct / 100) + 0.40 * (midPct / 100);

      /* Factor geométrico: ángulo solar óptimo ~ -3° para atardecer, +3° para amanecer */
      const idealElev = isSunrise ? 3.0 : -3.0;
      let F_theta = Math.exp(-Math.pow((elevDeg - idealElev) / 4.0, 2));

      /* Corrección por irradiancia */
      let irradCorr = 1.0;
      if (sw !== null && isFinite(sw)) {
        const swClamped = Math.max(0, Math.min(1200, sw));
        const idealSW = 60, tooHigh = 200, tooLow = 15;
        irradCorr = swClamped >= idealSW
          ? Math.exp(-Math.pow((swClamped - idealSW) / (tooHigh - idealSW) * 2, 2))
          : Math.exp(-Math.pow((swClamped - idealSW) / (idealSW - tooLow) * 2, 2));
        irradCorr = Math.max(0.30, Math.min(1.0, irradCorr));
      }
      F_theta *= irradCorr;

      /* Factor Rayleigh (presión) */
      const P = Math.max(950, Math.min(1050, Number(press) || 1013));
      const F_Rayleigh = (Math.pow(P / 1013, 1) - Math.pow(950 / 1013, 1)) / (Math.pow(1050 / 1013, 1) - Math.pow(950 / 1013, 1));

      /* Factor humedad */
      const H = Math.max(0, Math.min(100, hum));
      const F_H = 1 / (1 + Math.exp(0.8 * (H - 55)));

      /* Regresión logística */
      const f_x = -0.5 + 0.7 * F_N + 0.12 * F_theta + 0.1 * F_Rayleigh + 0.1 * F_H;
      let p = 1 / (1 + Math.exp(-8 * f_x));

      /* Reglas especiales */
      const factors = [], blockers = [];
      if (highPct > 70) { p += 0.10; factors.push({ label: 'Nubes altas', weighted: 0.10, isUncertainty: false }); }
      else if (highPct > 40) { p += 0.05; factors.push({ label: 'Nubes altas', weighted: 0.05, isUncertainty: false }); }
      if (lowPct > 60) {
        const penalty = Math.max(0.1, 1 - lowPct / 100);
        p *= penalty;
        blockers.push({ label: 'Nubes bajas', detail: `${Math.round(lowPct)}%`, weighted: 1 - penalty });
      }
      const totalCloud = (lowPct + midPct + highPct) / 3;
      if (lowPct > 80 && totalCloud > 60) {
        const oldP = p;
        p = Math.min(p, 0.15);
        blockers.push({ label: 'Cielo muy nublado', detail: `${Math.round(totalCloud)}% nubes`, weighted: (oldP - p) / oldP });
      }
      if (lowPct < 20 && highPct > 50) {
        p = Math.min(0.99, p * 1.2);
        factors.push({ label: 'Cielo despejado + nubes altas', weighted: 0.20, isUncertainty: false });
      }
      if (sw !== null && isFinite(sw)) {
        const uncFactor = 1 - irradCorr;
        if (uncFactor > 0.1) {
          factors.push({ label: 'Incerteza por irradiancia', weighted: uncFactor, isUncertainty: true, detail: `${Math.round(sw)} W/m²` });
        }
      }

      const finalProb = Math.max(0.01, Math.min(0.99, p));
      if (returnFactors) {
        return { probability: finalProb, factors, blockers, uncertainty: factors.find(f => f.isUncertainty)?.weighted || 0 };
      }
      return finalProb;
    }

    /* ------------------------------------------------------------------
       FUNCIÓN PRINCIPAL — con Monte Carlo opcional para incerteza
       ------------------------------------------------------------------ */
    function computeRedProbability(low, mid, high, elevDeg, isSunrise,
                                   temperature, pressure, humidity,
                                   dewPoint, shortwave,
                                   uncertaintyData, nSimulations, returnFactors) {

      /* ---- Sin incerteza: modo determinista ---- */
      if (!uncertaintyData) {
        return computeProbability(low, mid, high, elevDeg, isSunrise,
                                  temperature, pressure, humidity,
                                  shortwave, returnFactors);
      }

      /* ---- Con incerteza: Monte Carlo ---- */
      // 1. Calcular el valor determinista (el "mejor estimado")
      const detResult = computeProbability(low, mid, high, elevDeg, isSunrise,
                                           temperature, pressure, humidity,
                                           shortwave, true);

      // 2. Ejecutar simulaciones Monte Carlo para estimar la incerteza
      const samples = [];
      const vars = {
        low: { value: low, key: 'cloudcover_low' },
        mid: { value: mid, key: 'cloudcover_mid' },
        high: { value: high, key: 'cloudcover_high' },
        temp: { value: temperature, key: 'temperature_2m' },
        press: { value: pressure, key: 'pressure_msl' },
        hum: { value: humidity, key: 'relativehumidity_2m' },
        sw: { value: shortwave, key: 'shortwave_radiation' }
      };

      for (let i = 0; i < nSimulations; i++) {
        const sampled = {};
        for (const [k, v] of Object.entries(vars)) {
          const config = uncertaintyData[v.key] || UNCERTAINTY_CONFIG[v.key];
          sampled[k] = sampleWithUncertainty(v.value, config);
        }
        const prob = computeProbability(sampled.low, sampled.mid, sampled.high,
                                        elevDeg, isSunrise,
                                        sampled.temp, sampled.press, sampled.hum,
                                        sampled.sw, false);
        samples.push(prob);
      }

      const stats = calculateStats(samples);

      // 3. Metadatos de incerteza por variable
      const varUnc = {};
      for (const [k, v] of Object.entries(vars)) {
        const config = uncertaintyData[v.key] || UNCERTAINTY_CONFIG[v.key];
        varUnc[k] = {
          value: v.value ?? 0,
          std: config.std,
          relativeUncertainty: v.value ? (config.std / Math.abs(v.value)) * 100 : 100
        };
      }

      const confidenceLevel = stats.std < 0.08 ? 'Alta' : stats.std < 0.15 ? 'Media' : 'Baja';
      const confidenceColor = stats.std < 0.08 ? '#4CAF50' : stats.std < 0.15 ? '#FFC107' : '#F44336';

      return {
        probability: detResult.probability,  // ← el valor determinista es el principal
        mean: stats.mean,
        std: stats.std,
        p05: stats.p05,
        p25: stats.p25,
        p75: stats.p75,
        p95: stats.p95,
        probAbove70: stats.probAbove70,
        probAbove50: stats.probAbove50,
        probAbove30: stats.probAbove30,
        confidenceInterval: `${(stats.p05 * 100).toFixed(1)}% – ${(stats.p95 * 100).toFixed(1)}%`,
        nSimulations,
        factors: detResult.factors,
        blockers: detResult.blockers,
        uncertainty: detResult.uncertainty,
        confidence: { level: confidenceLevel, color: confidenceColor, std: stats.std },
        variableUncertainties: varUnc
      };
    }

    window.computeRedProbability = computeRedProbability;

// ============================================================================
    // computeMomentData(meteoData, lat, lon, isSunrise)
    // Datos meteorológicos + geométricos para UN momento (amanecer o atardecer).
    // Decide interpolar o usar el índice horario más cercano. Un solo lugar
    // para esta lógica; nadie más debe repetirla.
    // ============================================================================
    function computeMomentData(meteoData, lat, lon, isSunrise, altitude = 0) {
        const result = timeUtils.getSunsetDataWithInterpolation(meteoData, lat, lon, isSunrise, altitude);

        if (result) {
            return { data: result.data, elevDeg: result.elevDeg, optimalTime: result.optimalTime };
        }

        const index = timeUtils.getSunsetIndex(meteoData, lat, lon, isSunrise);
        const data = timeUtils.getDataAtIndex(meteoData, index);
        const noonNow = timeUtils.localNoonDate();

        const moment = isSunrise
            ? SunCalc.getTimes(noonNow, lat, lon).sunrise
            : SunCalc.getTimes(noonNow, lat, lon).sunset;
        const elevDeg = SunCalc.getPosition(moment, lat, lon).altitude;
        const optimalTime = timeUtils.calculateTimeToMinus2Degrees(lat, lon, isSunrise, altitude);

        return { data, elevDeg, optimalTime };
    }

    // ============================================================================
    // computeCityPrediction(lat, lon, options)
    // ÚNICO punto de cálculo de probabilidades de arrebol en todo el sitio.
    // Lo usan: las tarjetas (rápido, sin Monte Carlo), la vista detallada
    // (con Monte Carlo y factores) y el cálculo en background (Monte Carlo
    // liviano). Así el número que ves en cualquier parte sale siempre del
    // mismo camino, con los mismos argumentos en el mismo orden.
    //
    // options.nSimulations: null/0 = determinista. 200 = detalle. 50 = background.
    // options.returnFactors: true para obtener factores/bloqueadores (panel).
    // ============================================================================
    async function computeCityPrediction(lat, lon, { nSimulations = null, returnFactors = false, altitude = 0 } = {}) {

        const meteoData = await getMeteoData(lat, lon);
        if (!meteoData?.cloudSeries) return null;

        const sunsetMoment  = computeMomentData(meteoData, lat, lon, false, altitude);
        const sunriseMoment = computeMomentData(meteoData, lat, lon, true, altitude);

        const uncertaintyData = nSimulations ? DEFAULT_UNCERTAINTY : null;

        const sunset = computeRedProbability(
            sunsetMoment.data?.low, sunsetMoment.data?.mid, sunsetMoment.data?.high,
            sunsetMoment.elevDeg, false,
            sunsetMoment.data?.temperature ?? meteoData.current.temperature,
            sunsetMoment.data?.pressure    ?? meteoData.current.pressure,
            sunsetMoment.data?.humidity    ?? meteoData.current.humidity,
            sunsetMoment.data?.dewpoint    ?? meteoData.current.dewpoint,
            sunsetMoment.data?.shortwave   ?? null,
            uncertaintyData, nSimulations, returnFactors
        );

        const sunrise = computeRedProbability(
            sunriseMoment.data?.low, sunriseMoment.data?.mid, sunriseMoment.data?.high,
            sunriseMoment.elevDeg, true,
            sunriseMoment.data?.temperature ?? meteoData.current.temperature,
            sunriseMoment.data?.pressure    ?? meteoData.current.pressure,
            sunriseMoment.data?.humidity    ?? meteoData.current.humidity,
            sunriseMoment.data?.dewpoint    ?? meteoData.current.dewpoint,
            sunriseMoment.data?.shortwave   ?? null,
            uncertaintyData, nSimulations, returnFactors
        );

        return { meteoData, sunsetMoment, sunriseMoment, sunset, sunrise };
    }

    window.computeCityPrediction = computeCityPrediction;

    // ============================================================================
    // getProbabilities(lat, lon) — contrato que usan las tarjetas.
    // Llama a computeCityPrediction sin Monte Carlo (rápido).
    // ============================================================================
    async function getProbabilities(lat, lon, { altitude = 0, nSimulations = null } = {}) {

        const result = await computeCityPrediction(lat, lon, {
            returnFactors: true,
            altitude,
            nSimulations
        });

        if (!result) return null;

        return {
            amanecer: Math.round(result.sunrise.probability * 100),
            atardecer: Math.round(result.sunset.probability * 100),
            sunrise: result.sunrise,
            sunset: result.sunset,
            sunriseMoment: result.sunriseMoment,
            sunsetMoment: result.sunsetMoment
        };
    }

    window.PrebolesPredictor = window.PrebolesPredictor || {};
    window.PrebolesPredictor.getProbabilities = getProbabilities;



    /* ------------------------------------------------------------------
       CONFIGURACIÓN DE INCERTEZAS POR VARIABLE
       Basado en errores típicos de modelos NWP (Numerical Weather Prediction).
       ------------------------------------------------------------------ */
    const UNCERTAINTY_CONFIG = {
      cloudcover_low:      { std: 18, min: 0, max: 100, distribution: 'beta' },
      cloudcover_mid:      { std: 15, min: 0, max: 100, distribution: 'beta' },
      cloudcover_high:     { std: 12, min: 0, max: 100, distribution: 'beta' },
      temperature_2m:      { std: 2.5, min: -20, max: 45, distribution: 'normal' },
      relativehumidity_2m: { std: 10, min: 0, max: 100, distribution: 'beta' },
      pressure_msl:        { std: 4, min: 950, max: 1050, distribution: 'normal' },
      shortwave_radiation: { std: 25, min: 0, max: 1200, distribution: 'lognormal' }
    };

    /* ------------------------------------------------------------------
       GENERADORES DE NÚMEROS ALEATORIOS
       ------------------------------------------------------------------ */

    function normalRandom(mean, std) {
      const u1 = Math.random(), u2 = Math.random();
      return mean + Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * std;
    }

    function betaRandom() {
      let x, y;
      do { x = Math.pow(Math.random(), 1/2); y = Math.pow(Math.random(), 1/2); }
      while (x + y > 1);
      return x / (x + y);
    }

    /* Muestrea una variable con incerteza */
    function sampleWithUncertainty(value, config) {
      if (value === null || value === undefined) return value;
      const { std, min, max, distribution } = config;
      let sampled;
      switch (distribution) {
        case 'beta':
          sampled = min + betaRandom() * (max - min);
          break;
        case 'lognormal':
          if (value <= 0) value = 0.1;
          const logMean = Math.log(value) - 0.5 * Math.pow(std / value, 2);
          sampled = Math.exp(logMean + normalRandom(0, std / value));
          break;
        default:
          sampled = normalRandom(value, std);
          break;
      }
      return Math.max(min, Math.min(max, sampled));
    }

    /* Estadísticos de un array de muestras */
    function calculateStats(samples) {
      const n = samples.length;
      if (n === 0) return null;
      const sorted = [...samples].sort((a, b) => a - b);
      const mean = samples.reduce((a, b) => a + b, 0) / n;
      const std = Math.sqrt(samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n);
      return {
        mean, std,
        median: sorted[Math.floor(n * 0.50)],
        p05: sorted[Math.floor(n * 0.05)],
        p25: sorted[Math.floor(n * 0.25)],
        p75: sorted[Math.floor(n * 0.75)],
        p95: sorted[Math.floor(n * 0.95)],
        probAbove70: samples.filter(p => p > 0.7).length / n,
        probAbove50: samples.filter(p => p > 0.5).length / n,
        probAbove30: samples.filter(p => p > 0.3).length / n,
        n
      };
    }



    window.sampleWithUncertainty = sampleWithUncertainty;
    window.calculateStats = calculateStats;
    window.displayUncertainty = displayUncertainty;
    window.UNCERTAINTY_CONFIG = UNCERTAINTY_CONFIG;
