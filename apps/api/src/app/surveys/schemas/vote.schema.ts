import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Answer } from './answer.schema';
import { Survey } from './survey.schema';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Prop({ required: true })
  survey: Survey;

  @Prop({ required: true })
  user: User;

  @Prop({ required: true })
  answer: Answer;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
