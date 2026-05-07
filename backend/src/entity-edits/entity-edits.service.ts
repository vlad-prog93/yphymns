import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Collection, Model } from "mongoose";
import { CollectionDocument } from "src/collections/collections.schema";
import { CreateEntityEditDto } from "src/entity-edits/dto/entity-edits.dto";
import { EntityEdit, EntityEditDocument } from "src/entity-edits/schemas/entity-edit.schema";
import { Hymn, HymnDocument } from "src/hymns/hymns.schema";

@Injectable()
export class EntityEditsService {
  constructor(
    @InjectModel(EntityEdit.name)
    private entityEditModel: Model<EntityEditDocument>,
    @InjectModel(Hymn.name)
    private hymnModel: Model<HymnDocument>,
    @InjectModel(Collection.name)
    private collectionModel: Model<CollectionDocument>
  ) { }

  async createEdit(dto: CreateEntityEditDto, user: any) {
    return this.entityEditModel.create({
      ...dto,
      status: 'pending',
      proposedBy: user.sub,
    });
  }

  async getAllEditEntity() {
    return this.entityEditModel
      .find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async approveEdit(id: string) {

    const edit: EntityEditDocument = await this.entityEditModel.findById(id);
    if (!edit) throw new NotFoundException('Не найдена редактируемая сущность');

    let model: Model<any>
    if (edit.entityType === 'hymn') model = this.hymnModel
    if (edit.entityType === 'collection') model = this.collectionModel
    if (!model) return { message: 'Ошибка изменение не проведено' };

    if (edit.status !== 'pending') {
      return { message: 'Изменение уже обработано' }
    }
    if (edit.type !== 'create' && !edit.entityId) {
      throw new BadRequestException('entityId обязателен')
    }

    switch (edit.type) {
      case 'update':
        await model.findByIdAndUpdate(edit.entityId, edit.data);
        break;
      case 'create':
        await model.create({ ...edit.data });
        break;
      case 'delete':
        await model.findByIdAndDelete(edit.entityId).exec();
        break;
    }

    // меняем статус
    edit.status = 'approved';
    await edit.save();

    console.log('APPROVING:', edit.type, edit.entityType)
    return { message: 'Изменение проведено успешно' };
  }

  async rejectEdit(id: string) {
    const edit = await this.entityEditModel.findById(id);
    if (!edit) throw new NotFoundException('Не найдена редактируемая сущность');

    edit.status = 'rejected';
    await edit.save();

    return { message: 'Изменение отклонено успешно' };
  }
}