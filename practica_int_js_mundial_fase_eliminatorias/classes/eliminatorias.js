
Array.prototype.shuffle = function () {
  var i = this.length;
  while (i) {
    var j = Math.floor(Math.random() * i);
    var t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};

const POSICION_0_ARRAY = 0;
const POSICION_1_ARRAY = 1;

import { octavosteams } from "../teams.js";
export default class FaseEliminatorias {
    constructor(name, teams = [], config = {}) {
        this.name = name;
        this.teams = teams;
        this.planificadorJornadas = [];
        this.setup(config);
        this.setupTeams(teams);
        this.ganadores = [];
    }

    setup(config) {
        const defaultConfig = { rounds: 1 };
        this.config = Object.assign(defaultConfig, config);
    }

    setupTeams(teamNames) {
        this.teams = [];
        for (const teamName of teamNames) {
        const team = {
            name: teamName,
            status: " ",
            goles: 0,
        };
        this.teams.push(team);
        }
        this.teams.shuffle();
    }
    planificadorEliminatorias() {
        const numeroJornadas = 1;
        const numeroPartidos = this.teams.length / 2;
        for (let i = 0; i < numeroJornadas; i++) {
        const jornada = [];
        for (let j = 0; j < numeroPartidos; j++) {
            //leo el array de equipos
            const partidos = ["equipo local", "equipo visitante"];
            jornada.push(partidos);
        }
        this.planificadorJornadas.push(jornada);
        };
    };

    obtenerTeamNames() {
        return this.teams.map((team) => team.name);
    };

    configuradorPartidos() {
        //adiciono los equipos a
        const teamNames = this.obtenerTeamNames();
        this.planificadorEliminatorias();
        let indice = 0;
        this.planificadorJornadas.forEach((jornada) => {
        jornada.forEach((partidos) => {
            partidos[POSICION_0_ARRAY] = teamNames[indice];
            partidos[POSICION_1_ARRAY] = teamNames[(indice += 1)];
            indice++;
        });
        });
    };

    generadorGoles() {
        return Math.round(Math.random() * 10);
    };

    jugar(partido) {
        const golesCasa = this.generadorGoles();
        const golesVisita = this.generadorGoles();

        return {
        equipoCasa: partido[POSICION_0_ARRAY],
        golesCasa: golesCasa,
        equipoVisita: partido[POSICION_1_ARRAY],
        golesVisita: golesVisita,
        };
    };

    actualizarEquipos(resultado) {
        // console.log("actualizamos equipos", resultado)
        const equipoLocal = this.teams.find(
        (team) => team.name == resultado.equipoCasa
        );
        const equipoVisitante = this.teams.find(
        (team) => team.name == resultado.equipoVisita
        );

        if (equipoLocal && equipoVisitante) {
        equipoLocal.goles += resultado.golesCasa;
        equipoVisitante.goles += resultado.golesVisita;

        if (resultado.golesCasa > resultado.golesVisita) {
            equipoLocal.status = "ganador";
        } else {
            //equipoVista es "ganador" y equipoCasas es" perderdor"
            equipoVisitante.status = "ganador";
            equipoLocal.status = "perdedor";
        }
        };
        let ganador = " ";
        if (equipoLocal.status === "ganador") {
        ganador += equipoLocal.name;
        } else if (equipoVisitante.status === "ganador") {
        ganador += equipoVisitante.name;
        };
        let local = equipoLocal.name;
        let marcadorLocal = equipoLocal.goles;
        let visita = equipoVisitante.name;
        let marcadorVisita = equipoVisitante.goles;

        console.log(
        `${local} ${marcadorLocal} vs  ${visita} ${marcadorVisita} => ${ganador}`
        );
    }

    faseSiguiente() {
        this.teams.forEach((ganador) => {
        let name;
        if (ganador["status"] == "ganador") {
            name = ganador["name"];
            // console.log(name)
            this.ganadores.push(name);
        }
        });
    };

    iniciar() {
        console.log("\n" + `====${this.name}==== ` + "\n");
        this.configuradorPartidos();
        for (const jornada of this.planificadorJornadas) {
        for (const partido of jornada) {
            // console.log("juegar partido", partido)

            let resultado = this.jugar(partido);
            while (resultado.golesCasa == resultado.golesVisita) {
            resultado = this.jugar(partido);
            };

            this.actualizarEquipos(resultado);
        };

        this.faseSiguiente();
        // console.log("ver los resultados")
        };
    };
};




