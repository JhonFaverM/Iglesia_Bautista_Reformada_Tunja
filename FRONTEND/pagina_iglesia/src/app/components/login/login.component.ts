import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private routerService: Router
  ) { 
    // Inicializar el formulario reactivo
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          if ((res as any).token) {
            localStorage.setItem('token', (res as any).token);
            this.routerService.navigate(['/gestionUno']);
            this.loginForm.reset();
          } else {
            Swal.fire({
              title: 'Error',
              text: (res as any).msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Error en la conexión con el servidor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        },
        complete: () => {
        this.loginForm.reset();
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Formulario inválido, por favor verifica tus datos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
