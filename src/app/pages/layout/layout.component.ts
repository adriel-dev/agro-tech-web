import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) 
    private document: Document, 
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    this.onChangeTheme(savedTheme);
  }

  onChangeTheme(themeValue: string) {
    this.render.removeClass(this.document.body, 'dark-theme');
    this.render.removeClass(this.document.body, 'light-theme');
    this.render.addClass(this.document.body, `${themeValue}-theme`);
    localStorage.setItem('selectedTheme', themeValue);
  }

}
