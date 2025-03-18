import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { from, Observable,map,tap } from 'rxjs';
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
  private deleteUserUrl = "https://gryzvkmsfnkbzswnzjyf.functions.supabase.co/deleteUser";

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
        // console.log("📌 Получени потребители от Supabase:", response);
        return Array.isArray(response.data) ? response.data : [];
      })
    );
  }

  // Метод за изтриване на потребител
  deleteUser(userId: string) {
    return this.http.delete(`${this.deleteUserUrl}?id=${userId}`);
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

  getUserRecipes() {
    return this.http.get<any[]>(`${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_recipes?select=id,recipe_name,description,ingredients,user:users(id,first_name,last_name)`, {
      headers: {
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });
    // .pipe(
    //   tap(data => console.log("Recipes with users:", data)) // Логваме да проверим резултата
    // );
  }

  // getUserRecipes() {
  //   return this.http.get<any[]>(`${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_recipes`, {
  //     headers: {
  //       'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //       'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  //     }
  //   });
  // }

  //2
  deleteUserRecipe(recipeId: string) {
    return this.http.delete(`${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_recipes?id=eq.${recipeId}`, {
      headers: {
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });
  }

  //3
  editUserRecipe(recipeId: string, updatedData: any) {
    return this.http.patch(`${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_recipes?id=eq.${recipeId}`, updatedData, {
      headers: {
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  updateUserRole(userId: string, isAdmin: boolean): Observable<any> {
    const url = `${this.apiUserUrl}?id=eq.${userId}`;
    return this.http.patch(url, { role: isAdmin ? 'admin' : 'user' }, { headers: this.headers });
  }

  //4 ??
  registerUser(userData: any) {
    return this.http.post(`${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users`, userData, {
      headers: {
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
