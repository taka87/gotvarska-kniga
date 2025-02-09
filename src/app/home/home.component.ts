import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserControlComponent } from "../user-control/user-control.component";
import { MenuDetailsComponent } from '../menu-details/menu-details.component';
import { DailyMenuComponent } from './daily-menu/daily-menu.component';
import { LoggedButtonComponent } from '../logged-button/logged-button.component';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule, UserControlComponent,DailyMenuComponent,LoggedButtonComponent]
})
export class HomeComponent {
  title = 'Добре дошли в нашия кулинарен свят';
  constructor(private userSession: UserSessionService) {}
  
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
    { id: 1, name: 'Супи', image: 'assets/soups.jpg' },  //ако смениш "супи"-> се чупи пътя ??
    { id: 2, name: 'Основни ястия', image: 'assets/main-dishes.jpg' },
    { id: 4, name: 'Салати', image: 'assets/salads.jpg' },
    { id: 3, name: 'Десерти', image: 'assets/desserts.jpg' },

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

  // секция за логин/регистрация логика
  isLogged = false;
  userName = '';
  
  ngOnInit(): void {
    this.userSession.currentUser$.subscribe(userData => {
      this.isLogged = !!userData;
      if (this.isLogged && userData) {
        const user = JSON.parse(userData);
        this.userName = user.firstName;
      }
    });
  }
}