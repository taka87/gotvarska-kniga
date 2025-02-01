import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaladService {
  private jsonUrl = 'assets/salads.json'; // Път към JSON файл

  constructor(private http: HttpClient) {}

  getSalads(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
