import { IAnswer } from './answer.model';
import { ISurvey } from './survey.model';
import { IUser } from './user.model';

export interface IVote {
  answer: IAnswer;
  survey: ISurvey;
  user: Partial<IUser>;
}
