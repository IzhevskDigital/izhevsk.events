export class TicketType {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public buy_amount_min: number,
      public buy_amount_max: number,
      public price: number,
      public is_promocode_locked: boolean,
      public remaining: number,
      public sale_ends_at: Date,
      public sale_starts_at: Date,
      public public_key: string,
      public is_active: boolean,
      public ad_partner_profit: number,
      public send_personal_links: boolean,
      public sold: number,
      public attended: number,
      public limit: number,
      public status: string
    ) {}
}
