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
      console.log("📌 Какво връща Supabase?", response);
    });

    // this.checkAdmin();
    this.loadUsers();
    // this.loadRecipes();

    const user = this.authService.getUserInfo();
    this.userName = user.firstName || 'Гост';
  }

  loadUsers() {
    this.adminServiceOnlineDB.getUsers().subscribe((data) => {
      this.users = Array.isArray(data) ? data : []; // 🔥 Уверяваме се, че е масив
    });
  }

  // trackByUser(index: number, user: any) {
  //   return user.id; // Ако id не се променя, Angular няма да прави излишни ререндери.
  // }

  // trackByRecipe(index: number, recipe: any) {
  //   return recipe.id;
  // }

  // grantAdmin(userId: string) {
  //   this.adminServiceOnlineDB.grantAdminRole(userId).subscribe({
  //     next: () => {
  //       this.showMessage("✅ Потребителят вече е администратор!");
  //       this.loadUsers(); // 🔄 Обновяваме списъка
  //     },
  //     error: (error) => this.showMessage("❌ Грешка при задаване на роля: " + error.message),
  //   });
  // }

  // loadRecipes() {
  //   this.adminServiceOnlineDB.getRecipes().subscribe((data) => {
  //     console.log("🍽️ Получени рецепти:", data);
  //     this.recipes = data;
  //   });
  // }
  // deleteUser(userId: string) {
  //   this.adminServiceOnlineDB.deleteUser(userId).subscribe({
  //     next: (response) => {
  //       this.showMessage("✅ Потребителят е изтрит успешно!");
  //       // console.log("✅ Потребителят е изтрит успешно!", response);
  //       this.loadUsers();
  //     },
  //     error: (error) => {
  //       this.showMessage("⚠️ Получихме грешка, но ще обновим списъка");
  //       // console.warn("⚠️ Получихме грешка, но ще обновим списъка", error);
  //       if (error.status === 200) {
  //         this.loadUsers(); // Дори при "грешка" с 200, презареждаме списъка
  //       }
  //     }
  //   });
  // }
  
  // deleteRecipe(recipeId: string) {
  //   this.adminServiceOnlineDB.deleteRecipe(recipeId).subscribe(
  //     () => {
  //       this.showMessage("✅ Рецептата е изтрита успешно!");
  //       // console.log("✅ Рецептата е изтрита успешно!");
  //       this.loadRecipes(); // 🔄 Обновяваме списъка
  //     },
  //     // (error) => console.error("❌ Грешка при изтриване:", error)
  //     (error) => this.showMessage("❌ Грешка при изтриване:")
  //   );
  // }
  // editRecipe(recipe: any) {
  //   this.selectedRecipe = {id: recipe.id,  ...recipe }; // Копираме обекта, за да не пипаме оригинала
  //   //console.log("Избрана рецепта за редакция:", this.selectedRecipe);
  //   this.showEditForm = true; // Показваме формата
  // }
  
  // updateRecipe() {
  //   if (!this.selectedRecipe || !this.selectedRecipe.id) {
  //     this.showMessage("⚠️ Няма избрана рецепта за редакция!");
  //     return;
  //   }
  //   console.log("✅ Запазване на рецепта:", this.selectedRecipe);
  //   this.adminServiceOnlineDB.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe({
  //     next: (response) => {
  //       this.showMessage("✅ Рецептата е обновена успешно!");
  //       this.showEditForm = false;
  //       this.fetchRecipes();
  //     },
  //     error: (error) => this.showMessage("❌ Грешка при обновяване на рецептата: " + error.message),
  //   });
  // }

  // fetchRecipes() {
  //   this.adminServiceOnlineDB.getRecipes().subscribe({
  //     next: (recipes) => {
  //       this.recipes = recipes;
  //     },
  //     error: (error) => {
  //       // console.error('Грешка при зареждане на рецептите:', error);
  //       this.showMessage('Грешка при зареждане на рецептите:');
  //     }
  //   });
  // }

   // async checkAdmin() {
  //   const user = this.authService.getUserInfo();
  //   if (!user) {
  //     console.warn("⚠️ Няма логнат потребител");
  //     return;
  //   }
  
  //   const role = await this.adminServiceOnlineDB.getUserRole(user.id);
  //   console.log("🔹 Роля на потребителя:", role);
  //   this.isAdmin = role === "admin";
  // }

  // saveRecipe() {
  //   // console.log(this.selectedRecipe)
  //   this.adminServiceOnlineDB.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe(
  //     (response) => {
  //       // console.log("✅ Успешно редактирана рецепта:", response);
  //       this.showMessage("✅ Успешно редактирана рецепта:");
  //       this.loadRecipes(); // Презареждаме списъка
  //       this.selectedRecipe = null; // Скриваме формата
  //     },
  //     // (error) => console.error("❌ Грешка при редактиране:", error)
  //     (error) => this.showMessage("❌ Грешка при редактиране:")
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