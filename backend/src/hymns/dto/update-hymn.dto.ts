import mongoose from "mongoose";

export class UpdateHymnDto {
  _id: mongoose.Schema.Types.ObjectId;
  number: number;
  collection: string;
  shortText: string;
  text: any;
  text_with_accords: any
}