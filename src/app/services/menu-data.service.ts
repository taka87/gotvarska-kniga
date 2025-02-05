import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  //private menuDataUrl = 'assets/menu-data.json'; 
  private menuDataUrl = '#'; // Път към JSON файла


  constructor(private http: HttpClient) {}

  getMenuData(fileName: string): Observable<any> {
    return this.http.get<any>(`assets/${fileName}.json`);
  }
}