import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAuthHeaderInterceptor } from './add-auth-header.interceptor';
import { NotificationComponent } from './shared/notification/notification.component';
import { LandingModule } from './landing/landing.module';
import { environment } from './../environments/environment';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HomeModule } from './home/home.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDa from '@angular/common/locales/da';
import { SvgDefsComponent } from './shared/svg-defs/svg-defs.component';

registerLocaleData(localeDa, 'da');

const authTokenName = environment.authTokenName;

export function tokenGetter() {
  return localStorage.getItem(authTokenName);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotificationComponent,
    SvgDefsComponent,
  ],
  imports: [
    NgxSpinnerModule,
    LandingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
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
    {provide: LOCALE_ID, useValue: 'da' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
