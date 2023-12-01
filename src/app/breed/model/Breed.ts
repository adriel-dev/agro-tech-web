import { Species } from "src/app/species/model/Species";

export class Breed {
  constructor(
    public id: string,
    public name: string,
    public species: Species
  ) { }

  static createTestInstance(): Breed {
    return new Breed('123e4567-e89b-12d3-a456-426614174000', 'Labrador', Species.createTestInstance());
  }
}