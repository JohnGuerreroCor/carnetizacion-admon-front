import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UbicacionService } from '../../../services/ubicacion.service';
import { PoliticaEstamento } from '../../../models/politica-estamento';
import { PoliticaService } from '../../../services/politica.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-leyenda',
  templateUrl: './leyenda.component.html',
  styleUrls: ['./leyenda.component.css'],
  providers: [DatePipe],
})
export class LeyendaComponent implements OnInit {

  //Arreglos
  editar: boolean = false;
  politicas: PoliticaEstamento[] = [];

  //Booleanos

  //Complementos

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['index', 'estamento', 'descripcion', 'fecha', 'opciones'];
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  formPolitica!: FormGroup;
  myControl = new FormControl();
  estamento: String = "Estamento";
  estamentoCodigo: number = 0;
  fechaModificacion: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    public ubicacionService: UbicacionService,
    public politicaEstamentoService: PoliticaService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe,
  ) {

    if (this.authService.validacionToken()) { }
  }

  ngOnInit() {
    this.crearFormularioTercero();
    this.buscarPoliticaEstamento();
  }

  buscarPoliticaEstamento() {
    this.politicaEstamentoService.obtenerPoliticaEstamento().subscribe(data => {
      this.politicas = data;
      this.dataSource = new MatTableDataSource<PoliticaEstamento>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  private crearFormularioTercero(): void {
    this.formPolitica = this.formBuilder.group({
      codigo: new FormControl(''),
      estamento: new FormControl(''),
      descripcion: new FormControl('', Validators.required),
      fechaModificacion: new FormControl(''),
    });
  }

  editarPolitica(element: PoliticaEstamento) {
    this.editar = true;
    this.formPolitica.get('codigo')!.setValue(element.codigo);
    this.formPolitica.get('estamento')!.setValue(element.estamento.nombre);
    this.formPolitica.get('descripcion')!.setValue(element.descripcion);
    this.formPolitica.get('fechaModificacion')!.setValue(element.fechaModificacion);
    this.estamento = element.estamento.nombre;
    this.estamentoCodigo = element.estamento.codigo;
    this.fechaModificacion = element.fechaModificacion;
  }

  parametrosPoliticaActualizar(): void {
    let politica: PoliticaEstamento = new PoliticaEstamento();
    politica.codigo = this.formPolitica.get('codigo')!.value;
    politica.descripcion = this.formPolitica.get('descripcion')!.value;
    politica.fechaModificacion = new Date();
    this.actualizar(politica);
    this.cancelar();
    this.buscarPoliticaEstamento();

  }

  actualizar(politica: PoliticaEstamento) {
    this.politicaEstamentoService.actualizarPoliticaEstamento(politica).subscribe(data => {
      if (data > 0) {
        this.mensajeSuccses();
        this.buscarPoliticaEstamento()
        this.cancelar();
      } else {
        this.mensajeError();
        this.buscarPoliticaEstamento();
        this.cancelar();
      }

    }, err => this.fError(err))
  }

  cancelar() {
    this.formPolitica.reset();
    this.editar = false;
    this.estamento = "Estamento";
    this.estamentoCodigo = 0;
    this.fechaModificacion = new Date();
  }

  scroll(page: HTMLElement) {
    page.scrollIntoView();
  }

  mensajeError() {
    swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo completar el proceso',
      confirmButtonText: 'Listo',
      confirmButtonColor: '#8f141b'
    })

  }

  mensajeSuccses() {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Registrado.',
      text: '¡Operación exitosa!'
    });
  }

  fError(er: any): void {

    let err = er.error.error_description;
    let arr: string[] = err.split(":");

    if (arr[0] == "Access token expired") {
      this.authService.logout();
      this.router.navigate(['login']);

    } else {
      this.mensajeError();
    }

  }

}