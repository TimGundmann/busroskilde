import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { tokenGetter } from 'app/app.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
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
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
