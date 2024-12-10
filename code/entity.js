class Entidad {
    constructor(x, y, juego) {
        this.container = new PIXI.Container();
        this.juego = juego;
        this.juego.app.stage.addChild(this.container);

        this.id = generarID();
        this.grid = juego.grid;

        this.x = x;
        this.y = y;
        this.velocidad = { x: 0, y: 0 };
        this.aceleracion = { x: 0, y: 0 };

        this.zIndex = 0; // Inicializar el zIndex

        this.velocidadMax = 5;
        this.aceleracionMax = 1;
    }

    mensaje() {
        console.log("hola");
    }

    updateZIndex() {
        this.zIndex = Math.floor(this.y); // Asignar zIndex según la posición Y
    }

    borrar() {
        this.juego.app.stage.removeChild(this.container);
        if (this instanceof Enemy) {
          this.juego.enemigos = this.juego.enemigos.filter((k) => k != this);
        } else if (this instanceof Ally) {
          this.juego.entidades = this.juego.entidades.filter((k) => k != this);
        }
    
        this.grid.remove(this);
      }
    
      obtenerVecinos() {
        let vecinos = [];
        const cellSize = this.grid.cellSize;
        const xIndex = Math.floor(this.container.x / cellSize);
        const yIndex = Math.floor(this.container.y / cellSize);
        const margen = 1;
        // Revisar celdas adyacentes
        for (let i = -margen; i <= margen; i++) {
          for (let j = -margen; j <= margen; j++) {
            const cell = this.grid.getCell(xIndex + i, yIndex + j);
    
            if (cell) {
              vecinos = [
                ...vecinos,
                ...Object.values(cell.objetosAca).filter(
                  (k) => k != this && !k.decorado
                ),
              ];
            }
          }
        }
        return vecinos;
      }
      estoyEnLaMismaCeldaQue(fulano) {
        return (
          fulano.miCeldaActual &&
          this.miCeldaActual &&
          fulano.miCeldaActual == this.miCeldaActual
        );
      }

    update() {
        this.velocidad.x = this.aceleracion.x;
        this.velocidad.y = this.aceleracion.y;

        this.aceleracion.x = 0;
        this.aceleracion.y = 0;

        this.actualizarZIndex();
        this.actualizarPosicionEnGrid();

        this.x += this.velocidad.x;
        this.y += this.velocidad.y;
    }

    render() {
        this.container.x = this.x;
        this.container.y = this.y;
    }

    actualizarPosicionEnGrid() {
        this.grid.update(this);
      }
    
      actualizarZIndex() {
        this.container.zIndex = Math.floor(this.container.y);
      }

      mirarAlrededor() {
        this.vecinos = this.obtenerVecinos();
        this.celdasVecinas = this.miCeldaActual.obtenerCeldasVecinas();
        console.log(this.vecinos)
      }

    }

