import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//INICIO ANGULAR MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
//FIN ANGULAR MATERIAL

//INICIO INTEGRACION FIREBASE PARA IMAGENES LINEALES EMAIL - REMPLAZO DE DATA URI BASE64

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

//FIN INTEGRACION FIREBASE PARA IMAGENES LINEALES EMAIL - REMPLAZO DE DATA URI BASE64

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';

import { TokenComponent } from './components/token/token.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AdministrativosComponent } from './components/carnet/administrativos/administrativos.component';
import { EstudiantesComponent } from './components/carnet/estudiantes/estudiantes.component';
import { DocentesComponent } from './components/carnet/docentes/docentes.component';
import { GraduadosComponent } from './components/carnet/graduados/graduados.component';
import { IntercambioComponent } from './components/carnet/intercambio/intercambio.component';
import { VirtualComponent } from './components/carnet/virtual/virtual.component';
import { CarnetsComponent } from './components/inicio/carnets/carnets.component';
import { PoliticasComponent } from './components/inicio/politicas/politicas.component';
import { TiquetesComponent } from './components/inicio/tiquetes/tiquetes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { LeyendaComponent } from './components/politica/leyenda/leyenda.component';
import {
  FirmaComponent,
  ModalFirma,
} from './components/politica/firma/firma.component';
import {
  TiqueteInvitadosComponent,
  ModalTiqueteInvitado,
} from './components/tiquete/tiquete-invitados/tiquete-invitados.component';
import {
  TiqueteVisitantesComponent,
  ModalTiqueteVisitante,
} from './components/tiquete/tiquete-visitantes/tiquete-visitantes.component';
import { TiqueteEventosComponent } from './components/tiquete/tiquete-eventos/tiquete-eventos.component';
import { InstructivoComponent } from './components/instructivo/instructivo.component';
import { IleuscoComponent } from './components/tiquete/ileusco/ileusco.component';

import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import { DatePipe } from '@angular/common';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NotfoundComponent } from './components/notfound/notfound.component';

registerLocaleData(localeEsCO, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TokenComponent,
    NavbarComponent,
    InicioComponent,
    AdministrativosComponent,
    EstudiantesComponent,
    DocentesComponent,
    GraduadosComponent,
    IntercambioComponent,
    VirtualComponent,
    CarnetsComponent,
    PoliticasComponent,
    TiquetesComponent,
    ReportesComponent,
    LeyendaComponent,
    FirmaComponent,
    ModalFirma,
    TiqueteInvitadosComponent,
    TiqueteVisitantesComponent,
    TiqueteEventosComponent,
    ModalTiqueteInvitado,
    ModalTiqueteVisitante,
    InstructivoComponent,
    IleuscoComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    //INICIO FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    //FIN FIREBASE
    //INICIO ANGULAR MATERIAL
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatNativeDateModule,
    MatTableModule,
    MatExpansionModule,
    MatTreeModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule,
    //FIN ANGULAR MAERIAL
    QRCodeModule,
    NgxPrintModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ModalFirma,
    ModalTiqueteInvitado,
    ModalTiqueteVisitante,
    /* ModalInformacion,
     */
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
