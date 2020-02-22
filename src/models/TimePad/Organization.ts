import { LogoImage } from './LogoImage';

export class Organization {
    constructor(
      public id: number,
      public name: string,
      public description_html: string,
      public url: string,
      public logo_image: LogoImage,
      public subdomain: string,
      public permissions: string[]
    ) {}
}
