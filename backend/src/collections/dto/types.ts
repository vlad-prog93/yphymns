import { Types } from "mongoose";

export interface ICollection {
  _id: Types.ObjectId | string,
  name: string,
}