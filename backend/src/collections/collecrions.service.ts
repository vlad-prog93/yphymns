import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collection } from "src/collections/collections.schema";
import { CreateCollectionDto } from "src/collections/dto/create-collection.dto";


@Injectable()
export class CollectionsService {

  constructor(@InjectModel(Collection.name) private collectionModel: Model<Collection>) { }

  async getAll(): Promise<Collection[]> {
    return this.collectionModel.find().exec()
  }

  async create(dto: CreateCollectionDto): Promise<Collection> {
    try {
      const collection = new this.collectionModel(dto)
      return collection.save()
    } catch (e) {
      console.log(e)
    }

  }
}