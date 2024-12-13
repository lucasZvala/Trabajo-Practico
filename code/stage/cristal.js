class Cristal extends Entidad {
    constructor(x, y, juego, texture = null) {
        super(x, y, juego); 
        this.juego = juego; 
        this.listo = false; 

        this.crearContenedorCristal();
      
        this.sprite = null;


        // Cargar el SpriteSheet
        this.cargarSpriteSheet(texture);
    }

    crearContenedorCristal() {
        // Crear un contenedor específico para el cristal
        this.cristalContainer = new PIXI.Container();
        this.cristalContainer.name = "cristal"
        this.juego.app.stage.addChild(this.cristalContainer);
    }

    async cargarSpriteSheet(texture) {
        try {
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);

            
            this.sprite = new PIXI.AnimatedSprite(json.animations['cristal']);
           

            // Configurar propiedades del Sprite
            this.sprite.animationSpeed = 0.2; 
            this.sprite.loop = true;         
            this.sprite.play();              

            // Posicionar el Sprite
            this.sprite.x = this.x;
            this.sprite.y = this.y;
            this.sprite.anchor.set(0.5, 1);   // Ajustar el punto de anclaje
            this.sprite.quienSoy = this
            // Agregar el Sprite al stage
            this.cristalContainer.addChild(this.sprite);

            this.listo = true; // Indicar que el enemigo está listo
        } catch (error) {
            console.error('Error cargando el SpriteSheet:', error);
        }
    }

    // Método para eliminar el cristal del escenario
    destruir() {
        if (this.sprite) {
            this.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
            this.listo = false;
        }
    }

    update() {
        if (!this.listo) return; 
       this.actualizarPosicionEnGrid()

    }

    actualizarPosicionEnGrid() {
        this.grid.update(this.sprite);
    }
}


