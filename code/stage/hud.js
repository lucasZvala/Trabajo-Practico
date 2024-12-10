class HUD {
    constructor(juego, rutaPNG, ancho, alto) {
        this.juego = juego; // Referencia al objeto del juego
        this.rutaPNG = rutaPNG; // Ruta de la imagen PNG del fondo
        this.sprite = null; // Sprite del fondo
        this.ancho = ancho
        this.alto = alto

        this.tiempoInicio = Date.now();

        this.crearFondo();
        // this.crearBotonPausa();
        // this.crearReloj();
    }

   async crearFondo() {
    
    try {
        
        // Cargar la textura desde la ruta proporcionada
        const texture = await PIXI.Assets.load(this.rutaPNG);

        // Crear el Sprite con la textura cargada
        this.sprite = new PIXI.Sprite(texture);

        // Ajustar el tamaño del fondo para que ocupe toda la pantalla
        this.sprite.width = this.juego.ancho;
        this.sprite.height = this.juego.alto;

        // Posicionar el fondo
        this.sprite.x = 0;
        this.sprite.y = 0;

        // Agregar el Sprite al escenario
        this.juego.app.stage.addChildAt(this.sprite, 6); 
    } catch (error) {
        console.error('Error cargando la imagen del fondo:', error);
    }
}


//    async crearBotonPausa() {
//     try{
//     const texturaPause = await PIXI.Assets.load("../../frames/hud/HUD_pause.png");

//     // Crear el Sprite con la textura cargada
//     this.botonPausa = new PIXI.Sprite(texturaPause);

//     // Ajustar el tamaño del fondo para que ocupe toda la pantalla
   
//     this.botonPausa.anchor.set(0.5, 1)
//     // Posicionar el fondo
//     this.botonPausa.x = 79;
//     this.botonPausa.y = 708;

//     // Agregar el Sprite al escenario
    
//     this.botonPausa.interactive = true;
//     this.botonPausa.buttonMode = true;

//     this.botonPausa.on("pointerdown", () => this.togglePausa());
//     this.juego.app.stage.addChildAt(this.sprite, 7); 
//     } catch (error) {
//         console.error('Error cargando la imagen de pausa:', error);
//     }
// }

//     crearReloj() {
//         this.textoReloj = new PIXI.Text("00:00", {
//             fontFamily: "Arial",
//             fontSize: 24,
//             fill: 0xffffff,
//             align: "center",
//         });

//         this.textoReloj.anchor.set(0.5);
//         this.textoReloj.x = 100; // Posición del reloj dentro del HUD
//         this.textoReloj.y = 50; // Centrado verticalmente dentro del HUD

//         this.hudContainer.addChild(this.textoReloj);
//     }

//     actualizarReloj() {
//         const tiempoActual = Date.now();
//         const tiempoTranscurrido = Math.floor((tiempoActual - this.tiempoInicio) / 1000);

//         const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, "0");
//         const segundos = (tiempoTranscurrido % 60).toString().padStart(2, "0");

//         this.textoReloj.text = `${minutos}:${segundos}`;
//     }

//     togglePausa() {
//         this.juego.juegoActivo = !this.juego.juegoActivo;

//         if (this.juego.juegoActivo) {
//             this.juego.app.start();
//         } else {
//             this.juego.app.stop();
//         }
//     }

//     update() {
//         this.actualizarReloj();
//     }
// }
}