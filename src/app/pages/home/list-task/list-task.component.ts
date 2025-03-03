import { Component } from '@angular/core';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent {
 tasks: Task[] = [];


  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.loadTaskByUser();
  }

  loadTaskByUser(){

    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('No se encontró el ID del usuario');
      return;
    }

    this.taskService.allTaskById(userId).subscribe({
      next: (data) =>{
        this.tasks = data;
      },
      error: err => console.error("Error getting task",err)
    });
  }

  deleteTask(id:number){
    if (!id){
      console.log('Not exits id')
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        console.log('Se elimino Task', id);
        this.loadTaskByUser();
      },
      error: err => console.error('Error en eliminar',err)
    })
  }
}
