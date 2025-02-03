import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SoupComponent } from './home/mealkategories/soup/soup.component';
import { MaindishesComponent } from './home/mealkategories/maindishes/maindishes.component';
import { DessertsComponent } from './home/mealkategories/desserts/desserts.component';
import { SaladsComponent } from './home/mealkategories/salads/salads.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'soups', component: SoupComponent },
  { path: 'main-dishes', component: MaindishesComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'register', component: UserRegistrationComponent }
];

// old but gold
// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { SoupComponent } from './home/mealkategories/soup/soup.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'soup', component: SoupComponent },
// ];