class Player {
    constructor(x, y, app, i, juego) {
        this.juego = juego
        this.i = i
        this.app = app
        this.x = x
        this.y = y

        this.velocidadX = 0
        this.velocidadY = 0

        this.aceleracionX = 0
        this.aceleracionY = 0

        this.aceleracionParaCaminar = 3

        this.velMax = 3

        this.listo = false


        this.quieto()

        this.cargarSpriteSheet()
        /*  this.graphics = new PIXI.Graphics()
          .circle(this.x,this.y,10)
          .fill(0xff0000)
  */

        // this.graphics = PIXI.Sprite.from("mage.png")


        /*  const texture = PIXI.Assets.load("./frames/0.png").then(e=>{
           this.sprite = PIXI.Sprite.from(e)

           app.stage.addChild(this.sprite)
           this.listo = true
          })*/


    }

    async cargarSpriteSheet() {
        let json = await PIXI.Assets.load('frames/Player.json')
        this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo']);
        this.sprite.animationSpeed = 0.2
        this.sprite.loop = true
        this.sprite.play()
        this.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5, 1)
        this.listo = true


    }

    ponerCuadrado() {
        this.sprite = new PIXI.Graphics()
            .rect(0, 0, this.ancho, this.alto)
            .fill(getRandomColor());

        this.sprite.pivot.set(this.ancho * 0.5, this.alto)

        this.juego.app.stage.addChild(this.sprite)
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


    detectarColisionesConObstaculos() {
        for (let i = 0; i < this.juego.obstaculos.length; i++) {
            let obs = this.juego.obstaculos[i]
            if (isOverlap(this, obs)) {
                console.log(obs)
                // if (this.x > obs.x + obs.ancho / 2) {
                //     console.log("colision desde la derecha")
                //     this.velocidadX = 0
                // } else if (this.x < obs.x - obs.ancho / 2) {
                //     console.log("izq")
                //     this.velocidadX = 0
                // }

                // if (this.y > obs.y - obs.alto) {
                //     console.log("arriba")
                //     this.llegueAlPiso = true
                //     this.y = obs.y - obs.alto
                //     this.velocidadY = 0

                // } else if (this.y - this.alto < obs.y) {
                //     console.log("abajo")
                // }
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




        this.velocidadX *= 0.9
        this.velocidadY *= 0.9

        // this.sprite.zIndex = this.y
        this.limitarAVelocidaMaxima()
        this.manejarDireccionDelSprite()
        this.detectarColisionesConObstaculos()
        // this.noPasarPorObstaculos()
        this.evaluarLimitesDePantalla()


        this.sprite.x = this.x
        this.sprite.y = this.y
    }

    aplicarAceleracion(x, y) {
        this.aceleracionX = x
        this.aceleracionY = y
    };


    manejarDireccionDelSprite() {
        if (this.velocidadX > 0) {
            this.sprite.scale.x = -1
        } else if (this.velocidadX < 0) {
            this.sprite.scale.x = 1
        }
    }



    // noPasarPorObstaculos() {
    //     for (let i = 0; i < this.juego.obstaculos.length; i++) {
    //         let obs = this.juego.obstaculos[i];
    //         if (this == obs) continue

    //         // console.log(this.y < obs.y - obs.lado && this.velocidadY > 0);

    //         if (
    //             isOverlap(
    //                 { ...this, y: this.y + this.velocidadY, x: this.x + this.velocidadX },
    //                 obs
    //             )
    //         ) {
    //             if (this.y < obs.y - obs.alto && this.velocidadY > 0) {
    //                 console.log("chocando desde arriba");
    //                 this.velocidadY = 0;
    //                 this.llegueAlPiso = true;
    //                 // obs.aceleracionY++
    //             } else if (this.y > obs.y && this.velocidadY < 0) {
    //                 console.log("chocando desde abajo");
    //                 this.velocidadY = 0;
    //                 // obs.aceleracionY--
    //             } else if (this.x < obs.x - obs.ancho / 2 && this.velocidadX > 0) {
    //                 console.log("chocando desde izq");
    //                 obs.velocidadX++
    //                 this.velocidadX = 0;
    //             } else if (this.x > obs.x + obs.ancho / 2 && this.velocidadX < 0) {
    //                 this.velocidadX = 0;
    //                 obs.velocidadX--
    //                 console.log("chocando desde der");
    //             }
    //         }
    //     }
    // }









    evaluarLimitesDePantalla() {
        let margen = 100
        if (this.x > this.juego.ancho - margen) {
            this.velocidadX = 0
            // console.log("limite derecho")
        } else if (this.x < +margen / 10) {
            this.velocidadX = 0
            // console.log("limite izquierdo")
        }
        if (this.y > this.juego.alto - margen / 100) {
            this.velocidadY = 0
            // console.log("limite abajo")
        } else if (this.y < +margen / 10) {
            this.velocidadY = 0
            // console.log("limite arriba")
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

