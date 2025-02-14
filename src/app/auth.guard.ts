import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './mysql-services/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserInfo();
    if (!user) {
      this.router.navigate(['/login']); // Ако няма логнат потребител, пращаме към вход
      return false;
    }
    return true;
  }
}
