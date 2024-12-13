class Player {
    constructor(x, y, app, i, juego) {
        this.juego = juego
        this.i = i
        this.app = app
        this.x = x
        this.y = y
        this.teclasPresionadas = {}
        this.grid = juego.grid;

        this.maxAllies = 10; // Máximo número de aliados permitidos
        this.minAlliesToResume = 5; // Mínimo número de aliados para reanudar incremento

        this.ancho = 70
        this.alto = 130

        this.velocidadX = 0
        this.velocidadY = 0

        this.zIndex = 0; // Inicializar el zIndex

        this.incrementoAllyInterval = null;

        this.id = "jugador01"



        this.aceleracionX = 0
        this.aceleracionY = 0

        this.aceleracionParaCaminar = 0.5
        this.velMax = 2

        this.listo = false

        this.crearContenedorPlayer();

        this.quieto()

        this.pulsandoTeclas()

        this.cargarSpriteSheet()

        this.crearHitbox()

        this.setupTeclado()


        this.contadorAlly = 0
    }

    

    crearContenedorPlayer() {
        // Crear un contenedor específico para el jugador
        this.playerContainer = new PIXI.Container();
        this.playerContainer.name = "player"
        this.app.stage.addChild(this.playerContainer);
    }

    async cargarSpriteSheet() {
        let json = await PIXI.Assets.load('frames/Player.json')
        this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo'])
        this.sprite.scale = 0.5
        this.sprite.animationSpeed = 0.2
        this.sprite.loop = true
        this.sprite.play()
        this.playerContainer.addChild(this.sprite);
        this.sprite.anchor.set(0.5, 1)
        this.listo = true
        this.sprite.quienSoy = this

    }

    updateZIndex() {
        this.zIndex = Math.floor(this.y); // Asignar zIndex según la posición Y
    }

    crearHitbox() {
        this.hitbox = new PIXI.Graphics()
            .lineStyle(2, 0xff0000)
            .beginFill(0x00ff00, 0.00000001)
            .drawRect(0, 0, this.ancho, this.alto)
            .endFill()

        this.hitbox.x = this.x - this.ancho / 2
        this.hitbox.y = this.y - this.alto - 30

        this.juego.app.stage.addChild(this.hitbox)

        this.hitbox.visible = false
    }

    toggleHitbox() {
        this.hitbox.visible = !this.hitbox.visible
    }

    isOverlap(hitbox1, hitbox2) {
        return hitbox1.x < hitbox2.x + hitbox2.width &&
            hitbox1.x + hitbox1.width > hitbox2.x &&
            hitbox1.y < hitbox2.y + hitbox2.height &&
            hitbox1.y + hitbox1.height > hitbox2.y
    }


    limitarAVelocidaMaxima() {
        // console.log("llimitar vel")
        if (Math.abs(this.velocidadX) > this.velMax) {
            // console.log("vel mayor a max")
            if (this.velocidadX > 0) {
                // console.log("positiva")
                this.velocidadX = this.velMax
            } else {
                this.velocidadX = -this.velMax
            }
        }

        if (Math.abs(this.velocidadY) > this.velMax) {
            // console.log("vel mayor a max")
            if (this.velocidadY > 0) {
                // console.log("positiva")
                this.velocidadY = this.velMax
            } else {
                this.velocidadY = -this.velMax
            }
        }
    }

    mover() {
        if (this.teclasPresionadas["w"]) {
            this.irArriba()

            this.sprite.play()
        }
        if (this.teclasPresionadas["s"]) {
            this.irAbajo()

            this.sprite.play()
        }
        if (this.teclasPresionadas["a"]) {
            this.irIzquierda()

            this.sprite.play()

        }
        if (this.teclasPresionadas["d"]) {
            this.irDerecha()

            this.sprite.play()

        }
    }

    setupTeclado() {


        window.addEventListener('keydown', (event) => {
            if (event.key == 'k' || event.key == 'K') {
                if (this.contadorAlly > 0) {
                    this.invocarAllyY();
                    this.contadorAlly -= 1;
                } else {
                    console.log("no tienes este aliado")
                }
            }
            if (event.key == 'j' || event.key == 'J') {
                if (this.contadorAlly > 0) {
                    this.invocarAllyB();
                    this.contadorAlly -= 1;
                } else {
                    console.log("no tienes este aliado")
                }
            }
            if (event.key == 'l' || event.key == 'L') {
                if (this.contadorAlly > 0) {
                    this.invocarAllyR();
                    this.contadorAlly -= 1;
                } else {
                    console.log("no tienes este aliado")
                }
            }
           
        });
    }

    // Lógica para invocar un Ally
    invocarAllyY() {
        const nuevoAlly = new Ally(this.x, this.y, this.juego, '../../frames/Ally/AllyY.json', "Yellow");
        nuevoAlly.vivo = true
        this.juego.contenedorPrincipal.addChild(nuevoAlly.allyContainer)
        this.juego.entidades.push(nuevoAlly);
        nuevoAlly.setObjetivo(this.juego.enemigosP[0])
        if(nuevoAlly.vida <=0){
            nuevoAlly.borrar()
        }
    }

    invocarAllyR() {
        const nuevoAlly = new Ally(this.x, this.y, this.juego, '../../frames/Ally/AllyR.json', "Red");
        nuevoAlly.vivo = true
        this.juego.contenedorPrincipal.addChild(nuevoAlly.allyContainer)
        this.juego.entidades.push(nuevoAlly);
        nuevoAlly.setObjetivo(this.juego.enemigosG[0])
        if(nuevoAlly.vida <=0){
            nuevoAlly.borrar()
        }
        // nuevoAlly.moverHaciaObjetivo()
    }

    invocarAllyB() {
        const nuevoAlly = new Ally(this.x, this.y, this.juego, '../../frames/Ally/AllyB.json', );
        nuevoAlly.vivo = true
        this.juego.contenedorPrincipal.addChild(nuevoAlly.allyContainer)
        this.juego.entidades.push(nuevoAlly);
        nuevoAlly.setObjetivo(this.juego.enemigosO[0])
        if(nuevoAlly.vida <=0){
            nuevoAlly.borrar()
        }
        // nuevoAlly.moverHaciaObjetivo()
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




    update(time) {
        if (!this.listo) return
        this.mover()
        this.time = time

     

        this.velocidadX += this.aceleracionX
        this.velocidadY += this.aceleracionY

        this.aceleracionX = 0
        this.aceleracionY = 0

        this.x += this.velocidadX
        this.y += this.velocidadY

        this.velocidadX *= 0.7
        this.velocidadY *= 0.7

        this.updateZIndex();
        this.actualizarPosicionEnGrid();

        // this.detectarColisionesConObstaculos()
        this.limitarAVelocidaMaxima()
        this.manejarDireccionDelSprite()

        this.sprite.x = this.x
        this.sprite.y = this.y

        this.hitbox.x = this.x - this.ancho / 2
        this.hitbox.y = this.y - this.alto - 30
    }

    actualizarPosicionEnGrid() {
        this.grid.update(this.sprite);
    }

    mirarAlrededor() {
        this.vecinos = this.obtenerVecinos();
        this.celdasVecinas = this.miCeldaActual.obtenerCeldasVecinas();
        console.log(this.vecinos)
      }

    aplicarAceleracion(x, y) {
        this.aceleracionX = x
        this.aceleracionY = y
    }


    manejarDireccionDelSprite() {
        if (this.velocidadX > 0) {
            this.sprite.scale.x = -0.5
        } else if (this.velocidadX < 0) {
            this.sprite.scale.x = 0.5
        }
    }


    irIzquierda() {
        this.aceleracionX = -this.aceleracionParaCaminar
    }

    irDerecha() {
        this.aceleracionX = this.aceleracionParaCaminar
    }

    irArriba() {
        this.aceleracionY = -this.aceleracionParaCaminar
    }

    irAbajo() {
        this.aceleracionY = this.aceleracionParaCaminar
    }

    quieto() {
        this.velocidadX = 0
        this.velocidadY = 0
    }


    incrementarAlly() {
        if (this.contadorAlly < this.maxAllies) {
          this.contadorAlly++;
          console.log(`Aliado creado. Total de aliados: ${this.contadorAlly}`);
        } else {
          console.log("Límite máximo de aliados alcanzado. Esperando para reanudar...");
        }
       }
    
      // Función para iniciar el incremento periódico del contador
      iniciarIncrementoAlly(tiempo) {
        if (this.incrementoInterval) {
          console.warn("El incremento ya está activo.");
          return;
        }
    
        this.incrementoInterval = setInterval(() => {
          if (this.contadorAlly < this.maxAllies) {
            this.incrementarAlly();
          } else if (this.contadorAlly <= this.minAlliesToResume) {
            console.log("Número de aliados por debajo del umbral. Reanudando creación...");
            this.incrementarAlly();
          }
        }, tiempo);
    
        console.log("Incremento de aliados iniciado.");
      }
        
      // Función para detener el incremento periódico del contador
      detenerIncrementoAlly() {
        if (this.incrementoAllyInterval) {
          clearInterval(this.incrementoAllyInterval);
          this.incrementoAllyInterval = null;
          console.log("Incremento periódico de aliados detenido.");
        } else {
          console.warn("No hay incremento de aliados en curso para detener.");
        }
      }



}




