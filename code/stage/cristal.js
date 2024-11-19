class Cristal {
    constructor(x, y, juego, texture = '../../frames/cristales/cristalY.json') {
        this.x = x; 
        this.y = y; 
        this.juego = juego; 

        this.sprite = null;
        this.listo = false; 

        this.cargarSpriteSheet(texture);
    }

    async cargarSpriteSheet(texture) {
        try {
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);

           this.setPosition()

            // Agregar el Sprite al stage
            this.juego.app.stage.addChild(this.sprite);

            this.listo = true; // Indicar que el enemigo está listo
        } catch (error) {
            console.error('Error cargando el SpriteSheet:', error);
        }
    }

    // Método para actualizar la posición del cristal si es necesario
    setPosition(x, y) {
        this.x = x;
        this.y = y;

        if (this.sprite) {
            this.sprite.x = x;
            this.sprite.y = y;
        }
    }

    // Método para escalar el cristal dinámicamente
    setScale(factor) {
        if (this.sprite) {
            this.sprite.scale.set(factor);
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


    }
}


