export class AuthentificationService{
  isAuth: boolean = false;

  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true)
          }, 2000
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
    console.log(this.isAuth);
  }

}
