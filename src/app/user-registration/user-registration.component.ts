import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../services/user-session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [CommonModule,ReactiveFormsModule,RouterLink ],
})
export class UserRegistrationComponent implements OnInit {
  title = 'Добре дошли в нашия кулинарен свят ... ';

  registrationForm!: FormGroup;
  passwordsDoNotMatch: boolean = false;
  apiUrl: string = 'http://localhost:3000/users'; // URL за JSON сървъра

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userSession: UserSessionService,
    private snackBar: MatSnackBar
  ) {}  

  showMessage(message: string) {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    // Следим дали паролите съвпадат при промяна
    this.registrationForm.valueChanges.subscribe(() => {
      this.passwordsDoNotMatch = this.checkPasswordMismatch();
    });
  }

  // Проверка дали паролите съвпадат
  private checkPasswordMismatch(): boolean {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  onSubmit(): void {
    // Ако формулярът е невалиден или паролите не съвпадат, показваме грешките.
    if (this.registrationForm.invalid || this.passwordsDoNotMatch) {
      // Маркираме всички полета като проверени, за да покажем грешките
      this.registrationForm.markAllAsTouched(); 
      return;
    }
  
    const formData = this.registrationForm.value;
  
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
  
    this.http.post(this.apiUrl, newUser).subscribe(() => {
      this.userSession.setUser(JSON.stringify(newUser));
      //alert('Регистрацията е успешна!');
      this.showMessage('Регистрацията е успешна!');
      this.router.navigate(['/']);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}