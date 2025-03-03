import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './pages/auth/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuarioComponent } from './pages/auth/registrar-usuario/registrar-usuario.component';
import { TaskComponent } from './pages/home/task/task.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarTaskComponent } from './pages/home/registrar-task/registrar-task.component';
import { ActualizarTaskComponent } from './pages/home/actualizar-task/actualizar-task.component';
import { ListTaskComponent } from './pages/home/list-task/list-task.component';

// REACTIVE FORM
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarUsuarioComponent,
    TaskComponent,
    RegistrarTaskComponent,
    ActualizarTaskComponent,
    ListTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule],
    
  providers: [
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
