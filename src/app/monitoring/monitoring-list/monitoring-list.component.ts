import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/animal/model/Animal';
import { Monitoring, SaveMonitoringRequest } from '../model/Monitoring';
import { MonitoringService } from '../monitoring.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.scss']
})
export class MonitoringListComponent implements OnInit {

  monitorings: Monitoring[] = [];

  monitoringForm!: FormGroup;

  displayedColumns: string[] = ['monitoringDate', 'monitoringTime', 'height', 'weight', 'dewormed'];

  panelOpenState: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<MonitoringListComponent>,
    @Inject(MAT_DIALOG_DATA) public animal: Animal,
    private formBuilder: FormBuilder,
    private monitoringService: MonitoringService,
    private toastService: ToastrService
  ) {
    this.monitoringForm = formBuilder.group({
      height: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      dewormed: new FormControl(false, Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadMonitorings();
  }

  loadMonitorings() {
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

  togglePanel() {
    this.panelOpenState = !this.panelOpenState
  }

  onSubmit() {
    const formValues = this.monitoringForm.value;
    const body = new SaveMonitoringRequest(this.animal.id, formValues.height, formValues.weight, formValues.dewormed);
    this.monitoringService.saveMonitoring(body).subscribe({
      next: (monitoring) => {
        this.toastService.success("ACOMPANHAMENTO SALVO COM SUCESSO!");
      },
      error: (error) => {
        this.toastService.error("ERRO AO SALVAR ACOMPANHAMENTO!");
        console.error(error);
      },
      complete: () => {
        this.monitoringForm.setValue({
          height: null,
          weight: null,
          dewormed: false
        });
        this.loadMonitorings();
      }
    });
  }

}
