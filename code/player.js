class Player {
    constructor(x, y, app, i, juego) {
        this.juego = juego
        this.i = i
        this.app = app
        this.x = x
        this.y = y

        this.ancho = 70
        this.alto = 130

        this.velocidadX = 0
        this.velocidadY = 0

        this.aceleracionX = 0
        this.aceleracionY = 0

        this.aceleracionParaCaminar = 0.5
        this.velMax = 2

        this.listo = false

        this.quieto()

        this.cargarSpriteSheet()

        this.crearHitbox()
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

    detectarColisionesConObstaculos() {
        for (let i = 0; i < this.juego.obstaculos.length; i++) {
            let obs = this.juego.obstaculos[i]
    
            // Verificar si hay superposición entre la hitbox del jugador y la del obstáculo
            if (this.isOverlap(this.hitbox, obs.hitbox)) {
              //  console.log("Colisión detectada con obstáculo", obs)
    
                // Calcular el centro de ambas hitboxes
                const centroJugadorX = this.hitbox.x + this.hitbox.width / 2
                const centroJugadorY = this.hitbox.y + this.hitbox.height / 2
                const centroObstaculoX = obs.hitbox.x + obs.hitbox.width / 2
                const centroObstaculoY = obs.hitbox.y + obs.hitbox.height / 2
    
                // Determinar la dirección de la colisión y establecer la velocidad a 0 en esa dirección
                if (centroJugadorX < centroObstaculoX) {
                    // Colisión desde la izquierda
                    this.velocidadX = Math.min(this.velocidadX, 0)
                } else if (centroJugadorX > centroObstaculoX) {
                    // Colisión desde la derecha
                    this.velocidadX = Math.max(this.velocidadX, 0)
                }
    
                if (centroJugadorY < centroObstaculoY) {
                    // Colisión desde arriba
                    this.velocidadY = Math.min(this.velocidadY, 0)
                } else if (centroJugadorY > centroObstaculoY) {
                    // Colisión desde abajo
                    this.velocidadY = Math.max(this.velocidadY, 0)
                }
            }
        }
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


    update(time) {
        if (!this.listo) return

        this.time = time

        this.velocidadX += this.aceleracionX
        this.velocidadY += this.aceleracionY

        this.aceleracionX = 0
        this.aceleracionY = 0

        this.x += this.velocidadX
        this.y += this.velocidadY

        this.velocidadX *= 0.7
        this.velocidadY *= 0.7

        this.detectarColisionesConObstaculos()
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




    