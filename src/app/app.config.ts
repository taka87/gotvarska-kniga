import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])), // Включваме интерцептора
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }) // Добавете тази линия, ако я използвате
  ]
};


// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { withInterceptorsFromDi } from '@angular/common/http';
// import { AuthInterceptor } from './auth.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { withInterceptors } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(withInterceptors([AuthInterceptor])), //⬅️ Включваме интерцептора
//     provideRouter(routes), 
//     provideAnimationsAsync()
//   ]
// };