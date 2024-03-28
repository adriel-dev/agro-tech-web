import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Login } from './types/login';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = `${environment.apiUrl}/auth`;

  private tokenKey = 'jwtToken';

  isUserAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastService: ToastrService) {
    this.checkTokenExpirationOnLoad();
  }

  login(loginData: Login): Observable<any> {
    return this.http.post(`${this.URL}/login`, loginData, { headers: { 'Anonymous': '' } });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.autoLogoutWhenTokenExpires(token).subscribe(loggedOut => {
      if (loggedOut) {
        this.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    let token = this.getToken();
    if (token == null) return true;
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

  logout(): void {
    this.clearToken();
    localStorage.clear();
    this.toastService.warning("SESSÂO EXPIRADA!")
  }

  private checkTokenExpirationOnLoad(): void {
    const token = this.getToken();
    if (token && this.isTokenExpired()) {
      this.logout();
      this.router.navigate(['/login']);
    } else if (token) {
      this.setToken(token);
    }
  }
}
