class Obstaculo {


    constructor(x, y, juego) {
        this.juego = juego


        this.x = x
        this.y = this.juego.alto - 50

        this.alto = 50 + Math.random() * 50
        this.ancho = 50 + Math.random() * 50

        this.ponerCuadrado()

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

     ponerCuadrado() {
        this.sprite = new PIXI.Graphics()
            .rect(0, 0, this.ancho, this.alto)
            .fill(getRandomColor());

        this.sprite.pivot.set(this.ancho * 0.5, this.alto)

        this.juego.app.stage.addChild(this.sprite)
    }
   
  


    update(time) {
        // if (!this.listo) return


        this.time = time

        // this.agregarGravedad()


        //ACELERACION
        this.velocidadX += this.aceleracionX
        this.velocidadY += this.aceleracionY


       


        
       

        // this.noPasarPorObstaculos()


        

        this.sprite.x = this.x
        this.sprite.y = this.y

    }
}