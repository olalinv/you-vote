import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, SurveyDocument } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class SurveysService {
  constructor(@InjectModel(Survey.name) private surveyModel: Model<any>) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<any> {
    const createdSurvey = new this.surveyModel(createSurveyDto);
    return createdSurvey.save();
  }

  async findAll(): Promise<any[]> {
    return this.surveyModel.find().exec();
  }
}
