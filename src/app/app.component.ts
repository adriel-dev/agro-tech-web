import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

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
    private render: Renderer2
    ) {}

  ngOnInit() {
    this.render.addClass(this.document.body, 'dark-theme')
  }

}
