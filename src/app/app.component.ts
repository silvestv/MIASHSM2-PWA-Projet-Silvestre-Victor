import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TodoService} from './service/todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
