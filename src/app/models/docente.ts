import { Persona } from "./persona";

export class Docente {
	codigo!: number;
	vinculacionCodigo!: number;
	vinculacionNombre!: String;
	vinculacionFechaInicio!: Date;
	vinculacionFechaFin!: Date;
	nombrePrograma!: String;
	sede!: String;
	persona!: Persona;
}