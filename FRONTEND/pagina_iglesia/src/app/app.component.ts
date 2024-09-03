import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


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
      this.authService.logoutUser();
      alert('Tu sesión ha expirado debido a inactividad.');
      this.router.navigate(['/home']);
    }, 10 * 60 * 1000); // 10 minutos de inactividad
  }

}
