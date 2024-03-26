import { Component, OnInit, ViewChild } from '@angular/core';
import { Animal, FindAllAnimalsResponse } from '../model/Animal';
import { Species } from 'src/app/species/model/Species';
import { AnimalService } from '../animal.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AnimalFormComponent } from '../animal-form/animal-form.component';
import { ToastrService } from 'ngx-toastr';
import { SpeciesService } from 'src/app/species/species.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animals: FindAllAnimalsResponse[] = [];

  species: Species[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;
  totalPages = 0;
  length = 0;

  selectedSpeciesFilter: string[] = [];

  constructor(
    private animalService: AnimalService,
    private speciesService: SpeciesService, 
    private dialog: MatDialog, 
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.loadAnimals();
    this.loadSpecies();
  }

  loadAnimals(pageNumber: number = 0, pageSize: number = 10) {
    this.animalService.findAllAnimals(pageNumber, pageSize).subscribe({
      next: (page) => {
        this.animals = page.content;
        this.pageIndex = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = page.totalPages;
        this.length = page.totalElements;
      },
      error: (error) => {
        this.toastService.error("ERRO AO LISTAR ANIMAIS!");
        console.error("Erro durante chamada HTTP:", error);
      }
    }
    );
  }

  loadSpecies() {
    this.speciesService.findAllSpecies().subscribe({
      next: (species) => {
        this.species = species;
      },
      error: (error) => {
        this.toastService.error("ERRO AO CARREGAR ESPÉCIES!")
        console.error(error);
      },
      complete: () => {

      }
    });
  }

  openNewAnimalDialog() {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw',
      data: null
    }
    let dialogRef = this.dialog.open(AnimalFormComponent, dialogConfigs);
    dialogRef.afterClosed().subscribe( result => {
      if(result === "success") {
        this.loadAnimals(this.pageIndex, this.pageSize);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAnimals(this.pageIndex, this.pageSize);
  }

  onSpeciesFilterChange(event: any) {
    this.selectedSpeciesFilter = event;
  }

  onSpeciesFilter(event: any) {
    event.stopPropagation();
  }

  onAnimalNameOrIdFilter(event: any) {
    event.stopPropagation();
  }

  onEditDialogClose() {
    this.loadAnimals(this.pageIndex, this.pageSize);
  }

}
