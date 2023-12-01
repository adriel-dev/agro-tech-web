import { Injectable } from '@angular/core';
import { Species } from '../species/model/Species';
import { Breed } from '../breed/model/Breed';
import { Farm } from '../farm/model/Farm';
import { Animal, SexEnum } from './model/Animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor() { }

  listAllAnimals() {
    const dogSpecies = new Species('1', 'Dog');
    const catSpecies = new Species('2', 'Cat');

    // Mock de dados para Breed
    const labrador = new Breed('1', 'Labrador', dogSpecies);
    const siamese = new Breed('2', 'Siamese', catSpecies);

    // Mock de dados para Farm (uma única fazenda)
    const singleFarm = new Farm('1', 'Farm X', '789 Oak St', 'City X', 'State X');

    // Lista de dados mockados para Animal com IDs aleatórios em formato de texto
    return [
      new Animal('f8ce12a5-17ac-4ec9-b973-39a3eb468e86', 'Rex', SexEnum.M, '2022-01-01', '2022-12-31', 500, 1000, labrador, singleFarm),
      new Animal('4d5d49a7-3cb1-44d0-9b4f-f71be6df2c5a', 'Whiskers', SexEnum.F, '2022-03-15', '2022-11-30', 300, 800, siamese, singleFarm),
      new Animal('abdedb72-33a9-42ab-8ac1-1b5ab6e3562e', null, SexEnum.M, '2022-05-20', '2022-10-30', 700, 1200, labrador, singleFarm),
      new Animal('1a16a5a8-7cbf-4b34-93c0-84d8d3d84122', 'Luna', SexEnum.F, '2022-07-10', '2022-12-25', 450, 900, siamese, singleFarm),
      new Animal('f72f8c47-af76-4a9e-9a5b-37cf81b501a3', 'Buddy', SexEnum.M, '2022-02-15', '2022-11-15', 550, 1100, labrador, singleFarm),
      new Animal('5f588d30-88b5-454b-8ea2-efa0de177f1f', 'Mittens', SexEnum.F, '2022-04-05', '2022-09-20', 400, 750, siamese, singleFarm),
      new Animal('87c12f9d-854f-4d08-b46a-4ed2ce2772c1', 'Rocky', SexEnum.M, '2022-06-18', '2022-12-10', 600, 1000, labrador, singleFarm),
      new Animal('ab1b25e7-8be9-46ae-98f0-750a789efad3', 'Sasha', SexEnum.F, '2022-03-30', '2022-10-15', 480, 850, siamese, singleFarm),
      new Animal('f7b26a95-bdde-4742-a3d1-7200b2959457', 'Cooper', SexEnum.M, '2022-08-05', '2022-12-20', 520, 950, labrador, singleFarm),
      new Animal('fe2b1de3-9b5a-4898-bb6f-b00f567a5c95', 'Misty', SexEnum.F, '2022-09-10', '2022-11-28', 370, 700, siamese, singleFarm),
      /* new Animal('a3e2a1f3-925e-4930-9121-bf49e39cda1b', 'Bear', SexEnum.M, '2022-05-05', '2022-12-05', 580, 1050, labrador, singleFarm),
      new Animal('21e0f48b-4d9a-43eb-bbfc-cdb57a64644c', 'Lily', SexEnum.F, '2022-04-20', '2022-11-05', 420, 800, siamese, singleFarm) */
    ];
  }

}
