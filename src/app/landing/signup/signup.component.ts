import { UserService } from './../../services/user.service';
import { User } from './../../domain/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    focus;
    focus1;
    focus2;
    focus3;
    focus4;

    signUpForm = new FormGroup({
        number: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password1: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
    });

    constructor(
        private userService: UserService,
        private notifications: NotificationService,
        private spinner: NgxSpinnerService) { }

    get number(): any {
        return this.signUpForm.get('number');
    }

    get name(): any {
        return this.signUpForm.get('name');
    }

    get email(): any {
        return this.signUpForm.get('email');
    }

    get password(): any {
        return this.signUpForm.get('password1');
    }

    hasError(control): boolean {
        return control.invalid && (control.dirty || control.touched) && control.errors.required
    }

    register() {
        if (this.validatePassword()) {
            this.spinner.show();
            this.userService.signUp(this.getUser()).subscribe(r => {
                if (r.okResult) {
                    this.notifications.info('Du er nu oprettet og en email er sendt til administratoren!');
                    this.signUpForm.reset();
                } else {
                    this.notifications.error(`Der opstod en fejl: ${r.errorDetails.message}`);
                }
                this.spinner.hide();
            });
        } else {
            this.notifications.error('De to password er ikke ens, ret dem og prøv igen!');
        }
    }

    private getUser(): User {
        return { number: this.number.value, email: this.email.value, name: this.name.value, password: this.password.value };
    }

    private validatePassword(): boolean {
        return this.password.value === this.signUpForm.get('password2').value;
    }

}
