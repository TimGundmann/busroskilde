import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serviceHost = environment.serviceHost;
  authHeaderName = environment.authHeaderName;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public currentUserInfo(): Observable<User> {
    return this.httpClient.get<User>(`${this.serviceHost}current`);
  }

  public signIn(email: string, password: string): Observable<boolean> {
    return this.httpClient.post(`${this.serviceHost}login`,
      `{ "username": "${email}", "password": "${password}" }`, { observe: 'response' })
      .pipe(
        map(resp => {
          this.authService.setToken(resp.headers.get(this.authHeaderName));
          return true;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        }
        )
      );
  }

  public signUp(user: User): Observable<boolean> {
    return this.httpClient.post(`${this.serviceHost}bussignup`, user)
      .pipe(
        map(resp => true),
        catchError(error => {
          console.log(error);
          return of(false);
        }
        )
      );
  }

  public activat(token: string): Observable<boolean> {
    return this.httpClient.post(`${this.serviceHost}activate`, token)
      .pipe(
        map(resp => true),
        catchError(error => {
          console.log(error);
          return of(false);
        }
        )
      );
  }

  public sendContactMail(content: string): Observable<boolean> {
    return this.httpClient.post(`${this.serviceHost}contactMail`, content)
      .pipe(
        map(resp => true),
        catchError(error => {
          console.log(error);
          return of(false);
        }
        )
      );
  }

}
