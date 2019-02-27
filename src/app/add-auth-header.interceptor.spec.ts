import { AuthService } from './services/auth.service';
import { TestBed } from '@angular/core/testing';

import { AddAuthHeaderInterceptor } from './add-auth-header.interceptor';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddAuthHeaderService', () => {

  class AuthServiceMock {
    public isAuthenticated(): boolean {
      return true;
    }
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    providers: [
      { provide: AuthService, useClass: AuthServiceMock }
    ],
  }));

  it('should be created', () => {
    const service: AddAuthHeaderInterceptor = TestBed.get(AddAuthHeaderInterceptor);
    expect(service).toBeTruthy();
  });
});
