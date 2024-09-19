import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.css'],
})
export class CarnetsComponent implements OnInit {
  links = [
    {
      titulo: 'Estudiante',
      ruta: '/estudiantes',
      icono: 'fa-solid fa-user fa-8x p-4 text-center color-icon color-icon',
      info: 'Consulta, cambio de foto del estudiante y aclaración de la dependencia que administra la información del estamento.',
    },
    {
      titulo: 'Est. Virtual',
      ruta: '/virtual',
      icono: 'fa-solid fa-computer fa-8x p-4 text-center color-icon',
      info: 'Consulta, cambio de foto del estudiante y aclaración de la dependencia que administra la información del estamento.',
    },
    {
      titulo: 'Es. Intercambio',
      ruta: '/intercambio',
      icono: 'fa-solid fa-earth-americas fa-8x p-4 text-center color-icon',
      info: 'Consulta, cambio de foto del estudiante y aclaración de la dependencia que administra la información del estamento.',
    },
    {
      titulo: 'Graduado',
      ruta: '/graduados',
      icono: 'fa-solid fa-graduation-cap fa-8x p-4 text-center color-icon',
      info: 'Consulta, cambio de foto del estudiante y aclaración de la dependencia que administra la información del estamento.',
    },
    {
      titulo: 'Docente',
      ruta: '/docentes',
      icono: 'fa-solid fa-chalkboard-user fa-8x p-4 text-center color-icon',
      info: 'Consulta, cambio de foto del estudiante y aclaración de la dependencia que administra la información del estamento.',
    },
    {
      titulo: 'Administrativo',
      ruta: '/administrativos',
      icono: 'fa-solid fa-user-tie fa-8x p-4 text-center color-icon',
      info: 'Consulta, cambio de foto del estudiante y aclaración de la dependencia que administra la información del estamento.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
      info: 'Volver al menú inicial.',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
