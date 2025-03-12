import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']); // Ако няма токен -> към логина
      return false;
    }
    return true; // Ако има токен -> пускаме го
  }
}