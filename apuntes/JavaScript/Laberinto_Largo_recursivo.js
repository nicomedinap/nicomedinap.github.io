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
            if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                // Bordes del mapa
                row.push(1);
            } else if (Math.random() < 0.1) {
                // Crear caminos con 10% de probabilidad
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

// Función para generar y obtener un mapa de 30x100
function getMap() {
    return generateMap(30, 100);
}

// Generar el mapa y asignarlo a una constante
const mapa = getMap();

// Imprimir el mapa en la consola
mapa.forEach(row => {
    console.log(row.join(', '));
});

export { getMap };