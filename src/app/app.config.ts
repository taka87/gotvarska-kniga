// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
// };
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])), //⬅️ Включваме интерцептора
    provideRouter(routes), provideAnimationsAsync()
  ]
};

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(),  //добавяме HTTP клиент
//   ]
// };
