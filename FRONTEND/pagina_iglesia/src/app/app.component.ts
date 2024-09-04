import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pagina_iglesia';
  timeout: any;

  constructor(private authService: AuthService, private router: Router) {
    this.resetTimeout();
  }

  @HostListener('window:mousemove')
  @HostListener('window:keypress')
  resetTimeout() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.authService.isLoggedIn()) {
        this.authService.logoutUser();
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Tu sesión ha expirado debido a inactividad.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
    }, 10 * 60 * 1000); // 10 minutos de inactividad
  }
}
