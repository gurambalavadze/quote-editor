export interface QuoteDTO {
  quote: string;
  author: string;
}

export type QuoteUpdateDTO = QuoteDTO & { _v: number };
