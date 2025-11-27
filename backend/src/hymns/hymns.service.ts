import mongoose, { Model, Mongoose, Types } from 'mongoose';
import { Injectable, Req, Res, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hymn } from 'src/hymns/hymns.schema';
import { CreateHymnDto } from 'src/hymns/dto/create-hymn.dto';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';
import { Collection } from 'src/collections/collections.schema';
import { createReadStream, writeFileSync } from 'fs';


@Injectable()
export class HymnsService {

  constructor(
    @InjectModel(Hymn.name) private hymnModel: Model<Hymn>,
    @InjectModel(Collection.name) private collectionModel: Model<Collection>
  ) { }
  async getAll(): Promise<Hymn[]> {
    return this.hymnModel.find().lean().exec();
  }

  async getOne(id: string): Promise<Hymn> {
    const hymn = await this.hymnModel.findById(id)
    return hymn
  }



  async create(createHymnDto: CreateHymnDto): Promise<Hymn> {
    try {
      const collection = await this.collectionModel.findById(createHymnDto.collection)
      if (!collection) {
        throw 'Неверно задан сборник гимнов'
      }
      const createdHymn = new this.hymnModel({ ...createHymnDto, collection: collection._id })
      await createdHymn.save()

      return createdHymn
    }
    catch (e) {
      console.log(e)
      return
    }
  }

  async deleteOne(id: string): Promise<string> {
    return this.hymnModel.findByIdAndDelete(id)
  }

  async deleteAll(): Promise<{ acknowledged: boolean, deletedCount: number }> {
    return this.hymnModel.deleteMany({})
  }

  async editOne(id: string, hymn: UpdateHymnDto): Promise<Hymn> {
    const { _id, ...cleanHymn } = hymn

    return this.hymnModel.findByIdAndUpdate(
      id,
      cleanHymn,
      { new: true })
      .lean()
  }

  async deleteByCollection(id: string) {
    return this.hymnModel.deleteMany({ collection: id })
  }

  async pushDataBase(file: Express.Multer.File) {
    try {
      const hymns = JSON.parse(file.buffer.toString()).map((hymn) => {
        hymn._id && delete hymn._id
        hymn.id && delete hymn.id
        return hymn
      })

      await Promise.all(
        hymns.map(async (hymn: CreateHymnDto) => {
          const col = await this.collectionModel.findOne({ name: hymn.collection })

          if (!col) {
            const newCol = new this.collectionModel({ name: hymn.collection })
            await newCol.save()

            const newHymn: CreateHymnDto =
            {
              ...hymn,
              collection: newCol._id
            }
            return this.create(newHymn)
          } else {
            return this.create({ ...hymn, collection: col._id })
          }
        })
      )
      return this.getAll()

    } catch (error) {
      throw error
    }

  }

  async pullDataBase() {
    const data = await this.getAll()
    writeFileSync('db.json', JSON.stringify(data, null, 4), { flag: 'w', encoding: 'utf8' })
    const file = createReadStream('db.json', 'utf8')
    return new StreamableFile(file)
  }

  // async getChangeDataBase() {
  //   const data: CreateHymnDto[] = await this.getAll()
  //   const newData = data.map(hymn => {
  //     const { shortText, text_with_accords, ...newHymn } = { ...hymn, text: hymn.text_with_accords, title: hymn.shortText }
  //     return newHymn
  //   })
  //   writeFileSync('db.json', JSON.stringify(newData, null, 4), { flag: 'w', encoding: 'utf8' })
  //   const file = createReadStream('db.json', 'utf8')
  //   return new StreamableFile(file)
  // }
}
