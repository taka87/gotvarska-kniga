import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Recipe } from '../../../models/userRecipe';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../mysql-services/auth-service.service';
import { UserRecipeService } from '../../mysql-services/user-recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-recipe-online-db',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-recipe-online-db.component.html',
  styleUrl: './user-recipe-online-db.component.css'
})
export class UserRecipeMysqlComponent {
 title= "Добавете рецепта в нашата кулинарна книга";

 userName: string | null = null;

 constructor(
    private authService: AuthService,
    private router: Router,
    private userRecipeService: UserRecipeService,
    private snackBar: MatSnackBar
  ) {}

  showMessage(message: string) {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

 ngOnInit(): void {
  //Check user is in cash or not
  const user = this.authService.getUserInfo();
  if (!user) {
    this.router.navigate(['/']); // Пренасочваме към страницата за вход
  }

  //  const user = this.authService.getUserInfo();
  this.userName = user.firstName || 'Гост';
 }

 newRecipe = { recipeName: '', ingredients: '', description: '' };

 saveRecipe() {
   this.userRecipeService.addRecipe(this.newRecipe).subscribe({
     next: (response) => {
      //  alert(response.message);
       this.showMessage('Рецептата добавена успешно!')
       this.newRecipe = { recipeName: '', ingredients: '', description: '' }; // ✅ Зануляваме формата
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
