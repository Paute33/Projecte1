const Tarea = require("./tarea");

class Tareas {
    _llista = {
        abc: 123,
    };

    get llistatArr() {
        const llistat = [];
        Object.keys(this._llista).forEach((key) => {
            const tarea = this._llista[key];
            llistat.push(tarea);
        });

        return llistat;
    }

    constructor() {
        this._llista = {};
    }

    crearTarea(nom = "", completada = "") {
        const tarea = new Tarea(nom, completada);
        this._llista[tarea.id] = tarea;
    }
    carregarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._llista[tarea.id] = tarea;
        });
    }
    llistarTareas() {
        console.log(); // \n

        let conta = 0;
        this.llistatArr.forEach((tarea) => {
            const { nom } = tarea;
            conta += 1;
            console.log(`${(conta + ".").green} ${nom}`);
        });
    }
    llistarTareasFet() {
        console.log(); // \n

        let conta = 0;
        this.llistatArr.forEach((tarea) => {
            const { nom, completada } = tarea;
            conta += 1;
            const feta =
                completada == true ? `${completada}`.green : `${completada}`.red;

            //const prova = true ? "hola" : "adeu"; //condicional ternari
            if (completada == true) {
                console.log(
                    `${(conta + ".").green} ${`Nom`.yellow} ${`${nom}`.cyan} :: ${`Completada`.yellow
                    } ${feta}`
                );
            }
        });
    }

    llistarTareasPendent() {
        console.log(); // \n

        let conta = 0;
        this.llistatArr.forEach((tarea) => {
            const { nom, completada } = tarea;
            conta += 1;
            const feta =
                completada == true ? `${completada}`.green : `${completada}`.red;

            //const prova = true ? "hola" : "adeu"; //condicional ternari
            if (completada == false) {
                console.log(
                    `${(conta + ".").green} ${`Nom`.yellow} ${`${nom}`.cyan} :: ${`Completada`.yellow
                    } ${feta}`
                );
            }
        });
    }

    async completarTarea(ids = []) {
        ids.forEach((id) => {
            const tarea = this._llista[id];
            if (tarea.completada == false) {
                tarea.completada = true;
            } else {
                tarea.completada = false;
            }
        });

    }

    async eliminarTarea(id = "") {
        delete this._llista[id];
    }
}

module.exports = Tareas;