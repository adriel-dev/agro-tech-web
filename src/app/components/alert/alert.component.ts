import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnChanges {

  @Input("message")
  message: string = "";

  @Input("type")
  type: string = "";

  classObject: { [key: string]: boolean } = {};

  private readonly alertTypes = ["warning", "danger", "success"];

  constructor() {
    this.typeClassInitlzr();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] || changes['type']) {
      this.typeClassInitlzr();
    }
  }

  private typeClassInitlzr() {
    const hasValidType = this.alertTypes.includes(this.type);
    const hasValidMessage = this.message.length > 0;
  
    this.classObject = {
      'd-block': hasValidType && hasValidMessage,
      'flex-row': true,
      'align-items-center': true,
      'alert': hasValidType,
      [`alert-${this.type}`]: hasValidType,
      'd-none': !hasValidType || !hasValidMessage,
      'text-center': true
    };
  }

}
