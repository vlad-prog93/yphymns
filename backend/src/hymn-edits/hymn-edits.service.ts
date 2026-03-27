import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateHymnEditDto } from "src/hymn-edits/dto/hymn-edits.dto";
import { HymnEdit, HymnEditDocument } from "src/hymn-edits/schemas/hymn-edit.schema";
import { Hymn, HymnDocument } from "src/hymns/hymns.schema";

@Injectable()
export class HymnEditsService {
  constructor(
    @InjectModel(HymnEdit.name)
    private hymnEditModel: Model<HymnEditDocument>,
    @InjectModel(Hymn.name)
    private hymnModel: Model<HymnDocument>,
  ) { }

  async createEdit(dto: CreateHymnEditDto, user: any) {
    return this.hymnEditModel.create({
      type: dto.type,
      hymnId: dto.hymnId,
      data: dto.data,
      status: 'pending',
      proposedBy: user.sub,
    });
  }

  async getAllEditHymns() {
    return this.hymnEditModel
      .find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async approveEdit(id: string) {
    const edit = await this.hymnEditModel.findById(id);
    if (!edit) throw new NotFoundException('Edit not found');

    // обновляем оригинальный гимн
    await this.hymnModel.findByIdAndUpdate(edit.hymnId, edit.data);

    // меняем статус
    edit.status = 'approved';
    await edit.save();

    return { message: 'Edit approved' };
  }

  async rejectEdit(id: string) {
    const edit = await this.hymnEditModel.findById(id);
    if (!edit) throw new NotFoundException('Не найдено');

    edit.status = 'rejected';
    await edit.save();

    return { message: 'Edit rejected' };
  }
}