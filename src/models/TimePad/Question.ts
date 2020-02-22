import { Answer } from './Answer'

export class Question {
    constructor(
      public field_id: number,
      public name: string,
      public comment: string,
      public type: string,
      public is_mandatory: boolean,
      public is_for_every_visitor: boolean,
      public meta: {},
      public possible_answers: Answer[]
    ) {}
}
