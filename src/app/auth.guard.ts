import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private authServcie: AuthService ) {}

  canActivate(): boolean {
    if (this.authServcie.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }

}
