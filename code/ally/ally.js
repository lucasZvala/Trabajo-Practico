class Ally extends Entidad {
    constructor(x, y, juego, texture = "../../frames/Ally/AllyY.json", objetivo = null) {
        super(x, y, juego);
        this.juego = juego;
        this.listo = false;
        this.vivo = false

        this.tipo = "basico"

        this.velocidadX = 0
        this.velocidadY = 0

        this.objetivo = objetivo;

        this.sprite = null;

        this.crearContenedorAlly()


        this.aceleracionX = 0
        this.aceleracionY = 0

        this.vida = 15
        this.damage = 5

        // Cargar el SpriteSheet
        this.cargarSpriteSheet(texture);
    }

    crearContenedorAlly() {
        // Crear un contenedor específico para el jugador
        this.allyContainer = new PIXI.Container();
        this.allyContainer.name = "ally"
        this.juego.app.stage.addChild(this.allyContainer);
    }

    async cargarSpriteSheet(texture) {
        try {
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);


            this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo']);

            this.sprite.name = "aliado"



            // Configurar propiedades del Sprite
            this.sprite.animationSpeed = 0.2;
            this.sprite.loop = true;
            this.sprite.play();

            // Posicionar el Sprite
            this.sprite.x = this.x;
            this.sprite.y = this.y;
            this.sprite.anchor.set(0.5, 1);   // Ajustar el punto de anclaje

            // Agregar el Sprite al stage
            this.allyContainer.addChild(this.sprite);

            this.listo = true; // Indicar que el enemigo está listo
        } catch (error) {
            console.error('Error cargando el SpriteSheet:', error);
        }
    }

    setObjetivo(objetivo) {
        // Define el objetivo hacia el que se moverá el enemigo
        // this.buscarEnemigoCercano()
        this.objetivo = objetivo;
    }


    haLlegadoAlObjetivo() {
        if (!this.objetivo) return false;

        const distanciaX = Math.abs(this.x - this.objetivo.x);
        const distanciaY = Math.abs(this.y - this.objetivo.y);

        return distanciaX < 5 && distanciaY < 5; // Consideramos una tolerancia de 5 píxeles
    }




    moverHaciaObjetivo() {

        if (!this.listo || !this.objetivo) return;

        // Determinar el objetivo actual
        const objetivo = this.objetivo;

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
            const dirX = (dx / distancia) * this.velocidadMax;
            const dirY = (dy / distancia) * this.velocidadMax;

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
            if (objetivo.vida > 0) {
                this.atacarObjetivo(objetivo)
                console.log("te ataco")
            }
        }
    }
    atacarObjetivo(){
        this.objetivo.vida -= this.damage
        this.vida = 0
    }

    destruir() {
        if (this.sprite) {
            this.juego.app.stage.removeChild(this.allyContainer);
            this.sprite = null;
            this.listo = false;
        }
    }

    setTipo(tipoAliado){
       this.tipo = tipoAliado
    }

    


    update() {
        if (!this.listo) return; // Salir si el SpriteSheet no está listo
        this.moverHaciaObjetivo();
        this.actualizarPosicionEnGrid()

        if(this.vida <= 0){
            this.vivo = false
        }
        if(!this.vivo){
            this.destruir()
        }
            
        


        // Aquí puedes agregar lógica específica, como perseguir al jugador
        // this.sprite.x = this.x; // Actualizar la posición en cada frame
        // this.sprite.y = this.y;

        super.update(); // Llamar al método update de la clase base
    }
}
