import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterFormComponentOnlineDB } from '../../register-form-component-online-DB/register-form-component-online-db.component';
import { AuthService } from '../../../mysql-services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceOnlineDB } from '../../online-DB-services/admin-service-online-db.service';
// import { checkUserRole } from '../../../../../supabase/functions/check-user-role';


@Component({
  selector: 'app-admin-panel-onlinedb',
  templateUrl: './admin-panel-onlinedb.component.html',
  styleUrls: ['./admin-panel-onlinedb.component.css'],
  imports:[CommonModule,RouterLink, FormsModule, RegisterFormComponentOnlineDB]
})
export class AdminPanelOnlineDBComponent implements OnInit {
  title = "Добре дошли в Админ Панела на Online DB";
  showAdminForm: boolean = false; // По подразбиране формата е скрита

  users: any[] = [];
  recipes: any[] = [];
  selectedRecipe: any = null;
  userName: string = '';

  //добави админ променливи
  isAdmin = false;  
  newAdmin = { username: '', password: '' };
  showAdminRegistrationForm = false;  

  
  //edit recipe
  showEditForm: boolean = false;

  constructor(
    private adminServiceOnlineDB: AdminServiceOnlineDB,
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
    this.adminServiceOnlineDB.getUsers().subscribe(response => {
      // console.log("📌 Какво връща Supabase?", response);
    });

    // this.checkAdmin();
    this.loadUsers();
    this.loadRecipes();

    const user = this.authService.getUserInfo();
    this.userName = user.first_name || 'Гост';
  }

  loadUsers() {
    this.adminServiceOnlineDB.getUsers().subscribe((data) => {
      this.users = Array.isArray(data) ? data : []; // 🔥 Уверяваме се, че е масив
    });
  }

  // Метод за изтриване на потребител
  deleteUser(userId: string) {
    this.adminServiceOnlineDB.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.loadUsers(); // Презареждаме списъка с потребители
      },
      error: (err) => console.error('Error deleting user:', err)
    });
  }

  loadRecipes() {
    this.adminServiceOnlineDB.getUserRecipes().subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        console.error("Error loading recipes:", error);
      }
    );
  }

  //2
  deleteRecipe(recipeId: string) {
    this.adminServiceOnlineDB.deleteUserRecipe(recipeId).subscribe(
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
      console.error("Error: Recipe has no ID!");
      return;
    }
  
    if (!recipe.user || !recipe.user.id) {
      console.error("Error: Recipe has no associated user ID!");
      return;
    }
  
    this.selectedRecipe = { 
      ...recipe, 
      userId: recipe.user.id  // Запазваме user ID
    };
  
    this.showEditForm = true;
  }
  
  //✅ Метод за обновяване на рецептата:
  updateRecipe() {
    if (!this.selectedRecipe || !this.selectedRecipe.id) {
      console.error("Error: No recipe ID found!");
      return;
    }
  
    console.log("Updating recipe:", this.selectedRecipe);
  
    const updatedData = {
      recipe_name: this.selectedRecipe.recipe_name,
      description: this.selectedRecipe.description,
      ingredients: this.selectedRecipe.ingredients,
      user_id: this.selectedRecipe.userId // Изпращаме user ID
    };
  
    this.adminServiceOnlineDB.editUserRecipe(this.selectedRecipe.id, updatedData).subscribe(
      () => {
        this.showEditForm = false;
        this.loadRecipes(); // Презареждаме рецептите след успешен ъпдейт
      },
      (error) => {
        console.error("Error updating recipe:", error);
      }
    );
  }

  // //todo
  // registerUser() {
  //   const userData = {
  //     email: this.email,
  //     password: this.password,
  //     isAdmin: this.isAdmin ? true : false  // ако тикчето е включено, ще е админ
  //   };
  
  //   this.adminServiceOnlineDB.registerUser(userData).subscribe(
  //     () => {
  //       console.log("User registered successfully");
  //     },
  //     (error) => {
  //       console.error("Error registering user:", error);
  //     }
  //   );
  // }

  cancelEdit() {
    this.showEditForm = false;
    this.selectedRecipe = null;
  }

  toggleAdminForm() {
    //this.showAdminRegistrationForm = !this.showAdminRegistrationForm;
    this.showAdminForm = !this.showAdminForm;
  }

  registerAdmin() {
  }
}