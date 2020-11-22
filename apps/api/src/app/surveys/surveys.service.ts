import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, SurveyDocument } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class SurveysService {
  constructor(@InjectModel(Survey.name) private surveyModel: Model<Survey>) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const createdSurvey = new this.surveyModel(createSurveyDto);
    return createdSurvey.save();
  }

  async findAll(query: (err: any, res: Survey[]) => void): Promise<Survey[]> {
    return this.surveyModel.find(query).exec();
  }

  async findAllByUser(user: User): Promise<Survey[]> {
    return this.surveyModel.find(user).exec();
  }

  async findById(id: string): Promise<Survey> {
    return this.surveyModel.findById(id).exec();
  }
}
