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
    return this.httpClient.get<User>(`${this.serviceHost}current`);
  }

  public signIn(email: string, password: string): Observable<RequestResult> {
    return this.httpClient.post(`${this.serviceHost}login`,
      `{ "username": "${email}", "password": "${password}" }`, { observe: 'response' })
      .pipe(
        map(resp => {
          this.authService.setToken(resp.headers.get(this.authHeaderName));
          return new RequestResult();
        }),
        catchError(error => {
          console.log(error);
          return of(new RequestResult(error));
        }
        )
      );
  }

  public signUp(user: User): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}bussignup`, user));
  }

  public activat(token: string): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}activate`, token));
  }

  public sendContactMail(content: string): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}contactMail`, content));
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
