import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: User[];
  userSubscription: Subscription;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.emitUsers();

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


}
