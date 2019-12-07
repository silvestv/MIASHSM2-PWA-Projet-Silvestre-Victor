import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './service/todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthentificationComponent } from './authentification/authentification.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AppRoutingModule } from './app-routing.module';
import {UserService} from './service/user.service';
import { ListUsersComponent } from './list-users/list-users.component';
import {AuthentificationService} from './service/authentification.service';
import {AuthentificationGuard} from './service/authentificationGuard.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    AuthentificationComponent,
    NewUserComponent,
    ListUsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    TodoService,
    UserService,
    AuthentificationService,
    AuthentificationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
