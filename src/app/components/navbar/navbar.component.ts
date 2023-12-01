import { Component, computed, signal, Renderer2, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
      icon: 'analytics',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'list_alt',
      label: 'Animals',
      route: 'animals'
    },
    {
      icon: 'monitor_heart',
      label: 'Monitorings',
      route: 'monitorings'
    }
  ]);

  constructor(@Inject(DOCUMENT) private document: Document, private render: Renderer2) {

  }

  onSwitchThemeChange() {
    this.lightModeChecked.set(!this.lightModeChecked())
    let theme = this.lightModeChecked() ? 'light' : 'dark';
    this.themeChange.emit(theme)
  }

}
