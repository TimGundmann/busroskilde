import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  focus;
  focus1;

  token: string;

  newPasswordForm = new FormGroup({
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notifications: NotificationService,
    private rotuer: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.token = params['token'];
      });
  }

  get password1(): string {
    return this.newPasswordForm.get('password1').value;
  }

  get password2(): string {
    return this.newPasswordForm.get('password2').value;
  }

  changePassword() {
    if (this.passwordsMatch()) {
      this.userService.newPassword(this.token, this.password1).subscribe(result => {
        if (result.okResult) {
          this.notifications.info('Password er nu opdateret!', true);
          this.rotuer.navigate(['/landing/signin']);
        } else {
          this.notifications.error('Der sket en fejl ved opdatering af password!');
        }
      });
    } else {
      this.notifications.warn('De to passwords matcher ikke!');
    }
  }

  private passwordsMatch(): boolean {
    return this.password1 === this.password2;
  }

}
