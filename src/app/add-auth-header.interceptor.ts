import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddAuthHeaderInterceptor implements HttpInterceptor {

  authHeaderName = environment.authHeaderName;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      req = req.clone({ headers: req.headers.set(this.authHeaderName, this.authService.getToken()) });
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {

      },
       (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            this.authService.signOut();
            this.router.navigate(['/signin']);
          }
      }
    }));
  }
}
