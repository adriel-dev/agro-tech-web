import { Species } from "src/app/species/model/Species";

export class Breed {
  constructor(
    public id: string,
    public name: string | null = null,
    public species: Species | null = null
  ) { }
}