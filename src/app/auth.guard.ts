import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    if (userData.role === 'admin') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}