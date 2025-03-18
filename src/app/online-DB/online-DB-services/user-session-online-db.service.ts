import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import{supabase} from '../../../../supabase';

@Injectable({
  providedIn: 'root'
})
export class UserSessionServiceOnlineDB {

  private loggedInUser = new BehaviorSubject<any>(null); // ✅ Държим информация за логнатия потребител
  currentUser$ = this.loggedInUser.asObservable();

  constructor(
    private router: Router
  ) {
    this.checkUserSession(); // 🔥 При стартиране проверяваме дали има логнат потребител
  }

  // ✅ Проверяваме дали има активна сесия в Supabase
  async checkUserSession() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      this.loggedInUser.next(data.user);
    } else {
      this.loggedInUser.next(null);
    }
  }

  // ✅ Връща текущо логнатия потребител
  getUserData() {
    return this.loggedInUser.value;
  }

  // ✅ Изтриване на акаунта от Supabase
  deleteOwnAccount(userId: string): Observable<any> {
    // console.log("📢 Опит за изтриване на user с ID:", userId);

    return from(
      supabase.from('users').delete().eq('id', userId)
    ).pipe(
      tap(() => {
        console.log("✅ Потребителят е изтрит от Supabase");
        this.clearUser(); // 🚀 Чистим сесията след изтриване
      })
    );
  }

  // ✅ Изчистване на потребителската сесия
  clearUser(): void {
    console.log('🧹 Изчистваме потребителската сесия');
    this.loggedInUser.next(null);
    supabase.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}