import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote extends Document {
  @Prop({ required: true })
  answerId: number;

  @Prop({ required: true })
  surveyId: string;

  @Prop({ required: true })
  userId: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
