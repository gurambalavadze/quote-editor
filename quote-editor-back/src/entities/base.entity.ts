import { ObjectId } from "mongodb";

export class BaseEntity {
  createdDate!: Date;
  updatedDate!: Date;
  _v!: number;
}

export type WithID<T> = T & { _id: ObjectId };
