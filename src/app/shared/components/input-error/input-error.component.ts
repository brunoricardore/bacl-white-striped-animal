import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ErrorList} from "../../helpers/error.messages";

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent {

  @Input() control!: FormControl;

  get errorMessage(): string {
    const firstKey = Object.keys({...this.control?.errors})[0];
    return ErrorList[firstKey];
  }

}
