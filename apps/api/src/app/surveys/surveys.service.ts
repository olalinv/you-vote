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

  async create(dto: CreateSurveyDto): Promise<Survey> {
    const createdSurvey = new this.surveyModel(dto);
    return createdSurvey.save();
  }

  async findAll(query: (err: any, res: Survey[]) => void): Promise<Survey[]> {
    const surveys = await this.surveyModel.find(query).exec();
    await Promise.all(
      surveys.map(async (survey) => {
        survey.surveyResult = await this.findAllVotes(survey.id);
      })
    );
    return surveys;
  }

  async findAllByUser(user: User): Promise<Survey[]> {
    return this.surveyModel.find(user).exec();
  }

  async findById(id: string): Promise<Survey> {
    const survey = await this.surveyModel.findById(id).exec();
    survey.surveyResult = await this.findAllVotes(id);
    return survey;
  }

  async findAllVotedByUserId(userId: string): Promise<Survey[]> {
    const surveys = [];
    const votes = await this.voteModel.find({ userId: userId }).exec();
    await Promise.all(
      votes.map(async (vote) => {
        const survey = await this.surveyModel.findById(vote.surveyId);
        survey.surveyResult = await this.findAllVotes(survey.id);
        surveys.push(survey);
      })
    );
    return surveys;
  }

  async findAllVotes(id: string): Promise<any> {
    return this.voteModel.aggregate([
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
          answers: { $addToSet: '$answer' },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
  }
}
