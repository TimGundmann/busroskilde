import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { UserService } from './user.service';
import { tokenGetter } from 'app/app.module';

describe('UserService', () => {

  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        JwtHelperService,
        UserService
      ],
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        }),
      ]
    });
    service = getTestBed().get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be base 64 encrypted password when sign in', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // given
    const passwordBas64 = btoa('APassword');

    // when
    service.signIn('Test', 'APassword').subscribe(r => {
      expect(r.okResult).toBeTruthy();
    });

    // then
    const req = httpMock.expectOne(jasmine.any(String));
    expect(req.request.body).toContain(passwordBas64);
  }));

  it('should be base 64 encrypted password it is changed', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // given
    const passwordBas64 = btoa('APassword');

    // when
    service.updatepassword('Test', 'APassword').subscribe(r => {
      expect(r.okResult).toBeTruthy();
    });

    // then
    const req = httpMock.expectOne(jasmine.any(String));
    expect(req.request.body).toContain(passwordBas64);
  }));

  it('should be base 64 encrypted password it is a new one', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // given
    const passwordBas64 = btoa('APassword');

    // when
    service.newPassword('Test', 'APassword').subscribe(r => {
      expect(r.okResult).toBeTruthy();
    });

    // then
    const req = httpMock.expectOne(jasmine.any(String));
    expect(req.request.body).toContain(passwordBas64);
  }));

});
