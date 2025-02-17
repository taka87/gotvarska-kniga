import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../mysql-services/auth-service.service';
import { UserSessionService } from '../../mysql-services/user-session.service';


@Component({
  selector: 'app-logged-button-mysql',
  imports: [CommonModule,RouterModule],
  templateUrl: './logged-button-mysql.component.html',
  styleUrl: './logged-button-mysql.component.css'
})
export class LoggedButtonMysqlComponent {
  loggedUser: any;
  
  constructor(private router: Router,private authService: AuthService, private userSessionService: UserSessionService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser'); //казва вземи данните от Локал и ги сложи в loggedYUSer
    this.loggedUser = userData ? JSON.parse(userData) : null;  // казва сложените данни в UserData ги използвай за нашите нужди ... 
  }

  logOut(): void {
    localStorage.removeItem('loggedUser');
    window.location.reload();
  }

  addRecipe(): void {
    this.router.navigate(['/user-recipe-mysql']);
  }
  deleteAccount() {

    const userData = localStorage.getItem('loggedUser');
    //console.log("📌 Взет потребител:", userData ? JSON.parse(userData) : "❌ Няма записан потребител");
  
    if (!userData) {
      console.error('❌ Не е намерен потребител!');
      return;
    }
  
    const userId = JSON.parse(userData).userId; // 🔹 Вземи само ID-то
    //console.log('📢 Изтриване на ID:', userId);
  
    this.userSessionService.deleteOwnAccount(userId).subscribe({
      next: () => {
        console.log('✅ Успешно изтрит!');
        this.authService.logout();
      },
      error: (error) => {
        console.error('❌ Грешка при изтриване:', error);
      }
    });
  }
}
