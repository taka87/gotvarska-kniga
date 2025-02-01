import { TestBed } from '@angular/core/testing';

import { MaindishesService } from './maindishes.service';

describe('MaindishesService', () => {
  let service: MaindishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaindishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
