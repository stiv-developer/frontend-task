import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  allTaskById(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks/user/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  TaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  createTask(form: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, form)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateTask(form: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${form.id}`, form)
      .pipe(catchError(this.errorHandler.handleError));
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${environment.apiUrl}/tasks/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

}
