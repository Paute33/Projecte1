const { v4: uuidv4 } = require("uuid");

class Reserva {
    id = "";
    fila = 0;
    columna = 0;

    constructor(fila, columna, pos) {
        this.id = uuidv4();
        this.fila = fila;
        this.columna = columna;
        this.pos = "X";
    }
}

module.exports = Reserva;