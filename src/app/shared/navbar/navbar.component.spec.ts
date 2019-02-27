import { HttpClient } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { PlanService } from 'app/services/plan.service';
import { AuthService } from './../../services/auth.service';
import { NotificationService } from './../../services/notification.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { NotificationComponent } from '../notification/notification.component';
import { tokenGetter } from 'app/app.module';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, NotificationComponent],
      imports: [
        RouterTestingModule,
        NgbModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        })
      ],
      providers: [
        NotificationService,
        AuthService,
        PlanService,
        JwtHelperService,
        { provide: HttpClient, useClass: MockHttpClient }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
