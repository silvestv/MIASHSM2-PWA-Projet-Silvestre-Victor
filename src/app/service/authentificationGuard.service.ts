import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class AuthentificationGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isAuth){
      return true;
    } else {
      console.log("allezla")
      this.router.navigate(['/auth']);
    }
  }

}
