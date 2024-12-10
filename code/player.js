class Player {
    constructor(x, y, app, i, juego) {
        this.juego = juego
        this.i = i
        this.app = app
        this.x = x
        this.y = y
        this.teclasPresionadas = {}
        this.grid = juego.grid;

        this.ancho = 70
        this.alto = 130

        this.velocidadX = 0
        this.velocidadY = 0

        this.zIndex = 0; // Inicializar el zIndex

        

        

        this.aceleracionX = 0
        this.aceleracionY = 0

        this.aceleracionParaCaminar = 0.5
        this.velMax = 2

        this.listo = false

        this.quieto()

        this.pulsandoTeclas()

        this.cargarSpriteSheet()

        this.crearHitbox()

        this.setupTeclado()
        

        this.allyYCounter= 0
        this.allyRCounter= 0
        this.allyBCounter= 0
    }

    async cargarSpriteSheet() {
        let json = await PIXI.Assets.load('frames/Player.json')
        this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo'])
        this.sprite.scale = 0.5
        this.sprite.animationSpeed = 0.2
        this.sprite.loop = true
        this.sprite.play()
        this.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5, 1)
        this.listo = true
        
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

    // detectarColisionesConObstaculos() {
    //     for (let i = 0; i < this.juego.cristales.length; i++) {
    //         let obs = this.juego.cristales[i]
    
    //         // Verificar si hay superposición entre la hitbox del jugador y la del obstáculo
    //         if (this.isOverlap(this.hitbox, obs.hitbox)) {
    //           //  console.log("Colisión detectada con obstáculo", obs)
    
    //             // Calcular el centro de ambas hitboxes
    //             const centroJugadorX = this.hitbox.x + this.hitbox.width / 2
    //             const centroJugadorY = this.hitbox.y + this.hitbox.height / 2
    //             const centroObstaculoX = obs.hitbox.x + obs.hitbox.width / 2
    //             const centroObstaculoY = obs.hitbox.y + obs.hitbox.height / 2
    
    //             // Determinar la dirección de la colisión y establecer la velocidad a 0 en esa dirección
    //             if (centroJugadorX < centroObstaculoX) {
    //                 // Colisión desde la izquierda
    //                 this.velocidadX = Math.min(this.velocidadX, 0)
    //             } else if (centroJugadorX > centroObstaculoX) {
    //                 // Colisión desde la derecha
    //                 this.velocidadX = Math.max(this.velocidadX, 0)
    //             }
    
    //             if (centroJugadorY < centroObstaculoY) {
    //                 // Colisión desde arriba
    //                 this.velocidadY = Math.min(this.velocidadY, 0)
    //             } else if (centroJugadorY > centroObstaculoY) {
    //                 // Colisión desde abajo
    //                 this.velocidadY = Math.max(this.velocidadY, 0)
    //             }
    //         }
    //     }
    // }
    
    counterY(){
        this.allyYCounter +=1
    }

    counterB(){
        this.allyBCounter +=1
    }

    counterR(){
        this.allyRCounter +=1
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
                if(this.allyYCounter > 0){
                this.invocarAllyY();
                this.allyYCounter -= 1;
            }else{
                console.log("no tienes este aliado")
            }
            }
            if (event.key == 'j' || event.key == 'J') {
                if(this.allyBCounter > 0){
                this.invocarAllyB();
                this.allyBCounter -= 1;
            }else{
                console.log("no tienes este aliado")
            }
            }
            if (event.key == 'l' || event.key == 'L') {
                if(this.allyRCounter > 0){
                this.invocarAllyR();
                this.allyRCounter -= 1;
            }else{
                console.log("no tienes este aliado")
            }
            }
            if (event.key == 'u' || event.key == 'U') {
               this.counterY()
                console.log("contador aliado amarillo agregado")
            
            }
            if (event.key == 'i' || event.key == 'I') {
               this.counterB()
               console.log("contador aliado Azul agregado")
           
            }
            if (event.key == 'o' || event.key == 'O') {
                
                this.counterR();
                console.log("contador aliado Rojo agregado")
           
            }
        });
    }

    // Lógica para invocar un Ally
    invocarAllyY() {
        const nuevoAlly = new Ally(this.x, this.y, this.juego, '../../frames/Ally/AllyY.json');
        this.juego.entidades.push(nuevoAlly);
        // nuevoAlly.setObjetivo(nuevoAlly.buscarEnemigoCercano("orange"))
        this.allyYCounter -=1
        console.log('Ally invocado en la posición del Player:', this.x, this.y);
        this.juego.allyY += 1
        // nuevoAlly.moverHaciaObjetivo()
    }

    invocarAllyR() {
        const nuevoAlly = new Ally(this.x, this.y, this.juego, '../../frames/Ally/AllyR.json');
        this.juego.entidades.push(nuevoAlly);
        // nuevoAlly.setObjetivo(nuevoAlly.buscarEnemigoCercano("orange"))
        this.allyYCounter -=1
        console.log('Ally invocado en la posición del Player:', this.x, this.y);
        this.juego.allyR += 1
        // nuevoAlly.moverHaciaObjetivo()
    }

    invocarAllyB() {
        const nuevoAlly = new Ally(this.x, this.y, this.juego, '../../frames/Ally/AllyB.json');
        this.juego.entidades.push(nuevoAlly);
        // nuevoAlly.setObjetivo(nuevoAlly.buscarEnemigoCercano("orange"))
        this.allyYCounter -=1
        console.log('Ally invocado en la posición del Player:', this.x, this.y);
        this.juego.allyB += 1
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

        // this.detectarColisionesConObstaculos()
        this.limitarAVelocidaMaxima()
        this.manejarDireccionDelSprite()

        this.sprite.x = this.x
        this.sprite.y = this.y

        this.hitbox.x = this.x - this.ancho / 2
        this.hitbox.y = this.y - this.alto - 30
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
}




    