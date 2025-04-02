import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
// import { AuthServiceOnlineDB } from './auth-service-online-db';
import { AuthServiceOnlineDB } from '../online-DB-services/auth-service-online-db.service';
import { Observable, map } from 'rxjs';

export const adminOnlineDBGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceOnlineDB);
  const router = inject(Router);

  return authService.userLoggedIn$.pipe(
    map(user => {
      console.log('🔍 Проверка на логнатия потребител:', user);
      if (user && user.role === 'admin') {
        console.log('✅ Потребителят е администратор. Достъп ОК.');
        return true; // ✅ Достъп разрешен
      } else {
        console.log('⛔ Достъп отказан. Пренасочване към /app-info.');
        router.navigate(['/app-info']); // ❌ Пренасочване
        return false;
      }
    })
  );
};