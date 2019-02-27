import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PlanService } from './plan.service';
import { of } from 'rxjs';

describe('PlanService', () => {

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: MockHttpClient },
    ],
  }));

  it('should be created', () => {
    const service: PlanService = TestBed.get(PlanService);
    expect(service).toBeTruthy();
  });
});
