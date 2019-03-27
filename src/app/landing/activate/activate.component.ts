import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.userService.activate(params['token'])
          .subscribe(r => {
            if (r.okResult) {
              this.notifications.success('Brugeren er aktiveret!', true);
            } else {
              this.notifications.error('Fejl ved aktivering af brugeren!', true);
            }
            this.router.navigate(['home', 'users']);
          });
   });
  }

}
