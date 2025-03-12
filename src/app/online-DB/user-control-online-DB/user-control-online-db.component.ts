import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService} from '../../services/user-session.service';
import { AuthService } from '../../mysql-services/auth-service.service';   //следвай пътя за SQL
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-control-online-db',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-control-online-db.component.html',
  styleUrl: './user-control-online-db.component.css'
})
export class UserControlOnlineDBComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService,
    private router: Router,
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

  async login() {
    const user = await this.authService.login(this.email, this.password);

    if (user) {
       console.log("🎉 Успешен вход:", user);
       this.showMessage("🎉 Успешен вход:");
       this.router.navigate(['/']); // 👉 Пренасочваме към главната страница
     } else {
       this.showMessage('❌ Грешно потребителско име или парола!');
     }
  }

  logout() {
    this.authService.logout();
  }

  navigateToRegister() {
    this.router.navigate(['/register-online-DB']); // Навигация към страницата за регистрация
  }
}