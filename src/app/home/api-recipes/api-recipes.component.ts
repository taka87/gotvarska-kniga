import { Component } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-api-recipes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './api-recipes.component.html',
  styleUrl: './api-recipes.component.css'
})
export class ApiRecipesComponent {
  title = "Immerse yourself in the magic of our culinary world";

  foodSearchUrl = environment.apiFoodSearchUrl;
  searchQuery: string = '';
  recipes: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  selectedRecipe: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  searchRecipes() {
    if (!this.searchQuery.trim()) {
      this.errorMessage = "Моля, въведете име на ястие!";
      return;
    }
  
    this.loading = true;
    this.errorMessage = '';
  
    const apiUrl = `${this.foodSearchUrl}${this.searchQuery}`;
  
    this.http.get<HttpResponse<any>>(apiUrl, {
      headers: new HttpHeaders({
        // 🔥 Уверяваме се, че не се изпраща 'Authorization'
        'Authorization': ''
      }),
      withCredentials: false, // 🔥 Изключваме изпращането на креденшъли
      observe: 'response',
    }).subscribe(
      (response: HttpResponse<any>) => {
        console.log('API Response Headers:', response.headers);
        this.recipes = response.body?.meals || [];
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

  // ShowAlertMessage
  promptForAccess() {
    Swal.fire({
      title: 'Въведете код за достъп',
      input: 'password',
      inputPlaceholder: 'Въведете вашия код',
      showCancelButton: true,
      confirmButtonText: 'ОК',
      cancelButtonText: 'Отказ'
    }).then((result) => {
      if (result.isConfirmed) {
        const enteredCode = result.value;
        if (enteredCode === '1234') { // 🔹 Замени с твой код
          localStorage.setItem('hasAccess', 'true');
          this.router.navigate(['/outer-recipes']); // 🔹 Пренасочване към страницата
        } else {
          Swal.fire('Грешен код', 'Опитайте отново!', 'error');
        }
      }
    });
  }
}
