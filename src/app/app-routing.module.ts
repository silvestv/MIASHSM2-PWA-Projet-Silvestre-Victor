import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import {NewUserComponent} from './new-user/new-user.component';
import {ListUsersComponent} from './list-users/list-users.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {AuthentificationGuard} from './service/authentificationGuard.service';


let routes: Routes;
routes = [
  {path: '', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo',canActivate: [AuthentificationGuard], component: TodoListComponent},
  {path: 'todo/:id',canActivate: [AuthentificationGuard], component: TodoListComponent},
  {path: 'users',canActivate: [AuthentificationGuard], component: ListUsersComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'auth', component: AuthentificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
