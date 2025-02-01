import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // декларираме  URL към JSON файла (assets/soups.json)
  private apiUrl = 'assets/soups.json'; 

  constructor(private http: HttpClient) {}

  // Създадохме метод getRecipes(), който взима рецептите от JSON.
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}