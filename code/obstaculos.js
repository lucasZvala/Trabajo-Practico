class Obstaculo {
    constructor(x, y, juego) {
        this.juego = juego
        this.x = x
        this.y = y

        this.alto = 50 + Math.random() * 50
        this.ancho = 50 + Math.random() * 50

        // Crear el cuadrado visible (el obstáculo)
        this.ponerCuadrado()

        // Crear la hitbox para colisiones
        this.crearHitbox()
    }

    ponerCuadrado() {
        // Crea el obstáculo visible (cuadrado)
        this.sprite = new PIXI.Graphics()
            .beginFill(getRandomColor())  // Color aleatorio para el obstáculo
            .drawRect(0, 0, this.ancho, this.alto)
            .endFill()

        // Establecer la posición del obstáculo
        this.sprite.x = this.x
        this.sprite.y = this.y

        // Añadir el obstáculo al stage
        this.juego.app.stage.addChild(this.sprite)
    }

    crearHitbox() {
        // Crear la hitbox con un color de fondo temporal para asegurarte de que se ve
        this.hitbox = new PIXI.Graphics()
            .lineStyle(2, 0xff0000)  // Borde rojo para la hitbox
            .beginFill(0x00ff00, 0.00000001)  // Fondo verde semitransparente (temporal)
            .drawRect(0, 0, this.ancho, this.alto)
            .endFill()

        // Posicionar la hitbox en la misma posición que el obstáculo
        this.hitbox.x = this.x
        this.hitbox.y = this.y

        // Añadir la hitbox al stage, después del obstáculo, para asegurar que esté visible
        this.juego.app.stage.addChild(this.hitbox)

        this.hitbox.visible = false

    }

    toggleHitbox() {
        this.hitbox.visible = !this.hitbox.visible  // Alternar la visibilidad
    }


    update(time) {
        // Actualizar la posición de la hitbox junto con el obstáculo
        this.hitbox.x = this.sprite.x
        this.hitbox.y = this.sprite.y

        this.time = time

        // Si tienes física o gravedad, deberías aplicarla aquí
        // Si se necesita actualización adicional de velocidad/posición, agrégala aquí también

        // Actualizar la posición del obstáculo
        this.sprite.x = this.x
        this.sprite.y = this.y
    }

}