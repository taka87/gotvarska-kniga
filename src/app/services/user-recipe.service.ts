import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/userRecipe';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  // private apiUrl = 'http://localhost:3001/userRecipes'; // Адаптирай според API-то ти
  private apiUrl = 'http://localhost:3000/userRecipes'; // Адаптирай според API-то ти

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipe): Observable<Recipe> {
    // Това ще се преработи при MySQL
    return this.http.post<Recipe>(this.apiUrl, {...recipe, id:undefined});  //тест за Id то да зпаочна от 0 и да продължи нестана ... 
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }
}
