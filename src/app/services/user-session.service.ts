import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private loggedInUser = new BehaviorSubject<string | null>(localStorage.getItem('loggedUserJSON'));
  currentUser$ = this.loggedInUser.asObservable();

  setUser(userData: string): void {
    localStorage.setItem('loggedUserJSON', userData);
    this.loggedInUser.next(userData); // Уведомяваме всички компоненти
  }

  clearUser(): void {
    localStorage.removeItem('loggedUserJSON');
    this.loggedInUser.next(null); // Нулираме потребителя
  }

  //взима данни за логнат потребител...
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedUserJSON') !== null;
  }
}