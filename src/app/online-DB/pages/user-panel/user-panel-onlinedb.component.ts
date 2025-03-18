import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../mysql-services/admin-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
//import { RegisterFormComponentMySqlComponent } from '../../register-form-component-my-sql/register-form-component-my-sql.component';
import { AuthService } from '../../../mysql-services/auth-service.service';
import { UserPanelService } from '../../../mysql-services/user-panel.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPanelServiceOnlineDB } from '../../online-DB-services/user-panel-online-db.service';

@Component({
  selector: 'app-user-panel-onlinedb',
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './user-panel-onlinedb.component.html',
  styleUrl: './user-panel-onlinedb.component.css'
})
export class UserPanelOnlineDBComponent {
  title = "Управлявайте своите рецепти тук Online DB";
  recipes: any[] = [];
  selectedRecipe: any = null;
  userName: string = '';

  //edit recipe
  showEditForm: boolean = false;

  constructor(
    private userPanelOnlineDbService: UserPanelServiceOnlineDB,
    private authService: AuthService,
    private snackBar:MatSnackBar
  ) {}

  showMessage(message: string) {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
 
  ngOnInit(): void { 
     // this.checkAdmin();
     this.loadRecipes();
 
     const user = this.authService.getUserInfo();
     this.userName = user.first_name || 'Гост';
   }
 
   loadRecipes() {
    const user = this.authService.getUserInfo();
    
    if (!user || !user.userId) {
      console.error("❌ Няма логнат потребител!");
      return;
    }
  
    this.userPanelOnlineDbService.getUserRecipes(user.userId).subscribe(
      (data) => {
        this.recipes = data.map(recipe => ({
          ...recipe,
          userId: recipe.user?.id || user.userId // Ако няма user, задаваме логнатия
        }));
        console.log("✅ Заредени рецепти:", this.recipes);
      },
      (error) => {
        console.error("❌ Грешка при зареждане на рецепти:", error);
      }
    );
  }
 
   //2
   deleteRecipe(recipeId: string) {
     this.userPanelOnlineDbService.deleteUserRecipe(recipeId).subscribe(
       () => {
         this.recipes = this.recipes.filter(r => r.id !== recipeId);
       },
       (error) => {
         console.error("Error deleting recipe:", error);
       }
     );
   }
 
   //✅ Метод за отваряне на формата за редакция:
   editRecipe(recipe: any) {
    console.log("Editing recipe:", recipe);
  
    if (!recipe || !recipe.id) {
      console.error("❌ Error: Recipe has no ID!");
      return;
    }
  
    const userId = recipe.user_id || recipe.userId; // Гарантираме, че user ID-то се взема правилно
  
    if (!userId) {
      console.error("❌ Error: Recipe has no associated user ID!");
      return;
    }
  
    this.selectedRecipe = { 
      ...recipe, 
      userId: userId // Запазваме user ID с правилното име
    };
  
    console.log("✅ Recipe selected for editing:", this.selectedRecipe);
    this.showEditForm = true;
  }
   
   //✅ Метод за обновяване на рецептата:
   updateRecipe() {
    if (!this.selectedRecipe || !this.selectedRecipe.id) {
      console.error("❌ Error: No recipe ID found!");
      return;
    }
  
    console.log("🔄 Updating recipe:", this.selectedRecipe);
  
    const updatedData = {
      recipe_name: this.selectedRecipe.recipe_name,
      description: this.selectedRecipe.description,
      ingredients: this.selectedRecipe.ingredients,
      user_id: this.selectedRecipe.userId || this.selectedRecipe.user_id // Винаги взимаме `user_id`
    };
  
    console.log("📤 Sending update data:", updatedData);
  
    this.userPanelOnlineDbService.editUserRecipe(this.selectedRecipe.id, updatedData).subscribe(
      () => {
        console.log("✅ Recipe updated successfully!");
        this.showEditForm = false;
        this.loadRecipes(); // Презареждаме списъка с рецепти
      },
      (error) => {
        console.error("❌ Error updating recipe:", error);
      }
    );
  }
 
   cancelEdit() {
     this.showEditForm = false;
     this.selectedRecipe = null;
   }
 
   registerAdmin() {
   }
}

