const { v4: uuidv4 } = require("uuid");

class Tarea {
    id = "";
    nom = "";
    completada = false;

    constructor(nom, completada) {
        this.id = uuidv4();
        this.nom = nom;
        this.completada = completada;
    }
}

module.exports = Tarea;