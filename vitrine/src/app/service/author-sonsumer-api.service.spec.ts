import { TestBed } from '@angular/core/testing';

import { AuthorSonsumerApiService } from './author-sonsumer-api.service';

describe('AuthorSonsumerApiService', () => {
  let service: AuthorSonsumerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorSonsumerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
