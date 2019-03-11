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

  serviceHost = environment.serviceHostUser;
  authHeaderName = environment.authHeaderName;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public currentUserInfo(): Observable<RequestResult<User>> {
    return this.handleResponce(this.httpClient.get<User>(`${this.serviceHost}/current`));
  }

  updatepassword(email: string, password: string): Observable<RequestResult<User>> {
    return this.handleResponce(this.httpClient.post<any>(`${this.serviceHost}/${email}/updatepassword`, password));
  }


  public delete(user: User): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<any>(`${this.serviceHost}/delete`, user));
  }

  public resetPassword(email: string): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<any>(`${this.serviceHost}/${email}/password/reset`, null));
  }

  public newPassword(password: string, token: string): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<any>(`${this.serviceHost}/${token}/password/new`, password));
  }

  public signIn(email: string, password: string): Observable<RequestResult<any>> {
    return this.httpClient.post(`${this.serviceHost}/login`,
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

  getUsers(): Observable<RequestResult<User[]>> {
    return this.handleResponce(this.httpClient.get<User[]>(`${this.serviceHost}/all`));
  }

  public toggleActive(user: User): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}/${user.email}/active/${user.active}`, null));
  }

  public signUp(user: User): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}/bussignup`, user));
  }

  public activat(token: string): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}/activate`, token));
  }

  public update(user: User): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}/update`, user));
  }

  public sendContactMail(content: string): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post(`${this.serviceHost}/contactMail`, content));
  }

  handleResponce<T>(requestObservble: Observable<T>): Observable<RequestResult<T>> {
    return requestObservble
      .pipe(
        map(resp => RequestResult.okResultWith(resp)),
        catchError(error => {
          console.log(error);
          return of(new RequestResult<T>(error.error));
        }
        )
      );
  }

}
