import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRecipeService } from '../services/user-recipe.service';
import { Router, RouterLink } from '@angular/router';
import { Recipe } from '../../models/userRecipe';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-recipe',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-recipe.component.html',
  styleUrl: './user-recipe.component.css'
})
export class UserRecipeComponent {
  title= "Добавете рецепта в нашата кулинарна книга";

  newRecipe: Recipe = { id: 0, name: '', ingredients: '', description: '', createdBy: '' };

  resetForm() {
    this.newRecipe = {
      id: Date.now(), // временно решение за уникално ID
      name: '',
      ingredients: '',
      description: '',
      createdBy: ''
    };
  }

  constructor(
    private recipeService: UserRecipeService, 
    private router: Router, 
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  saveRecipe() {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      this.newRecipe.createdBy = currentUserId;
    }
    this.recipeService.addRecipe(this.newRecipe).subscribe(() => {
      this.showMessage('Recipe added successfully!');
      // alert('Рецептата е успешно добавена!');
      this.resetForm();
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
