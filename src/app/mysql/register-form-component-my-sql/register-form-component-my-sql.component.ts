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
import { supabase } from '../../../../supabase';
import * as bcrypt from 'bcryptjs';

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

  //supabase
  async onSubmit() {
    if (this.registrationForm.invalid || this.passwordsDoNotMatch) {
      return;
    }
  
    const userData = {
      first_name: this.registrationForm.value.firstName,
      last_name: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password_hash: this.registrationForm.value.password,
      role: this.isAdmin ? 'admin' : 'user'
    };
  
    // console.log(userData.password_hash);

    //имаме малко функционалност и микс в subscribe, observable, await, async, promise...
    try {
      // 1️⃣ Локална регистрация (ако използваме MySQL)
      this.http.post(this.apiUrl, userData).subscribe({
        next: (response) => {
          this.showMessage('✅ Регистрация успешна SQL!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('❌ Грешка при регистрация SQL:', error);
          this.showMessage('❌ Грешка при регистрация SQL!');
        }
      });
  
      
      // 2️⃣ Регистрация в Supabase
      await this.registerUserWithSupabase();
      this.showMessage('✅ Регистрация успешна в Supabase!');
  
      // ✅ Ако всичко мине успешно, пренасочваме потребителя
      this.registrationForm.reset();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('❌ Грешка при регистрация SUPA:', error);
      this.showMessage('❌ Грешка при регистрация SUPA!');
    }
  }

  // async onSubmit() {
  //   if (this.registrationForm.invalid || this.passwordsDoNotMatch) {
  //     return;
  //   }

  //   const userData = {
  //     first_name: this.registrationForm.value.firstName,
  //     last_name: this.registrationForm.value.lastName,
  //     email: this.registrationForm.value.email,
  //     password_hash: this.registrationForm.value.password,
  //     role: this.isAdmin ? 'admin' : 'user' // 👈 Задаваме правилната роля
  //   };

  //   //console.log('dawaj datata', userData);
  //   this.http.post(this.apiUrl, userData)
  //     .pipe(
  //       tap(() => {
  //         this.showMessage('✅ Регистрация успешна! Пренасочваме...')
  //         // console.log('✅ Регистрация успешна! Пренасочваме...');
  //         this.registrationForm.reset();
  //         this.router.navigate(['/']);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => this.showMessage('Регистрация успешна!'),
  //       error: (error) => this.showMessage('Грешка при регистрация:')
  //       // next: (response) => console.log('Регистрация успешна!', response),
  //       // error: (error) => console.error('Грешка при регистрация:', error)
  //     });

  //     //supabase
  //     if (this.registrationForm.invalid) return;

  //     await this.registerUserWithSupabase();
      
  //     //console.log("Локална регистрация също може да се изпълни тук");
  // }

  goBack(): void {
    this.router.navigate(['/']);
  }

  //supabase->register
  async registerUserWithSupabase() {
    // console.log("Стойностите на формата:", this.registrationForm.value);

    const first_name = this.registrationForm.value.firstName;
    const last_name = this.registrationForm.value.lastName;
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password; // 👈 Supabase изисква `password`, не `password_hash`
    const role = this.isAdmin ? 'admin' : 'user';

    // console.log("Данни за регистрация:", { first_name, last_name, email, password, role });

    // 1️⃣ Регистрация в Supabase Authentication
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      console.error('❌ Грешка при регистрация в Supabase:', error.message);
      this.showMessage('❌ Грешка в Supabase!');
      return;
    }

    // console.log("✅ Успешна регистрация в Authentication!", data);
    // 2️⃣ Хеширане на паролата
    const hashedPassword = await this.hashPassword(password);

    // console.log(hashedPassword);

    // 2️⃣ Добавяне на потребителя в таблицата `users`
    if (data.user) {
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: data.user.id, // 👈 ID-то от Supabase Auth
          first_name: first_name,
          last_name: last_name,
          email: email,
          password_hash: hashedPassword,
          role: role
        }
      ]);

      if (dbError) {
        console.error('❌ Грешка при запис в таблицата `users`:', dbError.message);
        this.showMessage('❌ Грешка в Supabase Database!');
        return;
      }

      this.showMessage('✅ Успешна регистрация в Supabase!');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Брой солени rounds за хеширане
    return await bcrypt.hash(password, saltRounds);
  }
}
