import {User} from '../models/user.model';
import {Subject} from 'rxjs';


export class UserService {
  private users: User[] = this.loadUser();
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUser();
    this.emitUsers();
  }

  saveUser() {
    localStorage.setItem('listUtilisateur', JSON.stringify(this.users));
  }

  // le load() n'est qu'un init permettant lors d'une nouvelle session de recupérer ce qui est dans le local storage
  // la méthode est appelé dans le subject pour en initialiser la valeur
  loadUser() {
    if (localStorage.getItem('listUtilisateur') === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('listUtilisateur'));
    }
  }

  containUser(email: string, password: string): User{
    for(const user of this.users){
      if(user.email === email && user.password === password){
        return user;
      }
    }
    console.log("aucun utilisateur de cet email/password existe");
  }
}
