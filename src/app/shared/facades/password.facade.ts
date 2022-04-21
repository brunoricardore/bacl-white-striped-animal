import { Injectable } from '@angular/core';
import {PasswordService} from "../services/password.service";
import {Observable} from "rxjs";
import FormData from "../interfaces/form-data";

@Injectable({
  providedIn: 'root'
})
export class PasswordFacade {

  constructor(
    private readonly passwordService: PasswordService
  ) { }

  public validatePassword(data: FormData): Observable<any> {
    return this.passwordService.create(data);
  }

}
