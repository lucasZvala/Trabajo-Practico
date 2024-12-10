class Background {
    constructor(juego, rutaPNG) {
        this.juego = juego; // Referencia al objeto del juego
        this.rutaPNG = rutaPNG; // Ruta de la imagen PNG del fondo
        this.sprite = null; // Sprite del fondo

        // Inicia la carga de la imagen
        this.cargarSprite();
    }

    async cargarSprite() {
        try {
            // Cargar la textura desde la ruta proporcionada
            const texture = await PIXI.Assets.load(this.rutaPNG);
            // Crear el Sprite con la textura cargada
            this.sprite = new PIXI.Sprite(texture);

            // Ajustar el tamaño del fondo para que ocupe toda la pantalla
            this.sprite.width = this.juego.ancho *2;
            this.sprite.height = this.juego.alto *2;

            // Posicionar el fondo
            this.sprite.x = 0;
            this.sprite.y = 0;

            // Agregar el Sprite al escenario
            this.juego.app.stage.addChildAt(this.sprite, 0); // Agregarlo en el fondo (z-index más bajo)
        } catch (error) {
            console.error('Error cargando la imagen del fondo:', error);
        }
    }
}
