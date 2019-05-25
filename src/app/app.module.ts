import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDa from '@angular/common/locales/da';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from './../environments/environment';
import { AddAuthHeaderInterceptor } from './add-auth-header.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ServiceLocator } from './shared/service-locator';
import { SharedModule } from './shared/shared.module';



registerLocaleData(localeDa, 'da');

const authTokenName = environment.authTokenName;

export function tokenGetter() {
  return localStorage.getItem(authTokenName);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['gundmann.dk'],
      }
    })

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthHeaderInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'da' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
