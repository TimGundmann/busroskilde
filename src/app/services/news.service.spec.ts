import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { of } from 'rxjs';

describe('NewsService', () => {

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
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
  });
});
