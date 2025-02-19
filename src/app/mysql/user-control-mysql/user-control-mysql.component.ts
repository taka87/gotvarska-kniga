import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService} from '../../services/user-session.service';
import { AuthService } from '../../mysql-services/auth-service.service';   //следвай пътя за SQL

@Component({
  selector: 'app-user-control-mysql',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-control-mysql.component.html',
  styleUrl: './user-control-mysql.component.css'
})
export class UserControlMysqlComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService,private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        //console.log("✅ Успешен вход:", response);
  
        // 🔹 Запазваме цялата информация за потребителя
        localStorage.setItem("token", response.token);
        localStorage.setItem("loggedUser", JSON.stringify({
          userId: response.id,  // 👈 Запазваме userId
          firstName: response.firstName,
          role: response.role
        }));
  
        //console.log("🔥 Запазени данни в localStorage:", localStorage.getItem("loggedUser"));
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/user-register-mysql']); // Навигация към страницата за регистрация
  }
}