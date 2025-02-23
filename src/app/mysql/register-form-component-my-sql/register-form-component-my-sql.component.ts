import { Component,OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form-component-my-sql',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register-form-component-my-sql.component.html',
  styleUrl: './register-form-component-my-sql.component.css'
})
export class RegisterFormComponentMySqlComponent implements OnInit{
  @Input() isAdmin: boolean = false; // 👈 Различаваме user/admin
  // @Output() registrationSuccess = new EventEmitter<void>();

  registrationForm!: FormGroup;
  passwordsDoNotMatch: boolean = false;
  apiUrl: string = ''; // 👈 Определяме динамично URL

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
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
    this.apiUrl = this.isAdmin
    ? 'http://localhost:5000/api/admin/register-admin' // 🔧 Коригирано
    : 'http://localhost:5000/api/user/register'; // 👈 Различни URL за админ и потребител

    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

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
      password_hash: this.registrationForm.value.password,
      role: this.isAdmin ? 'admin' : 'user' // 👈 Задаваме правилната роля
    };

    //console.log('dawaj datata', userData);
    this.http.post(this.apiUrl, userData)
      .pipe(
        tap(() => {
          this.showMessage('✅ Регистрация успешна! Пренасочваме...')
          // console.log('✅ Регистрация успешна! Пренасочваме...');
          this.registrationForm.reset();
          this.router.navigate(['/']);
        })
      )
      .subscribe({
        next: (response) => this.showMessage('Регистрация успешна!'),
        error: (error) => this.showMessage('Грешка при регистрация:')
        // next: (response) => console.log('Регистрация успешна!', response),
        // error: (error) => console.error('Грешка при регистрация:', error)
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
