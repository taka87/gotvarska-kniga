import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logged-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './logged-button.component.html',
  styleUrl: './logged-button.component.css'
})
export class LoggedButtonComponent {
  loggedUser: any;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    this.loggedUser = userData ? JSON.parse(userData) : null;
  }

  logOut(): void {
    localStorage.removeItem('loggedUser');
    if (typeof window !== 'undefined') {
      // Кодът тук ще се изпълнява само в браузъра
    window.location.reload();
      console.log(window.location.href);
    }
  }

  addRecipe(): void {
    this.router.navigate(['/add-recipe']);
  }
}
