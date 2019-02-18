import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plan, Category } from 'app/domain/plan';
import { RequestResult } from 'app/domain/error-details';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  serviceHost = environment.serviceHost;

  constructor(private httpClient: HttpClient) { }

  getActivePlansByCategory(category: Category): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(`${this.serviceHost}plans/${category.name}/active`);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.serviceHost}plans/categories`);
  }

  add(plan: Plan): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post<RequestResult>(`${this.serviceHost}plans/add`, plan));
  }

  updateFrom(id: String, from: Date): Observable<RequestResult> {
    return this.handleResponce(
      this.httpClient.post<RequestResult>(`${this.serviceHost}plans/${id}/from/${from}`, null));
  }

  updateTo(id: String, to: Date): Observable<RequestResult> {
    return this.handleResponce(
      this.httpClient.post<RequestResult>(`${this.serviceHost}plans/${id}/to/${to}`, null));
  }

  delete(plan: Plan): Observable<RequestResult> {
    return this.handleResponce(this.httpClient.post<RequestResult>(`${this.serviceHost}plans/delete`, plan.id));
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
