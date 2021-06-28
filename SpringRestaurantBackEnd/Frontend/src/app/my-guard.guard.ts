import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {

  constructor(private r:Router, private valid:ValidationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{

      if (this.valid.isAdminActive())
      return true;

    this.r.navigate(['/login']);
    return false;
    
  }
  
}
