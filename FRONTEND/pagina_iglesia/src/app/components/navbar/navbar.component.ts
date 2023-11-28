import { Component, OnInit } from '@angular/core';
//import { RouterLinkActive } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Mobile: boolean = false;
  location: string = '';
  gestionUnoDropdownOpen: boolean = false;


  constructor(private router: Router, public authService: AuthService) {
   }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.location = event.url;
      }
    });
  }

  

  toggleMobile(): void {
    this.Mobile = !this.Mobile;
  }

  toggleGestionUnoDropdown(): void {
    this.gestionUnoDropdownOpen = !this.gestionUnoDropdownOpen;
  }

  closeGestionUnoDropdown(): void {
    this.gestionUnoDropdownOpen = false;
  }

}
