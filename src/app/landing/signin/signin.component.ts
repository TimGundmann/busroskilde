import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService, NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  focus;
  focus1;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private notifications: NotificationService,
    private spinner: NgxSpinnerService) { }

  get email(): string {
    return this.signInForm.get('email').value;
  }

  get password(): string {
    return this.signInForm.get('password').value;
  }

  signIn() {
    this.spinner.show();
    this.userService.signIn(this.email, this.password)
      .subscribe(r => {
        if (r.okResult) {
          this.router.navigate(['/home']);
        } else {
          this.notifications.warn('Email eller password passer ikke!')
        }
        this.spinner.hide();
      });
  }

}
