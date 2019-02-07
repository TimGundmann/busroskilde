import { Component, OnInit } from '@angular/core';
import { NotificationService, UserService } from 'app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  focus: any
  focus1: any

  mailForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private notifications: NotificationService) { }

  ngOnInit() {
  }

  sendMail() {
    this.userService.sendContactMail(
      `Fra: ${this.mailForm.get('name').value} ${this.mailForm.get('from').value}, Indhold: ${this.mailForm.get('content').value}`)
      .subscribe(r => {
        if (r) {
          this.notifications.info('Beskeden er sendt!');
          this.clear();
        } else {
          this.notifications.error('Fejl ved afsendelse af beskeden!');
        }
      });
  }

  private clear() {
    this.mailForm.get('name').setValue('');
    this.mailForm.get('from').setValue('');
    this.mailForm.get('content').setValue('');
  }

}
