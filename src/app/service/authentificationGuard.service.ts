import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AuthentificationService} from './authentification.service';


@Injectable()
export class AuthentificationGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router){

  }

  //la fonction canActivate d'un route Guard permet d'autoriser l'accès à une page si la personne est authentifier
  // de manière correcte
  // ou alors
  // de la rediriger vers la page de connexion ou de création de compte
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isAuth){
      console.log("VOUS ETES CONNECTE");
      return true;
    } else {
      console.log("DÉCONNECTION");
      this.router.navigate(['/auth']);
    }
  }

}
