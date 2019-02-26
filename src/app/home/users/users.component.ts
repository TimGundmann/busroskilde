import { AuthService } from './../../services/auth.service';
import { User } from './../../domain/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(result => this.users = result.returnValue);
  }

  changeState(user: User) {
    this.userService.toggleActive(user).subscribe();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getPicture(user: User): string {
    if (user.picture) {
      return user.picture;
    }
    return '/assets/img/emptyphoto.jpg';
  }

}
