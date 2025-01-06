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
            } else if (Math.random() < 0.2) {
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

// Función para verificar que el mapa se generó correctamente
function verifyMap(map, width, height) {
    if (map.length !== height) {
        console.error('Error: La altura del mapa no es correcta.');
        return false;
    }
    for (let y = 0; y < height; y++) {
        if (map[y].length !== width) {
            console.error(`Error: La longitud de la fila ${y} no es correcta.`);
            return false;
        }
    }
    return true;
}

// Generar el mapa de 30x100
const map = generateMap(30, 100);

// Verificar el mapa generado
if (verifyMap(map, 30, 100)) {
    console.log('El mapa se generó correctamente.');
} else {
    console.error('El mapa no se generó correctamente.');
}

// Exportar el mapa
export { map };