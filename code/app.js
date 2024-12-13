class Juego {
  constructor() {
    this.player = null;
    this.app = new PIXI.Application()
    this.cristales = []
    this.contadorDeFrames = 0
    this.entidades = []
    this.enemigosO = []
    this.enemigosG = []
    this.enemigosP = []
    this.torres = []
    this.torresVivas = 0

    this.alto = 720 
    this.ancho = 1280 
    this.juegoActivo = false;

    this.enemies = 0
    this.allyY = 0
    this.allyB = 0
    this.allyR = 0

    this.grid = new Grid(50, this); // Tamaño de celda 50
    this.gridActualizacionIntervalo = 10; // Cada 10 frames


   // Crear los contenedores
   this.contenedorPrincipal = new PIXI.Container();
   this.elementosContainer = new PIXI.Container();
   this.spawnerContainer = new PIXI.Container();
   this.sceneContainer = new PIXI.Container();

     // Agregar los contenedores al escenario
     this.app.stage.addChild(this.contenedorPrincipal);
     
     this.app.stage.addChild(this.elementosContainer);
     this.app.stage.addChild(this.spawnerContainer);
      this.contenedorPrincipal.addChild(this.sceneContainer);
    

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
  this.player = new Player(this.background.backgroundWidthShow()/ 2, this.background.backgroundHeigthShow() / 2, this.app, 0, this);
  this.contenedorPrincipal.addChild(this.player.playerContainer);
  this.player.iniciarIncrementoAlly(2000)
}

finalizarJuego() {
  this.juegoActivo = false;
  this.app.ticker.stop();

  // Limpiar la pantalla
  this.app.stage.removeChildren();

  // Mostrar la pantalla de "Game Over"
  const pantallaGameOver = new PantallaGameOver(this.app, this.ancho, this.alto, this.tiempoInicio);
  pantallaGameOver.mostrar();
}



inicializarSpawnerEnemigo(){
  this.inicializarSpawnerEnemigoO()
  this.inicializarSpawnerEnemigoG()
  this.inicializarSpawnerEnemigoP()
}


crearPausa(){
  const pause = new PauseButton(85,690, this, "../frames/hud/pause.json");
  console.log("pausa creada")
  this.cristales.push(pause);
}


inicializarSpawnerEnemigoO() {
  // Crear un spawner para enemigos
  const spawnerEnemy = new Spawner(this, 2500, { x: 3245, y: 1060 }, 1, () => {
      const enemy = new Enemy(3245, 1060, this, "../../frames/enemy/EnemyO.json");
      enemy.vivo =true
      enemy.setObjetivo(this.torres[0]);
      this.enemigosO.push(enemy);
      this.contenedorPrincipal.addChild(enemy.enemyContainer);
  }, 200, "orange");

  this.enemies += 1
  spawnerEnemy.iniciar();
}

inicializarSpawnerEnemigoP() {
  // Crear un spawner para enemigos
  const spawnerEnemy = new Spawner(this, 2500, { x: 3873, y: 1960 }, 1, () => {
      const enemy = new Enemy(3873, 1960, this, "../../frames/enemy/EnemyP.json");
      enemy.vivo =true
      enemy.setObjetivo(this.torres[2]);
      this.enemigosP.push(enemy);
      this.contenedorPrincipal.addChild(enemy.enemyContainer);
  }, 200, "purple");

  this.enemies += 1
  spawnerEnemy.iniciar();
}


inicializarSpawnerEnemigoG() {
  // Crear un spawner para enemigos
  const spawnerEnemy = new Spawner(this, 2500, { x: 2723, y: 2075 }, 1, () => {
      const enemy = new Enemy(2723, 2075, this, "../../frames/enemy/EnemyG.json", "green");
      enemy.vivo =true
      enemy.setObjetivo(this.torres[1]);
      this.enemigosG.push(enemy);
       this.contenedorPrincipal.addChild(enemy.enemyContainer);
  }, 200, "green");

  this.enemies += 1
  spawnerEnemy.iniciar();
}

 chequearYEliminar(lista, condicion) {
  for (let i = lista.length - 1; i >= 0; i--) {
      if (condicion(lista[i])) {
          console.log(`Eliminando elemento con ID: ${lista[i].id}`);
          lista.splice(i, 1); // Elimina el elemento en la posición i
      }
  }
}

chequearYEliminarTorres(lista, condicion) {
  for (let i = lista.length - 1; i >= 0; i--) {
      if (condicion(lista[i])) {
          console.log(`Eliminando elemento con ID: ${lista[i].id}`);
          lista.splice(i, 1); // Elimina el elemento en la posición i
          this.torresVivas -=1
      }
  }
}




  ponerListeners(){
    window.onmousemove = (e) => {
      this.mouse = {x:e.x, y:e.y};
    }
  }


  
  cargarFondo() {
    this.background = new Background(this, 'frames/background/background.png'); // Ruta del SpriteSheet
    this.sceneContainer.addChild(this.background.backgroundContainer)
    
}



  crearHUD(){
    this.hud = new HUD(this, "../frames/hud/HUD_base.png", this.ancho, this.alto);
  }

crearCristalB() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Cristal(3200,2275, this, "../../frames/cristales/cristalB.json");
      this.cristales.push(base); // Añade el cristal a la lista
      this.sceneContainer.addChild(base.cristalContainer)
 
}

