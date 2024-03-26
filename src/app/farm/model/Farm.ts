export class Farm {
  constructor(
    public id: string,
    public name: string | null = null,
    public address: string | null = null,
    public city: string | null = null,
    public state: string | null = null
  ) { }
}