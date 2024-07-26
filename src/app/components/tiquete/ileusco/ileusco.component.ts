import { EstudianteIleusco } from './../../../models/estudiante-ileusco';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { DatePipe } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { TiqueteIleuscoService } from 'src/app/services/tiquete-ileusco.service';
import { AuthService } from '../../../services/auth.service';
import { TiqueteIleusco } from 'src/app/models/tiquete-ileusco';

@Component({
  selector: 'app-ileusco',
  templateUrl: './ileusco.component.html',
  styleUrls: ['./ileusco.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class IleuscoComponent {
  hoy = new Date();
  formularioIleusco!: FormGroup;
  fechaLimiteMinima!: any;
  fechaLimiteMinimaVigencia!: any;
  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;
  listadoEstudiantesIleusco: EstudianteIleusco[] = [];
  aux: number = 1;

  dataSource = new MatTableDataSource<EstudianteIleusco>([]);
  displayedColumns: string[] = [
    'index',
    'tipo',
    'id',
    'nombre',
    'correo',
    'fecha',
    'proceso',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    private authService: AuthService,
    public tiqueteIleuscoService: TiqueteIleuscoService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerListadoEgresadosFacultad();
    this.crearFormularioIleusco();
  }

  private crearFormularioIleusco(): void {
    this.formularioIleusco = this.formBuilder.group({
      codigo: new FormControl(''),
      terCodigo: new FormControl(''),
      uaaCodigo: new FormControl(''),
      fechaInicio: new FormControl('', Validators.required),
      fechaVigencia: new FormControl('', Validators.required),
      codigoQr: new FormControl(''),
      estado: new FormControl(''),
    });
  }

  limiteVigencia() {
    this.fechaLimiteMinimaVigencia = new Date(
      this.formularioIleusco.get('fechaInicio')!.value
    );
  }

  botonActivo(element: EstudianteIleusco): boolean {
    const fechaJson = new Date(element.fechaVigencia);
    return fechaJson <= this.hoy;
  }

  fechaActiva(element: EstudianteIleusco): boolean {
    const fechaJson = new Date(element.fechaVigencia);
    return fechaJson <= this.hoy;
  }

  obtenerListadoEgresadosFacultad() {
    this.noInformacion = true;
    this.precarga = false;
    this.tiqueteIleuscoService.obtenerEstudiantesIleusco().subscribe((data) => {
      if (JSON.stringify(data) == '[]') {
        this.noInformacion = false;
        this.precarga = true;
        this.buscador = false;
      } else {
        this.buscador = true;
        this.listadoEstudiantesIleusco = data;
        this.dataSource = new MatTableDataSource<EstudianteIleusco>(data);
        this.precarga = true;
        this.paginator.firstPage();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarEstudianteIleusco(data: EstudianteIleusco): void {
    let tiqueteIleusco: TiqueteIleusco = new TiqueteIleusco();
    tiqueteIleusco.codigo = this.formularioIleusco.get('codigo')!.value;
    tiqueteIleusco.estudianteIleuscoCodigo = data.codigo;
    tiqueteIleusco.uaaCodigo = 775;
    tiqueteIleusco.fechaCreacion =
      this.formularioIleusco.get('fechaInicio')!.value;
    tiqueteIleusco.fechaVigencia =
      this.formularioIleusco.get('fechaVigencia')!.value;
    tiqueteIleusco.estado = this.formularioIleusco.get('estado')!.value;
    this.registrar(tiqueteIleusco, data);
    this.obtenerListadoEgresadosFacultad();
  }

  registrar(
    tiqueteIleusco: TiqueteIleusco,
    estudianteIleusco: EstudianteIleusco
  ) {
    this.tiqueteIleuscoService
      .registrarTiqueteIleusco(tiqueteIleusco)
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
            this.enviarTiqueteCorreo(estudianteIleusco);
            this.obtenerListadoEgresadosFacultad();
          } else {
            this.mensajeError();
            this.obtenerListadoEgresadosFacultad();
          }
        },
        (err) => this.fError(err)
      );
  }

  enviarTiqueteCorreo(item: EstudianteIleusco) {
    let fechaInicioEmail: any = this.datePipe.transform(
      this.formularioIleusco.get('fechaInicio')!.value,
      'dd-MM-yyyy '
    );
    let fechaVigenciaEmail: any = this.datePipe.transform(
      this.formularioIleusco.get('fechaVigencia')!.value,
      'dd-MM-yyyy '
    );
    this.tiqueteIleuscoService
      .enviarTiqueteIleusco(
        item.emailPersonal,
        item.nombre,
        item.tipoDocumento + '. ' + item.identificacion,
        'INSTITUTO DE LENGUAS EXTRANJERAS - ILEUSCO',
        fechaInicioEmail,
        fechaVigenciaEmail,
        '00000'
      )
      .subscribe((data) => {
        if (data.estado == true) {
          this.mensajeSuccsesEmail();
          this.cancelar();
        } else {
          this.mensajeError();
        }
      });
  }

  revocarTiqueteIleusco(item: EstudianteIleusco) {
    this.tiqueteIleuscoService.revocarTiqueteIleusco(item).subscribe((data) => {
      if (data > 0) {
        this.mensajeSuccses();
        this.obtenerListadoEgresadosFacultad();
      } else {
        this.mensajeError();
      }
    });
  }

  cargueMasivoEstudiantesIleusco() {
    const totalStudents = this.listadoEstudiantesIleusco.length;
    let processedCount = 0;
    Swal.fire({
      title: 'Un momento, por favor',
      html: `Procesando registros: ${processedCount} de ${totalStudents}`,
      text: 'Estamos procesando la información',
      imageUrl: 'assets/precarga-usco.gif',
      imageWidth: 100,
      imageHeight: 110,
      imageAlt: 'Custom image',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });

    const batchSize = 5; // Tamaño del lote

    // Función para enviar un lote de estudiantes
    const enviarLote = (inicio: number) => {
      const fin = Math.min(inicio + batchSize, totalStudents);
      const lote = this.listadoEstudiantesIleusco.slice(inicio, fin);

      // Para cada estudiante en el lote, registrar y enviar correo masivo
      lote.forEach((estudiante) => {
        if (estudiante.fechaVigencia == null || new Date(estudiante.fechaVigencia) < new Date()) {
          let tiqueteIleusco: TiqueteIleusco = new TiqueteIleusco();
          tiqueteIleusco.codigo = this.formularioIleusco.get('codigo')!.value;
          tiqueteIleusco.estudianteIleuscoCodigo = estudiante.codigo;
          tiqueteIleusco.uaaCodigo = 775;
          tiqueteIleusco.fechaCreacion =
            this.formularioIleusco.get('fechaInicio')!.value;
          tiqueteIleusco.fechaVigencia =
            this.formularioIleusco.get('fechaVigencia')!.value;
          tiqueteIleusco.estado = this.formularioIleusco.get('estado')!.value;

          this.registrarMasivo(tiqueteIleusco, estudiante);
          processedCount++; // Incrementar el contador de registros procesados
          Swal.update({
            html: `Procesando registros: ${processedCount} de ${totalStudents}`,
          });
        }
      });

      // Si hay más estudiantes por procesar, enviar el siguiente lote después de un pequeño retraso
      if (fin < totalStudents) {
        setTimeout(() => enviarLote(fin), 5000); // Espera 5 segundo entre lotes
      } else {
        Swal.close(); // Cerrar la alerta cuando se haya procesado toda la lista
        this.obtenerListadoEgresadosFacultad();
      }
    };

    enviarLote(0); // Iniciar el proceso enviando el primer lote
  }

  registrarMasivo(
    tiqueteIleusco: TiqueteIleusco,
    estudianteIleusco: EstudianteIleusco
  ) {
    this.tiqueteIleuscoService
      .registrarTiqueteIleusco(tiqueteIleusco)
      .subscribe((data) => {
        if (data > 0) {
          this.enviarTiqueteCorreoMasivo(estudianteIleusco);
        } else {
          console.log('ERROR REGISTRO');
        }
      });
  }

  enviarTiqueteCorreoMasivo(item: EstudianteIleusco) {
    let fechaInicioEmail: any = this.datePipe.transform(
      this.formularioIleusco.get('fechaInicio')!.value,
      'dd-MM-yyyy '
    );
    let fechaVigenciaEmail: any = this.datePipe.transform(
      this.formularioIleusco.get('fechaVigencia')!.value,
      'dd-MM-yyyy '
    );

    this.tiqueteIleuscoService
      .enviarTiqueteIleusco(
        item.emailPersonal,
        item.nombre,
        item.tipoDocumento + '. ' + item.identificacion,
        'INSTITUTO DE LENGUAS EXTRANJERAS - ILEUSCO',
        fechaInicioEmail,
        fechaVigenciaEmail,
        '00000'
      )
      .subscribe((data) => {
        if (data.estado == true) {
          this.cancelar();
        }
      });
  }

  cancelar() {
    //this.formularioIleusco.reset();
    this.formularioIleusco.get('codigo')?.reset;
    this.formularioIleusco.get('terCodigo')?.reset;
    this.formularioIleusco.get('uaaCodigo')?.reset;
    this.formularioIleusco.get('codigoQr')?.reset;
    this.formularioIleusco.get('estado')?.reset;
  }

  mensajeSuccsesEmail() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Correo enviado, ¡Operación exitosa!',
    });
  }

  mensajeSuccses() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Registrado.',
      text: '¡Operación exitosa!',
    });
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo completar el proceso.',
      showConfirmButton: true,
      confirmButtonText: 'Listo',
      confirmButtonColor: '#8f141b',
    });
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');

    if (arr[0] == 'Access token expired') {
      this.authService.logout();
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }
}
