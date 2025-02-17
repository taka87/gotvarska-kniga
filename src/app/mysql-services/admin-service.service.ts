import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/admin'; // <--- Смени с реалния бекенд URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipes`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }

  deleteRecipe(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${recipeId}`);
  }
}