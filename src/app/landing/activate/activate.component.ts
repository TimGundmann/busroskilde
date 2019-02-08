import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  message = 'Brugeren er aktiveret!';

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.userService.activat(params['token'])
          .subscribe(r => {
            if (!r.okResult) {
              this.message = 'Fejl ved aktivering af brugeren!';
            }
          });
   });
  }

}
