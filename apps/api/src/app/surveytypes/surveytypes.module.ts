import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyType, SurveyTypeSchema } from './schemas/surveytype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SurveyType.name, schema: SurveyTypeSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class SurveyTypesModule {}
