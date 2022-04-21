import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordService extends BaseService<any, any>{
  _endpoint = 'http://61e036950f3bdb0017934eb0.mockapi.io/api/valid-passwords/results';
}
