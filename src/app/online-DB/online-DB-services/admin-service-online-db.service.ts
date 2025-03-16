import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthServiceOnlineDB } from './auth-service-online-db.service';
// import { supabase } from '../supabase-client';
import { supabase } from '../../../../supabase.ts';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceOnlineDB {
  private apiUrl = `${environment.NEXT_PUBLIC_SUPABASE_URL}/api/admin`;
  private apiUserUrl = `${environment.NEXT_PUBLIC_SUPABASE_URL}/api/user`;
  private apiRecipesUrl = `${environment.NEXT_PUBLIC_SUPABASE_URL}/api/recipe`;

  // const supabase = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');

  constructor(
    private http: HttpClient,
    private authServiceOnlineDB: AuthServiceOnlineDB
  ) {}

  grantAdmin(userId: string): Observable<any> {
    return from(
      supabase.from('roles').upsert([{ user_id: userId, role: 'admin' }])
    );
  }

  async getUserRole(userId: string): Promise<string> {
    const { data, error } = await supabase
      .from('roles')
      .select('role')
      .eq('user_id', userId)
      .single();
      
    return data?.role || 'user';
  }

  getUsers(): Observable<any> {
    return from(supabase.from('users').select('*'));
  }

  // getUsers(): Observable<any[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.authServiceOnlineDB.getToken()}`,
  //     Role: this.authServiceOnlineDB.getRole() // 🔥 Тук изпращаш ролята като хедър
  //   });

  //   return this.http.get<any[]>(`${this.apiUrl}/users`);
  // }

  getRecipes(): Observable<any> {
    return from(supabase.from('user_recipes').select('*'));
  }

  deleteUser(userId: string): Observable<any> {
    return from(supabase.from('users').delete().eq('id', userId));
  }

  deleteRecipe(recipeId: string): Observable<any> {
    return from(supabase.from('user_recipes').delete().eq('id', recipeId));
  }

  editRecipe(recipeId: number, updatedRecipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiRecipesUrl}/${recipeId}`, updatedRecipe);
  }

  updateRecipe(recipeId: string, recipeData: any): Observable<any> {
    return from(supabase.from('user_recipes').update(recipeData).eq('id', recipeId));
  }
}