import { Component } from '@angular/core';
import { Animal } from '../model/Animal';
import { Breed } from 'src/app/breed/model/Breed';
import { Species } from 'src/app/species/model/Species';
import { Farm } from 'src/app/farm/model/Farm';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent {

  constructor(private animalService: AnimalService){}

  animals: Animal[] = this.animalService.listAllAnimals();

}
