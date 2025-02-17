import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../mysql-services/admin-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports:[CommonModule,RouterLink]
})
export class AdminPanelComponent implements OnInit {
  title = "Добре дошли в Админ Панела на MYSQL";

  users: any[] = [];
  recipes: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRecipes();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadRecipes() {
    this.adminService.getRecipes().subscribe((data) => {
      console.log("Рецепти от API:", data); // ✅ Проверка
      this.recipes = data;
    });
  }

  deleteUser(userId: number) {
    console.log("Изтриване на потребител с ID:", userId); // ✅ Проверка
    this.adminService.deleteUser(userId).subscribe(
      () => {
        console.log("Потребителят е изтрит!");
        this.loadUsers(); // Обновяване на списъка
      },
      (error) => console.error("Грешка при изтриване:", error)
    );
  }
  // deleteUser(userId: number) {
  //   this.adminService.deleteUser(userId).subscribe(() => {
  //     this.users = this.users.filter(user => user.id !== userId);
  //   });
  // }

  deleteRecipe(recipeId: number) {
    this.adminService.deleteRecipe(recipeId).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
    });
  }

  editRecipe(recipeId: number) {
    // Логика за редакция
  }
}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-admin-panel',
//   templateUrl: './admin-panel.component.html',
//   styleUrls: ['./admin-panel.component.css'],
//   imports:[CommonModule]
// })
// export class AdminPanelComponent implements OnInit {
//   title = "admin PANEL";
//   users: any[] = [];
//   recipes: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchUsers();
//     this.fetchRecipes();
//   }

//   fetchUsers() {
//     this.http.get<any[]>('http://localhost:5000/api/users').subscribe(data => {
//       this.users = data;
//     });
//   }

//   fetchRecipes() {
//     this.http.get<any[]>('http://localhost:5000/api/recipes').subscribe(data => {
//       this.recipes = data;
//     });
//   }

//   deleteUser(userId: number) {
//     if (confirm('Сигурен ли си, че искаш да изтриеш този потребител?')) {
//       this.http.delete(`http://localhost:5000/api/users/${userId}`).subscribe(() => {
//         this.users = this.users.filter(u => u.id !== userId);
//       });
//     }
//   }

//   deleteRecipe(recipeId: number) {
//     if (confirm('Сигурен ли си, че искаш да изтриеш тази рецепта?')) {
//       this.http.delete(`http://localhost:5000/api/recipes/${recipeId}`).subscribe(() => {
//         this.recipes = this.recipes.filter(r => r.id !== recipeId);
//       });
//     }
//   }
// }