import { UserService } from './../../services/user.service';
import { User } from './../../domain/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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

    constructor(private userService: UserService, private notifications: NotificationService) { }

    get number(): string {
        return this.signUpForm.get('number').value;
    }

    get name(): string {
        return this.signUpForm.get('name').value;
    }

    get email(): string {
        return this.signUpForm.get('email').value;
    }

    get password(): string {
        return this.signUpForm.get('password1').value;
    }

    ngOnInit() { }

    register() {
        if (this.validatePassword()) {
            this.userService.signUp(this.getUser()).subscribe(r => {
                if (r) {
                    this.notifications.info('Du er nu oprettet og en email er sendt til administratoren!');
                    this.signUpForm.reset();
                } else {
                    this.notifications.error('Der opstod en fejl prøv igen senere!');
                }
            });
        } else {
            this.notifications.error('De to password er ikke ens, ret dem og prøv igen!');
        }
    }

    private getUser(): User {
        return { number: this.number, email: this.email, name: this.name, password: this.password };
    }

    private validatePassword(): boolean {
        return this.password === this.signUpForm.get('password2').value;
    }

}
