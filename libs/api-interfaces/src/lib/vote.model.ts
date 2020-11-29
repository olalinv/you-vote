export interface IVote {
  readonly _id?: string;
  answerId?: number;
  surveyId: string;
  userId: string;
}
