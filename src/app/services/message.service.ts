import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Rotation } from 'app/domain/rotation';
import { RequestResult } from 'app/domain/error-details';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  serviceHost = environment.serviceHost;

  constructor(private httpClient: HttpClient) { }

  getActiveRotations(): Observable<Rotation[]> {
    return this.httpClient.get<Rotation[]>(`${this.serviceHost}messages/rotations/active`);
  }

  add(rotation: Rotation): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post<RequestResult>(`${this.serviceHost}messages/rotations/add`, rotation));
  }

  delete(rotation: Rotation): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post<RequestResult>(`${this.serviceHost}messages/rotations/delete`, rotation.id));
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
