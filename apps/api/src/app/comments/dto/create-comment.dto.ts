import { Types } from 'mongoose';

export class CreateCommentDto {
  readonly content: string;
  readonly survey: Types.ObjectId;
  readonly userId: Types.ObjectId;
}
