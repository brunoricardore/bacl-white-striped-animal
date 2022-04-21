import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input/input.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import { InputErrorComponent } from './input-error/input-error.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    InputErrorComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent
  ]
})
export class ComponentsModule { }
