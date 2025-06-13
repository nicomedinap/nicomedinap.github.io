// minimap.js
class Minimap {
    constructor(canvas, map, player, fov) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.map = map;
        this.player = player;
        this.fov = fov;
        this.maxSize = 100;
    }

    updateMap(newMap) {
        this.map = newMap;
    }

    draw() {
        if (!this.map.length) return;
        
        const mapWidth = this.map[0].length;
        const mapHeight = this.map.length;
        const scale = Math.min(this.maxSize / mapWidth, this.maxSize / mapHeight);

        this.canvas.width = mapWidth * scale;
        this.canvas.height = mapHeight * scale;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMapCells(scale);
        this.drawPlayer(scale);
        this.drawPlayerFOV(scale);
    }

    drawMapCells(scale) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 10) {
                    this.ctx.fillStyle = 'blue';
                    this.ctx.fillRect(x * scale, y * scale, scale, scale);
                } else if (this.map[y][x] !== 0) {
                    this.ctx.fillStyle = 'white';
                    this.ctx.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }
    }

    drawPlayer(scale) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            this.player.x * scale - scale / 2, 
            this.player.y * scale - scale / 2, 
            scale, 
            scale
        );
    }

    drawPlayerFOV(scale) {
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x * scale, this.player.y * scale);

        const numRays = 4;
        const rayAngleStep = this.fov / numRays;
        
        for (let i = 0; i <= numRays; i++) {
            const rayAngle = this.player.angle - this.fov / 2 + i * rayAngleStep;
            const endX = this.player.x + Math.cos(rayAngle) * 4;
            const endY = this.player.y + Math.sin(rayAngle) * 4;
            this.ctx.lineTo(endX * scale, endY * scale);
        }
        
        this.ctx.closePath();
        this.ctx.fill();
    }
}

// Exportamos la clase para poder usarla en el script principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Minimap; // Para Node.js
} else {
    window.Minimap = Minimap; // Para navegador
}