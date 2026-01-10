/* === CIUDADES === */
const chileanCities = {
  "Arica":            { lat: -18.4783, lon: -70.3126, region: "XV Región",  altitude: 30 },
  "Iquique":          { lat: -20.2146, lon: -70.1524, region: "I Región",   altitude: 56 },
  "Antofagasta":      { lat: -23.6509, lon: -70.3975, region: "II Región",  altitude: 40 },
  "Calama":           { lat: -22.4544, lon: -68.9294, region: "II Región",  altitude: 2260 },
  "Copiapó":          { lat: -27.3667, lon: -70.3333, region: "III Región", altitude: 390 },
  "La Serena":        { lat: -29.9027, lon: -71.2519, region: "IV Región",  altitude: 28 },
  "Coquimbo":         { lat: -29.9533, lon: -71.3436, region: "IV Región",  altitude: 15 },
  "San Felipe":       { lat: -32.7497, lon: -70.7258, region: "V Región",   altitude: 656 },
  "Valparaíso":       { lat: -33.0458, lon: -71.6197, region: "V Región",   altitude: 40 },
  "Viña del Mar":     { lat: -33.0245, lon: -71.5518, region: "V Región",   altitude: 20 },
  "Santiago":         { lat: -33.4489, lon: -70.6693, region: "RM",         altitude: 570 },
  "Rancagua":         { lat: -34.1701, lon: -70.7406, region: "VI Región",  altitude: 572 },
  "Pichilemu":        { lat: -34.3878, lon: -72.0042, region: "VI Región", altitude: 27 },
  "Peumo":            { lat: -34.3958, lon: -71.1647, region: "VI Región", altitude: 172 },
  "San Fernando":     { lat: -34.5867, lon: -70.9911, region: "VI Región", altitude: 340 },
  "Chimbarongo":      { lat: -34.7089. lon: -71.0458, region: "VI Región", altitude: 307 },
  "Talca":            { lat: -35.4264, lon: -71.6554, region: "VII Región", altitude: 102 },
  "Linares":          { lat: -35.8454, lon: -71.5979, region: "VII Región", altitude: 165 },
  "Chillán":          { lat: -36.6066, lon: -72.1034, region: "Ñuble",      altitude: 124 },
  "Concepción":       { lat: -36.8269, lon: -73.0498, region: "VIII Región", altitude: 12 },
  "Arauco":           { lat: -37.2464, lon: -73.3175, region: "VIII Región", altitude: 8 },
  "Dichato":          { lat: -36.548,  lon: -72.937,  region: "VIII Región", altitude: 10 },
  "Los Ángeles":      { lat: -37.4697, lon: -72.3536, region: "VIII Región", altitude: 139 },
  "Antuco":           { lat: -37.333,  lon: -71.683,  region: "VIII Región", altitude: 2979 },
  "Temuco":           { lat: -38.7359, lon: -72.5907, region: "IX Región",  altitude: 114 },
  "Valdivia":         { lat: -39.8142, lon: -73.2459, region: "XIV Región", altitude: 19 },
  "Osorno":           { lat: -40.5739, lon: -73.1310, region: "X Región",   altitude: 65 },
  "Puerto Montt":     { lat: -41.4689, lon: -72.9411, region: "X Región",   altitude: 85 },
  "Punta Arenas":     { lat: -53.1638, lon: -70.9171, region: "XII Región", altitude: 34 },

  /* === OBSERVATORIOS ASTRONÓMICOS === */
  "Observatorio Paranal": {
    lat: -24.6270,
    lon: -70.4045,
    region: "Antofagasta",
    type: "observatory",
    operator: "ESO",
    altitude: 2635
  },
  "Observatorio La Silla": {
    lat: -29.2567,
    lon: -70.7386,
    region: "Coquimbo",
    type: "observatory",
    operator: "ESO",
    altitude: 2400
  },
  "Observatorio Cerro Tololo": {
    lat: -30.1690,
    lon: -70.8047,
    region: "Coquimbo",
    type: "observatory",
    operator: "AURA",
    altitude: 2200
  },
  "Observatorio Las Campanas": {
    lat: -29.0083,
    lon: -70.6933,
    region: "Atacama",
    type: "observatory",
    operator: "Carnegie Institution",
    altitude: 2282
  },
  "Observatorio Cerro Armazones": {
    lat: -24.5989,
    lon: -70.1914,
    region: "Antofagasta",
    type: "observatory",
    operator: "ESO",
    altitude: 3060
  },
  "Observatorio APEX": {
    lat: -23.0064,
    lon: -67.7547,
    region: "Antofagasta",
    type: "observatory",
    operator: "ESO",
    altitude: 5105
  },
  "Observatorio ALMA": {
    lat: -23.0193,
    lon: -67.7532,
    region: "Antofagasta",
    type: "observatory",
    operator: "Internacional",
    altitude: 5058
  },
  "Observatorio Cerro Pachón": {
    lat: -30.2389,
    lon: -70.7336,
    region: "Coquimbo",
    type: "observatory",
    operator: "Gemini/AURA",
    altitude: 2715
  },
  "Observatorio Mamalluca": {
    lat: -30.1889,
    lon: -70.6950,
    region: "Coquimbo",
    type: "observatory",
    operator: "Municipal",
    altitude: 1120
  },
  "Observatorio Collowara": {
    lat: -31.7833,
    lon: -71.2333,
    region: "Coquimbo",
    type: "observatory",
    operator: "Privado",
    altitude: 1300
  }
};

// Exportar ciudades
window.chileanCities = chileanCities;