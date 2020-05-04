import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  gardens: Todo[];
 
  constructor(private todoService: TodoService) { }
 
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.gardens = res;
    });
  }
 
  remove(item) {
    this.todoService.removeTodo(item.id);
  }
}