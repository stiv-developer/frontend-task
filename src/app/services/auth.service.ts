import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  auth(form: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, form)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }
}
