import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService, 
    private router: Router,
    // @Inject(PLATFORM_ID) private platformId: any  //SSR 
  ) { }

  //Това гарантира, че localStorage ще се изпълни само в браузър.
  getUserData(): string | null {
      return localStorage.getItem('loggedUserMYSQL');
  }

  private get authHeader() {
    const token = localStorage.getItem('token'); // 🔹 Взима токена от localStorage
    return {
      Authorization: `Bearer ${token}`
    };
  }
  // от стария компонент
    private loggedInUser = new BehaviorSubject<string | null>(localStorage.getItem('loggedUserMYSQL'));
    currentUser$ = this.loggedInUser.asObservable();

  // user-session.service.ts
  deleteOwnAccount(userId: number): Observable<any> {
    // console.log("📢 Опит за изтриване на user с ID:", userId);

    return this.http.delete(`${this.apiUrl}/user/${userId}`, { responseType: 'text' });
    // return this.http.delete(`${this.apiUrl}/user/${userId}`, { headers: this.authHeader }).pipe(
    //   tap(() => console.log("✅ Потребителят е изтрит"))
    // );
  }

  // ⬇️ Изчистваме локално user-а
  clearUser(): void {
    console.log('🧹 Изчистваме потребителската сесия');
    
    localStorage.removeItem('loggedUserMYSQL');
    this.loggedInUser.next(null); // Нулираме BehaviorSubject
  }
}
