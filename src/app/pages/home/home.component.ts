import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public formGroup!: FormGroup;

  private $destroy = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.listenPasswordChanges();
  }

  ngOnDestroy() {
    this.$destroy.next();
  }

  private listenPasswordChanges(): void {
    this.getFormControl('password').valueChanges
      .pipe(
        takeUntil(this.$destroy)
      ).subscribe(val => {
       this.getFormControl('password').setValue(val.replace(/[^0-9]/g, ''), {emitEvent: false})
    });
  }

  private checkForDoubles(): ValidatorFn {
    return (control) => {
      return !/((.)\2+)+/.test(control.value) ? {noDoubles: true} : null
    }
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [
        Validators.required,
        Validators.min(184759),
        Validators.max(856920),
        this.checkForDoubles()
      ]],
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
