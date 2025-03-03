import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/auth/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuarioComponent } from './pages/auth/registrar-usuario/registrar-usuario.component';
import { TaskComponent } from './pages/home/task/task.component';
import { AuthGuard } from './guards/auth.guard';
import { ListTaskComponent } from './pages/home/list-task/list-task.component';
import { RegistrarTaskComponent } from './pages/home/registrar-task/registrar-task.component';
import { ActualizarTaskComponent } from './pages/home/actualizar-task/actualizar-task.component';
import { NoAuthGuard } from './guards/no-auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: IniciarSesionComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'registrar',
    component: RegistrarUsuarioComponent
  },
  {
    path:'home',
    component: TaskComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListTaskComponent
      },
      {
        path: 'registrar',
        component: RegistrarTaskComponent
      },
      {
        path: 'actualizar/:id',
        component: ActualizarTaskComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
