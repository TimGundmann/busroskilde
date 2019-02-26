import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'app/domain/user';
import { UserService, NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-crop-modal',
  templateUrl: './crop-modal.component.html',
  styleUrls: ['./crop-modal.component.scss']
})
export class CropModalComponent {

  @Output() closeModel = new EventEmitter();
  @Input() imageChangedEvent: any = '';
  @Input() user: User;
  croppedImage: string;


  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private notifcations: NotificationService,
    private spinner: NgxSpinnerService) { }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  save() {
    this.spinner.show();
    this.user.picture = this.croppedImage;
    this.userService.update(this.user)
      .subscribe(result => {
        if (result.errorResult) {
          this.notifcations.error('Fejl ved opdatering af brugeren!');
        }
        this.spinner.hide();
        this.close();
      });
  }

  loadImageFailed() {
    this.notifcations.error('Fejl ved tilpasning af billedet!');
  }

  cancel() {
    this.close();
  }

  private close() {
    this.activeModal.close('Close click');
    this.croppedImage = undefined;
    this.imageChangedEvent = '';
    this.closeModel.emit();
  }
}
