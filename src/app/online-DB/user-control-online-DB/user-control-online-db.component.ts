import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../mysql-services/auth-service.service';   //следвай пътя за SQL
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceOnlineDB } from '../online-DB-services/auth-service-online-db.service';

@Component({
  selector: 'app-user-control-online-db',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-control-online-db.component.html',
  styleUrl: './user-control-online-db.component.css'
})
export class UserControlOnlineDBComponent {
  email = '';
  password = '';

  constructor(
    private authServiceOnlineDB: AuthServiceOnlineDB,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

  async login() {
    try {
      const user = await this.authServiceOnlineDB.login(this.email, this.password);
  
      if (user) {
        console.log("🎉 Успешен вход:", user);
        this.showMessage("🎉 Login successfully:");
        
        // 🔹 Викаме checkSessionOnlineDB, а НЕ checkSession!
        this.authServiceOnlineDB.checkSessionOnlineDB();
        
        this.router.navigate(['/']);
      } else {
        this.showMessage('❌ Error Username or password!');
      }
    } catch (err) {
      console.error("❌ Грешка при логин:", err);
    }
  }

  logout() {
    this.authServiceOnlineDB.logout();
  }

  navigateToRegister() {
    this.router.navigate(['/register-online-DB']); // Навигация към страницата за регистрация
  }
}