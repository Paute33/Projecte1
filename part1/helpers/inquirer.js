const { countReset } = require("console");
const inquirer = require("inquirer");
require("colors");

const preguntes = [
    {
        type: "list",
        name: "opcio",
        message: "Què vols fer?",
        choices: [
            {
                value: "1",
                name: `${"1 ".blue} Crear tarea`,
            },
            {
                value: "2",
                name: `${"2 ".blue} Listar tareas`,
            },
            {
                value: "3",
                name: `${"3 ".blue} Listar tareas completadas`,
            },
            {
                value: "4",
                name: `${"4 ".blue} Listar tareas pendientes`,
            },
            {
                value: "5",
                name: `${"5 ".blue} Completar tarea(s)`,
            },
            {
                value: "6",
                name: `${"6 ".blue} Borrar tarea`,
            },
            {
                value: "0",
                name: `${"0 ".blue} Sortir`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log("========================".green);
    console.log("   ¿Qué deseas hacer?".red);
    console.log("========================\n".green);

    const { opcio } = await inquirer.prompt(preguntes);

    return opcio; // retorno un valor entre 0 i 5
};
const pausa = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presiona ${"enter".red} per a continuar`,
        },
    ];
    console.log("\n");
    await inquirer.prompt(question);
};

const novaTarea = async (message) => {
    const question = [
        {
            type: "input",
            name: "nom",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Si us plau, introdueix el nom de la tasca";
                }
                return true;
            },
        },
    ];

    const { nom } = await inquirer.prompt(question);
    return nom;
};

const completarTareas = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.blue;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.nom}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0. ".blue + "Cancel·lar",
    });
    const pregunta = [
        {
            type: "checkbox",
            name: "id",
            message: "Selecciona la tasca",
            choices,
        },
    ];

    const { id } = await inquirer.prompt(pregunta);
    return id;
};

const confirmar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const tareaSelect = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.blue;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.nom}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0. ".blue + "Cancel·lar",
    });
    const pregunta = [
        {
            type: "list",
            name: "id",
            message: "Selecciona tasca",
            choices,
        },
    ];

    const { id } = await inquirer.prompt(pregunta);
    return id;
};

module.exports = {
    inquirerMenu,
    pausa,
    novaTarea,
    completarTareas,
    confirmar,
    tareaSelect,
};