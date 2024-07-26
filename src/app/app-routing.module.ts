import { IleuscoComponent } from './components/tiquete/ileusco/ileusco.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TiquetesComponent } from './components/inicio/tiquetes/tiquetes.component';
import { CarnetsComponent } from './components/inicio/carnets/carnets.component';
import { PoliticasComponent } from './components/inicio/politicas/politicas.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { AdministrativosComponent } from './components/carnet/administrativos/administrativos.component';
import { EstudiantesComponent } from './components/carnet/estudiantes/estudiantes.component';
import { GraduadosComponent } from './components/carnet/graduados/graduados.component';
import { VirtualComponent } from './components/carnet/virtual/virtual.component';
import { IntercambioComponent } from './components/carnet/intercambio/intercambio.component';
import { DocentesComponent } from './components/carnet/docentes/docentes.component';
import { LeyendaComponent } from './components/politica/leyenda/leyenda.component';
import { FirmaComponent } from './components/politica/firma/firma.component';
import { TiqueteInvitadosComponent } from './components/tiquete/tiquete-invitados/tiquete-invitados.component';
import { TiqueteVisitantesComponent } from './components/tiquete/tiquete-visitantes/tiquete-visitantes.component';
import { TiqueteEventosComponent } from './components/tiquete/tiquete-eventos/tiquete-eventos.component';
import { InstructivoComponent } from './components/instructivo/instructivo.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'acceso-denegado', component: NotfoundComponent },

  { path: 'login', component: LoginComponent },
  { path: 'token', component: TokenComponent },

  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },

  { path: 'carnets', component: CarnetsComponent, canActivate: [AuthGuard] },
  {
    path: 'estudiantes',
    component: EstudiantesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'virtual', component: VirtualComponent, canActivate: [AuthGuard] },
  {
    path: 'intercambio',
    component: IntercambioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'graduados',
    component: GraduadosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'docentes', component: DocentesComponent, canActivate: [AuthGuard] },
  {
    path: 'administrativos',
    component: AdministrativosComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'politicas',
    component: PoliticasComponent,
    canActivate: [AuthGuard],
  },
  { path: 'leyenda', component: LeyendaComponent, canActivate: [AuthGuard] },
  { path: 'firma', component: FirmaComponent, canActivate: [AuthGuard] },

  { path: 'tiquetes', component: TiquetesComponent, canActivate: [AuthGuard] },
  {
    path: 'tiquete-invitados',
    component: TiqueteInvitadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tiquete-visitantes',
    component: TiqueteVisitantesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tiquete-eventos',
    component: TiqueteEventosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tiquete-ileusco',
    component: IleuscoComponent,
    canActivate: [AuthGuard],
  },

  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },

  { path: 'instructivo', component: InstructivoComponent },

  { path: '**', redirectTo: 'acceso-denegado' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
