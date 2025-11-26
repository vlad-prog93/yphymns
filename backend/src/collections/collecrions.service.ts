import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Collection } from "src/collections/collections.schema";

// import типов и интерфейсов
import { createColDTO } from "src/collections/dto/req/create-col.dto";
import { updateColDTO } from "src/collections/dto/req/update-col.dto";
import { ICollection } from "src/collections/dto/types";
import { HymnsService } from "src/hymns/hymns.service";


@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
    private HymnsService: HymnsService,
  ) { }

  async getAll(): Promise<ICollection[]> {
    return this.collectionModel.find().lean().exec()
  }

  async getOne(id: string): Promise<ICollection> {
    return this.collectionModel.findById(id).lean()
  }

  async create(dto: createColDTO): Promise<ICollection> {
    try {
      const collection = new this.collectionModel(dto)
      return await collection.save()
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Имя уже существует')
      }
      throw error
    }
  }

  async update(id: string, dto: updateColDTO): Promise<ICollection> {
    try {
      return await this.collectionModel.findByIdAndUpdate(
        id,
        dto,
        { new: true })
        .lean()
    }
    catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Имя уже существует')
      }
      throw error
    }
  }

  async delete(id: string): Promise<ICollection> {
    await this.HymnsService.deleteByCollection(id)
    return this.collectionModel.findByIdAndDelete(id).lean()
  }
}