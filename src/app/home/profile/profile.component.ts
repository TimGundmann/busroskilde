import { AuthService } from './../../services/auth.service';
import { CropModalComponent } from './crop-modal/crop-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'app/domain/user';
import { useAnimation } from '@angular/animations';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'app/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;

    user: User = { email: '' };

    editMode = false;

    constructor(
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private notifications: NotificationService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.spinner.show();
        this.userService.currentUserInfo()
            .subscribe(result => {
                if (result.okResult) {
                    this.user = result.returnValue;
                } else {
                    this.notifications.error('Fejl ved henting af bruger information!');
                }
                this.spinner.hide();
            });
    }

    setPicture(event) {
        const modalRef = this.modalService.open(CropModalComponent);
        modalRef.componentInstance.imageChangedEvent = event;
        modalRef.componentInstance.user = this.user;
        modalRef.componentInstance.closeModel.subscribe(_close => {
            this.fileInput.nativeElement.value = '';
            console.log('close');
        });
    }

    confirmDelete() {
        const modalRef = this.modalService.open(ConfirmComponent);
        modalRef.componentInstance.user = this.user;
    }

}

@Component({
    selector: 'app-confirm',
    template:
        `<div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title" id="myModalLabel">Er du sikker på at du vil slettes fra BusRoskilde?</h6>
            </div>
            <div class="modal-footer center" style="padding: 10px">
                <button type="button" class="btn btn-success btn-lg btn-fill" (click)="delete()">Ja</button>
                <button type="button" class="btn btn-neutral btn-lg btn-fill btn-outline-neutral" (click)="cancel()">Nej</button>
            </div>
        </div>`,
        styleUrls: ['./profile.component.scss']
})
export class ConfirmComponent {

    @Input() user: User = { email: '' };

    constructor(
        public activeModal: NgbActiveModal,
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private notifications: NotificationService,
        private rotuer: Router,
        private authService: AuthService) { }

    delete() {
        this.spinner.show();
        this.userService.delete(this.user)
            .subscribe(result => {
                this.spinner.hide();
                this.activeModal.close();
                if (result.okResult) {
                    this.authService.signOut();
                    this.rotuer.navigate(['/landing']);
                } else {
                    this.notifications.error('Fejl ved sletning af bruger information!');
                }
            });
    }

    cancel() {
        this.activeModal.close();
    }

}
