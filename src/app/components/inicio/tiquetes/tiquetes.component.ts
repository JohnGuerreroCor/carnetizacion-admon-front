import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiquetes',
  templateUrl: './tiquetes.component.html',
  styleUrls: ['./tiquetes.component.css'],
})
export class TiquetesComponent implements OnInit {
  links = [
    {
      titulo: 'Invitados',
      ruta: '/tiquete-invitados',
      icono:
        'fa-solid fa-users-rectangle fa-8x p-4 text-center color-icon color-icon',
      info: 'Consulta, cambio de foto para los diferentes estamentos de la institución y aclaración de las dependencias que administran la información de cada estamento.',
    },
    {
      titulo: 'Visitantes',
      ruta: '/tiquete-visitantes',
      icono: 'fa-solid fa-users fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'Eventos',
      ruta: '/tiquete-eventos',
      icono: 'fa-solid fa-people-group fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'ILEUSCO',
      ruta: '/tiquete-ileusco',
      icono: 'fa-solid fa-earth-americas fa-8x p-4 text-center color-icon',
      info: 'Consulta y generación de los reportes específico y detallado de ingreso y salida por cada puesto de vigilancia y sedes de la institución.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
      info: 'Consulta y generación de los reportes específico y detallado de ingreso y salida por cada puesto de vigilancia y sedes de la institución.',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
