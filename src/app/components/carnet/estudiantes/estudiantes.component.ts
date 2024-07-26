import { Component, OnInit } from '@angular/core';
import { FirmaDigitalService } from '../../../services/firma-digital.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { PoliticaEstamento } from '../../../models/politica-estamento';
import { PoliticaService } from '../../../services/politica.service';
import { FirmaDigital } from '../../../models/firma-digital';
import { AuthService } from '../../../services/auth.service';
import { FotoService } from 'src/app/services/foto.service';
import { FotoAntigua } from '../../../models/foto-antigua';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../../../models/estudiante';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Webparametro } from 'src/app/models/webparametro';
import { WebparametroService } from 'src/app/services/webparametro.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  //Booleanos
  alert: boolean = true;
  cargaFoto: boolean = false;
  mobile: boolean = false;

  //Objetos
  estudiante: Estudiante[] = [];
  politicaEstudiante: PoliticaEstamento[] = [];
  firmaDigital: FirmaDigital[] = [];
  webparametro: Webparametro[] = [];
  codigoBarras='https://barcode.tec-it.com/barcode.ashx?data=' + '0000000000' +
  '&code=Code128&translate-esc=on&unit=Fit&imagetype=Jpg&color=4d626c&showhrt=no&modulewidth=0.265';;

  //Complementos
  codigoQr: any = null;
  busqueda!: String;
  url: string = environment.URL_BACKEND;
  nameFile = 'Seleccione la foto';
  file!: FileList;
  foto: FotoAntigua = {
    url: '',
  };
  firma: FotoAntigua = {
    url: '',
  };

  constructor(
    public estServices: EstudianteService,
    public fotoService: FotoService,
    public politicaService: PoliticaService,
    public firmaService: FirmaDigitalService,
    public webparametroService: WebparametroService,
    private auth: AuthService,
    private router: Router
  ) {
    this.codigoQr = 'https://www.usco.edu.co/';
  }

  ngOnInit() {
    this.buscarPoliticaEstamento();
    this.buscarFirmaActiva();
    this.webparametroService.obtenerWebParametro().subscribe((data) => {
      this.webparametro = data;
    });
    setTimeout(() => {
      this.alert = false;
    }, 9000);
  }

  find(codigo: String) {
    this.codigoBarras =
    'https://barcode.tec-it.com/barcode.ashx?data=' +
    codigo +
    '&code=Code128&translate-esc=on&unit=Fit&imagetype=Jpg&color=4d626c&showhrt=no&modulewidth=0.265';
    this.estServices.getEstudiante(codigo).subscribe((data) => {
      if (JSON.stringify(data) !== '[]') {
        this.estudiante = data;
        if (this.estudiante[0].matricula === +this.webparametro[0].webValor) {
          Swal.fire({
            icon: 'success',
            title: 'Estudiante Activo',
            text: 'El estudiante se encuentra matriculado en el calendario actual',
            confirmButtonText: 'Listo',
            confirmButtonColor: '#8f141b',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Estudiante inactivo',
            text: 'El estudiante NO se encuentra matriculado en el calendario actual.',
            confirmButtonText: 'Listo',
            confirmButtonColor: '#8f141b',
            showConfirmButton: true,
          });
        }
        this.codigoQr =
          'https://sanagustin.usco.edu.co/planes_academicos/obtenerFoto/' +
          this.estudiante[0].persona.codigo;
        this.mostrarFoto('' + this.estudiante[0].persona.codigo);
      } else {
        this.estudiante = [];
        this.codigoQr = 'Sin resultado';
        Swal.fire({
          icon: 'warning',
          title: 'No existe',
          text: 'El código digitado no encontró ningún Estudiante asociado, por favor rectifique el código.',
          confirmButtonText: 'Listo',
          confirmButtonColor: '#8f141b',
          showConfirmButton: true,
        });
      }
    });
  }

  vistaMobile() {
    this.mobile = true;
  }

  vistaEscritorio() {
    this.mobile = false;
  }

  scrollToSection(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToSection1(): void {
    this.scrollToSection('section');
  }

  buscarFirmaActiva() {
    this.firmaService.obtenerFirmaActiva().subscribe((data) => {
      if (JSON.stringify(data) !== '[]') {
        this.firmaDigital = data;
        this.obtenerFirma(+data[0].ruta);
      }
    });
  }

  obtenerFirma(ruta: number) {
    this.firmaService.mirarFirma(ruta).subscribe((data) => {
      var blob = new Blob([data], { type: 'image/png' });
      const foto = blob;
      const reader = new FileReader();
      reader.onload = () => {
        this.firma.url = reader.result as string;
      };
      reader.readAsDataURL(foto);
    });
  }

  buscarPoliticaEstamento() {
    this.politicaService
      .obtenerPoliticaPorCodigoEstamento(2)
      .subscribe((data) => {
        this.politicaEstudiante = data;
      });
  }

  subirFoto() {
    let file: any = this.file;
    const foto = new File([file], this.estudiante[0].persona.codigo + '.png', {
      type: file.type,
    });
    this.fotoService.subirFoto(foto).subscribe((data) => {
      this.mensajeRealizado();
    });
  }

  mostrarFoto(perCodigo: String) {
    this.fotoService.mirarFoto(perCodigo).subscribe((data) => {
      var gg = new Blob([data], { type: 'application/json' });
      if (gg.size !== 4) {
        var blob = new Blob([data], { type: 'image/png' });
        const foto = blob;
        const reader = new FileReader();
        reader.onload = () => {
          this.foto.url = reader.result as string;
        };
        reader.readAsDataURL(foto);
      } else {
        this.fotoService
          .mirarFotoAntigua('' + this.estudiante[0].persona.codigo)
          .subscribe((data) => {
            this.foto = data;
          });
      }
    });
  }

  change(file: any): void {
    this.nameFile = file.target.files[0].name.replace(/\s/g, '');
    const foto: any = (event?.target as HTMLInputElement)?.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.foto.url = reader.result as string;
    };
    reader.readAsDataURL(foto);
    if (file.target.files[0].size > 8100000) {
      Swal.fire({
        title: 'El archivo supera el limite de tamaño que es de 8mb',
        confirmButtonText: 'Entiendo',
        confirmButtonColor: '#8f141b',
        showConfirmButton: true,
      });
    } else {
      this.file = file.target.files[0];
      this.cargaFoto = true;
      this.scrollToSection1();
      /* const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Foto cargada con éxito, recuerde Guardar los cambios realizados.',
      }); */
    }
  }

  mensajeRealizado() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso Realizado',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio Un Error!',
    });
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');
    this.mensajeError();
    if (arr[0] == 'Access token expired') {
      this.auth.logout();
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }
}
