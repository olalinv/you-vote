import { IAnswer } from './answer.model';

export interface ISurveyResult {
  answers: IAnswer[];
  total: number;
}
