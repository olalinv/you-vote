import { ICategory } from './category.model';
import { IComment } from './comment.model';
import { IImage } from './image.model';
import { ISurveyType } from './survey-type.model';
import { IUser } from './user.model';
import { IVote } from './vote.model';

export interface ISurvey {
  readonly _id: string;
  readonly categoryId: ICategory;
  readonly comments: IComment[];
  readonly imageId: IImage;
  readonly question: string;
  readonly surveyTypeId: ISurveyType;
  readonly user: Partial<IUser>;
  readonly votes: IVote[];
}
