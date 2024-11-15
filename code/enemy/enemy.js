class Enemy extends Entidad {
    constructor(x, y, juego, texture = "../../frames/enemy/EnemyP.json") {
        super(x, y, juego); // Inicializa la clase base Entidad
        this.juego = juego; // Acceso al objeto juego
        this.listo = false; // Indica si el enemigo está listo para usarse
       
        // Cargar el SpriteSheet
        this.cargarSpriteSheet(texture);
    }

    async cargarSpriteSheet(texture) {
        try {
            // Cargar el archivo JSON del SpriteSheet
            const json = await PIXI.Assets.load(texture);

            // Crear el Sprite animado usando la animación definida en el JSON
            this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo']);

            // Configurar propiedades del Sprite
            this.sprite.animationSpeed = 0.2; // Velocidad de la animación
            this.sprite.loop = true;          // Hacer que la animación se repita
            this.sprite.play();               // Iniciar la animación

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

    update() {
        if (!this.listo) return; // Salir si el SpriteSheet no está listo

        // Aquí puedes agregar lógica específica, como perseguir al jugador
        this.sprite.x = this.x; // Actualizar la posición en cada frame
        this.sprite.y = this.y;

        super.update(); // Llamar al método update de la clase base
    }
}
