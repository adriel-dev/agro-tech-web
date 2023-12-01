export class Farm {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public city: string,
    public state: string
  ) { }

  static createTestInstance(): Farm {
    return new Farm('123e4567-e89b-12d3-a456-426614174000', 'Farm Test', '123 Main St', 'Test City', 'Test State');
  }
}