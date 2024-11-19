class Juego {
  constructor() {
    this.obstaculos = []
    this.player = null;
    this.app = new PIXI.Application()
    this.cristales = []
    this.contadorDeFrames = 0
    this.teclasPresionadas = {}
    this.entidades = []
    this.alto = 720
    this.ancho = 1280
    this.juegoActivo = false;


    // Intialize the application.
    let promesa = this.app.init({ width: this.ancho, height: this.alto })

    this.ponerListeners()

    this.background = null;

    promesa.then(e => {
      document.body.appendChild(this.app.canvas)

      globalThis.__PIXI_APP__ = this.app

      const pantallaInicio = new PantallaDeInicio(this.app, () => {
        this.iniciarJuego();
    });
    pantallaInicio.mostrar();

    // Configurar eventos del mouse
    this.ponerListeners();
    })

    this.pulsandoTeclas()

    this.configurarListenerHitbox()

  }

  iniciarJuego() {
    // Activar el juego después de la pantalla de inicio
    this.juegoActivo = true;

    // Inicializar el juego
    this.cargarFondo();
    this.crearCristales();

    this.inicializarPlayer();
    this.ponerObstaculos(3);

    
    this.inicializarSpawner();

    // Configurar el bucle principal
    this.app.ticker.add(() => this.gameLoop());
}


inicializarPlayer() {
  // Crear al jugador en el centro de la pantalla
  this.player = new Player(this.ancho / 2, this.alto / 2, this.app, 0, this);
}

inicializarSpawner() {
  // Crear un spawner para enemigos
  const spawner = new Spawner(this, 5000, { x: 1280, y: 720 }, 1, () => {
      const enemy = new Enemy(200, 200, this);
      enemy.setPuntos({ x: 200, y: 200 }, { x: 600, y: 300 });
      this.entidades.push(enemy);
  });

  spawner.iniciar();
}

  ponerListeners(){
    window.onmousemove = (e) => {
      this.mouse = {x:e.x, y:e.y};
    }
  }


  
  cargarFondo() {
    this.background = new Background(this, 'frames/background/background.png'); // Ruta del SpriteSheet
}

crearCristales() {
  // Crea algunos cristales en ubicaciones predefinidas
  const posiciones = [
      { x: 100, y: 150 },
      { x: 300, y: 400 },
      { x: 500, y: 200 },
  ];

  for (let pos of posiciones) {
      const cristal = new Cristal(pos.x, pos.y, this.app);
      this.cristales.push(cristal); // Añade el cristal a la lista
  }
}


  gameLoop() {
     this.contadorDeFrames++

     if (this.player) {
      this.player.update();
  }
    for(let entidad of this.entidades){
      entidad.update()
      entidad.render()
    }
    


    // Verificar el estado de las teclas para movimiento continuo
    if (this.teclasPresionadas["w"] && this.teclasPresionadas["a"]) {
      this.player.irArriba() 
      this.player.sprite.scale.x = -0,5  // Voltear a la izquierda
      this.player.irIzquierda()
      this.player.sprite.play()
     
    } else if (this.teclasPresionadas["w"] && this.teclasPresionadas["d"]) {
      this.player.irArriba()
      this.player.sprite.scale.x = 0,5  // Voltear a la derecha
      this.player.irDerecha()
      this.player.sprite.play()
      
    } else if (this.teclasPresionadas["s"] && this.teclasPresionadas["a"]) {
      this.player.irAbajo()
      this.player.sprite.scale.x = -0,5  // Voltear a la izquierda
      this.player.irIzquierda()
      this.player.sprite.play()
      
    } else if (this.teclasPresionadas["s"] && this.teclasPresionadas["d"]) {
      this.player.irAbajo()
      this.player.sprite.scale.x = 0,5  // Voltear a la derecha
      this.player.irDerecha()
      this.player.sprite.play()
      
    } else {
      // Movimientos individuales
      if (this.teclasPresionadas["w"]) {
        this.player.irArriba()
        this.player.sprite.play()
      }
      if (this.teclasPresionadas["s"]) {
        this.player.irAbajo()
        this.player.sprite.play()
      }
      if (this.teclasPresionadas["a"]) {
        this.player.irIzquierda()
        this.player.sprite.scale.x = -0,5  // Voltear a la izquierda
        this.player.sprite.play()
        
      }
      if (this.teclasPresionadas["d"]) {
        this.player.irDerecha()
        this.player.sprite.scale.x = 0,5  // Voltear a la derecha
        this.player.sprite.play()
       
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

  agregarEnemy(x,y){
      this.entidades.push(new Enemy(x, y, this));
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