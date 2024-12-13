class Grid {
    constructor(cellSize, juego) {
      this.juego = juego;
      this.app = juego.app;
      this.cellSize = cellSize;
      this.numColumns = Math.ceil(this.juego.ancho / cellSize);
      this.numRows = Math.ceil(this.juego.alto / cellSize);
  
      // Crear una matriz de celdas vacías
      this.cells = [];
      for (let x = 0; x < this.numColumns; x++) {
        this.cells[x] = [];
        for (let y = 0; y < this.numRows; y++) {
          this.cells[x][y] = new Cell(x, y, this.juego);
        }
      }
    }
    getCellPX(x, y) {
      const xIndex = Math.floor(x / this.cellSize);
      const yIndex = Math.floor(y / this.cellSize);
  
      let newx = Math.max(0, Math.min(this.numColumns - 1, xIndex));
      let newy = Math.max(0, Math.min(this.numRows - 1, yIndex));
      return this.cells[newx][newy];
    }
  
    getCell(x, y) {
      
      // Asegurarse de que los índices estén dentro de los límites de la matriz
      let newx = Math.max(0, Math.min(this.numColumns - 1, x));
      let newy = Math.max(0, Math.min(this.numRows - 1, y));
  
      return this.cells[newx][newy];
    }
  
    add(objeto) {
      const xIndex = Math.floor(objeto.x / this.cellSize);
      const yIndex = Math.floor(objeto.y / this.cellSize);
  
      const cell = this.getCell(xIndex, yIndex);
      if (!cell) return; //console.warn("Cell not found",xIndex,yIndex);
      cell.agregar(objeto.quienSoy);
      objeto.quienSoy.miCeldaActual = cell;
    }
  
    remove(objeto) {
      if (objeto.quienSoy.miCeldaActual) {
        objeto.quienSoy.miCeldaActual.sacar(objeto.quienSoy);
      }
    }
  
  
    update(objeto) {
      this.remove(objeto); // Eliminar el objeto de su celda actual
      this.add(objeto); // Volver a agregar el objeto a la celda nueva
    }
  }