import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  focus = true;

  @Input() email: string;

  constructor(public activeModal: NgbActiveModal) { }

  ok() {
      this.activeModal.close(this.email);
  }

  cancel() {
      this.activeModal.close(undefined);
  }

}
