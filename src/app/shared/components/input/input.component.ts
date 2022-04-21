import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  private _showPassword = false;

  private _id!: string;
  private _type!: 'text'| 'password';

  @Input() control!: FormControl;
  @Input() label!: string;

  @Input()
  set type(type: 'text'| 'password') {
    this._type = type ?? 'text';
  }

  get type(): 'text'| 'password' {
    if (this._type === 'password') {
      return this._showPassword ? 'text' : 'password'
    }
    return this._type;
  }

  @Input()
  set id(id: string) {
    this._id = id ?? uuid();
  }

  get id(): string{
    return this._id;
  }

  constructor() { }

  ngOnInit(): void {
  }

  get isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  get isInvalid(): boolean {
    return this.control.invalid && this.control.touched ;
  }

  get showPasswordText(): boolean{
    return this._showPassword;
  }

  togglePasswordInput(): void {
    this._showPassword = !this._showPassword;
  }

  get showPassword() {
    return this._showPassword;
  }

}
