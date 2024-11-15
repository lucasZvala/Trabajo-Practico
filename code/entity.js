class Entidad {
    constructor(x, y, juego) {
        this.container = new PIXI.Container();
        this.juego = juego;
        this.juego.app.stage.addChild(this.container);

        this.x = x;
        this.y = y;
        this.velocidad = { x: 0, y: 0 };
        this.aceleracion = { x: 0, y: 0 };

        this.velocidadMax = 5;
        this.aceleracionMax = 1;
    }

    mensaje() {
        console.log("hola");
    }

    update() {
        this.velocidad.x = this.aceleracion.x;
        this.velocidad.y = this.aceleracion.y;

        this.aceleracion.x = 0;
        this.aceleracion.y = 0;

        this.x += this.velocidad.x;
        this.y += this.velocidad.y;
    }

    render() {
        this.container.x = this.x;
        this.container.y = this.y;
    }
}
