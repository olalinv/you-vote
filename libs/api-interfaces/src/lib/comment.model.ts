import { IUser } from '@api-interfaces';

export interface IComment {
  content?: string;
  readonly createdAt?: string;
  readonly _id?: string;
  readonly updatedAt?: string;
  user?: Partial<IUser>;
}
