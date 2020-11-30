import { Types } from 'mongoose';

export class CreateSurveyDto {
  readonly category: Types.ObjectId;
  readonly image: Types.ObjectId;
  readonly question: string;
  surveytype: number;
  readonly user: Types.ObjectId;
}
