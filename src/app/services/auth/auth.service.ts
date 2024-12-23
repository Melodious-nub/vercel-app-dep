import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://devsutraapi.azurewebsites.net'; // replace with your actual API

  constructor(private http: HttpClient, private router: Router,) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/Registration/login`, { email, password }).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('authToken', response.data.token); // Store token
        }
      }),
      catchError((error) => {
        // console.error('Login error', error);
        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}