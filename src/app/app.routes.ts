import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SoupComponent } from './home/mealkategories/soup/soup.component';
import { MaindishesComponent } from './home/mealkategories/maindishes/maindishes.component';
import { DessertsComponent } from './home/mealkategories/desserts/desserts.component';
import { SaladsComponent } from './home/mealkategories/salads/salads.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { UserRegisterMysqlComponent } from './mysql/user-register-mysql/user-register-mysql.component';
import { UserRecipeMysqlComponent } from './mysql/user-recipe-mysql/user-recipe-mysql.component';
import { AdminPanelComponent } from './mysql/pages/admin-panel/admin-panel.component';
import { AdminGuard } from './mysql/guards/admin.guard';
import { UserRecipeGuard } from './mysql/guards/user-recipe.guard';
import { MapComponent } from './google-map/map/map.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'soups', component: SoupComponent },
  { path: 'main-dishes', component: MaindishesComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'menu-details', component: MenuDetailsComponent },
  { path: "add-recipe", component:UserRecipeComponent},
  { path: 'user-register-mysql', component: UserRegisterMysqlComponent }, 
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'user-recipe-mysql', component:  UserRecipeMysqlComponent, canActivate: [UserRecipeGuard]},
  { path: 'map', component: MapComponent }, 

];

// old but gold
// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { SoupComponent } from './home/mealkategories/soup/soup.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'soup', component: SoupComponent },
// ];