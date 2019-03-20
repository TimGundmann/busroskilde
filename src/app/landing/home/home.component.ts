import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private rotuer: Router, private authService: AuthService) { }

  ngOnInit() { }

  scrollToAignUp(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  signin() {
    let route = 'landing/signin'
    if (this.authService.isAuthenticated()) {
      route = 'home';
    }
    this.rotuer.navigate([route]);
  }

}
