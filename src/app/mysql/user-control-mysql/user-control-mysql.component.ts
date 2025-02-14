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
        console.log("✅ Успешен вход:", response);
        localStorage.setItem("token", response.token); // 📌 Запазваме токена
      },
      error: (err) => {
        alert(err.message); // 📌 Показваме грешката
      }
    });
  }


  // email: string = '';
  // password: string = '';
  // apiUrl = 'http://localhost:5000/api/user/login'; // Сложи правилния URL за логин

  // constructor(private http: HttpClient, private router: Router) {}

  // login() {
  //   const userData = { email: this.email, password: this.password };

  //   this.http.post<{ token: string }>(this.apiUrl, userData).subscribe({
  //     next: (response) => {
  //       localStorage.setItem('token', response.token); // Запазване на токена
  //       console.log('Login successful, token:', response.token);
  //       this.router.navigate(['/']); // Пренасочване към началната страница
  //     },
  //     error: (error) => {
  //       console.error('Login failed:', error);
  //       alert('Грешен имейл или парола!');
  //     }
  //   });
  // }

  navigateToRegister() {
    this.router.navigate(['/user-register-mysql']); // Навигация към страницата за регистрация
  }
}
