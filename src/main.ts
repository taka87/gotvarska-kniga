import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';

// Регистрирай Swiper като custom element
register();

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     ...appConfig.providers
//   ]
// }).catch((err) => console.error(err));
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // new for MYSQL??