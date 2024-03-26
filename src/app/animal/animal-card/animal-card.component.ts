import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal, FindAllAnimalsResponse } from '../model/Animal';
import { animate, style, transition, trigger } from '@angular/animations';
import { SlideInSlideOutAnimation } from 'src/app/components/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MonitoringListComponent } from 'src/app/monitoring/monitoring-list/monitoring-list.component';
import { AnimalFormComponent } from '../animal-form/animal-form.component';
import { ImageService } from 'src/app/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  animations: [SlideInSlideOutAnimation]
})
export class AnimalCardComponent implements OnInit {

  @Input() animal!: FindAllAnimalsResponse

  @Output() closedEditDialog: EventEmitter<any> = new EventEmitter();

  animalImageBase64: string | null = null;

  isCardContentCollapsed = true;

  constructor(private dialog: MatDialog, private imageService: ImageService, private toastService: ToastrService){}

  ngOnInit(): void {
      this.imageService.findImageByAnimalId(this.animal.id).subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'image/jpeg' });
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.animalImageBase64 = reader.result as string;
          };
        },
        error: (error) => {
          if(!(error.status === 404)) {
            this.toastService.error("ERRO AO CARREGAR IMAGEM!")
            console.error(error);
          } 
        },
        complete: () => {

        }
      });
  }

  openEditAnimalDialog() {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw',
      data: { animal: this.animal, imageBase64: this.animalImageBase64}
    }
    let dialogRef = this.dialog.open(AnimalFormComponent, dialogConfigs);
    dialogRef.afterClosed().subscribe( result => {
      if(result === "success") {
        this.closedEditDialog.emit("closed");
      }
    });
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

  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

}