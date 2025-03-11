import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';

// Регистрирай Swiper като custom element
register();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // new for MYSQL??