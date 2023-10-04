import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datosLogin = {
    email: "",
    pass: ""
  }

  constructor(private authService: AuthService, private routerService: Router,private toastr: ToastrService) { }



  ngOnInit(): void {
  }

  login() {
    console.log(this.datosLogin)
    this.authService.loginUser(this.datosLogin).subscribe((res) => {
      if ((res as any).token) {
        localStorage.setItem('token', (res as any).token)
        this.routerService.navigate(['/dashboard'])
      }else{
        this.toastr.error((res as any).msg, 'Error!');
      }
    })
  }

}

//[formGroup]="miFormulario" (ngSubmit)="submitForm()"
