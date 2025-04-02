import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-api-recipes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './api-recipes.component.html',
  styleUrl: './api-recipes.component.css'
})
export class ApiRecipesComponent {
  title = "Immerse yourself in the magic of our culinary world";

  searchQuery: string = '';
  recipes: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  selectedRecipe: any = null;

  constructor(private http: HttpClient) {}

  searchRecipes() {
    if (!this.searchQuery.trim()) {
      this.errorMessage = "Моля, въведете име на ястие!";
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    
    const apiUrl = `${environment.apiRecipeSearchUrl}search.php?s=${this.searchQuery}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.recipes = response.meals || [];
        if (this.recipes.length === 0) {
          this.errorMessage = "Няма намерени рецепти.";
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = "Грешка при заявката. Опитайте отново!";
        this.loading = false;
      }
    );
  }

  viewRecipe(recipe: any) {
    if (recipe.strSource) {
      window.open(recipe.strSource, '_blank');
    } else {
      this.selectedRecipe = recipe;
    }
  }

  closeModal(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.selectedRecipe = null;
    }
  }
}
