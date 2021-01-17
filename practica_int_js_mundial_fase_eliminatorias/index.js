
import { octavosteams } from "./teams.js";
import FaseEliminatorias from "./classes/eliminatorias.js";

const juegoPerdedores = [];

console.log("============================================");
console.log("====COMIENZO DE LA FASE DE ELIMINATORIAS====");
console.log("============================================");

const octavosFinal = new FaseEliminatorias("OCTAVOS DE FINAL", octavosteams);

octavosFinal.teams.forEach((nombre) => {
  console.log(nombre.name);
});

octavosFinal.iniciar();

const cuartosFinal = new FaseEliminatorias(
  "CUARTOS DE FINAL",
  octavosFinal.ganadores
);

cuartosFinal.iniciar();

const semiFinales = new FaseEliminatorias(
  " SEMIFINALES ",
  cuartosFinal.ganadores
);

semiFinales.iniciar();

semiFinales.teams.forEach((equipos) => {
  let nameEquipoPerder;
  if (equipos["status"] == " " || equipos["status"] == "perdedor") {
    nameEquipoPerder = equipos["name"];
    juegoPerdedores.push(nameEquipoPerder);
  }
});

const terceroCuarto = new FaseEliminatorias(
  "TERCER Y CUARTO PUESTO",
  juegoPerdedores
);

terceroCuarto.iniciar();

const final = new FaseEliminatorias("FINAL", semiFinales.ganadores);

final.iniciar();
console.log("\n");
console.log("=============================================");
console.log(`=====¡¡¡¡¡${final.ganadores} campeon del mundo ¡¡¡¡¡====`);
console.log("=============================================");
