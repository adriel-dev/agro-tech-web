import { Component, computed, signal, Renderer2, Inject, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/login/auth.service';
import { FarmService } from 'src/app/farm/farm.service';
import { ToastrService } from 'ngx-toastr';


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
export class NavbarComponent implements OnInit {

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

  farmName: string = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private farmService: FarmService,
    private toastService: ToastrService
  ) {
    this.router.events.subscribe({
      next: (event) => {
        this.isLoginPage = (event instanceof NavigationEnd) && (event.url === '/login');
      }
    })
  }

  ngOnInit(): void {
    const farmId = localStorage.getItem("farmId")!;
    this.farmService.findFarmById(farmId).subscribe({
      next: (farm) => {
        this.farmName = farm.name!;
      },
      error: (error) => {
        this.toastService.error("ERRO AO CARREGAR DETALHES DA FAZENDA!");
        console.error(error);
      },
      complete: () => {

      }
    });
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
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("farmId");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

}
