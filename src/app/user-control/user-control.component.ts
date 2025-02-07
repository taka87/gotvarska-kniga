import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-user-control',
  imports: [CommonModule,ReactiveFormsModule,FormsModule  ],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.css',
  standalone: true,
})
export class UserControlComponent {

  constructor(private userSession: UserSessionService, private router: Router,private http: HttpClient) {}

  navigateToRegister() {
    this.router.navigate(['/register']);  //просто така работи Ангулар и той помага ... 
  }

  email: string = '';
  password: string = '';

  // new to be Tested
  login(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      const user = users.find(u => u.email === this.email && u.password === this.password);
      
      if (user) {
        // Съхраняваме потребителя в състоянието и LocalStorage
        this.userSession.setUser(JSON.stringify(user));
        this.router.navigate(['/']); // Пренасочване към началната страница
      } else {
        alert('Грешен имейл или парола.');
      }
    });
  }
    // new to be Tested
  // login(): void {
  //   this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
  //     const user = users.find(u => u.email === this.email && u.password === this.password);
  //     if (user) {
  //       //alert(`Добре дошли, ${user.firstName} ${user.lastName}!`);
  //       localStorage.setItem('loggedUser', JSON.stringify(user));
  //     } else {
  //       //alert('Грешен имейл или парола.');
  //     }
  //   });
  // }
}