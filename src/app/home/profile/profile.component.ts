import { Category } from 'app/domain/plan';
import { AuthService } from './../../services/auth.service';
import { CropModalComponent } from './crop-modal/crop-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'app/domain/user';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'app/services';
import { Router } from '@angular/router';
import { PlanService } from 'app/services/plan.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;

    user: User = { email: '' };

    editMode = false;

    categories = [];

    constructor(
        private planService: PlanService,
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private notifications: NotificationService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.userService.currentUserInfo()
            .subscribe(userResult => {
                if (userResult.okResult) {
                    this.user = userResult.returnValue;
                    this.planService.getCategories()
                        .subscribe(result => {
                            if (result.okResult) {
                                this.filleSelection(result.returnValue);
                            } else {
                                this.notifications.error('Fejl ved henting af kategori information!');
                            }
                        });
                } else {
                    this.notifications.error('Fejl ved henting af bruger information!');
                }
            });
    }

    setPicture(event) {
        const modalRef = this.modalService.open(CropModalComponent);
        modalRef.componentInstance.imageChangedEvent = event;
        modalRef.componentInstance.user = this.user;
        modalRef.componentInstance.closeModel.subscribe(_close => {
            this.fileInput.nativeElement.value = '';
        });
    }

    confirmDelete() {
        const modalRef = this.modalService.open(ConfirmComponent);
        modalRef.componentInstance.user = this.user;
    }

    getPicture(): string {
        if (this.user.picture) {
            return this.user.picture;
        }
        return './assets/img/emptyphoto.jpg';
    }

    changeState(category: Category) {
        const index = this.user.notifications.indexOf(category.name);
        if (index > -1) {
            this.user.notifications.splice(index, 1);
        } else {
            this.user.notifications.push(category.name);
        }

        this.userService.update(this.user).subscribe(result => {
            if (result.errorResult) {
                this.notifications.error('Fejl ved opdatering af bruger informationen!');
            }
        });
    }

    private filleSelection(categories: Category[]): any {
        categories.forEach(c =>
            this.categories.push({ category: c, selected: this.user.notifications.indexOf(c.name) > -1 }))
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
