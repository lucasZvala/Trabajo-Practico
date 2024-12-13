class Enemy extends Entidad {
    constructor(x, y, juego, texture = "../../frames/enemy/EnemyP.json", tipo = "basico") {
        super(x, y, juego); 
        this.juego = juego; 
        this.listo = false;
        this.vivo = false
        
        this.quienSoy = this
      
        this.tipo = tipo
        this.crearContenedorEnemy();

        this.grid = juego.grid; // Referencia a la grid
        this.vision = 120 + Math.floor(Math.random() * 150); //en pixels

        this.velocidadX = 0
        this.velocidadY = 0

        this.sprite = null;

        this.velMax = 3

        this.aceleracionX = 0
        this.aceleracionY = 0

        this.damage = 1
        
        this.vida = 5

        // Cargar el SpriteSheet
        this.cargarSpriteSheet(texture);
    }

    crearContenedorEnemy() {
        // Crear un contenedor específico para el enemigo
        this.enemyContainer = new PIXI.Container();
        this.enemyContainer.name = "enemy"
        this.juego.app.stage.addChild(this.enemyContainer);
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
            this.enemyContainer.addChild(this.sprite);

            this.listo = true; // Indicar que el enemigo está listo
        } catch (error) {
            console.error('Error cargando el SpriteSheet:', error);
        }
    }

    
    setObjetivo(puntoB) {
       
        // Define el objetivo hacia el que se moverá el enemigo
        this.puntoB = puntoB;
        this.moverHaciaObjetivo()
        
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
           this.atacarObjetivo()
        }
    }

    typeShow(){
        return this.type
    }

    atacarObjetivo(){
        this.puntoB.vida -= this.damage
    }

    destruir() {
        if (this.sprite) {
            this.juego.app.stage.removeChild(this.enemyContainer);
            this.sprite = null;
            this.listo = false;
        }
    }


    update() {
        if (!this.listo) return; // Salir si el SpriteSheet no está listo
        super.update();
        // console.log("1")
        this.mirarAlrededor()
        this.actualizarPosicionEnGrid()

        this.moverHaciaObjetivo();

        if(this.vida <= 0){
            this.vivo = false
        }
        if(!this.vivo){
            this.destruir()
        }
            

        
        // Aquí puedes agregar lógica específica, como perseguir al jugador
        // this.sprite.x = this.x; // Actualizar la posición en cada frame
        // this.sprite.y = this.y;

         // Llamar al método update de la clase base
    }
}