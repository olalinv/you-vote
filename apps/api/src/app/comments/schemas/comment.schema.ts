import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  survey: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    autopopulate: { select: 'username' },
  })
  user: Partial<User>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
