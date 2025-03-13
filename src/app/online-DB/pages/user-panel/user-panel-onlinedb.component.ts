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

@Component({
  selector: 'app-user-panel-onlinedb',
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './user-panel-onlinedb.component.html',
  styleUrl: './user-panel-onlinedb.component.css'
})
export class UserPanelOnlineDBComponent {
  title = "Управлявайте своите рецепти тук Online DB";
  userName: string = '';
  userRecipes: any[] = [];

  showEditForm: boolean = false;
  selectedRecipe: any = null;
  recipes: any[] = [];

  constructor(
    private userPanelService: UserPanelService,
    private authService: AuthService,
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
    // this.loadUsers();
    this.loadRecipes();

    const user = this.authService.getUserInfo();
    this.userName = user.firstName || 'Гост';
  }

  // ngOnInit(): void {
  //   this.userPanelService.getUserRecipes().subscribe((recipes) => {
  //     this.userRecipes = recipes;
  //   });
  // }

  loadRecipes() {
    this.userPanelService.getUserRecipes().subscribe((data) => {
      //console.log("Рецепти от API дава:", data); // ✅ Проверка
      this.userRecipes = data;
    });
  }
  deleteRecipe(recipeId: number) {
    this.userPanelService.deleteRecipe(recipeId).subscribe(
      () => {
        // console.log("✅ Рецептата е изтрита успешно!");
        this.showMessage("✅ Рецептата е изтрита успешно!");
        this.loadRecipes(); // 🔄 Обновяваме списъка
      },
      (error) => //console.error("❌ Грешка при изтриване:", error)
      this.showMessage("❌ Грешка при изтриване:")
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
    }
  
    //console.log('Избраната рецепта', this.selectedRecipe)
    this.userPanelService.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe({
      next: (response) => {
        this.showMessage('Рецептата е обновена успешно!');
        // console.log('Рецептата е обновена успешно!', response);
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
    this.userPanelService.getUserRecipes().subscribe({
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
    //console.log('Тест Save', this.selectedRecipe)
    this.userPanelService.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe(
      (response) => {
        console.log("✅ Успешно редактирана рецепта:", response);
        this.loadRecipes(); // Презареждаме списъка
        this.selectedRecipe = null; // Скриваме формата
      },
      (error) => //console.error("❌ Грешка при редактиране:", error)
      this.showMessage('❌ Грешка при редактиране:')
    );
  }

  cancelEdit() {
    this.showEditForm = false;
    this.selectedRecipe = null;
  }

  // getUserRecipes(): Observable<any[]> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${localStorage.getItem('token')}`
  //   );
  
  //   return this.http.get<any[]>('http://localhost:5000/api/recipe/user-recipes', { headers });
  // }

  // showAdminForm: boolean = false; // По подразбиране формата е скрита

  // users: any[] = [];
  // recipes: any[] = [];
  // selectedRecipe: any = null;
  // userName: string = '';

  // //добави админ променливи
  // isAdmin = false;  
  // newAdmin = { username: '', password: '' };
  // showAdminRegistrationForm = false;  

  // //edit recipe

  // constructor(private adminService: AdminService, private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.loadUsers();
  //   this.loadRecipes();

  //   const user = this.authService.getUserInfo();
  //   this.userName = user.firstName || 'Гост';
  // }

  // loadUsers() {
  //   this.adminService.getUsers().subscribe((data) => {
  //     this.users = data;
  //   });
  // }

  // loadRecipes() {
  //   this.adminService.getRecipes().subscribe((data) => {
  //     //console.log("Рецепти от API дава:", data); // ✅ Проверка
  //     this.recipes = data;
  //   });
  // }

  // deleteUser(userId: number) {
  //   this.adminService.deleteUser(userId).subscribe({
  //     next: (response) => {
  //       console.log("✅ Потребителят е изтрит успешно!", response);
  //       this.loadUsers();
  //     },
  //     error: (error) => {
  //       console.warn("⚠️ Получихме грешка, но ще обновим списъка", error);
  //       if (error.status === 200) {
  //         this.loadUsers(); // Дори при "грешка" с 200, презареждаме списъка
  //       }
  //     }
  //   });
  // }
  
  // deleteRecipe(recipeId: number) {
  //   this.adminService.deleteRecipe(recipeId).subscribe(
  //     () => {
  //       console.log("✅ Рецептата е изтрита успешно!");
  //       this.loadRecipes(); // 🔄 Обновяваме списъка
  //     },
  //     (error) => console.error("❌ Грешка при изтриване:", error)
  //   );
  // }

  // editRecipe(recipe: any) {
  //   this.selectedRecipe = {id: recipe.id,  ...recipe }; // Копираме обекта, за да не пипаме оригинала
  //   //console.log("Избрана рецепта за редакция:", this.selectedRecipe);
  //   this.showEditForm = true; // Показваме формата
  // }
  
  // updateRecipe() {
  //   console.log(this.selectedRecipe)

  //   if (!this.selectedRecipe || !this.selectedRecipe.id) {
  //     console.error('Няма избрана рецепта за редакция!');
  //     return;
  //   }
  
  //   console.log(this.selectedRecipe)
  //   this.adminService.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe({
  //     next: (response) => {
  //       console.log('Рецептата е обновена успешно!', response);
  //       this.showEditForm = false; // Скриваме формата след успешна редакция
  //       this.fetchRecipes(); // Презареждаме списъка с рецепти
  //     },
  //     error: (error) => {
  //       console.error('Грешка при обновяване на рецептата:', error);
  //     }
  //   });
  // }

  // fetchRecipes() {
  //   this.adminService.getRecipes().subscribe({
  //     next: (recipes) => {
  //       this.recipes = recipes;
  //     },
  //     error: (error) => {
  //       console.error('Грешка при зареждане на рецептите:', error);
  //     }
  //   });
  // }

  // saveRecipe() {
  //   console.log(this.selectedRecipe)
  //   this.adminService.updateRecipe(this.selectedRecipe.id, this.selectedRecipe).subscribe(
  //     (response) => {
  //       console.log("✅ Успешно редактирана рецепта:", response);
  //       this.loadRecipes(); // Презареждаме списъка
  //       this.selectedRecipe = null; // Скриваме формата
  //     },
  //     (error) => console.error("❌ Грешка при редактиране:", error)
  //   );
  // }

  // cancelEdit() {
  //   this.showEditForm = false;
  //   this.selectedRecipe = null;
  // }

  // toggleAdminForm() {
  //   //this.showAdminRegistrationForm = !this.showAdminRegistrationForm;
  //   this.showAdminForm = !this.showAdminForm;
  // }

  // registerAdmin() {

  // }
}

