import { Component, OnInit } from '@angular/core';
import { NotificationService, UserService } from 'app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  focus: any
  focus1: any

  mailForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private notifications: NotificationService,
    private spinner: NgxSpinnerService) { }

  get name(): any {
    return this.mailForm.get('name');
  }

  get from(): any {
    return this.mailForm.get('from');
  }

  get content(): any {
    return this.mailForm.get('content');
  }

  hasError(control): boolean {
    return control.invalid && (control.dirty || control.touched) && control.errors.required
  }

  sendMail() {
    this.spinner.show()
    this.userService.sendContactMail(
      `Fra: ${this.mailForm.get('name').value} ${this.mailForm.get('from').value}, Indhold: ${this.mailForm.get('content').value}`)
      .subscribe(r => {
        if (r.okResult) {
          this.notifications.info('Beskeden er sendt!');
          this.mailForm.reset();
        } else {
          this.notifications.error(`Fejl ved afsendelse af beskeden! ${r.errorDetails.message}`);
        }
        this.spinner.hide();
      });
  }

}
