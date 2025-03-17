import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthServiceOnlineDB } from './auth-service-online-db.service';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeServiceOnlineDB {
  private apiKey = environment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  constructor(
    private authServiceOnlineDB: AuthServiceOnlineDB,
    private http: HttpClient
  ) {}

  addRecipe(recipeData: any) {
    return this.http.post('https://gryzvkmsfnkbzswnzjyf.supabase.co/rest/v1/user_recipes', recipeData, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.authServiceOnlineDB.getToken()}`
      }
    });
  }
}