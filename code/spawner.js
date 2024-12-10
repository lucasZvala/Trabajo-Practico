class Spawner {
    constructor(juego, intervalo, posicion, cantidad, callbackSpawn, limiteMaximo = Infinity, tipo = "basico") {
        this.juego = juego;           
        this.intervalo = intervalo;   
        this.posicion = posicion;     
        this.cantidad = cantidad;     
        this.callbackSpawn = callbackSpawn; 
        this.limiteMaximo = limiteMaximo;   
        this.totalEntidadesCreadas = 0; 
        this.tipo = tipo    

        this.timer = null;           // Referencia al temporizador
    }

    iniciar() {
        if (this.timer) return; // Si ya está corriendo, no hacer nada

        this.timer = setInterval(() => {
            if (this.totalEntidadesCreadas >= this.limiteMaximo) {
                this.detener();
                console.log('Límite de entidades alcanzado. El spawner ha detenido su creación.');
                return;
            }

            for (let i = 0; i < this.cantidad; i++) {
                if (this.totalEntidadesCreadas < this.limiteMaximo) {
                    this.callbackSpawn(this.posicion);
                    this.totalEntidadesCreadas++;
                } else {
                    break;
                }
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
