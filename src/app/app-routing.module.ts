import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import {NewUserComponent} from './new-user/new-user.component';
import {ListUsersComponent} from './list-users/list-users.component';


let routes: Routes;
routes = [
  {path: '', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo', component: TodoListComponent},
  {path: 'todo/:id', component: TodoListComponent},
  {path: 'users', component: ListUsersComponent},
  {path: 'new-user', component: NewUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
