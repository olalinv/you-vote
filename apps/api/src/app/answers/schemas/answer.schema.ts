import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop()
  _id: Number;

  @Prop({ required: true, unique: true })
  name: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
