import { Collection, Filter, ObjectId, OptionalId } from "mongodb";
import { WithID } from "src/entities/base.entity";
import { QuoteEntity } from "src/entities/quote.entity";

export interface IQuoteRepository {
  getAll(): Promise<WithID<QuoteEntity>[]>;
  get(id: string): Promise<WithID<QuoteEntity> | null>;
  add(entity: OptionalId<QuoteEntity>): Promise<WithID<QuoteEntity>>;
  update(
    filter: Filter<QuoteEntity>,
    entity: Partial<QuoteEntity>
  ): Promise<WithID<QuoteEntity> | null>;
  delete(id: string): Promise<boolean>;
}

export class QuoteRepository implements IQuoteRepository {
  constructor(private collection: Collection<QuoteEntity>) {}

  async getAll() {
    const quotes = await this.collection.find();
    return quotes.toArray();
  }
  get(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
  async add(entity: OptionalId<QuoteEntity>) {
    const result = await this.collection.insertOne(entity);
    return {
      _id: result.insertedId,
      ...entity,
    };
  }
  async update(filter: Filter<QuoteEntity>, entity: Partial<QuoteEntity>) {
    const result = await this.collection.findOneAndUpdate(
      filter,
      { $set: entity, $inc: { _v: 1 } },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id: string) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
