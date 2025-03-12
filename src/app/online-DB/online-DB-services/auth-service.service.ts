import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private supabase = createClient(environment.NEXT_PUBLIC_SUPABASE_URL, environment.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  //public userLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable();
  //userLoggedIn$ = new BehaviorSubject<boolean>(false);




  constructor(
    private router: Router,
    private snackBar: MatSnackBar
    ) {
    this.checkSession();
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnInit() {
    const loggedUser = localStorage.getItem("loggedUser");
    this.userLoggedIn.next(!!loggedUser); // Проверяваме дали има логнат user
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Грешка при вход:", error.message);
      this.showMessage("❌ Грешка при вход:");
      return null;
    }

    if (data?.session) {
      const userId = data.user.id;  // 🆔 ID на потребителя
      const token = data.session.access_token;  // 🔑 Token за достъп

          // 🔹 Взимаме ролята на потребителя от таблицата `users`
    const { data: userData, error: userError } = await this.supabase
      .from('users')  // 🛑 ЗАМЕНИ С ИМЕТО НА ТВОЯТА ТАБЛИЦА
      .select('role')  
      .eq('id', userId)  
      .single();  

    if (userError) {
      console.error("⚠️ Неуспешно вземане на роля:", userError.message);
      return null;
    }

      // 🔹 Запазваме потребителя в localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("loggedUser", JSON.stringify({
        userId,
        email: data.user.email,
        role: userData?.role || "user"  // 👈 Ако няма роля, по подразбиране е "user"
      }));

      this.userLoggedIn.next(true);
      console.log("✅ Успешен вход:", data.user);
      this.showMessage("✅ Успешен вход:");
      return data.user;
    }
  }

  
  // ✔️ Логаут функция
  async logout() {
    await this.supabase.auth.signOut();

    console.log('🚪 Излизане...');
    this.showMessage('🚪 Изход Успешен...');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    this.userLoggedIn.next(false);

    this.router.navigate(['/']);
  }

  //User info to use outside
  getUserInfo() {
    const userData = localStorage.getItem('loggedUser');
    return userData ? JSON.parse(userData) : null;
  }

  // ✔️ Проверява дали потребителят е логнат (ако рефрешне страницата)
  async checkSession() {
    const { data } = await this.supabase.auth.getSession();
    
    if (data.session) {
      this.userLoggedIn.next(true);
    } else {
      this.userLoggedIn.next(false);
    }
  }
}