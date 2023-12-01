import { Breed } from "src/app/breed/model/Breed";
import { Farm } from "src/app/farm/model/Farm";

export class Animal {
    constructor(
      public id: string,
      public name: string | null = null,
      public sex: SexEnum,
      public acquisitionDate: string | null = null,
      public saleDate: string | null = null,
      public acquisitionValue: number | null = null,
      public saleValue: number | null = null,
      public breed: Breed,
      public farm: Farm
    ) {}

    static createTestInstance(): Animal {
      return new Animal(
        '123e4567-e89b-12d3-a456-426614174000',
        'Test Animal',
        SexEnum.M,
        '2023-11-30',
        '2023-12-15',
        1000,
        1500,
        Breed.createTestInstance(),
        Farm.createTestInstance()
      );
    }
}

export enum SexEnum {
    M = 'M',
    F = 'F'
}