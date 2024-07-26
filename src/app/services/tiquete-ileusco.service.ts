import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { EstudianteIleusco } from '../models/estudiante-ileusco';
import { TiqueteIleusco } from '../models/tiquete-ileusco';

@Injectable({
  providedIn: 'root',
})
export class TiqueteIleuscoService {
  private url: string = `${environment.URL_BACKEND}/ileusco`;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  userLogeado: String = this.authservice.user.username;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}

  private aggAutorizacionHeader(): HttpHeaders {
    let token = this.authservice.Token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      if (this.authservice.isAuthenticated()) {
        this.authservice.logout();
      }
      this.router.navigate(['login']);
      return true;
    }
    return false;
  }

  obtenerEstudiantesIleusco(): Observable<EstudianteIleusco[]> {
    return this.http
      .get<EstudianteIleusco[]>(`${this.url}/obtener-estudiantes`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  registrarTiqueteIleusco(ticket: TiqueteIleusco): Observable<number> {
    return this.http.post<number>(
      `${this.url}/registrar-tiquete-ileusco/${this.userLogeado}`,
      ticket,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  revocarTiqueteIleusco(ticket: EstudianteIleusco): Observable<number> {
    return this.http.post<number>(
      `${this.url}/revocar-tiquete-ileusco/${this.userLogeado}`,
      ticket,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  enviarTiqueteIleusco(
    email: String,
    nombre: String,
    id: String,
    lugar: String,
    registro: String,
    vigencia: String,
    qr: String
  ): Observable<any> {
    return this.http.get<any>(
      `${this.url}/enviar-tiquete-estudiante-ileusco-email/${email}/${nombre}/${id}/${lugar}/${registro}/${vigencia}/${qr}`,
      { headers: this.aggAutorizacionHeader() }
    );
  }
}
