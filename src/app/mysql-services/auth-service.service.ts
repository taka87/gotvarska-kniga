import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:5000/api/user';

  //public userLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable();
  //userLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit() {
    const loggedUser = localStorage.getItem("loggedUser");
    this.userLoggedIn.next(!!loggedUser); // Проверяваме дали има логнат user
  }

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
    console.log('🚪 Излизане...');
  
    // 🔹 Изчистваме LocalStorage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
  
    // 🔹 Нулираме BehaviorSubject (ако има такъв)
    this.userLoggedIn.next(false);
  
    // 🔹 Пренасочваме към логин страницата
    this.router.navigate(['/']);
  }

  //User info to use outside
  getUserInfo() {
    const userData = localStorage.getItem('loggedUser');
    return userData ? JSON.parse(userData) : null;
  }
}