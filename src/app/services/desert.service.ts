import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesertService {
  private jsonUrl = 'assets/desserts.json'; // Път към JSON файл

  constructor(private http: HttpClient) {}

  getDeserts(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}