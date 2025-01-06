// Generar un número aleatorio entre 1 y 150
function getRandomNumber() {
    return Math.floor(Math.random() * 150) + 1;
}

// Crear un mapa de 200 de largo por 30 de alto basado en el mapa proporcionado
function generateMap(width, height) {
    const map = [];

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                // Bordes del mapa
                row.push(1);
            } else if (x > 0 && x < width - 1 && y === height - 1) {
                // Línea inferior del mapa
                row.push(5);
            } else {
                // Espacios interiores con números aleatorios
                row.push(getRandomNumber());
            }
        }
        map.push(row);
    }

    return map;
}

const mapa = generateMap(200, 30);

export { mapa };