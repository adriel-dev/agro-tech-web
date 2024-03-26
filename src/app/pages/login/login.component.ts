import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login, LoginResponse } from './types/login';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Observable, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  loginForm!: FormGroup
  hidePassword = true;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  toastDefaultContainer!: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastService: ToastrService) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.toastDefaultContainer = this.toastService.overlayContainer;
    this.toastService.toastrConfig.maxOpened = 1;
    this.toastService.toastrConfig.autoDismiss = true;
    this.toastService.overlayContainer = this.toastContainer;
  }

  onSubmit() {
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;
    this.authService.login(this.login).subscribe({
      next: (res) => {
        let response = res as LoginResponse;
        let token = response.token;
        let decodedToken: any = jwt_decode.jwtDecode(token);
        let user = decodedToken.sub;
        let farmId = decodedToken.farmId;
        
        this.authService.setToken(token);
        
        localStorage.setItem('farmId', farmId);
        localStorage.setItem('user', user);

        this.authService.autoLogoutWhenTokenExpires(token).subscribe(() => {
          this.logout();
        });
      },
      error: (error) => {
        if (error.status === 0) {
          this.toastService.error("ERRO AO SE CONECTAR COM O SERVIDOR!", undefined, { positionClass: "inline" });
        } else if (error.status === 403) {
          this.toastService.warning("USUÁRIO OU SENHA INCORRETO(S)", undefined, { positionClass: "inline" });
        } else {
          this.toastService.error("ERRO DESCONHECIDO!", undefined, { positionClass: "inline" });
        }
      },
      complete: () => {
        this.resetToastrConfigs();
        this.authService.isUserAuthenticated = true;
        this.router.navigate(["/animals"]);
      },
    });
  }

  private resetToastrConfigs() {
    this.toastService.overlayContainer = this.toastDefaultContainer
    this.toastService.toastrConfig.maxOpened = 0;
    this.toastService.toastrConfig.autoDismiss = false;
  }

  logout() {
    this.authService.clearToken();
    this.authService.isUserAuthenticated = false;
    this.router.navigateByUrl("login");
  }

}