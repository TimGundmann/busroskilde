import { FormGroup, FormControl, Validators } from '@angular/forms';
import { confirmDialog } from './../../shared/confirm/confirm.component';
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

    focus;
    focus1;

    newPasswordForm = new FormGroup({
        password1: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
    });

    constructor(
        private planService: PlanService,
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private notifications: NotificationService,
        private modalService: NgbModal,
        private rotuer: Router,
        private authService: AuthService) { }

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
        confirmDialog('Konfirmering', 'Er du sikker på at du vil slettes fra BusRoskilde?').then(okResult => {
            if (okResult) {
                this.spinner.show();
                this.userService.delete(this.user)
                    .subscribe(result => {
                        this.spinner.hide();
                        if (result.okResult) {
                            this.authService.signOut();
                            this.rotuer.navigate(['/landing']);
                        } else {
                            this.notifications.error('Fejl ved sletning af bruger information!');
                        }
                    });
            }
        });
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

    get password1(): string {
        return this.newPasswordForm.get('password1').value;
    }

    get password2(): string {
        return this.newPasswordForm.get('password2').value;
    }

    changePassword() {
        if (this.passwordsMatch()) {
            this.userService.updatepassword(this.user.email, this.password1).subscribe(result => {
                if (result.okResult) {
                    this.notifications.info('Password er nu opdateret!', true);
                    this.newPasswordForm.reset();
                } else {
                    this.notifications.error('Der sket en fejl ved opdatering af password!');
                }
            });
        } else {
            this.notifications.warn('De to passwords matcher ikke!');
        }
    }

    private passwordsMatch(): boolean {
        return this.password1 === this.password2;
    }

    private filleSelection(categories: Category[]): any {
        this.categories.push({ category: { name: 'Nyheder' }, selected: this.user.notifications.indexOf('Nyheder') > -1 });
        categories.forEach(c =>
            this.categories.push({ category: c, selected: this.user.notifications.indexOf(c.name) > -1 }))
    }

}
