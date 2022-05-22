import { BaseEntity } from "./base.entity";

export class QuoteEntity extends BaseEntity {
  quote!: string;
  author!: string;
}
