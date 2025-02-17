import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  //Това гарантира, че localStorage ще се изпълни само в браузър.
  getUserData(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('loggedUser');
    }
    return null;
  }

  private get authHeader() {
    const token = localStorage.getItem('token'); // 🔹 Взима токена от localStorage
    return {
      Authorization: `Bearer ${token}`
    };
  }
  // от стария компонент
    private loggedInUser = new BehaviorSubject<string | null>(localStorage.getItem('loggedUser'));
    currentUser$ = this.loggedInUser.asObservable();
  
    setUser(userData: string): void {
      localStorage.setItem('loggedUser', userData);
      this.loggedInUser.next(userData); // Уведомяваме всички компоненти
    }
  
    clearUser(): void {
      localStorage.removeItem('loggedUser');
      this.loggedInUser.next(null); // Нулираме потребителя
    }
    //----------------------------------

    deleteOwnAccount(userId: number): Observable<any> {
      console.log('🔍 Изпращам ID за изтриване:', userId);
      return this.http.delete(`${this.apiUrl}/user/${userId}`, { headers: this.authHeader });
    }
}
