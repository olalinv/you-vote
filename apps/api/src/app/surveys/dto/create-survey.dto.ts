import { Category } from '../../categories/schemas/category.schema';
import { Comment } from '../schemas/comment.schema';
import { Image } from '../schemas/image.schema';
import { SurveyType } from '../schemas/survey-type.schema';
import { User } from '../../users/schemas/user.schema';
import { Vote } from '../schemas/vote.schema';

export class CreateSurveyDto {
  readonly categoryId: Category;
  readonly comments: Comment[];
  readonly imageId: Image;
  readonly question: string;
  readonly surveyTypeId: SurveyType;
  readonly user: Partial<User>;
  readonly votes: Vote[];
}
