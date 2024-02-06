import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login, LoginResponse } from './types/login';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: Login = new Login();
  loginForm!: FormGroup
  hidePassword = true;

  errorMsg: string = "";
  alertType: string = "";
  displayAlert: boolean = false;

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
        if(error.message.includes("Unknown Error")) {
          this.displayAlertMessage("Erro ao se conectar com o servidor.", 'danger', 5000);
        } else if(error.message.includes("403")) {
          this.displayAlertMessage("Usuário ou senha incorreto(s).", 'warning', 5000);
        }
      },
      complete: () => {
        this.authService.isUserAuthenticated = true;
        this.router.navigate(["/animals"]);
      },
    });
  }

  private displayAlertMessage(errorMsg: string, type: string, timeout: number) {
    this.errorMsg = errorMsg;
    this.alertType = type;
    this.displayAlert = true;
    setTimeout(() => {
      this.displayAlert = false;
    }, timeout);
  }

}