import { AuthService } from './../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {

  class JwtHelperServiceMock {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        AuthService,
        { provide: JwtHelperService, useClass: JwtHelperServiceMock }
      ],
      imports: [ RouterTestingModule ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

});
