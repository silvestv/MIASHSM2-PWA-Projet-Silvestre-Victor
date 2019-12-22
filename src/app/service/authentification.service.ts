// ceci est le serve d'authentification il permet au service Guard d'autoriser la connexion ou non

export class AuthentificationService{
  isAuth: boolean = false;
  nameAuth: string;
  lastnameAuth: string;

  signIn() {
    return new Promise(
      //we simulate a short reseach in dataBase
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true)
          }, 1000
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
    console.log(this.isAuth);
  }
  //la page de connexion va setter ces attribut si l'utilisateur est un utilisateur authentifier
  // afin de pouvoir lui afficher un message de bienvenue dans la page todolist
  setUserAuthDisplay(nameAuth: string, lastnameAuth: string) {
    this.nameAuth = nameAuth;
    this.lastnameAuth = lastnameAuth;
  }

  getUserAuthDisplay(): string{
    return "Bonjour "+this.nameAuth+" "+this.lastnameAuth+", heureux de vous revoir !";
  }

}
