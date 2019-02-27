import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { tokenGetter } from 'app/app.module';

describe('UserService', () => {

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: MockHttpClient },
      AuthService,
      JwtHelperService
    ],
    imports: [
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['gundmann.dk'],
        }
      }),
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
