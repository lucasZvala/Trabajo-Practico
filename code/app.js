class Juego {
   constructor() {
      this.obstaculos = []
      this.player = []
      this.app = new PIXI.Application();
      this.contadorDeFrames = 0;

      this.alto = 720
      this.ancho = 1280



      // Intialize the application.
      let promesa = this.app.init({ width: this.ancho, height: this.alto })

      promesa.then(e => {
         document.body.appendChild(this.app.canvas);

         globalThis.__PIXI_APP__ = this.app;

         this.app.ticker.add(() => {
            this.gameLoop()
         })

         this.ponerCahboncitos(1)
         this.ponerObstaculos(2)
      })

      this.listeners()

   }
   gameLoop(time) {
      this.time = time

      this.contadorDeFrames++


      for (let i = 0; i < this.player.length; i++) {
         this.player[i].update(time)
      }

      for (let i = 0; i < this.obstaculos.length; i++) {
         this.obstaculos[i].update(time)
     }

   }

   

   ponerCahboncitos(cantidad) {
      for (let i = 0; i < cantidad; i++) {
         this.player.push(new Player(Math.random() * 600, Math.random() * 600, this.app, i, this))
      }
   }

ponerObstaculos(cantidad) {
      for (let i = 0; i < cantidad; i++) {
          this.obstaculos.push(new Obstaculo(Math.random() * 500, Math.random() * 500,  this))
      }
   }
   
   listeners() {
      window.onkeydown = (e) => {
         
         // console.log(e)
         if (e.key == "w") {
            this.player[0].irArriba()
           this.player[0].sprite.play()
         } else if (e.key == "s") {
            this.player[0].irAbajo()
            this.player[0].sprite.play()
         } else if (e.key == "a") {
            this.player[0].irIzquierda()
            this.player[0].sprite.play()
            if (this.player[0].velocidadX < 0) {
               this.player[0].sprite.scale.x = -1
            }
         } else if (e.key == "d") {
            this.player[0].irDerecha()
            this.player[0].sprite.play()
            if (this.player[0].velocidadX > 0) {
               this.player[0].sprite.scale.x = 1
            }
         } else if(e.key == " "){
            console.log("interactuar")
         }
      }

      // window.onkeyup = (e) => {
      //    this.player[0].quieto()
      //    this.player[0].sprite.stop()
      // }
   }


}