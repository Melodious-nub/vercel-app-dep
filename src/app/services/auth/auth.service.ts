import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://103.73.224.6:8020'; // replace with your actual API
  // private staticUser = {
  //   email: 'admin@example.com',
  //   password: 'Admin123',
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJBZG1pbiIsImlhdCI6MTYxNzQyMzUyOX0.J1U3hdP4VXRG7eOPtAs-ueBAbYZojLqxmuIVSkmbVGE', // Example JWT
  // };

  constructor(private http: HttpClient, private router: Router,) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/sign-in`, data, { responseType: 'text' }).pipe(
      tap((response: string) => {
        // console.log('Login response:', response);
        // Parse and store the token if needed
        try {
          const token = response; // Response is plain text (the token)
          if (token) {
            localStorage.setItem('authToken', token);
            // console.log('Token saved:', token);
          }
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      }),
      catchError((error) => {
        // console.error('Login error:', error);
        return of(null);
      })
    );
  }

  // login(email: string, password: string): Observable<any> {
  //   if (email === this.staticUser.email && password === this.staticUser.password) {
  //     localStorage.setItem('authToken', this.staticUser.token); // Save token
  //     return of({ success: true, data: { token: this.staticUser.token } });
  //   }
  //   return of({ success: false, message: 'Invalid credentials' });
  // }

  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
