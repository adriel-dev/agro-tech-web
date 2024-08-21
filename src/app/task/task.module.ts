import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { MatCardModule } from '@angular/material/card';
import { CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    DragDropModule
  ]
})
export class TaskModule { }
