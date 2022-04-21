import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() disabled!: boolean;
  @Input() type: 'button'|'submit'|'reset' = 'button'
  @Output() onClick = new EventEmitter();

  @Input() loading = false;
}
