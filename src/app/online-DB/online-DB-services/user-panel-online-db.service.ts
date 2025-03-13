import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPanelServiceOnlineDB {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) { }

  getUserRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipe/user-recipes`);
  }

  deleteRecipe(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipe/${recipeId}`);
  }

  editRecipe(recipeId: number, updatedRecipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/recipe/${recipeId}`, updatedRecipe);
  }

  updateRecipe(recipeId: number, updatedRecipe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipe/${recipeId}`, updatedRecipe, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}

