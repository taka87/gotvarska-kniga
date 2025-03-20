import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    console.log("Опит за логин с:", credentials);

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === credentials.email && user.password === credentials.password)),
      tap(user => {
        if (user) {
          console.log("Логин успешен!", user);
          localStorage.setItem('loggedUserJSON', JSON.stringify(user));
        } else {
          console.warn("Грешен имейл или парола!");
        }
      }),
      catchError(error => {
        console.error("Грешка при логин:", error);
        return throwError(() => error);
      })
    );
  }
}
