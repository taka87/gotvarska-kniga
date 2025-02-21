import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserControlComponent } from "../user-control/user-control.component";
import { DailyMenuComponent } from './daily-menu/daily-menu.component';
import { LoggedButtonComponent } from '../logged-button/logged-button.component';
import { UserSessionService } from '../services/user-session.service';
import { UserMysqlComponent } from '../mysql/user-mysql/user-mysql.component';
import { UserControlMysqlComponent } from '../mysql/user-control-mysql/user-control-mysql.component';
import { LoggedButtonMysqlComponent } from '../mysql/logged-button-mysql/logged-button-mysql.component';
import { AuthService } from '../mysql-services/auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule,  DailyMenuComponent, UserControlMysqlComponent, LoggedButtonMysqlComponent]
  //imports: [UserControlComponent, LoggedButtonComponent, LoggedButtonMysqlqlComponent,  UserMysqlComponent]
})
export class HomeComponent {
  title = 'Добре дошли в нашия кулинарен свят';
  
  constructor(private userSession: UserSessionService, private authService: AuthService) {}
  
  // new
  getCategoryRoute(categoryName: string): string {
    switch (categoryName) {
      case 'Супи': return '/soups';
      case 'Основни ястия': return '/main-dishes';
      case 'Салати': return '/salads';
      case 'Десерти': return '/desserts';

      default: return '/';
    }
  }

  showCategories = true;

  categories = [
    { id: 1, name: 'Супи', image: 'assets/Soups/pustra_zelenchukova_supa.jpg' },  //ако смениш "супи"-> се чупи пътя ??
    { id: 2, name: 'Основни ястия', image: 'assets/Maindishes/maindish.jpg' },
    { id: 4, name: 'Салати', image: 'assets/Salads/salad.jpg' },
    { id: 3, name: 'Десерти', image: 'assets/Desserts/dessert.jpg' },

  ];

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  showFavorites = false;

  favoriteRecipes = [
    { name: 'Торта Гараш', description: 'Класическа шоколадова торта с богат вкус.' },
    { name: 'Мусака', description: 'Традиционно българско ястие с картофи и кайма.' },
    { name: 'Шкембе чорба', description: 'Супа с шкембе, подходяща за махмурлук.' },
  ];

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  // секция за логин/регистрация MYSQL
  isLoggedMySQL = false;  
  userNameMySQL: string | null = null;  

  ngOnInit(): void {
    this.checkLoginStatus();

    // Следим в реално време, ако AuthService засече промяна
    this.authService.userLoggedIn$.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('loggedUser');

    if (token && userData) {
      this.isLoggedMySQL = true;
      try {
        const parsedUser = JSON.parse(userData);
        this.userNameMySQL = parsedUser.firstName || "Потребител";
      } catch (error) {
        console.error("⚠️ Грешка при парсване на потребителските данни!", error);
      }
    } else {
      this.isLoggedMySQL = false;
      this.userNameMySQL = null;
    }
  }

  logOut(): void {
    localStorage.removeItem('token');  
    localStorage.removeItem('loggedUser'); 
    this.isLoggedMySQL = false;
    this.userNameMySQL = null;
    window.location.reload();
  }
}