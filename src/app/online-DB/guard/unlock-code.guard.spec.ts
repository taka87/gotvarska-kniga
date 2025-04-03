import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unlockCodeGuard } from './unlock-code.guard';

describe('unlockCodeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unlockCodeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
