import mongoose from "mongoose";

export class CreateCollectionDto {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
}