import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminOnlineDBGuard } from './admin-online-db.guard';

describe('adminOnlineDBGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminOnlineDBGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
