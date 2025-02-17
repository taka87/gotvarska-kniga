import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user';
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable(); 

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; firstName: string; role: string; id: number }>(  // ❗️ Поправен тип
      `${this.apiUrl}/login`, 
      { email, password }
    ).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('loggedUser', JSON.stringify({
          userId: response.id,  // ✅ response.id вместо response.userId
          firstName: response.firstName,
          role: response.role
        }));
       // console.log("🔹 Записан потребител:", response);
        this.userLoggedIn.next(true); // 🔥 Сигнализираме, че потребителят е логнат
      })
    );
  }

  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    this.userLoggedIn.next(false); // 🔥 Изпращаме сигнал, че потребителят е излязъл
  }

  //User info to use outside
  getUserInfo() {
    const userData = localStorage.getItem('loggedUser');
    return userData ? JSON.parse(userData) : null;
  }




  // private apiUrl = 'http://localhost:5000/api/user'; // 📌 Смени на правилния API адрес

  // constructor(private http: HttpClient) {} // ✅ Добавяме HttpClient

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
  //     catchError(error => {
  //       console.error("Грешка при вход:", error);
  //       return throwError(() => new Error(error.error?.message || "Възникна грешка"));
  //     })
  //   );
  // }


  // private apiUrl = 'http://localhost:5000/api/auth/login';

  // constructor(private http: HttpClient) {}

  // login(user: { email: string; password: string }) {
  //   return this.http.post<{ token: string }>(this.apiUrl, user).pipe(
  //     tap(response => {
  //       localStorage.setItem('token', response.token); // Записваме токена в localStorage
  //     })
  //   );
  // }
}
