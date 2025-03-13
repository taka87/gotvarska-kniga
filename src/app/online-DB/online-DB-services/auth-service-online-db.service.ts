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
export class AuthServiceOnlineDB {
  
  private supabase = createClient(environment.NEXT_PUBLIC_SUPABASE_URL, environment.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  //public userLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public userLoggedInOnlineDB = new BehaviorSubject<any>(null);
  userLoggedIn$ = this.userLoggedInOnlineDB.asObservable();
  //userLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
    ) {
      this.checkSessionOnlineDB(); // 🔥 Извикваме при създаване на сървиса!
    }

  showMessage(message: string) {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  // ngOnInit() {
  //   // this.checkSessionOnlineDB(); // 🔥 Добавяме това!
  //   const loggedUser = localStorage.getItem("loggedUser");
  //   this.userLoggedInOnlineDB.next(!!loggedUser); // Проверяваме дали има логнат user
  //   console.log("📌 loggedUserOnlineDB от LocalStorage:", localStorage.getItem("loggedUserOnlineDB"));
  //   console.log("🔹 Потребителят в AuthService е обновен:", this.userLoggedIn$);
  // }

  async login(email: string, password: string): Promise<any> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
  
      console.log("🛠️ Supabase login response:", data, error); // 🔹 Добавяме логване

      if (error || !data.session) {
        console.error("❌ Грешка при вход:", error?.message || "Няма сесия!");
        this.showMessage("❌ Грешка при вход!");
        return null;
      }
  
      // console.log("✅ Успешен вход, данни от Supabase:", data); // 🔍 Debug
  
      const userId = data.user?.id;
      const token = data.session.access_token;
  
      if (!userId) {
        console.error("⚠️ Липсва userId! Възможно е грешка в Supabase.");
        return null;
      }
  
      // 🔹 Взимаме допълнителни данни за потребителя (напр. роля)
      const { data: userData, error: userError } = await this.supabase
        .from("users") // 🛑 Име на таблицата в Supabase
        .select("role")
        .eq("id", userId)
        .single();
  
      if (userError) {
        console.error("⚠️ Грешка при вземане на роля:", userError.message);
      }
  
      const userRole = userData?.role || "user"; // 👈 Ако няма роля, приемаме "user"
  
      // 🔹 Запазваме потребителските данни
      localStorage.setItem("token", token);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          userId,
          email: data.user.email,
          role: userRole,
        })
      );
  
      this.userLoggedInOnlineDB.next({
        userId,
        email: data.user.email,
        role: userRole
      });
      console.log("✅ Успешен вход, записан в localStorage:", { userId, email: data.user.email, role: userRole });
      this.showMessage("✅ Успешен вход!");
      
      return {
        userId,
        email: data.user.email,
        role: userRole
      };
    } catch (err) {
      console.error("❌ Грешка при изпълнение на login:", err);
      return null;
    }
  }

  checkSessionOnlineDB(): void {
    const userData = localStorage.getItem("loggedUserOnlineDB"); // 🔹 Променяме ключа в localStorage
    if (userData) {
      this.userLoggedInOnlineDB.next(JSON.parse(userData));
    } else {
      this.userLoggedInOnlineDB.next(null);
    }
  }
  
  // ✔️ Логаут функция
  async logout() {
    await this.supabase.auth.signOut();

    console.log('🚪 Излизане...');
    this.showMessage('🚪 Изход Успешен...');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    this.userLoggedInOnlineDB.next(null);

    this.router.navigate(['/']);
  }
}