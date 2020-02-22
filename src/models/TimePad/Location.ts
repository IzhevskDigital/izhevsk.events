export class Location {
    constructor(
      public country: string,
      public city: string,
      public address: string,
      public coordinates: number[]
    ) {}
}