crearCristalY() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Cristal(2723,1600, this, "../../frames/cristales/cristalY.json");
      this.cristales.push(base); // Añade el cristal a la lista
      this.sceneContainer.addChild(base.cristalContainer)
 
}

crearCristalR() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const base = new Cristal(3677,1600, this, "../../frames/cristales/cristalR.json");
      this.cristales.push(base); // Añade el cristal a la lista
      this.sceneContainer.addChild(base.cristalContainer)
 
}



crearCristal(){
  this.crearCristalB()
  this.crearCristalR()
  this.crearCristalY()
}

crearTorreB() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const torreB = new Torre(3200,2200, this, "../../frames/torres/torreB.json");
      this.torres.push(torreB); // Añade el cristal a la lista
      this.sceneContainer.addChild(torreB.torreContainer)
      this.torresVivas +=1
 
}

crearTorreY() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const torreY = new Torre(2723,1525, this, "../../frames/torres/torreY.json");
     
      this.torres.push(torreY); // Añade el cristal a la lista
      this.sceneContainer.addChild(torreY.torreContainer)
      this.torresVivas +=1
 
}

crearTorreR() {
  // Crea algunos cristales en ubicaciones predefinidas
 
      const torreR = new Torre(3677,1525, this, "../../frames/torres/torreR.json");
      this.torres.push(torreR); // Añade el cristal a la lista
      this.sceneContainer.addChild(torreR.torreContainer)
      this.torresVivas +=1
 
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
    this.moverCamara()
    // this.hudCounter()

     if (this.player) {
      this.player.update();
  }
  
  

  this.chequearYEliminar(this.enemigosP,(enemigos) => enemigos.vida <=0 )
  this.chequearYEliminar(this.enemigosO,(enemigos) => enemigos.vida <=0 )
  this.chequearYEliminar(this.enemigosG,(enemigos) => enemigos.vida <=0 )
  this.chequearYEliminar(this.entidades,(entidad) => entidad.vida <=0 )
  this.chequearYEliminarTorres(this.torres,(torre) => torre.vida <=0 )


  

  
  if (this.torresVivas < 2){
    this.finalizarJuego();
    return;
  }
  


    for(let entidad of this.entidades){
      entidad.update()
      entidad.render()
    }

    for(let enemyP of this.enemigosP){
      enemyP.update()
      enemyP.render()
    }

    for(let enemyG of this.enemigosG){
      enemyG.update()
      enemyG.render()
    }

    for(let enemyO of this.enemigosO){
      enemyO.update()
      enemyO.render()
    }

    for(let torre of this.torres){
      torre.update()
      torre.render()
    }

    for(let cristal of this.cristales){
      cristal.update()
      cristal.render()
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
    this.contenedorPrincipal.x = -this.player.x + this.ancho/2
    this.contenedorPrincipal.y = -this.player.y + this.alto/2
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