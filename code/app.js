class Juego {
  constructor() {
    this.obstaculos = []
    this.player = []
    this.app = new PIXI.Application()
    this.contadorDeFrames = 0
    this.teclasPresionadas = {}

    this.alto = 720
    this.ancho = 1280



    // Intialize the application.
    let promesa = this.app.init({ width: this.ancho, height: this.alto })

    promesa.then(e => {
      document.body.appendChild(this.app.canvas)

      globalThis.__PIXI_APP__ = this.app

      this.app.ticker.add(() => {
        this.gameLoop()
      })

      this.ponerChaboncitos(1)
      this.ponerObstaculos(3)
    })

    this.pulsandoTeclas()

    this.configurarListenerHitbox()

  }
  
  background() {
    const backgroundImageURL = "../frames/background/background.png"; // Cambia esto a la ruta de tu imagen

       PIXI.Assets.load(backgroundImageURL).then((texture) => {
        // Crear el Sprite de fondo
        const background = new PIXI.Sprite(texture);
      
        // Ajustar el tamaño del fondo para que ocupe toda la pantalla
        background.width = app.screen.width;
        background.height = app.screen.height;
      
        // Añadir el fondo al escenario
        app.stage.addChild(background);
  })
}

  gameLoop() {
     this.contadorDeFrames++
    // Verificar el estado de las teclas para movimiento continuo
    if (this.teclasPresionadas["w"] && this.teclasPresionadas["a"]) {
      this.player[0].irArriba()
      this.player[0].irIzquierda()
      this.player[0].sprite.play()
      this.player[0].sprite.scale.x = -1  // Voltear a la izquierda
    } else if (this.teclasPresionadas["w"] && this.teclasPresionadas["d"]) {
      this.player[0].irArriba()
      this.player[0].irDerecha()
      this.player[0].sprite.play()
      this.player[0].sprite.scale.x = 1  // Voltear a la derecha
    } else if (this.teclasPresionadas["s"] && this.teclasPresionadas["a"]) {
      this.player[0].irAbajo()
      this.player[0].irIzquierda()
      this.player[0].sprite.play()
      this.player[0].sprite.scale.x = -1  // Voltear a la izquierda
    } else if (this.teclasPresionadas["s"] && this.teclasPresionadas["d"]) {
      this.player[0].irAbajo()
      this.player[0].irDerecha()
      this.player[0].sprite.play()
      this.player[0].sprite.scale.x = 1  // Voltear a la derecha
    } else {
      // Movimientos individuales
      if (this.teclasPresionadas["w"]) {
        this.player[0].irArriba()
        this.player[0].sprite.play()
      }
      if (this.teclasPresionadas["s"]) {
        this.player[0].irAbajo()
        this.player[0].sprite.play()
      }
      if (this.teclasPresionadas["a"]) {
        this.player[0].irIzquierda()
        this.player[0].sprite.play()
        this.player[0].sprite.scale.x = -1  // Voltear a la izquierda
      }
      if (this.teclasPresionadas["d"]) {
        this.player[0].irDerecha()
        this.player[0].sprite.play()
        this.player[0].sprite.scale.x = 1  // Voltear a la derecha
      }
    }

    // Actualizar el jugador y los obstáculos
    for (let i = 0; i < this.player.length; i++) {
      this.player[i].update()
    }

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].update()
    }
  }


  ponerChaboncitos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.player.push(new Player(Math.random() * 600, Math.random() * 600, this.app, i, this))
    }
  }

  ponerObstaculos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.obstaculos.push(new Obstaculo(Math.random() * 500, Math.random() * 500, this))
    }
  }

  pulsandoTeclas() {
    // Evento al presionar una tecla
    window.addEventListener('keydown', (e) => {
      this.teclasPresionadas[e.key.toLowerCase()] = true  // Marca la tecla como presionada
    })

    // Evento al soltar una tecla
    window.addEventListener('keyup', (e) => {
      this.teclasPresionadas[e.key.toLowerCase()] = false  // Marca la tecla como no presionada
    })
  }

  configurarListenerHitbox() {
    // Escuchar el evento del teclado para la tecla 'H'
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        this.toggleHitboxes()  // Alternar la visibilidad de las hitboxes
      }
    });
  }

  toggleHitboxes() {
    // Alternar la visibilidad de las hitboxes en todos los obstáculos
    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].toggleHitbox()
    }

    // Alternar la visibilidad de la hitbox del jugador
    for (let i = 0; i < this.player.length; i++) {
      this.player[i].toggleHitbox()
    }
  }

}  