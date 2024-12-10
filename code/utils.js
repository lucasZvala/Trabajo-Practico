function getRandomColor() {
    // Genera un número aleatorio entre 0x000000 y 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xFFFFFF)
    // Convierte el número a una cadena hexadecimal y lo rellena con ceros a la izquierda
    const hexColor = randomColor.toString(16).padStart(6, '0')
    // Devuelve el color en formato 0xRRGGBB
    return `0x${hexColor.toUpperCase()}`
}


function isOverlap(rect1, rect2) {
    // Extraer las coordenadas y dimensiones de cada rectángulo
    const { x: x1, y: y1, ancho: w1, alto: h1 } = rect1
    const { x: x2, y: y2, ancho: w2, alto: h2 } = rect2
    
    // Calcular las coordenadas de las esquinas de cada rectángulo
    const rect1Left = x1 - w1 / 2
    const rect1Right = x1 + w1 / 2
    const rect1Top = y1 -h1
    const rect1Bottom = y1
    
    const rect2Left = x2 - w2 / 2
    const rect2Right = x2 + w2 / 2
    const rect2Top = y2 -h2
    const rect2Bottom = y2 + h2
    
    // Determinar si hay solapamiento
    const isOverlapping = rect1Left < rect2Right &&
                          rect1Right > rect2Left &&
                          rect1Top < rect2Bottom &&
                          rect1Bottom > rect2Top
    
    return isOverlapping

}


function generarID(length = 8) {
    // Conjunto de caracteres alfanuméricos (mayúsculas, minúsculas y dígitos)
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
  
    // Genera un ID al azar
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }

  function radToDeg(radians) {
    return radians * (180 / Math.PI);
  }
  
  function normalizarVector(x, y) {
    if (x == 0 && y == 0) {
      return null;
    }
  
    let magnitud = calculoDeDistanciaRapido(0, 0, x, y);
  
    if (magnitud == 0) return null;
  
    let rta = { x, y };
  
    rta.x /= magnitud;
    rta.y /= magnitud;
  
    return rta;
  }
  
  function calculoDeDistanciaRapido(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
  
    if (dx > dy) {
      return dx + 0.4 * dy;
    } else {
      return dy + 0.4 * dx;
    }
  }
  
  // Función para calcular la distancia entre dos puntos
  function calculoDeDistancia(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // utils.js
  
  /**
   * Calcula la distancia al cuadrado entre dos puntos.
   * @param {number} x1 - La coordenada x del primer punto.
   * @param {number} y1 - La coordenada y del primer punto.
   * @param {number} x2 - La coordenada x del segundo punto.
   * @param {number} y2 - La coordenada y del segundo punto.
   * @returns {number} La distancia al cuadrado entre los dos puntos.
   */
  function distanciaAlCuadrado(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  }
  
  function generarID(longitud = 8) {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < longitud; i++) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
  }
  
  function lerp(start, end, alpha) {
    return start + (end - start) * alpha;
  }
  
  function radians_to_degrees(radians)
  {
    // Store the value of pi.
    var pi = Math.PI;
    // Multiply radians by 180 divided by pi to convert to degrees.
    return radians * (180/pi);
  }
            