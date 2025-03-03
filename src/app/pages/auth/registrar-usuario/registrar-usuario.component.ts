import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit{

  formUsuario!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
   this.formUsuario = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(5)]]
   })
  }

  createUsuario(){
    this.formSubmitted = true;

    if(this.formUsuario.invalid){
      console.log('Formulario invalido')
      return;
    }

    const { ...getValues} = this.formUsuario.value;

    const newForm:Usuario = {
      ...getValues
    }

     this.usuarioService.createUsuario(newForm).subscribe({
      next: () =>{
        console.log("Se creo Usuario",newForm);
        this.formSubmitted = false;
        this.formUsuario.reset();
      },
      error: err => console.error('Error al crear Usuario',err)
    })
  }

}
