import { Persona } from "./persona";
import { ProgramaCarnet } from "./programa-carnet";

export class Estudiante {
  codigo!: String;
  codigoPrograma!: number;
  fechaIngreso!: Date;
  codigoInscripcion!: number;
  estadoEgresado!: number;
  matricula!: number;
  matriculaTipo!: string;
  persona!: Persona;
  programa!: ProgramaCarnet;
}
