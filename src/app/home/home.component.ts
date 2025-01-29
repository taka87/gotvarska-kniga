import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule,RouterModule]
})
export class HomeComponent {
  title = 'Любими рецепти';
  showCategories = true;

  categories = [
    { id: 1, name: 'Супи', image: 'assets/soups.jpg' },
    { id: 2, name: 'Основни ястия', image: 'assets/main-dishes.jpg' },
    { id: 3, name: 'Десерти', image: 'assets/desserts.jpg' },
    { id: 4, name: 'Гарнитури', image: 'assets/side-dishes.jpg' },
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
}