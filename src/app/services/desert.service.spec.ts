import { TestBed } from '@angular/core/testing';

import { DesertService } from './desert.service';

describe('DesertService', () => {
  let service: DesertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
