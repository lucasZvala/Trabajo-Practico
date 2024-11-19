class Spawner {
    constructor(juego, intervalo, posicion, cantidad, callbackSpawn) {
        this.juego = juego;           // Referencia al juego
        this.intervalo = intervalo;   // Tiempo entre spawns (milisegundos)
        this.posicion = posicion;     // Posición base del spawner {x, y}
        this.cantidad = cantidad;     // Cantidad de entidades a spawnear cada vez
        this.callbackSpawn = callbackSpawn; // Función para crear la entidad
        this.timer = null;           // Referencia al temporizador
    }

    iniciar() {
        if (this.timer) return; // Si ya está corriendo, no hacer nada

        this.timer = setInterval(() => {
            for (let i = 0; i < this.cantidad; i++) {
                this.callbackSpawn(this.posicion);
            }
        }, this.intervalo);
    }

    detener() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}
