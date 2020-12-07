import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyType, SurveyTypeSchema } from './schemas/surveytype.schema';
import { SurveyTypesController } from './surveytypes.controller';
import { SurveyTypesService } from './surveytypes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SurveyType.name, schema: SurveyTypeSchema },
    ]),
  ],
  controllers: [SurveyTypesController],
  providers: [SurveyTypesService],
})
export class SurveyTypesModule {}
