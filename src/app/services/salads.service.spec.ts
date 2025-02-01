import { TestBed } from '@angular/core/testing';

import { SaladsService } from './salads.service';

describe('SaladsService', () => {
  let service: SaladsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaladsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
