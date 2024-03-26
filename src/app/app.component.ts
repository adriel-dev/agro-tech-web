import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from './pages/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'agrotech-web';

  constructor(
    @Inject(DOCUMENT) 
    private document: Document, 
    private render: Renderer2,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.render.addClass(this.document.body, 'dark-theme');
    const token = this.authService.getToken();
    if (token != null && !this.authService.isTokenExpired()) {
      this.authService.isUserAuthenticated = true;
      this.router.navigate(["/animals"]);
    }
  }

}
