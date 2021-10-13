const Reserva = require("./reserva");
const sala = [
    ["U", "U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U", "U"],
];

class ReservaSalas {
    _llista = {
        abc: 123,
    };

    get llistatArr() {
        const llistat = [];
        Object.keys(this._llista).forEach((key) => {
            const reserva = this._llista[key];
            llistat.push(reserva);
        });

        return llistat;
    }

    constructor() {
        this._llista = {};
    }

    crearReserva(fila, columna) {
        const reserva = new Reserva(fila, columna);
        this.llistatArr.forEach((reservas) => {
            if (fila == reservas.fila && columna == reservas.columna) {
                return console.log("Butaca ocupada");
            } else {
                this._llista[reserva.id] = reserva;
            }
        });
    }
    carregarAlumnesFromArray(alumnes = []) {
        alumnes.forEach((alumne) => {
            this._llista[alumne.id] = alumne;
        });
    }

    recaudacio() {
        console.log(10 * this.llistatArr.length, "€");
    }

    eliminarReserva(id = "") {
        delete this._llista[id];
    }

    mostrarSala() {
        let result = "";

        for (let i = 0; i < sala.length; ++i) {
            result += "|";
            for (let j = 0; j < sala[i].length; ++j) {
                result += sala[i][j] + "|";
                this.llistatArr.forEach((id) => {
                    const { fila, columna, pos } = id;
                    if (pos == "X") {
                        sala[fila][columna] = "X";
                    }
                });
            }
            result += "\n";
        }

        console.log(result);
    }
}
module.exports = ReservaSalas;