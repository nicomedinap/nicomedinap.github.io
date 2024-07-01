export function handleInput(player) {
    window.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 37: player.turnSpeed = -0.05; break;
            case 39: player.turnSpeed = 0.05; break;
            case 38: player.speed = 0.1; break;
            case 40: player.speed = -0.1; break;
        }
    });

    window.addEventListener('keyup', (e) => {
        switch (e.keyCode) {
            case 37:
            case 39: player.turnSpeed = 0; break;
            case 38:
            case 40: player.speed = 0; break;
        }
    });
}