import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

import {v4 as uuid} from 'uuid';

type InputType = 'text' | 'password' | 'email';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  private _showPassword = false;

  private _id!: string;
  public _type!: InputType;

  @Input() control!: FormControl;
  @Input() label!: string;

  @Input()
  set type(type: InputType) {
    this._type = type || 'text';
  }

  get type(): InputType {
    if (this._showPassword) return 'text';
    return this._type;
  }

  @Input()
  set id(id: string) {
    this._id = id || uuid();
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
