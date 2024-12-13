class PantallaGameOver {
    constructor(app, ancho, alto, tiempoInicio) {
      this.app = app;
      this.ancho = ancho;
      this.alto = alto;
      this.tiempoInicio = tiempoInicio;
      this.container = new PIXI.Container();
  
      this.crearPantalla();
    }
  
    calcularPuntuacion() {
      const tiempoTranscurrido = Math.floor((Date.now() - this.tiempoInicio) / 1000);
      const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, "0");
      const segundos = (tiempoTranscurrido % 60).toString().padStart(2, "0");
      return `${minutos}:${segundos}`;
    }
  
    crearPantalla() {
      const textoGameOver = new PIXI.Text("Game Over", {
        fontFamily: "Arial",
        fontSize: 64,
        fill: "#ff0000",
        align: "center",
      });
  
      textoGameOver.anchor.set(0.5);
      textoGameOver.x = this.ancho / 2;
      textoGameOver.y = this.alto / 3;
  
      const puntuacion = this.calcularPuntuacion();
      const textoPuntuacion = new PIXI.Text(`Tu puntuación: ${puntuacion}`, {
        fontFamily: "Arial",
        fontSize: 32,
        fill: "#ffffff",
        align: "center",
      });
  
      textoPuntuacion.anchor.set(0.5);
      textoPuntuacion.x = this.ancho / 2;
      textoPuntuacion.y = this.alto / 2;
  
      const botonReiniciar = new PIXI.Text("Reiniciar", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "#00ff00",
        align: "center",
      });
  
      botonReiniciar.anchor.set(0.5);
      botonReiniciar.x = this.ancho / 2;
      botonReiniciar.y = (this.alto / 3) * 2;
      botonReiniciar.interactive = true;
      botonReiniciar.buttonMode = true;
      botonReiniciar.on("pointerdown", () => this.reiniciarJuego());
  
      this.container.addChild(textoGameOver);
      this.container.addChild(textoPuntuacion);
      this.container.addChild(botonReiniciar);
    }
  
    mostrar() {
      this.app.stage.addChild(this.container);
    }
  
    reiniciarJuego() {
      this.app.stage.removeChild(this.container);
      window.location.reload(); // Recargar la página para reiniciar el juego
    }
  }
  