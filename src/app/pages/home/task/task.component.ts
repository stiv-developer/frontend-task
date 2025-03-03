import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  constructor(
    private router: Router
  ){}

  salir() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}



