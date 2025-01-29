import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SoupComponent } from './home/mealkategories/soup/soup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'soup', component: SoupComponent },
];