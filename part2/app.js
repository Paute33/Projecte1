require("colors");

const {
    inquirerMenu,
    pausa,
    novaColumna,
    novaFila,
    reservaSelect,
    confirmar,
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const Reserva = require("./models/reservasalas");

const main = async () => {
    let opt = "";
    const reservas = new Reserva();

    const reservaDB = readDB();

    if (reservaDB) {
        reservas.carregarAlumnesFromArray(reservaDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const fila = await novaFila("Fila(1-7):");
                const columna = await novaColumna("Butaca(1-7)");
                reservas.crearReserva(fila, columna);
                break;

            case "2":
                reservas.mostrarSala();
                break;

            case "3":
                reservas.recaudacio();
                break;

            case "4":
                const id2 = await reservaSelect(reservas.llistatArr);
                if (id2 !== "0") {
                    const ok = await confirmar(
                        "Estas segur de eliminar la reserva?"
                    );
                    if (ok) {
                        reservas.eliminarReserva(id2);
                        console.log("Reserva eliminada!");
                    }
                }
                break;

            default:
                break;
        }

        guardarDB(reservas.llistatArr);

        await pausa();
    } while (opt !== "0");
};

main();