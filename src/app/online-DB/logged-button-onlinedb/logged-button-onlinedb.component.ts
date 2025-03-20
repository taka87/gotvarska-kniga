import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceOnlineDB } from '../online-DB-services/auth-service-online-db.service';
import { UserSessionServiceOnlineDB } from '../online-DB-services/user-session-online-db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logged-button-onlinedb',
  imports: [CommonModule,RouterLink],
  templateUrl: './logged-button-onlinedb.component.html',
  styleUrl: './logged-button-onlinedb.component.css'
})
export class LoggedButtonOnlinedbComponent {
 loggedUser: any;
  private userLoggedIn = new BehaviorSubject<boolean>(false); // за взимане loggedInUser данните

  

  constructor(
    private router: Router,
    private authServiceOnlineDB: AuthServiceOnlineDB,
    private userSessionServiceOnlineDB: UserSessionServiceOnlineDB,
    private snackBar: MatSnackBar
  ) {}

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
    const userData = localStorage.getItem('loggedUser');
    this.loggedUser = userData ? JSON.parse(userData) : null;
  }

  addRecipe(): void {
    this.router.navigate(['/user-recipe-onlinedb']);
  }

  deleteAccount(): void {
    if (!this.loggedUser) return;
  
    const confirmation = confirm("Сигурен ли си, че искаш да изтриеш акаунта си?");
    if (!confirmation) return;
  
    this.userSessionServiceOnlineDB.deleteOwnAccount(this.loggedUser.userId).subscribe({
      next: () => {
        console.log('✅ Акаунтът е успешно изтрит');
        this.authServiceOnlineDB.logout();
      },
      error: (error) => {
        console.error('❌ Грешка при изтриване:', error);
      }
    });
  }

  logOut(): void {
    this.authServiceOnlineDB.logout();
  }
}
