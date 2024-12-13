class Torre extends Entidad {
    constructor(x, y, juego, texture = null) {
        super(x, y, juego); 
        this.juego = juego;
        this.app = juego.app 
        this.listo = false; 
        
        this.sprite = null;
        this.crearContenedorTorre();    

        this.vida = 30

        // Cargar el SpriteSheet
        this.cargarSpriteSheet(texture);
    }

    crearContenedorTorre() {
        // Crear un contenedor específico para la torre
        this.torreContainer = new PIXI.Container();
        this.torreContainer.name = "torre"
        this.juego.app.stage.addChild(this.torreContainer);
    }

    async cargarSpriteSheet(texture) {
        try {
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);

            
            this.sprite = new PIXI.AnimatedSprite(json.animations['damage']);
           

            // Configurar propiedades del Sprite
            this.sprite.animationSpeed = 0.2; 
            this.sprite.loop = false;         
            // Posicionar el Sprite
            this.sprite.x = this.x;
            this.sprite.y = this.y;
            this.sprite.anchor.set(0.5, 1);   // Ajustar el punto de anclaje
            this.sprite.quienSoy = this
            
            // Agregar el Sprite al stage
            this.torreContainer.addChild(this.sprite);

            this.listo = true; // Indicar que el enemigo está listo
        } catch (error) {
            console.error('Error cargando el SpriteSheet:', error);
        }
    }

    // Método para eliminar el cristal del escenario
    destruir() {
        if (this.sprite) {
            this.app.stage.removeChild(this.torreContainer);
            this.sprite = null;
            this.listo = false;
        }
    }

    dañar() {
        if (this.sprite) {
            this.vida -=5
            this.sprite.play();
            console.log(this.vida)
            if (this.vida == 0){
                this.destruir()
            }
        }
    }

    update() {
        if (!this.listo) return; 
        this.actualizarPosicionEnGrid()
        if(this.vida <= 0){
            this.destruir()
        }
       
    }

    actualizarPosicionEnGrid() {
        this.grid.update(this.sprite);
    }
}
