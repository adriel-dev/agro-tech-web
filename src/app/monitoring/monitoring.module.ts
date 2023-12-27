import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    MonitoringListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule
  ]
})
export class MonitoringModule { }
