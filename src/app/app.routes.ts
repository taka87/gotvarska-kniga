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
import { RawMapComponent } from './google-map/raw-map/raw-map.component';
import { UserPanelComponent } from './mysql/pages/user-panel/user-panel.component';
import { AuthGuard } from './auth.guard';
import { ShowLocalRecipesComponent } from './show-local-recipes/show-local-recipes.component';
import { UserRegisterOnlineDB } from './online-DB/user-register-online-DB/user-register-online-db.component';
import { UserRecipeOnlineDBComponent } from './online-DB/user-recipe-online-DB/user-recipe-online-db.component';
import { UserPanelOnlineDBComponent } from './online-DB/pages/user-panel/user-panel-onlinedb.component';
import { AdminPanelOnlineDBComponent } from './online-DB/pages/admin-panel/admin-panel-onlinedb.component';
import { AppInfoComponent } from './home/app-info/app-info.component';
import { AppDocumentationComponent } from './home/app-documentation/app-documentation.component';
import { FavoriteRecipesComponent } from './home/favorite-recipes/favorite-recipes.component';
import { MealDesignComponent } from './home/meal-design/meal-design.component';
import { MealScrollComponent } from './home/meal-scroll/meal-scroll.component';
import { FavouriteMenuComponent } from './home/favourite-menu/favourite-menu.component';
import { FoodSearchComponent } from './home/food-search/food-search.component';
import { ApiRecipesComponent } from './home/api-recipes/api-recipes.component';
import { adminOnlineDBGuard } from './online-DB/guard/admin-online-db.guard';
import { unlockCodeGuard } from './online-DB/guard/unlock-code.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'soups', component: SoupComponent },
  { path: 'main-dishes', component: MaindishesComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'menu-details', component: MenuDetailsComponent },
  { path: "add-recipe", component:UserRecipeComponent},
  { path: "all-recipe", component:ShowLocalRecipesComponent},
  { path: 'user-register-mysql', component: UserRegisterMysqlComponent }, 
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'user-recipe-mysql', component:  UserRecipeMysqlComponent, canActivate: [UserRecipeGuard]},
  // { path: 'user-panel', component:  UserPanelComponent, canActivate: [AuthGuard]},
  { path: 'user-panel', component:  UserPanelComponent, canActivate: [UserRecipeGuard]},
  { path: 'contact-info', component: MapComponent }, 
  { path: 'raw-map', component: RawMapComponent }, 
  { path: 'register-online-DB', component: UserRegisterOnlineDB },
  { path: 'user-recipe-onlinedb', component:  UserRecipeOnlineDBComponent}, //, canActivate: [UserRecipeGuard]
  { path: 'user-panel-onlinedb', component:  UserPanelOnlineDBComponent, }, //, canActivate: [UserRecipeGuard]
  { path: 'admin-panel-onlinedb', component:  AdminPanelOnlineDBComponent, canActivate: [adminOnlineDBGuard]}, //, canActivate: [UserRecipeGuard]
  { path: 'app-info', component: AppInfoComponent }, 
  { path: 'readme', component: AppDocumentationComponent }, 
  { path: 'scroll-effect', component: FavoriteRecipesComponent }, 
  // { path: 'meal-design', component: MealDesignComponent },     //Home feature
  // { path: 'meal-scroll', component: MealScrollComponent },     //Home feature
  // { path: 'favourite-menu', component: FavouriteMenuComponent },  //Home feature
  { path: 'food-search', component: FoodSearchComponent, canActivate: [unlockCodeGuard] },      //Product macros Window
  { path: 'outer-recipes', component: ApiRecipesComponent, canActivate: [unlockCodeGuard] },    //Search recipes Window
];

// old but gold
// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { SoupComponent } from './home/mealkategories/soup/soup.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'soup', component: SoupComponent },
// ];