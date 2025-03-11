import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../mysql-services/auth-service.service';
import { UserSessionService } from '../../mysql-services/user-session.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-logged-button-mysql',
  imports: [CommonModule,RouterModule],
  templateUrl: './logged-button-mysql.component.html',
  styleUrl: './logged-button-mysql.component.css'
})
export class LoggedButtonMysqlComponent {
  loggedUser: any;
  private userLoggedIn = new BehaviorSubject<boolean>(false); // за взимане loggedInUser данните
  
  constructor(
    private router: Router,
    private authService: AuthService, 
    private userSessionService: UserSessionService,
    private snackBar: MatSnackBar
  ) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

  get userLoggedIn$(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser'); //казва вземи данните от Локал и ги сложи в loggedYUSer
    this.loggedUser = userData ? JSON.parse(userData) : null;  // казва сложените данни в UserData ги използвай за нашите нужди ... 
  }

  // logOut(): void {
  //   localStorage.removeItem('loggedUser');
  //   window.location.reload();
  // }

  addRecipe(): void {
    this.router.navigate(['/user-recipe-mysql']);
  }


  deleteAccount() {
    const confirmation = confirm("Сигурен ли си, че искаш да изтриеш акаунта си?");
    if (!confirmation) {
      return;
    }

    const userData = localStorage.getItem('loggedUser');
    //console.log("📌 Взет потребител преди изтриване:", userData);  
  
    if (!userData) {
      this.showMessage('❌ Грешно потребителско име или парола!');
      return;
    }
  
    const userId = JSON.parse(userData).userId;
    console.log("📢 Опит за изтриване на ID:", userId);
  
    this.userSessionService.deleteOwnAccount(userId).subscribe({
      next: () => {
        //console.log('✅ Потребител изтрит успешно!');
  
          //тука изобщо не влиза !!!

        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
  
        //console.log("🗑️ LocalStorage след изтриване:", localStorage.getItem('token'), localStorage.getItem('loggedUser'));
  
        this.authService.userLoggedIn.next(false);
        this.router.navigate(['/']);
      },
      error: (error) => {
         // това в момента работи-> влиза тук
        // и си е ОК влиза тук и трие потребителя и редиректва към правилнот място началния екран трие целия локал сторидж ... 
        console.error('❌ Грешка при изтриване:', error);
        //this.logOut(); // Това в момента работи, но защо е в error?
      }
    });
  }
  
  // ⬇️ Нова функция за изчистване на сесията и пренасочване
  logOut(): void {
    console.log("🔴 Изпълнява се logout()"); // Добавяме лог
    localStorage.clear();
    // localStorage.removeItem('token');   //additional
    // localStorage.removeItem('loggedUser');  //additional
    this.userLoggedIn.next(false);

    if (typeof window !== 'undefined') {
      window.location.href = "/";
      console.log(window.location.href);
    }    
  }
}
