import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  constructor(private rotuer: Router, private authService: AuthService) { }

  ngOnInit() { }

  scrollToAignUp(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  signin() {
    let route = 'signin'
    if (this.authService.isAuthenticated()) {
      route = 'home';
    }
    this.rotuer.navigate([route]);
  }

}
