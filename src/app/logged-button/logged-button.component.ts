import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logged-button',
  imports: [CommonModule],
  templateUrl: './logged-button.component.html',
  styleUrl: './logged-button.component.css'
})
export class LoggedButtonComponent {
  loggedUser: any;

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    this.loggedUser = userData ? JSON.parse(userData) : null;
  }

  logOut(): void {
    localStorage.removeItem('loggedUser');
    window.location.reload();
  }
}
