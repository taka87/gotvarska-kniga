import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { from, Observable,map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthServiceOnlineDB } from './auth-service-online-db.service';
import { supabase } from '../../../../supabase';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceOnlineDB {
  // private apiUrl = `${environment.NEXT_PUBLIC_SUPABASE_URL}/api/admin`;
  private apiUserUrl = `${environment.NEXT_PUBLIC_SUPABASE_URL}/api/user`;
  // private apiRecipesUrl = `${environment.NEXT_PUBLIC_SUPABASE_URL}/api/recipe`;

  // const supabase = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });

  private supabase: SupabaseClient;


  constructor(
    private http: HttpClient,
    private authServiceOnlineDB: AuthServiceOnlineDB) {
    this.supabase = createClient(
      environment.NEXT_PUBLIC_SUPABASE_URL,
      environment.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  getUsers(): Observable<any[]> {
    return from(
      this.supabase.from('users').select('*')
    ).pipe(
      map(response => {
        console.log("📌 Получени потребители от Supabase:", response);
        return Array.isArray(response.data) ? response.data : [];
      })
    );
  }

  grantAdminRole(userId: string): Observable<any> {
    return from(
      supabase.from('roles').upsert([{ user_id: userId, role: 'admin' }])
    );
  }

  // Метод за изтриване на потребител
  // Метод за изтриване на потребител
  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUserUrl}?id=eq.${userId}`;
    return this.http.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    });
  }
  // Метод за зареждане на потребители
  loadUsers(): Observable<any> {
    return this.http.get(`${this.apiUserUrl}`, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    });
  }


  updateUserRole(userId: string, isAdmin: boolean): Observable<any> {
    const url = `${this.apiUserUrl}?id=eq.${userId}`;
    return this.http.patch(url, { role: isAdmin ? 'admin' : 'user' }, { headers: this.headers });
  }

  // async getUserRole(userId: string): Promise<string> {
  //   const { data, error } = await supabase
  //     .from('roles')
  //     .select('role')
  //     .eq('user_id', userId)
  //     .single();
      
  //   return data?.role || 'user';
  // }

  // // getUsers(): Observable<any[]> {
  // //   const headers = new HttpHeaders({
  // //     Authorization: `Bearer ${this.authServiceOnlineDB.getToken()}`,
  // //     Role: this.authServiceOnlineDB.getRole() // 🔥 Тук изпращаш ролята като хедър
  // //   });
   // //   return this.http.get<any[]>(`${this.apiUrl}/users`);
  // // }

  // getRecipes(): Observable<any> {
  //   return from(supabase.from('user_recipes').select('*'));
  // }

  // deleteUser(userId: string) {
  //   return from(supabase.from('users').delete().eq('id', userId));
  // }

  // deleteRecipe(recipeId: string): Observable<any> {
  //   return from(supabase.from('user_recipes').delete().eq('id', recipeId));
  // }

  // // //todo
  // // editRecipe(recipeId: string, updatedRecipe: any): Observable<any> {
  // //   return this.http.put<any>(`${this.apiRecipesUrl}/${recipeId}`, updatedRecipe);
  // // }

  // updateRecipe(recipeId: string, recipeData: any): Observable<any> {
  //   return from(supabase.from('user_recipes').update(recipeData).eq('id', recipeId));
  // }
}
