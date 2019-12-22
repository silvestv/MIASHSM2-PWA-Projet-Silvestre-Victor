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

  setUserAuthDisplay(nameAuth: string, lastnameAuth: string) {
    this.nameAuth = nameAuth;
    this.lastnameAuth = lastnameAuth;
  }

  getUserAuthDisplay(): string{
    return "Bonjour "+this.nameAuth+" "+this.lastnameAuth+", heureux de vous revoir !";
  }

}
