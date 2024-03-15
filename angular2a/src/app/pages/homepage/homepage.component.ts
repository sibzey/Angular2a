import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/toDo';
import { FormsModule } from '@angular/forms';
import { FilterTodolistPipe } from "../../pipes/filter-todolist.pipe";

@Component({
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [CommonModule, HttpClientModule, FormsModule, FilterTodolistPipe]
})
export class HomepageComponent implements OnInit {

  todoList: ToDo[] = [];
  today: Date = new Date();
  searchKey: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    // backend'e istek atıp verileri çek
    this.httpClient
      .get<ToDo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: ToDo[]) => {
          console.log('Backendden cevap geldi:', response);
          this.todoList = response;
        },
        error: (error) => {
          console.log('Backendden hatalı cevap geldi:', error);
        },
        complete: () => {
          console.log('Backend isteği sonlandı.');
        },
      });
  }

  postToDo() {
    let obj = {};
    this.httpClient.post('link', obj).subscribe();
  }

  //today:Date= new Date();
  formatDate(date:Date){
    return date.toISOString();
  }
} 

