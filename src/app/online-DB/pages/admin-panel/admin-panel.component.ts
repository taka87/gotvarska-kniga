import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../mysql-services/admin-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterFormComponentOnlineDB } from '../../register-form-component-online-DB/register-form-component-online-db.component';
import { AuthService } from '../../../mysql-services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports:[CommonModule,RouterLink, FormsModule, RegisterFormComponentOnlineDB]
})
export class AdminPanelComponent implements OnInit {
  title = "Добре дошли в Админ Панела на MYSQL";
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
    private adminService: AdminService, 
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
    this.loadUsers();
    this.loadRecipes();

    const user = this.authService.getUserInfo();
    this.userName = user.firstName || 'Гост';
  }

  loadUsers() {
    this.adminService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadRecipes() {
    this.adminService.getRecipes().subscribe((data) => {
      //console.log("Рецепти от API дава:", data); // ✅ Проверка
      this.recipes = data;
    });
  }

  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe({
      next: (response) => {
        this.showMessage("✅ Потребителят е изтрит успешно!");
        // console.log("✅ Потребителят е изтрит успешно!", response);
        this.loadUsers();
      },
      error: (error) => {
        this.showMessage("⚠️ Получихме грешка, но ще обновим списъка");
        // console.warn("⚠️ Получихме грешка, но ще обновим списъка", error);
        if (error.status === 200) {
          this.loadUsers(); // Дори при "грешка" с 200, презареждаме списъка
        }
      }
    });
  }
  
  deleteRecipe(recipeId: number) {
    this.adminService.deleteRecipe(recipeId).subscribe(
      () => {
        this.showMessage("✅ Рецептата е изтрита успешно!");
        // console.log("✅ Рецептата е изтрита успешно!");
        this.loadRecipes(); // 🔄 Обновяваме списъка
      },
      // (error) => console.error("❌ Грешка при изтриване:", error)
      (error) => this.showMessage("❌ Грешка при изтриване:")
    );
  }

  editRecipe(recipe: any) {
    this.selectedRecipe = {id: recipe.id,  ...recipe }; // Копираме обекта, за да не пипаме оригинала
    //console.log("Избрана рецепта за редакция:", this.selectedRecipe);
    this.showEditForm = true; // Показваме формата
  }
  
  updateRecipe() {
    // console.log(this.selectedRecipe)

    if (!this.selectedRecipe || !this.selectedRecipe.id) {
      // console.error('Няма избрана рецепта за редакция!');
      this.showMessage('Няма избрана рецепта за редакция!');
      return;
    }
  
    console.log(this.selectedRecipe)
    this.adminService.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe({
      next: (response) => {
        //console.log('Рецептата е обновена успешно!', response);
        this.showMessage('Рецептата е обновена успешно!');
        this.showEditForm = false; // Скриваме формата след успешна редакция
        this.fetchRecipes(); // Презареждаме списъка с рецепти
      },
      error: (error) => {
        // console.error('Грешка при обновяване на рецептата:', error);
        this.showMessage('Грешка при обновяване на рецептата:');
      }
    });
  }

  fetchRecipes() {
    this.adminService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        // console.error('Грешка при зареждане на рецептите:', error);
        this.showMessage('Грешка при зареждане на рецептите:');
      }
    });
  }

  saveRecipe() {
    // console.log(this.selectedRecipe)
    this.adminService.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe(
      (response) => {
        // console.log("✅ Успешно редактирана рецепта:", response);
        this.showMessage("✅ Успешно редактирана рецепта:");
        this.loadRecipes(); // Презареждаме списъка
        this.selectedRecipe = null; // Скриваме формата
      },
      // (error) => console.error("❌ Грешка при редактиране:", error)
      (error) => this.showMessage("❌ Грешка при редактиране:")
    );
  }

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