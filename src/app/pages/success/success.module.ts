import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SuccessComponent}
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class SuccessModule { }
