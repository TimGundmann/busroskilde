import { UserService } from 'app/services';
import { HttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SvgDefsComponent } from './shared/svg-defs/svg-defs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationComponent } from './shared/notification/notification.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { tokenGetter } from './app.module';
import { of } from 'rxjs';

describe('AppComponent', () => {

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        SvgDefsComponent,
        NotificationComponent
      ],
      imports: [
        NgxSpinnerModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        }),
      ],
      providers: [
        UserService,
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
