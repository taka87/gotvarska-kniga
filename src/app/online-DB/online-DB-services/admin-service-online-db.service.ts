import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceOnlineDB {
  private apiUrl = 'http://localhost:5000/api/admin'; // <--- Смени с реалния бекенд URL
  private apiUserUrl = 'http://localhost:5000/api/user'; // <--- за достъп до userController
  private apiRecipesUrl = 'http://localhost:5000/api/recipe';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipes`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUserUrl}/${userId}`);
  }

  deleteRecipe(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiRecipesUrl}/${recipeId}`);
  }

  editRecipe(recipeId: number, updatedRecipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiRecipesUrl}/${recipeId}`, updatedRecipe);
  }

  updateRecipe(recipeId: number, updatedRecipe: any): Observable<any> {
    return this.http.put(`${this.apiRecipesUrl}/${recipeId}`, updatedRecipe, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}