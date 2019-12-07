import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../service/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  authStatus: boolean;

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(){
    this.authService.signIn().then(
      () => {
        console.log('Connexion réussi ! ');
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['todo']);
      }
    )
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
