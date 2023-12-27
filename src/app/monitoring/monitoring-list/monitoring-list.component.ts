import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/animal/model/Animal';
import { Monitoring } from '../model/Monitoring';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.scss']
})
export class MonitoringListComponent {

  constructor(public dialogRef: MatDialogRef<MonitoringListComponent>, @Inject(MAT_DIALOG_DATA) public animal: Animal){}

  monitorings!: Monitoring[]
  displayedColumns: string[] = ['id', 'monitoringDate', 'height', 'weight', 'dewormed'];

  onBtnClose() {
    this.dialogRef.close();
  }

}
