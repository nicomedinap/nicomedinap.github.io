// redProbability.js
function computeRedProbability(pm25, low, mid, high, elevDeg, isSunrise = false, temperature = 20) {
  const lowPct  = Math.max(0, Math.min(100, Number(low)  || 0));
  const midPct  = Math.max(0, Math.min(100, Number(mid)  || 0));
  const highPct = Math.max(0, Math.min(100, Number(high) || 0));

  const optimalTemp = 20;
  const tempSigma = 8;
  const tempScore = Math.exp(-Math.pow((temperature - optimalTemp) / tempSigma, 2));

  const lowCloudPenalty = Math.pow(lowPct / 100, 2);

  const layerScore = (
    0.10 * (lowPct / 100) +
    0.30 * (midPct / 100) +
    0.60 * (highPct / 100)
  );

  const idealElev = -3.0;
  const geomSigma = 4.0;
  const geomScore = Math.exp(-Math.pow((elevDeg - idealElev) / geomSigma, 2));

  const idealPM = 15;
  const pmSigma = 18;
  const pmScore = Math.exp(-Math.pow((pm25 - idealPM) / pmSigma, 2));

  const humidityScore = highPct / 100;
  const pressureStability = 1.0 - Math.abs((lowPct + midPct) - highPct) / 200;
  const pressureScore = Math.max(0.3, Math.min(1.0, pressureStability));

  const score =
    0.45 * layerScore +
    0.25 * geomScore +
    0.05 * pmScore +
    0.05 * humidityScore +
    0.05 * pressureScore +
    0.05 * tempScore -
    0.10 * lowCloudPenalty;

  let p = 1 / (1 + Math.exp(-10 * (score - 0.5)));

  if (lowPct > 60) p *= Math.max(0.1, 1 - lowPct / 100);

  const totalCloud = (lowPct + midPct + highPct) / 3;
  if (totalCloud > 90) p *= 0.2;
  else if (totalCloud > 70) p *= 0.5;

  if (lowPct > 80 && totalCloud > 60) p = Math.min(p, 0.15);
  if (lowPct < 20 && highPct > 50) p = Math.min(0.99, p * 1.2);

  return Math.max(0.01, Math.min(0.99, p));
}

// 🔴 IMPORTANTE: exponerla globalmente
window.computeRedProbability = computeRedProbability;
