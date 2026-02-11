function computeRedProbability(low, mid, high, elevDeg, isSunrise = false, temperature = 20, pressure = 1013, humidity = 20, dewPoint = null) {
  
  const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
  const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
  const highPct = Math.max(0, Math.min(100, Number(high) || 0));

  const F_N = 0.60 * (highPct / 100) +  
              0.40 * (midPct / 100)  
              //0.10 * (lowPct / 100)

  //===== FACTOR GEOMÉTRICO (F_θ) =====
  const idealElev = isSunrise ? 3.0 : -3.0;
  const geomSigma = 4.0;
  const F_theta = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));

  // ===== DISPERSIÓN RAYLEIGH =====
  const P0 = 1013;
  const P = Math.max(950, Math.min(1050, Number(pressure) || P0));
  const gamma = 1.0;
  const rayleighIntensity = Math.pow(P / P0, gamma);

  const P_min = 950;
  const P_max = 1050;
  const rayleighMin = Math.pow(P_min / P0, gamma);
  const rayleighMax = Math.pow(P_max / P0, gamma);
  const F_Rayleigh = (rayleighIntensity - rayleighMin) / (rayleighMax - rayleighMin);

  // FACTOR HUMEDAD (F_H)
  const H = Math.max(0, Math.min(100, humidity));
  const H0 = 55;     // punto medio (humedad "neutral")
  const k = 0.8;   
  const F_H = 1 / (1 + Math.exp(k * (H - H0)));
  
  // Punto de rocio (F_H)
  const dewSpread = Math.max(0, temperature - dewPoint);
  const F_dp = Math.min(1, Math.max(0.2, dewSpread / 10));

  const beta_0 = -0.5;      // sesgo
  const beta_N = 0.7;       // Peso para nubes
  const beta_theta = 0.1;   // Peso para factor geométrico
  // const beta_PM25 = -0.1;   // Peso negativo para contaminación
  const beta_Rayleigh = 0.1; // Peso para dispersión Rayleigh
  const beta_H = 0.1;       // Peso para humedad
  // const beta_dp = 0.1;

  // Función lineal 
  const f_x = beta_0 + 
              (beta_N * F_N) + 
              (beta_theta * F_theta) + 
  //            (beta_PM25 * F_PM25) + 
              (beta_Rayleigh * F_Rayleigh) +
              (beta_H * F_H) 
  //            + (beta_dp* F_dp )
  
  // ===== REGRESIÓN LOGÍSTICA =====
   let p = 1 / (1 + Math.exp(-8 * (f_x)));

  // ===== REGLAS ESPECIALES hasta que llegue el ML =====
  // Boost si hay bastantes nubes altas
  let highBoost = 0;
  if (highPct > 40) highBoost = 0.05;
  else if (highPct > 70) highBoost = 0.10;

  if (lowPct > 60) p *= Math.max(0.1, 1 - lowPct/100);

  const totalCloud = (lowPct + midPct + highPct) / 3;

  if (lowPct > 80 && totalCloud > 60) p = Math.min(p, 0.15);
  if (lowPct < 20 && highPct > 50) p = Math.min(0.99, p * 1.2);

  return Math.max(0.01, Math.min(0.99, p));
}

//Exponer globalmente
window.computeRedProbability = computeRedProbability;