import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee/model/Employee';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDragStart,
  CdkDragEnd,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  employee!: Employee;

  todo = ['Limpar o cu do cachorro', 'Limpar o merda da égua', 'Limpar os ovos do boi'];

  doing = ['Limpar as baias'];

  done = ['Limpar o curral', 'Limpar o cocho', 'Limpar o armazém'];

  tasks: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.employee = history.state.employee;
    this.taskService.findTasksByEmployeeIdAndStartEndDate(this.employee.id!).subscribe({
      next: (tasksList) => {
        console.log(tasksList);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {

      }
    });
  }

  employeeFullName(): string {
    return this.employee.name + " " + this.employee.lastName;
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const containerId = event.container.id;
      switch (containerId) {
        case 'todoList':
          return;
        case 'doingList':
          if (event.previousContainer.id !== 'todoList') {
            return;
          }
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
          break;
        case 'doneList':
          if (event.previousContainer.id !== 'doingList') {
            return;
          }
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
          break;
      }
    }
  }

  onDragStart(event: CdkDragStart) {
    document.body.style.cursor = 'grabbing';
  }

  onDragEnd(event: CdkDragEnd) {
    document.body.style.cursor = 'default';
  }


}
