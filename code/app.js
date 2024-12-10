class Juego {
  constructor() {
    this.player = null;
    this.app = new PIXI.Application()
    this.cristales = []
    this.contadorDeFrames = 0
    this.entidades = []
    this.enemigos = []
    this.torres = []
    this.alto = 720 *3
    this.ancho = 1280 *3
    this.juegoActivo = false;

    this.enemies = 0
    this.allyY = 0
    this.allyB = 0
    this.allyR = 0

    this.grid = new Grid(50, this); // Tamaño de celda 50
    this.gridActualizacionIntervalo = 10; // Cada 10 frames

    this.segundos = 0
    this.minutos = 0
    // this.horas = 0


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

   

    this.configurarListenerHitbox()
    this.app.stage.interactive = true; // Habilitar interactividad en el escenario
    this.app.stage.on("pointerdown", this.manejarClick.bind(this));

  }

  manejarClick(event) {
    const coords = event.data.global; // Obtiene las coordenadas globales del clic
    console.log(`Coordenadas del clic: X=${coords.x}, Y=${coords.y}`);
}

  iniciarJuego() {
    // Activar el juego después de la pantalla de inicio
    this.juegoActivo = true;

    // Inicializar el juego
    this.cargarFondo();
    this.crearHUD()
    this.crearCristal();
    this.crearTorres()
    this.crearPausa()
    this.hudCounter()

    this.inicializarPlayer();
 

    
    this.inicializarSpawnerEnemigo();
    // this.inicializarSpawnerAliado();

    // Configurar el bucle principal
    this.app.ticker.add(() => this.gameLoop());
}


inicializarPlayer() {
  // Crear al jugador en el centro de la pantalla
  this.player = new Player(this.ancho / 2, this.alto / 2, this.app, 0, this);
}


inicializarSpawnerEnemigo(){
  this.inicializarSpawnerEnemigoO()
  this.inicializarSpawnerEnemigoG()
  // this.inicializarSpawnerEnemigoP()
}


crearPausa(){
  const pause = new PauseButton(85,690, this, "../frames/hud/pause.json");
  console.log("pausa creada")
  this.cristales.push(pause);
}


inicializarSpawnerEnemigoO() {
  // Crear un spawner para enemigos
  const spawnerEnemy = new Spawner(this, 2200, { x: 1280, y: 720 }, 1, () => {
      const enemy = new Enemy(200, 200, this, "../../frames/enemy/EnemyO.json", "orange");
      
      enemy.setObjetivo({ x: 1200, y: 600 });
      this.enemigos.push(enemy);
  }, 2);

  this.enemies += 1
  spawnerEnemy.iniciar();
}

inicializarSpawnerEnemigoP() {
  // Crear un spawner para enemigos
  const spawnerEnemy = new Spawner(this, 3000, { x: 1280, y: 720 }, 1, () => {
      const enemy = new Enemy(200, 200, this, "../../frames/enemy/EnemyP.json");
      enemy.setObjetivo({ x: 1200, y: 600 });
      this.enemigos.push(enemy);
  }, 2, "purple");

  this.enemies += 1
  spawnerEnemy.iniciar();
}


inicializarSpawnerEnemigoG() {
  // Crear un spawner para enemigos
  const spawnerEnemy = new Spawner(this, 2200, { x: 1280, y: 720 }, 1, () => {
      const enemy = new Enemy(200, 200, this, "../../frames/enemy/EnemyG.json", "green");
      enemy.setObjetivo({ x: 1200, y: 5 });
      this.enemigos.push(enemy);
  }, 2, "green");

  this.enemies += 1
  spawnerEnemy.iniciar();
}




  ponerListeners(){
    window.onmousemove = (e) => {
      this.mouse = {x:e.x, y:e.y};
    }
  }


  
  cargarFondo() {
    this.background = new Background(this, 'frames/background/background.png'); // Ruta del SpriteSheet
}

  crearHUD(){
    this.hud = new HUD(this, "../frames/hud/HUD_base.png", this.ancho, this.alto);
  }

crearCristalB() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Cristal(200, 300, this, "../../frames/cristales/cristalB.json");
      console.log("cristalB creado")
      this.cristales.push(base); // Añade el cristal a la lista
 
}

crearCristalY() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Cristal(800, 300, this, "../../frames/cristales/cristalY.json");
      console.log("cristalY creado")
      this.cristales.push(base); // Añade el cristal a la lista
 
}

crearCristalR() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Cristal(1200, 300, this, "../../frames/cristales/cristalR.json");
      console.log("cristalR creado")
      this.cristales.push(base); // Añade el cristal a la lista
 
}

crearCristal(){
  this.crearCristalB()
  this.crearCristalR()
  this.crearCristalY()
}

crearTorreB() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Torre(200, 500, this, "../../frames/torres/torreB.json");
      console.log("cristalB creado")
      this.torres.push(base); // Añade el cristal a la lista
 
}

crearTorreY() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Torre(800, 500, this, "../../frames/torres/torreY.json");
      console.log("cristalY creado")
      this.torres.push(base); // Añade el cristal a la lista
 
}

crearTorreR() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Torre(1200, 500, this, "../../frames/torres/torreR.json");
      console.log("cristalR creado")
      this.torres.push(base); // Añade el cristal a la lista
 
}

crearTorres(){
  this.crearTorreB()
  this.crearTorreR()
  this.crearTorreY()
}

// cronometro(){
//   const cronometro = new Cronometro(1200, 700, this);
// }


  gameLoop() {
     this.contadorDeFrames++
    // this.cronometro()

    
    // this.hudCounter()

     if (this.player) {
      this.player.update();
  }
    for(let entidad of this.entidades){
      entidad.update()
      entidad.render()
    }
    
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

  moverCamara() {
    let lerpFactor = 0.05;
    // Obtener la posición del protagonista
    const playerX = this.player.container.x;
    const playerY = this.player.container.y;

    // Calcular la posición objetivo del stage para centrar al protagonista
    const halfScreenWidth = this.app.screen.width / 2;
    const halfScreenHeight = this.app.screen.height / 2;

    const targetX = halfScreenWidth - playerX;
    const targetY = halfScreenHeight - playerY;

    // Aplicar el límite de 0,0 y canvasWidth, canvasHeight
    const clampedX = Math.min(
      Math.max(targetX, -(this.canvasWidth - this.app.screen.width)),
      0
    );
    const clampedY = Math.min(
      Math.max(targetY, -(this.canvasHeight - this.app.screen.height)),
      0
    );

    // Aplicar Lerp para suavizar el movimiento de la cámara
    this.app.stage.position.x = lerp(
      this.app.stage.position.x,
      clampedX,
      lerpFactor
    );
    this.app.stage.position.y = lerp(
      this.app.stage.position.y,
      clampedY,
      lerpFactor
    );
  }

 

  hudCounter(){
    const hudCounter = new Counter(200, 500, this, "../../frames/hud/enemyCounter.png");
      console.log("counter creado")
      this.cristales.push(hudCounter);

      // if(this.enemies > 0){
      //   hudCounter.sprite.alpha = 0.0
      // } else {
      //   hudCounter.sprite.alpha = 1.0
      // }
  }
  
}