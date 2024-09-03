import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://iglesia-bautista-reformada-tunja-2.onrender.com';

  constructor(private httpClient: HttpClient, private routerService: Router) {}

  loginUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/administradores/login`, user, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  isLoggedIn() {
    return localStorage.getItem('token')? true:false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.routerService.navigate(['/home']);
  }

  
}
