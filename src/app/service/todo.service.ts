import { Injectable } from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {stringify} from 'querystring';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: [] = this.load()});

  undo: string[] = [];
  redo: string[] = [];
  constructor() { }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.undo.push(JSON.stringify(tdl));
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    this.save();
  }


  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.undo.push(JSON.stringify(tdl));
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
    this.save();
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.undo.push(JSON.stringify(tdl));
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.save();
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.undo.push(JSON.stringify(tdl));
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.save();
  }

  removeAllItemChecked() {
    const tdl = this.todoListSubject.getValue();
    this.undo.push(JSON.stringify(tdl));
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => I.isDone === false )
    });
  this.save();


  }

  // Supprime tout les items cochés ou non (action reversible)
  removeAllItems(){
    const tdl = this.todoListSubject.getValue();
    this.undo.push(JSON.stringify(tdl));
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: []
    });
    this.save();
  }

   // Explications :
  // tslint:disable-next-line:comment-format
  // Les fonctions du service ont un but bien précis : modifier les datas qui seront manipulables par les vues
  // par conséquent chacune des fonctions du service représente une modification de la donnée !
  // tslint:disable-next-line:comment-format
  //nous effectuons un save() en localStorage à l'appel de chacune de ces fonctions !
  save() {
    const tdl = this.todoListSubject.getValue();
    console.log(tdl.label);
    localStorage.setItem(tdl.label, JSON.stringify(tdl.items));
  }

  // le load() n'est qu'un init permettant lors d'une nouvelle session de recupérer ce qui est dans le local storage
  // la méthode est appelé dans le subject pour en initialiser la valeur
  load() {
    return JSON.parse(localStorage.getItem('TodoList'));
  }

  undoAction() {
    console.log(this.undo.length);
    if (this.undo.length > 0) {
      const tdl = this.todoListSubject.getValue();
      this.redo.push(JSON.stringify(tdl));
      const tdlBack = JSON.parse(this.undo[this.undo.length - 1 ]);
      this.todoListSubject.next({
        label: tdlBack.label,
        items: tdlBack.items
      });
      this.undo.pop();
    }
  }

  redoAction() {
    console.log(this.redo.length);
    if (this.redo.length > 0) {
      const tdl = this.todoListSubject.getValue();
      this.undo.push(JSON.stringify(tdl));
      const tdlForward = JSON.parse(this.redo[this.redo.length - 1 ]);
      this.todoListSubject.next({
        label: tdlForward.label,
        items: tdlForward.items
      });
      this.redo.pop();
    }
  }




}
