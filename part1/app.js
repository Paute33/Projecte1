require("colors");

const {
    inquirerMenu,
    pausa,
    novaTarea,
    completarTareas,
    confirmar,
    tareaSelect,
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");
const Tareas = require("./models/tareas");

const main = async () => {
    let opt = "";
    const tarea = new Tareas();
    const tareaDB = readDB();

    if (tareaDB) {
        tarea.carregarTareasFromArray(tareaDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const nomTarea = await novaTarea("Nom de la tasca:");
                tarea.crearTarea(nomTarea, false);
                break;

            case "2":
                tarea.llistarTareas();
                break;

            case "3":
                tarea.llistarTareasFet();
                break;

            case "4":
                tarea.llistarTareasPendent();
                break;

            case "5":
                const ids = await completarTareas(tarea.llistatArr);
                //console.log(id1);
                tarea.completarTarea(ids);

                break;

            case "6":
                const id2 = await tareaSelect(tarea.llistatArr);
                if (id2 !== "0") {
                    const ok = await confirmar("Estas segur que vols eliminar la tasca?");
                    if (ok) {
                        tarea.eliminarTarea(id2);
                        console.log("Tasca eliminada!");
                    }
                }
                break;

            default:
                break;
        }

        guardarDB(tarea.llistatArr);
        await pausa();
    } while (opt !== "0");
};

main();