import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Task } from '../../../interfaces/task';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-actualizar-task',
  templateUrl: './actualizar-task.component.html',
  styleUrl: './actualizar-task.component.css'
})
export class ActualizarTaskComponent implements OnInit {

  formTaskUpdate!: FormGroup;
  formSubmitted: boolean = false;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getTaskIdFromRoute();
    this.getTask();
  }

  getTaskIdFromRoute() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
  }

  getTask() {
    this.taskService.TaskById(this.taskId).subscribe(task => {
      const fecha = new Date(task.fechaVencimiento);
      fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset()); 
  
      this.formTaskUpdate.patchValue({
        ...task,
        fechaVencimiento: fecha.toISOString().split('T')[0] 
      });
    });
  }
  

  initForm() {
    this.formTaskUpdate = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      fechaVencimiento: ['', Validators.required],
      estado: ['', Validators.required]
    })
  }


  actualizarTask() {
    this.formSubmitted = true;

    if (this.formTaskUpdate.invalid) {
      console.log('Formulario invalido')
      return;
    }

    const { usuarioId, fechaVencimiento, ...formValues } = this.formTaskUpdate.value;

    const userId = this.authService.getUserIdFromToken();

    const newTask: Task = {

      ...formValues,
      id: this.taskId,
      fechaVencimiento: new Date(this.formTaskUpdate.value.fechaVencimiento).toISOString(),
      usuarioId: userId
    }
    this.taskService.updateTask(newTask).subscribe({
      next: () =>{
        this.formSubmitted = false;
        this.routeHome();
      },
      error: err => console.error('No se actualo task',err)
    })
  }

  routeHome() {
    this.router.navigate(['home']);
  }
}
