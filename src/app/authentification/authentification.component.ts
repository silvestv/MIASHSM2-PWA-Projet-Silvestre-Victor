import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../service/authentification.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  authStatus = false;
  authForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: AuthentificationService) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //Validators of reactiveForm
  onSubmitForm(){
    const formValue = this.authForm.value;
    const currentEmail = formValue['email'];
    const currentPassword = formValue['password'];

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      // else we continue to verify if this user exist
      if(this.checkRigthEmailAndPassword(currentEmail, currentPassword)){
        //if ok, we navigate on to do page because AuthGuard can be passed
        this.submitted = true;
        this.authService.signIn().then(
          () => {
            console.log('Connexion réussi ! ');
            this.authStatus = this.authService.isAuth;
            this.router.navigate(['todo']);
          }
        )

      } else {
        alert('Cet utilisateur n existe pas, veuillez réessayer ou créer un compte !');
      }
    }


  }

  getControls() {
    return this.authForm.controls;
  }

//on vérifie si les champ email et mdp correspond a un utilisateur enregistré dans le service
  checkRigthEmailAndPassword(email: string, password: string) : boolean{
    if(this.userService.containUser(email, password)){
      //on indique au service Authentification l'utilisateur associé à email et password !
      const nameAuth = this.userService.containUser(email, password).firstName;
      const lastNameAuth = this.userService.containUser(email, password).lastName;
      this.authService.setUserAuthDisplay(nameAuth, lastNameAuth);
      //on renvoie vrai pour déclencher l'authentification
      return true;
    } else {
      return false;
    }
  }

  onSignOut(){
    this.authStatus = false;
    this.submitted = false;
  }

}
