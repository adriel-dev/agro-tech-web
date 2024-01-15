import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../model/Animal';
import { animate, style, transition, trigger } from '@angular/animations';
import { SlideInSlideOutAnimation } from 'src/app/components/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MonitoringListComponent } from 'src/app/monitoring/monitoring-list/monitoring-list.component';
import { AnimalFormComponent } from '../animal-form/animal-form.component';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  animations: [SlideInSlideOutAnimation]
})
export class AnimalCardComponent {

  @Input() animal!: Animal

  isCardContentCollapsed = true

  constructor(private dialog: MatDialog){}

  openEditAnimalDialog() {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw',
      data: this.animal
    }
    let dialogRef = this.dialog.open(AnimalFormComponent, dialogConfigs);
  }

  openMonitoringsDialog() {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw',
      data: this.animal 
    }
    let dialogRef = this.dialog.open(MonitoringListComponent, dialogConfigs);
  }

}