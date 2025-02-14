import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // new for MYSQL??
  const apiUrl = 'http://localhost:5000/api';
console.log('API URL:', apiUrl);