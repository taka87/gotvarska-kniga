import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../../models/userRecipe';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../mysql-services/auth-service.service';
import { UserRecipeService } from '../../mysql-services/user-recipe.service';

@Component({
  selector: 'app-user-recipe-mysql',
  imports: [FormsModule],
  templateUrl: './user-recipe-mysql.component.html',
  styleUrl: './user-recipe-mysql.component.css'
})
export class UserRecipeMysqlComponent {
 title= "Добре дошли в начия кулинарен свят";

 userName: string | null = null;

 constructor(private authService: AuthService, private router: Router,private userRecipeService: UserRecipeService) {}

 ngOnInit(): void {

  //Check user is in cash or not
  const user = this.authService.getUserInfo();
  if (!user) {
    this.router.navigate(['/']); // Пренасочваме към страницата за вход
  }

  //  const user = this.authService.getUserInfo();
  //  this.userName = user ? user.firstName : null;
 }

 newRecipe = { recipeName: '', ingredients: '', description: '' };

 saveRecipe() {
   this.userRecipeService.addRecipe(this.newRecipe).subscribe({
     next: (response) => {
       alert(response.message);
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
