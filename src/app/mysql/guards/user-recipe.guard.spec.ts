import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userRecipeGuard } from './user-recipe.guard';

describe('userRecipeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userRecipeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
