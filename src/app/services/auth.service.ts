import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authTokenName = environment.authTokenName;

  constructor(private jwtService: JwtHelperService) { }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return !this.jwtService.isTokenExpired(this.getToken());
    }
    return false;
  }

  public isAdmin(): boolean {
    return this.getToken() && decode(this.getToken()).roles && decode(this.getToken()).roles.indexOf('ROLE_ADMIN') >= 0;

  }

  public getToken(): string {
    return localStorage.getItem(this.authTokenName);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.authTokenName, token);
  }

  public signOut(): void {
    localStorage.removeItem(this.authTokenName);
  }

}
