import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/Animal';
import { Species } from 'src/app/species/model/Species';
import { AnimalService } from '../animal.service';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AnimalFormComponent } from '../animal-form/animal-form.component';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animals: Animal[] = []

  species: Species[] = []

  currentPage = 1
  pageSize = 10
  totalPages = 0

  selectedSpeciesFilter: string[] = []

  constructor(private animalService: AnimalService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadAnimals();
    this.loadSpecies();
  }

  loadAnimals(pageNumber: number = 1, pageSize: number = 10) {
    this.animalService.findAllAnimals().subscribe({
      next: (page) => {
        this.animals = page.content
        this.totalPages = page.totalPages
      },
      error: (error) => {
        console.error("Erro durante chamada HTTP:", error);
      }
    }
    );
  }

  loadSpecies() {
    this.species = [
      new Species("", "Equino"),
      new Species("", "Bovino"),
      new Species("", "Caprino"),
      new Species("", "Ovino"),
    ]
  }

  openNewAnimalDialog() {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw'
    }
    let dialogRef = this.dialog.open(AnimalFormComponent, dialogConfigs);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadAnimals(this.currentPage, this.pageSize);
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

}
