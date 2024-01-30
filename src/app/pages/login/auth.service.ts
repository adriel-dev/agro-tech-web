import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from './types/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = `${environment.apiUrl}/auth`;

  isUserAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  login(loginData: Login) {
    return this.http.post(`${this.URL}/login`, loginData, { headers: { 'Anonymous': '' } });
  }

}
