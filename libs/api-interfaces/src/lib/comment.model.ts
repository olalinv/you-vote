import { IUser } from './user.model';

export interface IComment {
  user: Partial<IUser>;
  comment: string;
}
