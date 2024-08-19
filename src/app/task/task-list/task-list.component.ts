import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee/model/Employee';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  employee!: Employee;

  constructor() { }

  ngOnInit(): void {
    this.employee = history.state.employee;
  }

  employeeFullName(): string {
    return this.employee.name + " " + this.employee.lastName;
  }

}
