import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly tokenUrl = 'http://localhost:9000/application/o/token/';
  private readonly clientId = 'employee_api_client';

  createToken(username: string, password: string): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('client_id', this.clientId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<TokenResponse>(this.tokenUrl, body.toString(), { headers })
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  refreshToken(): void {
    // refreshen wenn token abläuft
  }
}
