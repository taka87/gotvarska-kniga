import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoupService {
  private jsonUrl = 'assets/soups.json'; // Път към JSON файл

  constructor(private http: HttpClient) {}

  getSoups(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
