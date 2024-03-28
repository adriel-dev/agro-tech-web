import { Animal } from "src/app/animal/model/Animal";

export class Monitoring {
    constructor(
      public id: string | null = null,
      public animal: Animal | null = null,
      public monitoringDate: string | null = null,
      public height: number | null = null,
      public weight: number | null = null,
      public dewormed: boolean | null = null
    ) {}
  }

export class SaveMonitoringRequest {
  constructor(
    public animalId: string,
    public height: number,
    public weight: number,
    public dewormed: boolean
  ) {}
}