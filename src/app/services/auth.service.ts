import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // getCurrentUser(): string {
  //   // Примерно връщане на фиксирано име за тест
  //   return 'ivan.petrov'; 
  // }

  private apiUrl = 'http://localhost:3000/users'; // Тук ти трябва твоят API път

  constructor(private http: HttpClient) {}

  // Вземаме текущо логнатия потребител (например първия от базата)
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/1`); // Може да адаптираш за реален user ID
  }
}
