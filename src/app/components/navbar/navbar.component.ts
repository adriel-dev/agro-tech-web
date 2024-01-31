import { Component, computed, signal, Renderer2, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/login/auth.service';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  lightModeChecked = signal(false);

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  profilePicSize = computed(() => this.collapsed() ? '32' : '100');

  themeSwitchColor = computed(() => this.lightModeChecked() ? 'primary' : 'accent');

  themeIconsColor = computed(() => this.lightModeChecked() ? 'text-dark' : 'text-white');

  loggedUser = localStorage.getItem('user');

  @Output() themeChange = new EventEmitter<string>();

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Painel',
      route: 'dashboard'
    },
    {
      icon: 'pets',
      label: 'Animais',
      route: 'animals'
    },
    {
      icon: 'person',
      label: 'Funcionários',
      route: 'employees'
    },
    {
      icon: 'inventory',
      label: 'Estoque',
      route: 'stock'
    },
    {
      icon: 'warehouse',
      label: 'Galpões',
      route: 'warehouses'
    }
  ]);


  isLoginPage: boolean = false;

  constructor(
    @Inject(DOCUMENT) 
    private document: Document, 
    private render: Renderer2, 
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe({
      next: (event) => {
        this.isLoginPage = (event instanceof NavigationEnd) && (event.url === '/login');
      }
    })
  }

  onSwitchThemeChange() {
    this.lightModeChecked.set(!this.lightModeChecked())
    let theme = this.lightModeChecked() ? 'light' : 'dark';
    this.themeChange.emit(theme)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.collapsed.set(result.matches);
      });
  }

  onLogout() {
    this.authService.isUserAuthenticated = false;
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

}
