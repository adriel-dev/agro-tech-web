import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    @Inject(DOCUMENT) 
    private document: Document, 
    private render: Renderer2
    ) {}

  onChangeTheme(themeValue: String) {
    this.render.removeClass(this.document.body, 'dark-theme');
    this.render.removeClass(this.document.body, 'light-theme');
    this.render.addClass(this.document.body, `${themeValue}-theme`);
  }

}
