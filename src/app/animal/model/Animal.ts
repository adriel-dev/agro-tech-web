import { Breed } from "src/app/breed/model/Breed";
import { Farm } from "src/app/farm/model/Farm";

export class Animal {
  constructor(
    public id: string,
    public externalId: string,
    public name: string | null = null,
    public sex: SexEnum,
    public acquisitionDate: string | null = null,
    public saleDate: string | null = null,
    public acquisitionValue: number | null = null,
    public saleValue: number | null = null,
    public breed: Breed,
    public farm: Farm
  ) { }
}

export enum SexEnum {
  M = 'M',
  F = 'F'
}

export class PagedAnimals {
  constructor(
    public content: FindAllAnimalsResponse[],
    public totalPages: number,
    public totalElements: number,
    public pageSize: number,
    public pageNumber: number
  ) { }
}

export class SaveAnimalRequest {
  constructor(
    public name: string | null = null,
    public sex: SexEnum,
    public acquisitionDate: string | null = null,
    public saleDate: string | null = null,
    public acquisitionValue: number | null = null,
    public saleValue: number | null = null,
    public breedId: string | null = null,
    public farmId: string | null = null
  ) { }
}

export class FindAllAnimalsResponse {
  constructor(
    public id: string,
    public externalId: string,
    public name: string | null = null,
    public sex: SexEnum,
    public acquisitionDate: string | null = null,
    public saleDate: string | null = null,
    public acquisitionValue: number | null = null,
    public saleValue: number | null = null,
    public breed: Breed,
    public farm: Farm,
    public imagePath: string | null = null
  ) { }
}