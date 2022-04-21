import {Component, Input, OnInit} from '@angular/core';


export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'danger'
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  alertType = AlertType;

  @Input() type: AlertType = AlertType.SUCCESS;
  @Input() message!: string;
}
