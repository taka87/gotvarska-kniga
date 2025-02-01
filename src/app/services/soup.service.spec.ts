import { TestBed } from '@angular/core/testing';

import { SoupService } from './soup.service';

describe('SoupService', () => {
  let service: SoupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
