import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
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
}