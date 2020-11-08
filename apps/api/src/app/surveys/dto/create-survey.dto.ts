import { Types } from 'mongoose';
import { Comment } from '../schemas/comment.schema';
import { Vote } from '../schemas/vote.schema';

export class CreateSurveyDto {
  readonly categoryId: Types.ObjectId;
  readonly comments: Comment[];
  readonly imageId: Types.ObjectId;
  readonly question: string;
  readonly surveyTypeId: Types.ObjectId;
  readonly userId: Types.ObjectId;
  readonly votes: Vote[];
}
