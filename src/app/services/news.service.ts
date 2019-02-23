import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from 'app/domain/news';
import { RequestResult } from 'app/domain/error-details';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  serviceHost = environment.serviceHostNews;

  constructor(private httpClient: HttpClient) { }

  get(): Observable<RequestResult<News[]>> {
    return this.handleResponce(this.httpClient.get<News[]>(`${this.serviceHost}/all`));
  }

  set(news: News): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<any>(`${this.serviceHost}/update`, news));
  }

  delete(news: News): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<any>(`${this.serviceHost}/delete/${news.id}`, null));
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
