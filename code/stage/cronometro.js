// class Cronometro {
//     constructor ( x, y, juego){
//         this.juego = juego
//         this.x = x; // Configurar posición X
//         this.y = y; // Configurar posición Y
//         this.stage = new PIXI.Container(); // Contenedor para la pantalla de inicio

//         this.minutos = 0
//         this.segundos = 0
//         this.contadorDeFrames = 0

//         this.crearTextos()

//     }


//     crearTextos() {
//         const estilo = new PIXI.TextStyle({
//             fontFamily: 'Arial',
//             fontSize: 48,
//             fill: '#ffffff',
//             align: 'center',
//         });
//         // Texto principal
//         this.cronometroMinutos = new PIXI.Text("this.minutos" , estilo);
//         this.cronometroMinutos.anchor.set(0.5);
//         this.cronometroMinutos.x = this.x;
//         this.cronometroMinutos.y = this.y;
//         debugger
//         this.juego.stage.addChild(this.cronometroMinutos);

//         // // Botón "Start"
//         // this.cronometroSeparador = new PIXI.Text(':', estilo);
//         // this.cronometroSeparador.anchor.set(0.5);
//         // this.cronometroSeparador.x = this.x + 20;
//         // this.cronometroSeparador.y = this.y;
//         // this.juego.stage.addChild(this.cronometroSeparador);

//         // // Botón "Help"
//         // this.cronometroSegundos = new PIXI.Text(this.segundos, estilo);
//         // this.cronometroSegundos.anchor.set(0.5);
//         // this.cronometroSegundos.x = this.x + 40;
//         // this.cronometroSegundos.y = this.y;
//         // this.juego.stage.addChild(this.cronometroSegundos);
//     }

//     cronometro(){
//         if(this.contadorDeFrames > 60){
//           this.contadorDeFrames = 0
//           this.segundos +=1
//           }
//         if(this.segundos > 59){
//           this.segundos = 0
//           this.minutos += 1
//         }
//         // console.log("milisegundos: ", this.contadorDeFrames, ", segundos: ", this.segundos, ", minutos: ", this.minutos )
//       }

//       update(){
//         this.contadorDeFrames++
//         this.cronometro()
//       }


// }