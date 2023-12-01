export class Species {
  constructor(
    public id: string,
    public name: string
  ) { }

  static createTestInstance(): Species {
    return new Species('123e4567-e89b-12d3-a456-426614174000', 'Dog');
  }

}