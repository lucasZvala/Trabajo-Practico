class PantallaDeInicio {
    constructor(app, onStart) {
        this.app = app; // Referencia a la aplicación Pixi.js
        this.onStart = onStart; // Callback para iniciar el juego
        this.stage = new PIXI.Container(); // Contenedor para la pantalla de inicio
        this.ayudaMostrada = false; // Bandera para el estado de ayuda

        this.crearFondo(() => {
            this.crearTextos(); // Crear los textos y botones solo después de cargar el fondo
        });
    }

    crearFondo(callback) {
        const backgroundImageURL = "../frames/background/background.png";
        PIXI.Assets.load(backgroundImageURL).then((texture) => {
            this.background = new PIXI.Sprite(texture);

            this.background.width = this.app.screen.width;
            this.background.height = this.app.screen.height;

            this.stage.addChild(this.background); // Añadir el fondo primero
            if (callback) callback(); // Llamar al callback después de cargar el fondo
        });
    }

    crearTextos() {
        const estiloTitulo = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 48,
            fill: '#ffffff',
            align: 'center',
        });

        const estiloBoton = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: '#00ff00',
            align: 'center',
        });

        const estiloAyuda = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#ffffff',
            align: 'center',
        });

        // Texto principal
        this.titulo = new PIXI.Text('Press Start to Begin', estiloTitulo);
        this.titulo.anchor.set(0.5);
        this.titulo.x = this.app.screen.width / 2;
        this.titulo.y = this.app.screen.height / 2 - 100;
        this.stage.addChild(this.titulo);

        // Botón "Start"
        this.botonStart = new PIXI.Text('Start', estiloBoton);
        this.botonStart.anchor.set(0.5);
        this.botonStart.x = this.app.screen.width / 2;
        this.botonStart.y = this.app.screen.height / 2;
        this.botonStart.interactive = true;
        this.botonStart.buttonMode = true;
        this.botonStart.on('pointerdown', this.iniciarJuego.bind(this));
        this.stage.addChild(this.botonStart);

        // Botón "Help"
        this.botonHelp = new PIXI.Text('Help', estiloBoton);
        this.botonHelp.anchor.set(0.5);
        this.botonHelp.x = this.app.screen.width / 2;
        this.botonHelp.y = this.app.screen.height / 2 + 60;
        this.botonHelp.interactive = true;
        this.botonHelp.buttonMode = true;
        this.botonHelp.on('pointerdown', () => this.mostrarAyuda(estiloAyuda));
        this.stage.addChild(this.botonHelp);
    }

    mostrarAyuda(estiloAyuda) {
        if (this.ayudaMostrada) return;

        // Limpiar textos de inicio
        this.titulo.visible = false;
        this.botonStart.visible = false;
        this.botonHelp.visible = false;

        // Mostrar textos de ayuda
        this.ayuda1 = new PIXI.Text(
            'Protect the crystals from the elementals',
            estiloAyuda
        );
        this.ayuda1.anchor.set(0.5);
        this.ayuda1.x = this.app.screen.width / 2;
        this.ayuda1.y = this.app.screen.height / 2 - 20;

        this.ayuda2 = new PIXI.Text(
            'Use WASD to move your character and right-click to summon allies',
            estiloAyuda
        );
        this.ayuda2.anchor.set(0.5);
        this.ayuda2.x = this.app.screen.width / 2;
        this.ayuda2.y = this.app.screen.height / 2 + 20;

        this.stage.addChild(this.ayuda1);
        this.stage.addChild(this.ayuda2);

        // Botón "Back"
        this.botonBack = new PIXI.Text('Back', estiloAyuda);
        this.botonBack.anchor.set(0.5);
        this.botonBack.x = this.app.screen.width / 2;
        this.botonBack.y = this.app.screen.height / 2 + 80;
        this.botonBack.interactive = true;
        this.botonBack.buttonMode = true;
        this.botonBack.on('pointerdown', this.mostrarInicio.bind(this));
        this.stage.addChild(this.botonBack);

        this.ayudaMostrada = true;
    }

    mostrarInicio() {
        // Mostrar textos de inicio nuevamente
        this.titulo.visible = true;
        this.botonStart.visible = true;
        this.botonHelp.visible = true;

        // Ocultar textos de ayuda y botón "Back"
        this.stage.removeChild(this.ayuda1);
        this.stage.removeChild(this.ayuda2);
        this.stage.removeChild(this.botonBack);

        this.ayudaMostrada = false;
    }

    iniciarJuego() {
        // Eliminar la pantalla de inicio completamente
        this.app.stage.removeChild(this.stage);

        // Llamar al callback para iniciar el juego
        this.onStart();
    }

    mostrar() {
        this.app.stage.addChild(this.stage);
    }
}
