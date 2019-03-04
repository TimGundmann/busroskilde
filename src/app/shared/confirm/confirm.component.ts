import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  @Input() title: string;

  constructor(public activeModal: NgbActiveModal) { }

  ok() {
      this.activeModal.close(true);
  }

  cancel() {
      this.activeModal.close(false);
  }

}
