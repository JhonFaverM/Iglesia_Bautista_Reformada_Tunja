import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private routerService: Router) { }

  loginUser(user: any){
    return this.httpClient.post("http://localhost:2500/administradores/",user,{headers: {"Content-Type": "application/json"} })
  }

  estoyLogged(){
    return localStorage.getItem('token')? true:false
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.routerService.navigate([''])
  }
}
