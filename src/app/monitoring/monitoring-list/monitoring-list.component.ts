import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/animal/model/Animal';
import { Monitoring } from '../model/Monitoring';
import { MonitoringService } from '../monitoring.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.scss']
})
export class MonitoringListComponent implements OnInit {

  monitorings: Monitoring[] = []
  displayedColumns: string[] = ['monitoringDate', 'monitoringTime', 'height', 'weight', 'dewormed'];

  constructor(
    public dialogRef: MatDialogRef<MonitoringListComponent>, 
    @Inject(MAT_DIALOG_DATA) public animal: Animal,
    private monitoringService: MonitoringService,
    private toastService: ToastrService
  ){}

  ngOnInit(): void {
      this.monitoringService.findMonitoringsByAnimalId(this.animal.id).subscribe({
        next: (monitorings) => {
          this.monitorings = monitorings
        },
        error: (error) => {
          this.toastService.error("ERRO AO BUSCAR ACOMPANHAMENTOS!");
          console.error(error);
        },
        complete: () => {

        }
      });
  }

  onBtnClose() {
    this.dialogRef.close();
  }

}
