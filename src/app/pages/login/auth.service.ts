import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Observable, switchMap, timer } from 'rxjs';
import { Login, LoginResponse } from './types/login';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = `${environment.apiUrl}/auth`;

  private tokenKey = 'jwtToken';

  isUserAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  login(loginData: Login) {
    return this.http.post(`${this.URL}/login`, loginData, { headers: { 'Anonymous': '' } });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    let token = this.getToken();
    if(token == null) return true
    const decodedToken: any = jwt_decode.jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  getExpirationTime(token: string): number {
    const decodedToken: any = jwt_decode.jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    return expirationTime - currentTime;
  }

  autoLogoutWhenTokenExpires(token: string): Observable<boolean> {
    const expirationTime = this.getExpirationTime(token);

    return timer(expirationTime).pipe(
      switchMap(() => {
        return [true];
      })
    );
  }

}
