import { ErrorDetails, RequestResult } from '../domain/error-details';
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

  public currentUserInfo(): Observable<User | ErrorDetails> {
    return this.httpClient.get<User>(`${this.serviceHost}users/current`);
  }

  public signIn(email: string, password: string): Observable<RequestResult> {
    return this.httpClient.post(`${this.serviceHost}users/login`,
      `{ "username": "${email}", "password": "${password}" }`, { observe: 'response' })
      .pipe(
        map(resp => {
          const token = resp.headers.get(this.authHeaderName);
          if (token) {
            this.authService.setToken(token);
            return new RequestResult();
          }
          return new RequestResult(new ErrorDetails());
        }),
        catchError(error => {
          console.log(error);
          return of(new RequestResult(error));
        }
        )
      );
  }

  public signUp(user: User): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}users/bussignup`, user));
  }

  public activat(token: string): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}users/activate`, token));
  }

  public sendContactMail(content: string): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}users/contactMail`, content));
  }

  handleResponce(requestObservble: Observable<Object>): Observable<RequestResult> {
    return requestObservble
      .pipe(
        map(_resp => new RequestResult()),
        catchError(error => {
          console.log(error);
          return of(new RequestResult(error.error));
        }
        )
      );
  }

}
