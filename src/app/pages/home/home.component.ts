import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {PasswordFacade} from "../../shared/facades/password.facade";
import FormData from "../../shared/interfaces/form-data";
import {AlertType} from "../../shared/components/alert/alert.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public formGroup!: FormGroup;
  private $destroy = new Subject();

  requestLoading = false;
  passwordValidated!: boolean | undefined;
  passwordValidationMessage = '';

  @ViewChild("responseMessage", {read: ViewContainerRef})
  successContainer!: ViewContainerRef;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly passwordFacade: PasswordFacade,
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
      console.log('pass value changed', val);
      if(!val) return;
      this.getFormControl('password').setValue(val.replace(/[^0-9]/g, ''), {emitEvent: false})
    });
  }

  private checkForDoubles(): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      return !/((.)\2+)+/.test(control.value) ? {noDoubles: true} : null
    }
  }

  private checkForArrayOrder(): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      const valueAsArray: number[] = control.value?.split('').map((char: string) => Number(char));
      const isAscending = valueAsArray.slice(1).every((e, i) => e >= valueAsArray[i])
      return !isAscending ? {invalidOrder: true} : null;
    }
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.min(184759),
        Validators.max(856920),
        this.checkForDoubles(),
        this.checkForArrayOrder()
      ]],
    });
  }

  getFormControl(key: string): FormControl {
    return <FormControl>this.formGroup.get(key);
  }

  get formValid(): boolean {
    return this.formGroup.valid;
  }

  checkPasswordHasError(key: string) {
    return this.getFormControl('password').touched && this.getFormControl('password').getError(key);
  }

  get passwordResponseAlertType(): AlertType {
    return this.passwordValidated ? AlertType.SUCCESS : AlertType.ERROR;
  }

  submit(): void {

    if (this.formGroup.invalid) return;

    this.passwordValidated = undefined;
    this.requestLoading = true;
    const data = <FormData>this.formGroup.value;
    this.passwordFacade.validatePassword(data)
      .toPromise()
      .then(response => {
        this.passwordValidated = true;
        this.passwordValidationMessage = 'Senha foi validada com sucesso!';
        this.requestLoading = false;
      })
      .catch(error => {
        this.passwordValidated = false;
        this.passwordValidationMessage = 'Tivemos um problema para validar sua senha';
        this.requestLoading = false;
      })
  }

}
