import { IAnswer } from './answer.model';

export interface ISurveyType {
  readonly _id: string;
  readonly answers: IAnswer[];
  readonly name: string;
}
