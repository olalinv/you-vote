import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gender, GenderDocument } from './schemas/gender.schema';

@Injectable()
export class GendersService {
  constructor(
    @InjectModel(Gender.name)
    private genderModel: Model<GenderDocument>
  ) {}

  async findAll(query): Promise<Gender[]> {
    return this.genderModel.find(query).exec();
  }
}
