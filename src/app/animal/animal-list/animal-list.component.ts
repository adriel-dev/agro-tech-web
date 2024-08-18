import { Component, OnInit, ViewChild } from '@angular/core';
import { Animal, FindAllAnimalsResponse } from '../model/Animal';
import { Species } from 'src/app/species/model/Species';
import { AnimalService } from '../animal.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AnimalFormComponent } from '../animal-form/animal-form.component';
import { ToastrService } from 'ngx-toastr';
import { SpeciesService } from 'src/app/species/species.service';
import { MatRadioChange } from '@angular/material/radio';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animals: FindAllAnimalsResponse[] = [];

  species: Species[] = [];

  selectedFilter: string = "none";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;
  totalPages = 0;
  length = 0;

  selectedSpeciesFilter: string[] = [];

  @ViewChild("externalIdFilter") externalIdFilterInput!: MatFormField;
  @ViewChild("animalNameFilter") animalNameFilterInput!: MatFormField;

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

  loadAnimals(pageNumber: number = 0, pageSize: number = 10, speciesIds: string[] = [], animalName: string = "", externalId: string = "") {
    this.animalService.findAllAnimals(pageNumber, pageSize, speciesIds, animalName, externalId).subscribe({
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
    this.loadAnimals(0, 10, this.selectedSpeciesFilter);
  }

  onAnimalIdFilter(event: any) {
    const externalId = this.externalIdFilterInput._control.value
    this.loadAnimals(0, 10, [], "", externalId);
  }
  
  onAnimalNameFilter(event: any) {
    const animalName = this.animalNameFilterInput._control.value
    this.loadAnimals(0, 10, [], animalName, "");
  }
  
  onEditDialogClose() {
    this.loadAnimals(this.pageIndex, this.pageSize);
  }

  onFilterRadioChange(event: MatRadioChange) {
    if(event.value == 'none') {
      this.loadAnimals();
    }
    this.selectedFilter = event.value;
  }

}
