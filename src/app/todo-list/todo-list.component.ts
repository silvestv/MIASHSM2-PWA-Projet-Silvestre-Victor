import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../service/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  titre: string;
  _ownFilter: string;
  @Input() private data: TodoListData;

  @ViewChild('newTodoInput', {static: false}) newTodoInput: ElementRef;

  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObserver().subscribe( tdl => this.data = tdl );
    this.titre = this.data.label;
    this._ownFilter = 'Tous';
  }

  ngOnInit() {
  }

  get label(): string {
    return this.data.label;
  }

  get items(): TodoItemData[] {
    if (this.ownFilter === 'Tous') {
      return this.data.items;
    } else if (this.ownFilter === 'Actifs') {
      return this.data.items.filter(I => I.isDone === false);
    } else if (this.ownFilter === 'Completes') {
      return this.data.items.filter(I => I.isDone === true);
    }

  }

  get itemsRestant(): number {
    return this.data.items.filter(I => I.isDone === false).length;
  }


  get ownFilter(): string {
    return this._ownFilter;
  }

  set ownFilter(ownFilter: string) {
    this._ownFilter = ownFilter;
  }

  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone( done, item );
  }

  itemLabel(item: TodoItemData, label: string) {
    this.todoService.setItemsLabel( label, item );
  }

  appendItem(label: string) {
    this.todoService.appendItems( {
      label,
      isDone: false
    } );
  }

  removeItem(item: TodoItemData) {
    this.todoService.removeItems(item);
  }

  removeAllItemChecked() {
    this.todoService.removeAllItemChecked();
  }

  onRemoveAll() {
    this.todoService.removeAllItems();
  }

  isAllDone(): boolean {
    // return this.items.reduce( (acc, it) => acc && it.isDone, true);
    return this.items.every( it => it.isDone );
  }

  toggleAllDone() {
    const done = !this.isAllDone();
    this.todoService.setItemsDone(done, ...this.items);
  }

  needToAppear(): boolean {
    return this.data.items.length === 0;
  }

  needToAppearCaseCochees(): boolean {
    return this.data.items.filter(I => I.isDone === true).length === 0;
  }

  onUndo() {
    this.todoService.undoAction();
  }

  onRedo() {
    this.todoService.redoAction();
  }


}
