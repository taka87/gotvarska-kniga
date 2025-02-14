import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-mysql',
  templateUrl: './user-mysql.component.html',
  imports: [CommonModule]
})
export class UserMysqlComponent implements OnInit {

  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const apiUrl = 'http://localhost:5000/api/user'; // Тук API пътя
    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }
}