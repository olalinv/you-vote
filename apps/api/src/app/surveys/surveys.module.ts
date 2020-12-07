import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { Vote, VoteSchema } from '../votes/schemas/vote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Survey.name, schema: SurveySchema },
      { name: Vote.name, schema: VoteSchema },
    ]),
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
