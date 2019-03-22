import { ConfirmComponent, confirmDialog } from './../../shared/confirm/confirm.component';
import { AuthService } from './../../services/auth.service';
import { User, roles } from './../../domain/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../list.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  private rolesVisisble = [];

  get roles() {
    return roles;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private authService: AuthService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(result => {
        if (result.okResult) {
          this.users = result.returnValue;
          this.users.forEach(_u => this.rolesVisisble.push(false));
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

  getSelected(user: User): number {
    if (!user.roles) {
      return 0;
    }
    if (user.roles.indexOf(roles[1].role) > -1) {
      return 1
    }
    if (user.roles.indexOf(roles[2].role) > -1) {
      return 2
    }
    return 0;
  }

  isRoleActive(user: User, role: string): boolean {
    return user.roles && user.roles.includes(role);
  }

  changeRole(user: User, role: any) {
    if (role) {
      const index = user.roles.indexOf(role.role);
      if (index > -1) {
        user.roles.splice(index, 1);
      } else {
        user.roles.push(role.role);
      }
      this.userService.update(user)
        .subscribe(result => {
          if (result.errorResult) {
            this.notifications.error('Fejl ved opdatering af brugerns roller, prøv igen senere');
          }
        });
    }
  }

  isRolesVisisble(index: number): boolean {
    return this.rolesVisisble[index];
  }

  toggleRolesVisible(index: number) {
    this.rolesVisisble[index] = !this.rolesVisisble[index];
  }

  delete(user: User) {
    confirmDialog('Konfirmering', 'Er du sikker på at du vil slette "' + user.name + '"?').then(okResult => {
      if (okResult) {
        this.spinner.show();
        this.userService.delete(user)
          .subscribe(result => {
            if (result.okResult) {
              this.ngOnInit();
              this.notifications.info('Brugeren blev slettet "' + user.name + '"!');
            } else {
              this.notifications.error('Fejl ved sletning af bruger information!');
            }
            this.spinner.hide();
          });
      }
    });
  }

}
