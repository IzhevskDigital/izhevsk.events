import { PosterImage } from './PosterImage';
import { Organization } from './Organization';
import { Category } from './Category';
import { Question } from './Question';
import { RegistrationData } from './RegistrationData';
import { TicketType } from './TicketType';
import { Widget } from './Widget';

export class Event {
  constructor(
    public id: number,
    public create_at: Date,
    public starts_at: Date,
    public ends_at: Date,
    public name: string,
    public description_short: string,
    public description_html: string,
    public url: string,
    public poster_image: PosterImage,
    public ad_partner_percent: number,
    public locale: string,
    public location: Location,
    public organization: Organization,
    public categories: Category[],
    public tickets_limit: number,
    public personal_links: string[],
    public age_limit: string,
    public properties: string[],
    public moderation_status: string,
    public access_status: string,
    public is_sending_free_tickets: boolean,
    public personal_link_title: string,
    public reservation_period: number,
    public ticket_types: TicketType[],
    public questions: Question[],
    public widgets: Widget[],
    public registration_data: RegistrationData
  ) {}
}