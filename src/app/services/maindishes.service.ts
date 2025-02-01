import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainDishService {
  private jsonUrl = 'assets/maindishes.json'; // Път към JSON файл

  constructor(private http: HttpClient) {}

  getMainDishes(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}