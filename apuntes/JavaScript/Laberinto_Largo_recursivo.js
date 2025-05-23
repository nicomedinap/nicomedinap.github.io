// Generar un número aleatorio entre 1 y 150
function getRandomNumber() {
    return Math.floor(Math.random() * 150) + 1;
}

// Crear un mapa de 30 columnas por 100 filas con caminos representados por ceros
function generateMap(width, height) {
    const map = [];

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            if (Math.random() < 0.2) {
                // Crear caminos con 20% de probabilidad
                row.push(0);
            } else {
                // Espacios interiores con números aleatorios
                row.push(getRandomNumber());
            }
        }
        map.push(row);
    }

    return map;
}

// Generar el mapa de 30x100
const map = generateMap(30, 100);

// Imprimir el mapa en la consola
map.forEach(row => {
    console.log(row.join(', '));
});

// Exportar el mapa
export { map };