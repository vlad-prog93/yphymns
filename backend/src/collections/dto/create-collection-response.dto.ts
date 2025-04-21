import mongoose from "mongoose";
import { CollectionDocument } from "src/collections/collections.schema";

export class CreateCollectionResponseDto {
  constructor(
    public _id: mongoose.Types.ObjectId,
    public name: string,
    public hymns?: Array<any>
  ) { }

  static from = ({
    _id,
    name,
    hymns
  }: CollectionDocument): CreateCollectionResponseDto =>
    new CreateCollectionResponseDto(_id, name, hymns);
}