import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({idField: 'id'})
    .subscribe(item => {
      this.todos = item.sort((a:any, b:any) => {
        return a.isDone - b.isDone
      })
    })
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addToDo(titleInput.value);
      titleInput.value = '';
    }
  }
  onStatusChange(id: string, newStatus: boolean){
    this.todoService.updateTodoStatus(id, newStatus)
  }
  deleteTodo(id: string){
    this.todoService.deleteTodo(id)
  }
}