// ============================================================
//  Helpers estadísticos
// ============================================================
function stdDev(arr) {
  if (!arr || arr.length === 0) return 0;
  const clean = arr.filter(v => v !== null && v !== undefined && !isNaN(v));
  if (clean.length < 2) return 0;
  const mean = clean.reduce((a, b) => a + b, 0) / clean.length;
  const variance = clean.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / clean.length;
  return Math.sqrt(variance);
}

// ============================================================
//  Factor de viento
//  Óptimo ~15 km/h: mezcla suave sin dispersar las nubes.
//  Calma total penaliza levemente; viento fuerte penaliza fuerte.
// ============================================================
function computeWindFactor(windKmh) {
  if (windKmh === null || windKmh === undefined || isNaN(windKmh)) return 0.85;
  const w = Math.max(0, windKmh);
  const optimal = 15;
  if (w <= optimal) return 0.7 + 0.3 * (w / optimal);
  return Math.exp(-Math.pow((w - optimal) / 25, 2));
}

// ============================================================
//  Factor de incerteza de ensemble
//  spread = desviación estándar entre miembros del ensemble
//  para cloudcover_high en la hora del atardecer.
//  spread alto → modelos en desacuerdo → contraer hacia 0.5
// ============================================================
function computeEnsembleFactor(spread) {
  if (spread === null || spread === undefined || isNaN(spread)) return 1.0;
  // spread=0 → F=1.0 (total acuerdo), spread≥40 → F≈0.3
  return 0.3 + 0.7 * Math.exp(-spread / 30);
}

// ============================================================
//  Función principal de probabilidad
// ============================================================
function computeRedProbability(
  low, mid, high,
  elevDeg,
  isSunrise = false,
  temperature = 20,
  pressure = 1013,
  humidity = 20,
  dewPoint = null,
  windKmh = null,
  ensembleSpread = null
) {
  const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
  const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
  const highPct = Math.max(0, Math.min(100, Number(high) || 0));

  // ----- FACTOR NUBES (F_N) -----
  const F_N = 0.60 * (highPct / 100) + 0.40 * (midPct / 100);

  // ----- FACTOR GEOMÉTRICO (F_θ) -----
  const idealElev = isSunrise ? 3.0 : -3.0;
  const geomSigma = 4.0;
  const F_theta = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));

  // ----- DISPERSIÓN RAYLEIGH -----
  const P0 = 1013;
  const P = Math.max(950, Math.min(1050, Number(pressure) || P0));
  const gamma = 1.0;
  const rayleighIntensity = Math.pow(P / P0, gamma);
  const rayleighMin = Math.pow(950  / P0, gamma);
  const rayleighMax = Math.pow(1050 / P0, gamma);
  const F_Rayleigh = (rayleighIntensity - rayleighMin) / (rayleighMax - rayleighMin);

  // ----- FACTOR HUMEDAD (F_H) -----
  const H  = Math.max(0, Math.min(100, humidity));
  const H0 = 55, k = 0.8;
  const F_H = 1 / (1 + Math.exp(k * (H - H0)));

  // ----- FUNCIÓN LINEAL + LOGÍSTICA -----
  const beta_0        = -0.5;
  const beta_N        =  0.7;
  const beta_theta    =  0.1;
  const beta_Rayleigh =  0.1;
  const beta_H        =  0.1;

  const f_x = beta_0
    + beta_N        * F_N
    + beta_theta    * F_theta
    + beta_Rayleigh * F_Rayleigh
    + beta_H        * F_H;

  let p = 1 / (1 + Math.exp(-8 * f_x));

  // ----- REGLAS ESPECIALES -----
  if (highPct > 40) p = Math.min(0.99, p + 0.05);
  if (highPct > 70) p = Math.min(0.99, p + 0.10);
  if (lowPct  > 60) p *= Math.max(0.1, 1 - lowPct / 100);
  const totalCloud = (lowPct + midPct + highPct) / 3;
  if (lowPct > 80 && totalCloud > 60) p = Math.min(p, 0.15);
  if (lowPct < 20 && highPct > 50)    p = Math.min(0.99, p * 1.2);

  // ----- FACTOR DE VIENTO -----
  // Modula la probabilidad: viento óptimo (~15 km/h) amplifica,
  // calma o viento fuerte reducen.
  const F_wind = computeWindFactor(windKmh);
  p = p * F_wind;

  // ----- INCERTEZA DE ENSEMBLE -----
  // Contrae la probabilidad hacia 0.5 según el desacuerdo entre modelos.
  // spread=0 → sin contracción; spread alto → p se acerca a 0.5.
  const F_ens = computeEnsembleFactor(ensembleSpread);
  p = 0.5 + (p - 0.5) * F_ens;

  return Math.max(0.01, Math.min(0.99, p));
}

// Exponer globalmente
window.computeRedProbability  = computeRedProbability;
window.computeWindFactor      = computeWindFactor;
window.computeEnsembleFactor  = computeEnsembleFactor;
window.stdDev                 = stdDev;