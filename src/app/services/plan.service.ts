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

  serviceHost = environment.serviceHostPlan;

  constructor(private httpClient: HttpClient) { }

  getActivePlansByCategory(category: Category): Observable<RequestResult<Plan[]>> {
    return this.handleResponce(this.httpClient.get<Plan[]>(`${this.serviceHost}/${category.name}/active`));
  }

  getCategory(name: string): Observable<RequestResult<Category>> {
    return this.handleResponce(this.httpClient.get<Category>(`${this.serviceHost}/categories/${name}`));
  }

  getCategories(): Observable<RequestResult<Category[]>> {
    return this.handleResponce(this.httpClient.get<Category[]>(`${this.serviceHost}/categories`));
  }

  add(plan: Plan): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<RequestResult<any>>(`${this.serviceHost}/add`, plan));
  }

  updateFrom(id: String, from: Date): Observable<RequestResult<any>> {
    return this.handleResponce(
      this.httpClient.post<RequestResult<void>>(`${this.serviceHost}/${id}/from/${from}`, null));
  }

  updateTo(id: String, to: Date): Observable<RequestResult<any>> {
    return this.handleResponce(
      this.httpClient.post<RequestResult<void>>(`${this.serviceHost}/${id}/to/${to}`, null));
  }

  delete(plan: Plan): Observable<RequestResult<any>> {
    return this.handleResponce(this.httpClient.post<RequestResult<void>>(`${this.serviceHost}/delete`, plan.id));
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
