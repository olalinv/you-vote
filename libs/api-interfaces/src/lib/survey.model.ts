import { ICategory } from './category.model';
import { IComment } from './comment.model';
import { IImage } from './image.model';
import { ISurveyResult } from './survey-result.model';
import { ISurveyType } from './survey-type.model';
import { IUser } from './user.model';

export interface ISurvey {
  readonly _id?: string;
  readonly category: ICategory;
  comments?: IComment[];
  readonly image?: IImage;
  readonly question?: string;
  readonly surveytype?: ISurveyType;
  readonly user?: IUser;
  surveyResult?: ISurveyResult[];
}
