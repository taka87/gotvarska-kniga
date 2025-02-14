import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRecipeService } from '../services/user-recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../../models/userRecipe';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-recipe',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-recipe.component.html',
  styleUrl: './user-recipe.component.css'
})
export class UserRecipeComponent {
  title= "Добре дошли в начия кулинарен свят";

  newRecipe: Recipe = { id: 0, name: '', ingredients: '', description: '', createdBy: '' };

  // addRecipe: Recipe = {
  //   id: 0,
  //   name: '',
  //   ingredients: '',
  //   description: '',
  //   createdBy: ''
  // };
  

  resetForm() {
    this.newRecipe = {
      id: Date.now(), // временно решение за уникално ID
      name: '',
      ingredients: '',
      description: '',
      createdBy: ''
    };
  }

  constructor(private recipeService: UserRecipeService, private router: Router, private authService: AuthService) {}

  saveRecipe() {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      this.newRecipe.createdBy = currentUserId;
    }
    this.recipeService.addRecipe(this.newRecipe).subscribe(() => {
      alert('Рецептата е успешно добавена!');
      this.resetForm();
    });
  }
      // OLD-hard codded USER
      // saveRecipe() {
      //   this.authService.getCurrentUser().subscribe((user) => {
      //     this.newRecipe.createdBy = user.name || 'Няма потребител';
      //     this.recipeService.addRecipe(this.newRecipe).subscribe(() => {
      //       alert('Рецептата е успешно добавена!');
      //       this.resetForm();
      //     });
      //   });
      // }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
