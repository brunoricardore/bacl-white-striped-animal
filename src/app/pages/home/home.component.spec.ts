import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PasswordFacade} from "../../shared/facades/password.facade";
import {PasswordService} from "../../shared/services/password.service";
import {BaseService} from "../../shared/services/base.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        FormBuilder,
        BaseService,
        PasswordService,
        {
          provide: PasswordFacade,
          useValue: {
            validatePassword: (data: any) => of({})
          }
        }
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should be invalid when empty', () => {
    component.formGroup.reset();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Email control must accept only valid addresses', () => {
    const control = component.getFormControl('email')
    control.setValue('bruno123', {emitEvent: false});
    expect(control.valid).toBeFalsy();
  });

  it('Should replace all but numbers from password', () => {
    const control = component.getFormControl('password');
    control.patchValue('bruno123');
    fixture.detectChanges();
    expect(control.value).toEqual('123')
  });

  it('Password should have noDoubles error when no duplicate digits', () => {
    const control = component.getFormControl('password');
    control.patchValue('0123');
    fixture.detectChanges();
    expect(control.hasError('noDoubles')).toBeTruthy();
  });

  it('Password should have invalidOrder error when digits are not in ascending order', () => {
    const control = component.getFormControl('password');
    control.patchValue('123465789');
    fixture.detectChanges();
    expect(control.hasError('invalidOrder')).toBeTruthy();
  });

});
