import { ServiceLocator } from './../service-locator';
import { Component, Input, Injector } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export function confirmDialog(title: string): Promise<any> {
  const modalService = ServiceLocator.injector.get(NgbModal);
  const modalRef = modalService.open(ConfirmComponent);
  modalRef.componentInstance.title = title;
  return modalRef.result;
}


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
