import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './mysql-services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.userLoggedIn.getValue();
    if (!isLoggedIn) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}