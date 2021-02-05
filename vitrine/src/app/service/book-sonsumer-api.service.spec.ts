import { TestBed } from '@angular/core/testing';

import { BookSonsumerApiService } from './book-sonsumer-api.service';

describe('SonsumerApiService', () => {
  let service: BookSonsumerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSonsumerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
