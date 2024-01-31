import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login, LoginResponse } from './types/login';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: Login = new Login();
  loginForm!: FormGroup
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;
    this.authService.login(this.login).subscribe({
      next: (res) => {
        let response = res as LoginResponse
        let decodedToken: any = jwt_decode.jwtDecode(response.token);
        let user = decodedToken.sub;
        let farmId = decodedToken.farmId;
        localStorage.setItem('user', user);
        localStorage.setItem('farmId', farmId);
        localStorage.setItem('jwtToken', response.token);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.authService.isUserAuthenticated = true;
        this.router.navigate(["/animals"]);
      },
    });
  }

}