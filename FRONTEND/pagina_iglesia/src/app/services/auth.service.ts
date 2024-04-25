import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private routerService: Router) { }

  loginUser(user: any){
    return this.httpClient.post("http://localhost:2500/administradores/login",user,{headers: {"Content-Type": "application/json"} })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.routerService.navigate([''])
  }
}


/* 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private routerService: Router) { }

  loginUser(user: any){
    return this.httpClient.post("http://localhost:2500/administradores/login",user,{headers: {"Content-Type": "application/json"} })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.routerService.navigate([''])
  }
}

*/