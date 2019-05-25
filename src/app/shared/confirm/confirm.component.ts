import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceLocator } from './../service-locator';

export function confirmDialog(title: string, text: string): Promise<any> {
  const modalService = ServiceLocator.injector.get(NgbModal);
  const modalRef = modalService.open(ConfirmComponent, {ariaLabelledBy: 'modal-basic-title'});
  modalRef.componentInstance.title = title;
  modalRef.componentInstance.text = text;
  return modalRef.result;
}


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  @Input() title: string;
  @Input() text: string;

  constructor(public activeModal: NgbActiveModal) { }

  ok() {
      this.activeModal.close(true);
  }

  cancel() {
      this.activeModal.close(false);
  }

}
