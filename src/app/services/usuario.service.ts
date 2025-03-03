import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuario`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  createUsuario(form: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/usuario`, form)
      .pipe(catchError(this.errorHandler.handleError));
  }

}
