import { Component, OnInit } from '@angular/core';
import { AdministrativoService } from '../../../services/administrativo.service';
import { FirmaDigitalService } from '../../../services/firma-digital.service';
import { PoliticaEstamento } from '../../../models/politica-estamento';
import { PoliticaService } from '../../../services/politica.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Administrativo } from 'src/app/models/administrativo';
import { FirmaDigital } from '../../../models/firma-digital';
import { AuthService } from '../../../services/auth.service';
import { FotoService } from 'src/app/services/foto.service';
import { FotoAntigua } from '../../../models/foto-antigua';
import { environment } from 'src/environments/environment';
import { Persona } from 'src/app/models/persona';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styleUrls: ['./administrativos.component.css'],
})
export class AdministrativosComponent implements OnInit {
  //Booleanos
  alert: boolean = true;
  cargaFoto: boolean = false;
  mobile: boolean = false;

  //Objetos
  administrativo: Administrativo[] = [];
  persona: Persona[] = [];
  politicaAdministrativo: PoliticaEstamento[] = [];
  firmaDigital: FirmaDigital[] = [];

  //Complementos
  codigoQr: any = null;
  busqueda!: any;
  url: any = environment.URL_BACKEND;
  nameFile = 'Seleccione la foto';
  file!: FileList;
  foto: FotoAntigua = {
    url: '',
  };
  firma: FotoAntigua = {
    url: '',
  };

  constructor(
    public administrativoService: AdministrativoService,
    public personaService: PersonaService,
    public politicaService: PoliticaService,
    public firmaService: FirmaDigitalService,
    public fotoService: FotoService,
    private auth: AuthService,
    private router: Router
  ) {
    this.codigoQr = 'https://www.usco.edu.co/';
  }

  ngOnInit() {
    this.buscarPoliticaEstamento();
    this.buscarFirmaActiva();

    setTimeout(() => {
      this.alert = false;
    }, 9000);
  }

  find(id: String) {
    this.administrativoService.getAdministrativo(id).subscribe((data) => {
      this.administrativo = data;
      const index = this.administrativo.findIndex(
        (admin) => admin.cargoNombre === 'DOCENTE'
      );
      if (index !== -1) {
        this.administrativo.splice(index, 1);
      }
      if (JSON.stringify(data) !== '[]') {
        this.codigoQr =
          'https://sanagustin.usco.edu.co/planes_academicos/obtenerFoto/' +
          this.administrativo[0].codigo;
        this.personaService
          .obtenerPersonaPorPerCodigo(data[0].codigo)
          .subscribe((data) => {
            this.persona = data;
            this.mostrarFoto('' + this.persona[0].codigo);
          });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No existe',
          text: 'La cédula digitada no encontró ningún Administrativo asociado, por favor rectifique el documento.',
        });

        this.administrativo = [];
        this.codigoQr = 'Sin resultado';
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
      .obtenerPoliticaPorCodigoEstamento(1)
      .subscribe((data) => {
        this.politicaAdministrativo = data;
      });
  }

  subirFoto() {
    let file: any = this.file;
    const foto = new File([file], this.persona[0].codigo + '.png', {
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
          .mirarFotoAntigua('' + this.persona[0].codigo)
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
