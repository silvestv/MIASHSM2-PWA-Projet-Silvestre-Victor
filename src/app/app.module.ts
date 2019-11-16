import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './service/todo.service';
import {FormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule, FormsModule, AngularFontAwesomeModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
