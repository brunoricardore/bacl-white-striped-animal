import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input/input.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    InputErrorComponent,
    AlertComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
