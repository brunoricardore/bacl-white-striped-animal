import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {environment} from "../../../environments/environment";
import {LocalStorageService} from "../services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.localStorageService.getValue(environment.token_storage_key)) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }

}
