import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {


  formAuth!: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formAuth = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]], // ✅ CORRECTO
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  iniciarSesion() {

    console.log('form', this.formAuth.value)

    if (this.formAuth.invalid) {
      console.log('Formulario inválido');
      this.loginError = true;
      return;
    }

    const form = this.formAuth.value;



    this.authService.auth(form).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);

        console.log(data.token)

        if (!data.token) {
          console.error('No se recibió token');
          this.loginError = true;
          return;
        }

        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
        this.loginError = false;
      },
      error: err => {
        console.log('Error al ingresar', err)
        this.loginError = true;
      }

    });

  }
}
