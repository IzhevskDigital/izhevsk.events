export class RegistrationData {
    constructor(
        public price_max: number,
        public price_min: number,
        public sale_ends_at: Date,
        public tickets_total: number,
        public tickets_limit: number,
        public is_registration_open: boolean
    ) {}
}
