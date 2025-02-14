import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logged-button-mysql',
  imports: [CommonModule],
  templateUrl: './logged-button-mysql.component.html',
  styleUrl: './logged-button-mysql.component.css'
})
export class LoggedButtonMysqlComponent {
  loggedUser: any;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    this.loggedUser = userData ? JSON.parse(userData) : null;
  }

  logOut(): void {
    localStorage.removeItem('loggedUser');
    window.location.reload();
  }

  addRecipe(): void {
    this.router.navigate(['/add-recipe-mysql']);
  }
}
