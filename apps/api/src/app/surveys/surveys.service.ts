import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { User } from '../users/schemas/user.schema';
import { Vote } from '../votes/schemas/vote.schema';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<Survey>,
    @InjectModel(Vote.name) private voteModel: Model<Vote>
  ) {}

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
    const survey = this.surveyModel.findById(id).exec();
    const result: any = this.voteModel.aggregate([
      {
        $match: {
          surveyId: id,
        },
      },
      {
        $group: {
          _id: '$answerId',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          answer: {
            _id: '$_id',
            count: '$count',
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          answers: { $addToSet: '$answer' },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    (await survey).surveyResult = await result;
    return survey;
  }
}
