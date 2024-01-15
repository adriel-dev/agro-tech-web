import { Component, computed, signal, Renderer2, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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

  lightModeChecked = signal(false)

  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  profilePicSize = computed(() => this.collapsed() ? '32' : '100')

  themeSwitchColor = computed(() => this.lightModeChecked() ? 'primary' : 'accent')

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

  constructor(@Inject(DOCUMENT) private document: Document, private render: Renderer2, private breakpointObserver: BreakpointObserver) {

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

}
