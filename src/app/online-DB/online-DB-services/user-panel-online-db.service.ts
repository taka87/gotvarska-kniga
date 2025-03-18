import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map,tap,from } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthServiceOnlineDB } from './auth-service-online-db.service';
import { supabase } from '../../../../supabase';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class UserPanelServiceOnlineDB {
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

  getUserRecipes(userId: string): Observable<any[]> {
    const url = `${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_recipes?user_id=eq.${userId}&select=*`;
  
    return this.http.get<any[]>(url, {
      headers: {
        'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });
  }

  // getUserRecipes() {
  //   return this.http.get<any[]>(`${environment.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_recipes?select=id,recipe_name,description,ingredients,user:users(id,first_name,last_name)`, {
  //     headers: {
  //       'apikey': environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //       'Authorization': `Bearer ${environment.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  //     }
  //   });
  // }

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
}

