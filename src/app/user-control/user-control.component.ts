import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../services/user-session.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-control',
  imports: [CommonModule,ReactiveFormsModule,FormsModule, RouterLink  ],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.css',
  standalone: true,
})
export class UserControlComponent {
  constructor(
    private userSession: UserSessionService, 
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

  email: string = '';
  password: string = '';

  login(): void {
    //console.log("Изпращам заявка за логин:", { email: this.email, password: this.password });

    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      const user = users.find(u => u.email === this.email && u.password === this.password);
      
      if (user) {
        // console.log("Успешен логин!", user);
        this.showMessage("Успешен логин!");
        this.userSession.setUser(JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        alert('Грешен имейл или парола.');
      }
    }, error => {
      console.error("Грешка при логин заявката:", error);
    });
  }
}