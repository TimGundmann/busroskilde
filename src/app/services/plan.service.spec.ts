import { TestBed } from '@angular/core/testing';

import { PlanService } from './plan.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanService = TestBed.get(PlanService);
    expect(service).toBeTruthy();
  });
});
