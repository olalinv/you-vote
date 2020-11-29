import { Category } from '../../categories/schemas/category.schema';
import { Comment } from '../schemas/comment.schema';
import { Image } from '../schemas/image.schema';
import { SurveyType } from '../../surveytypes/schemas/surveytype.schema';
import { User } from '../../users/schemas/user.schema';

export class CreateSurveyDto {
  readonly category: Partial<Category>;
  readonly comments: Comment[];
  readonly imageId: Partial<Image>;
  readonly question: string;
  surveytype: Partial<SurveyType>;
  readonly user: Partial<User>;
  // readonly votes: Vote[];
}
