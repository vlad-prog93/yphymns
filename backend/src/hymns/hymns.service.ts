import { Model } from 'mongoose';
import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hymn } from 'src/hymns/hymns.schema';
import { CreateHymnDto } from 'src/hymns/dto/create-hymn.dto';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';
import { Collection } from 'src/collections/collections.schema';


@Injectable()
export class HymnsService {

  constructor(
    @InjectModel(Hymn.name) private hymnModel: Model<Hymn>,
    @InjectModel(Collection.name) private collectionModel: Model<Collection>
  ) { }
  async getAll(): Promise<Hymn[]> {
    return this.hymnModel.find().exec();
  }

  async getOne(id: string): Promise<Hymn> {
    const hymn = await this.hymnModel.findById(id)
    return hymn
  }

  async create(createHymnDto: CreateHymnDto): Promise<Hymn> {
    try {

      const collection = await this.collectionModel.findOne({ name: createHymnDto.collection })

      if (!collection) {
        throw 'Неверно задан сборник гимнов'
      }
      const createdHymn = new this.hymnModel({ ...createHymnDto, collection: collection._id })
      await createdHymn.save()

      await this.collectionModel.updateOne(
        { _id: collection._id },
        { $push: { hymns: createdHymn._id } }
      )

      return createdHymn
    }
    catch (e) {
      console.log(e)
      return
    }
  }

  async delete(id: string): Promise<any> {
    return this.hymnModel.findByIdAndDelete(id)
  }

  async toUpdate(hymn: UpdateHymnDto): Promise<Hymn> {
    return this.hymnModel.findByIdAndUpdate({ _id: hymn._id }, { ...hymn }, { new: true })
  }
}
