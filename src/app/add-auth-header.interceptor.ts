import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddAuthHeaderInterceptor implements HttpInterceptor {

  authHeaderName = environment.authHeaderName;

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
    const clonedRequest = req.clone({ headers: req.headers.set(this.authHeaderName, this.authService.getToken()) });
    return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
