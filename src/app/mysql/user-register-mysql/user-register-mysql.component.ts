import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-register-mysql',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-register-mysql.component.html',
  styleUrl: './user-register-mysql.component.css'
})
export class UserRegisterMysqlComponent implements OnInit {
  title= 'Регистрирайте се за магията на нашия кулинарен свят';
  registrationForm!: FormGroup;
  passwordsDoNotMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // Следим дали паролите съвпадат
    this.registrationForm.valueChanges.subscribe(() => {
      this.passwordsDoNotMatch = this.checkPasswordMismatch();
    });
  }

  private checkPasswordMismatch(): boolean {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  onSubmit() {
    if (this.registrationForm.invalid || this.passwordsDoNotMatch) {
      return;
    }

    const userData = {
      first_name: this.registrationForm.value.firstName,
      last_name: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password_hash: this.registrationForm.value.password
    };

    this.http.post('http://localhost:5000/api/user/register', userData)
    .pipe(
      tap(() => {
        console.log('✅ Регистрация успешна! Пренасочваме...');
        this.registrationForm.reset();
        this.router.navigate(['/']); // 🔥 Пренасочване към началната страница
      })
    )
    .subscribe({
      next: (response) => console.log('Регистрация успешна!', response),
      error: (error) => console.error('Грешка при регистрация:', error)
    });

  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}