import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  scrollToAignUp(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}
