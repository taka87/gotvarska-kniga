import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard'; // 🔥 Поправен импорт

describe('AuthGuard', () => {  // 🔥 Трябва да бъде `AuthGuard`, а не `authGuard`
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});