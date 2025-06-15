// Mapa de 5 columnas y 20 filas, con lentes alineadas en la columna central (índice 2)
const map = [
  [1,1,3,1,1],    // Fila 0: borde superior
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,'L',0,1],  // Fila 5: lente objetivo en columna 2 (índice 2)
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,'L',0,1],  // Fila 15: lente ocular en columna 2 (índice 2)
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,1,2,1,1],    // Fila 19: borde inferior
];
export { map };