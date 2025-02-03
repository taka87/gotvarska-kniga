import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-user-control',
  imports: [CommonModule,ReactiveFormsModule,FormsModule  ],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.css',
  standalone: true,
})
export class UserControlComponent {

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);  //просто така работи Ангулар и той помага ... 
  }

  email: string = '';
  password: string = '';

  login(): void {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === this.email && user.password === this.password) {
        alert(`Добре дошли, ${user.firstName} ${user.lastName}!`);
        // Пренасочване след успешен вход, ако искаш
        this.router.navigate(['/']);
      } else {
        alert('Грешен имейл или парола.');
      }
    } else {
      alert('Няма регистриран потребител.');
    }
  }
}
