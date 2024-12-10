class PauseButton extends Entidad {
    constructor(x, y, juego, texture = null) {
        super(x, y, juego); 
        this.juego = juego; 
        this.listo = false; 
      
        this.sprite = null


        // Cargar el SpriteSheet
        this.cargarSpriteSheet(texture);
    }

    async cargarSpriteSheet(texture) {
        try {
            
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);

            this.sprite = new PIXI.AnimatedSprite(json.animations['pause']);
           

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

//     setupTeclado() {
//         window.addEventListener('pointerdown', (event) => {
//            console.log("has pausado el juego")
//     })
// }

//     pausar() {
//         this.listo = !this.listo;
//       }

}