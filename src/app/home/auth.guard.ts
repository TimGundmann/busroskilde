import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private authServcie: AuthService ) {}

  canActivate(): boolean {
    if (this.authServcie.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/landing/signin']);
    return false;
  }

}
