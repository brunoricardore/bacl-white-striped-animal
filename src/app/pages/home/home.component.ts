import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  getFormControl(key: string): FormControl {
    return <FormControl>this.formGroup.get(key);
  }

  get formValid(): boolean {
    return this.formGroup.valid;
  }

  submit(): void {
    console.log(this.formGroup.value);
  }

}
