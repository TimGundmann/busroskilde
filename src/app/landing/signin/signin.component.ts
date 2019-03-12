import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService, NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  focus;
  focus1;

  signInForm = new FormGroup({
    number: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private notifications: NotificationService,
    private spinner: NgxSpinnerService) { }

  get number(): string {
    return this.signInForm.get('number').value;
  }

  get password(): string {
    return this.signInForm.get('password').value;
  }

  signIn() {
    this.spinner.show();
    this.userService.signIn(this.number, this.password)
      .subscribe(r => {
        if (r.okResult) {
          this.router.navigate(['/home']);
        } else {
          this.notifications.warn('Email eller password passer ikke!');
        }
        this.spinner.hide();
      });
  }

  confirmReset() {
    const modalRef = this.modalService.open(ResetPasswordComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.email = this.number.indexOf('@') > 0 ? this.number : '';
    modalRef.result.then(email => {
      this.spinner.show();
      if (email) {
        this.userService.resetPassword(email)
          .subscribe(result => {
            if (result.okResult) {
              this.notifications.info('En email er sendt!');
            } else {
              this.notifications.error('Fejl ved afsendelse af email!');
            }
          })
      }
      this.spinner.hide();
    });
  }

}
