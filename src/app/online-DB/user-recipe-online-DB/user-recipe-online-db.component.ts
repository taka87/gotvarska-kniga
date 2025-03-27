import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Recipe } from '../../../models/userRecipe';
import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../mysql-services/auth-service.service';
// import { UserRecipeService } from '../../mysql-services/user-recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceOnlineDB } from '../online-DB-services/auth-service-online-db.service';
import { UserRecipeServiceOnlineDB } from '../online-DB-services/user-recipe-online-db.service';

@Component({
  selector: 'app-user-recipe-online-db',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-recipe-online-db.component.html',
  styleUrl: './user-recipe-online-db.component.css'
})
export class UserRecipeOnlineDBComponent {
 title= "Immerse yourself in the magic of our culinary world";

 userName: string | null = null;

 constructor(
    private authServiceOnlineDB: AuthServiceOnlineDB,
    private router: Router,
    private userRecipeOnlineDBService: UserRecipeServiceOnlineDB,
    private snackBar: MatSnackBar
  ) {}

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnInit(): void {
    //Check user is in cash or not
    const user = this.authServiceOnlineDB.getUserInfo();
    if (!user) {
      this.router.navigate(['/']); // Пренасочваме към страницата за вход
    }
    // console.log('🔍 User data:', user); // ⬅️ Debugging
    // console.log('🔍 User data:', user.first_name); // ⬅️ Debugging
    // console.log('🔍 User data:', this.userName); // ⬅️ Debugging
    //  const user = this.authService.getUserInfo();
    this.userName = user ? user.first_name || 'Гост' : 'Гост'; 
  }

 newRecipe = { recipe_name: '', ingredients: '', description: '', user_id: '' };

 saveRecipe() {
  const user = this.authServiceOnlineDB.getUserInfo(); // Взимаме текущия потребител
  if (!user) {
    this.showMessage('Трябва да сте влезли в профила си!');
    return;
  }

  // Добавяме user_id в рецептата!
  const recipeData = {
    ...this.newRecipe,
    user_id: user.userId // 👈 Задаваме ID-то на потребителя
  };

  this.userRecipeOnlineDBService.addRecipe(recipeData).subscribe({
    next: (response) => {
      this.showMessage('Recipe Added successfully!');
      this.newRecipe = { recipe_name: '', ingredients: '', description: '', user_id: '' }; // ✅ Зануляваме формата
    },
    error: (err) => {
      console.error('Грешка при добавяне на рецепта:', err);
    }
  });
}

  goBack(): void {
    this.router.navigate(['/']);
  }
}
