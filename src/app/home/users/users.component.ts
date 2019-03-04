import { ConfirmComponent } from './../../shared/confirm/confirm.component';
import { AuthService } from './../../services/auth.service';
import { User } from './../../domain/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  options = [
    { displayName: 'Bruger', role: '' },
    { displayName: 'Superbruger', role: 'SUPER' },
    { displayName: 'Administrator', role: 'ADMIN' }
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(result => {
        if (result.okResult) {
          this.users = result.returnValue;
        } else {
          this.notifications.error('Fejl ved hentning af bruger, prøv igen senere');
        }
      });
  }

  changeState(user: User) {
    this.userService.toggleActive(user)
      .subscribe(result => {
        if (result.errorResult) {
          this.notifications.error('Fejl ved aktivering af bruger, prøv igen senere');
        }
      });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getPicture(user: User): string {
    if (user.picture) {
      return user.picture;
    }
    return './assets/img/emptyphoto.jpg';
  }

  changeRole(user: User, event: any) {
    if (event.target.selectedIndex > 0) {
      user.roles = [this.options[event.target.selectedIndex].role];
    } else {
      user.roles = [];
    }
    this.userService.update(user)
      .subscribe(result => {
        if (result.errorResult) {
          this.notifications.error('Fejl ved opdatering af brugerns roller, prøv igen senere');
        }
      });
  }

  getSelected(user: User): number {
    if (!user.roles) {
      return 0;
    }
    if (user.roles.indexOf(this.options[1].role) > -1) {
      return 1
    }
    if (user.roles.indexOf(this.options[2].role) > -1) {
      return 2
    }
    return 0;
  }

  delete(user: User) {
    const modalRef = this.modalService.open(ConfirmComponent);
    modalRef.componentInstance.title = 'Er du sikker på at du vil slette brugeren?';
    modalRef.result.then(okResult => {
      if (okResult) {
          this.spinner.show();
          this.userService.delete(user)
              .subscribe(result => {
                  if (result.errorResult) {
                      this.notifications.error('Fejl ved sletning af bruger information!');
                  }
                  this.spinner.hide();
              });
      }
  });
}

}
