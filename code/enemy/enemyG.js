class EnemyG extends Enemy {
    constructor(x, y, juego, texture = null) {
        super(x, y, juego);  
        this.listo = false; 
      


        this.velocidadX = 0
        this.velocidadY = 0

        this.velMax = 10

        this.aceleracionX = 0
        this.aceleracionY = 0


        // Cargar el SpriteSheet
        super.cargarSpriteSheet(texture);
    }

    async cargarSpriteSheet(texture) {
        try {
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);
            
            
            this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo']);

           this.sprite.name = "enemigo"

            // Configurar propiedades del Sprite
            this.sprite.animationSpeed = 0.2; 
            this.sprite.loop = true;         
            this.sprite.play();              

            // Posicionar el Sprite
            this.sprite.x = this.x;
            this.sprite.y = this.y;
            this.sprite.anchor.set(0.5, 1);   // Ajustar el punto de anclaje

            // Agregar el Sprite al stage
            this.juego.app.stage.addChild(this.sprite);

            this.listo = true; // Indicar que el enemigo está listo
        } catch (error) {
            console.error('Error cargando el SpriteSheet:', error);
        }
    }

    setObjetivo(puntoB) {
        // Define el objetivo hacia el que se moverá el enemigo
        this.puntoB = puntoB;
    }

    moverHaciaObjetivo() {
       
        if (!this.listo || !this.puntoB) return;

        // Determinar el objetivo actual
        const objetivo = this.puntoB;

        // Verificar si el objetivo es un objeto con coordenadas
        const objetivoX = objetivo.x || objetivo.sprite?.x || 0;
        const objetivoY = objetivo.y || objetivo.sprite?.y || 0;

        // Calcular la diferencia entre la posición actual y el objetivo
        const dx = objetivoX - this.x;
        const dy = objetivoY - this.y;

        // Calcular la distancia al objetivo
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia > 1) {
            // Normalizar el vector dirección y multiplicar por la velocidad
            const dirX = (dx / distancia) * this.velMax;
            const dirY = (dy / distancia) * this.velMax;

            // Actualizar la posición del enemigo
            this.x += dirX;
            this.y += dirY;

            // Actualizar la posición del sprite
            this.sprite.x = this.x;
            this.sprite.y = this.y;

            // Cambiar la dirección del sprite según el movimiento
            if (dirX > 0) {
                this.sprite.scale.x = 1; // Mirar a la derecha
            } else if (dirX < 0) {
                this.sprite.scale.x = -1; // Mirar a la izquierda
            }
        } else {
            // Si llegó al objetivo, detenerse o ejecutar alguna acción
            this.atacar();
        }
    }


    atacar(){
        console.log("atacando")
    }


    update() {
       super.update()
    }
}
