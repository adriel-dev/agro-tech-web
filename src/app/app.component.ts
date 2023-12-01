import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'agrotech-web';

  constructor(@Inject(DOCUMENT) private document: Document, private render: Renderer2) {}

  ngOnInit() {
    this.render.addClass(this.document.body, 'dark-theme')
  }

  onChangeTheme(themeValue: String) {
    this.render.removeClass(this.document.body, 'dark-theme');
    this.render.removeClass(this.document.body, 'light-theme');
    this.render.addClass(this.document.body, `${themeValue}-theme`);
  }

}
