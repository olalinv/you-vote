import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SurveyType, SurveyTypeDocument } from './schemas/surveytype.schema';

@Injectable()
export class SurveyTypesService {
  constructor(
    @InjectModel(SurveyType.name)
    private surveytypeModel: Model<SurveyTypeDocument>
  ) {}

  async findAll(query): Promise<SurveyType[]> {
    return this.surveytypeModel.find(query).exec();
  }
}
