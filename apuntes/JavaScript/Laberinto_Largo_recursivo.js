const columns = 9; // número de columnas en el mapa
const rows = 50; // número de filas en el mapa

// Inicialización del mapa con todas las paredes (1)
const map = Array.from({ length: rows }, () => Array(columns).fill(1));

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función recursiva para generar el laberinto usando el algoritmo de retroceso recursivo
function recursiveBacktrack(x, y) {
    const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];
    shuffleArray(directions);

    for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i];
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && ny >= 0 && nx < columns && ny < rows && map[ny][nx] === 1) {
            map[y + dy / 2][x + dx / 2] = 0;
            map[ny][nx] = 0;
            recursiveBacktrack(nx, ny);
        }
    }
}

// Iniciar la generación del laberinto desde una celda específica
map[1][1] = 0;
recursiveBacktrack(1, 1);

// Establecer la entrada y la salida
map[1][0] = 0; // Punto de entrada
map[rows - 2][columns - 1] = 0; // Punto de salida

console.log(map);

export { map };
