import { Category } from './../../domain/plan';
import { PlanService } from 'app/services/plan.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from 'app/services';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    categories: Category[];

    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        public location: Location,
        private element: ElementRef,
        private authService: AuthService,
        private router: Router,
        private planService: PlanService,
        private notifcations: NotificationService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.planService.getCategories()
            .subscribe(result => {
                if (result.okResult) {
                    this.categories = result.returnValue;
                } else {
                    this.notifcations.error('Fejl ved hentning af menuen, prøv at genopfriske siden!');
                }
            });
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isHome() {
        return this.location.path(false).indexOf('home') > 0;
    }

    isDocumentation() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        } else {
            return false;
        }
    }

    getSignInTitle(): string {
        if (this.authService.isAuthenticated()) {
            return 'Log ud';
        }
        return 'Log ind';
    }

    signInOrOut() {
        if (this.authService.isAuthenticated()) {
            this.authService.signOut();
            this.router.navigate(['/landing']);
        } else {
            this.router.navigate(['/signin'])
                .catch(e => {
                    console.log(e);
                    this.router.navigate(['/signin']);
                });
        }
    }

    public isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

}
