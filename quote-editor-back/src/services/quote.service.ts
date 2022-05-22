import { QuoteDTO, QuoteUpdateDTO } from "src/application/dtos/quote.dto";
import { WithID } from "src/entities/base.entity";
import { QuoteEntity } from "src/entities/quote.entity";
import { IQuoteRepository } from "src/repositories/quote.repo";

export interface IQuoteService {
  getAll(): Promise<WithID<QuoteEntity>[]>;
  get(id: string): Promise<WithID<QuoteEntity> | null>;
  add(model: QuoteDTO): Promise<WithID<QuoteEntity>>;
  update(id: string, model: QuoteUpdateDTO): Promise<WithID<QuoteEntity>>;
  delete(id: string): Promise<boolean>;
}

export class QuoteService implements IQuoteService {
  constructor(private quoteRepo: IQuoteRepository) {}

  async getAll() {
    return this.quoteRepo.getAll();
  }
  async get(id: string) {
    return this.quoteRepo.get(id);
  }
  add(model: QuoteDTO) {
    const entity: QuoteEntity = {
      ...model,
      createdDate: new Date(),
      updatedDate: new Date(),
      _v: 1,
    };
    return this.quoteRepo.add(entity);
  }
  async update(id: string, model: QuoteUpdateDTO) {
    const exist = await this.get(id);
    if (!exist) throw new Error("Entity not exists");

    const result = await this.quoteRepo.update(
      { _id: exist._id, _v: model._v },
      { author: model.author, quote: model.quote, updatedDate: new Date() }
    );
    if (!result) throw new Error("invalid version");

    return result;
  }
  delete(id: string) {
    return this.quoteRepo.delete(id);
  }
}
