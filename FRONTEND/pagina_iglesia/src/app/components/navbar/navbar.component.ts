import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Mobile: boolean = false;
  location: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.location = event.url;
      }
    });
  }

  setMobile(value: boolean): void {
    this.Mobile = value;
  }

}
