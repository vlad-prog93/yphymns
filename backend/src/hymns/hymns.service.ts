import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hymn } from 'src/hymns/hymns.schema';
import { CreateHymnDto } from 'src/hymns/dto/create-hymn.dto';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';


@Injectable()
export class HymnsService {

  constructor(@InjectModel(Hymn.name) private hymnModel: Model<Hymn>) { }
  async getAll(): Promise<Hymn[]> {
    return this.hymnModel.find().exec();
  }

  async getOne(id: string): Promise<Hymn> {
    const hymn = await this.hymnModel.findById(id)
    return hymn
  }

  async create(createHymnDto: CreateHymnDto): Promise<Hymn> {
    const createdHymn = new this.hymnModel(createHymnDto)
    return createdHymn.save()
  }

  async delete(id: string): Promise<any> {
    return this.hymnModel.findByIdAndDelete(id)
  }

  async toUpdate(hymn: UpdateHymnDto): Promise<Hymn> {
    return this.hymnModel.findByIdAndUpdate({ _id: hymn._id }, { ...hymn }, { new: true })
  }
}
