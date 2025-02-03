import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [CommonModule,ReactiveFormsModule ],
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      alert('Регистрацията е успешна!');
      console.log(this.registrationForm.value);
    } else {
      alert('Моля, попълнете всички полета коректно!');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}