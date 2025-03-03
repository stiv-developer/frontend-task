import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../interfaces/task';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registrar-task',
  templateUrl: './registrar-task.component.html',
  styleUrl: './registrar-task.component.css'
})
export class RegistrarTaskComponent implements OnInit{

  formTask!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formTask = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      fechaVencimiento: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  createTask(){
    this.formSubmitted = true;

    if (this.formTask.invalid) {
      console.log('Formulario invalido')
      console.log(this.formTask.value)
      return;
    }

    const { usuarioId, fechaVencimiento, ...formValues } = this.formTask.value;

    const userId = this.authService.getUserIdFromToken();

    const newTask: Task = {
      ...formValues,
      fechaVencimiento: new Date(this.formTask.value.fechaVencimiento).toISOString(),
      usuarioId: userId
    }
    this.taskService.createTask(newTask).subscribe({
      next: () => {
        console.log("Se registro Task",newTask);
        this.formSubmitted = false;
        this.routeHome();
      },
      error: err => console.log('No se registro task', err)
    });
  }

  routeHome(){
    this.router.navigate(['home']);
  }

}
