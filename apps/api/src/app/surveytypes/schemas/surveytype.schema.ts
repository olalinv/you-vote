import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Answer } from '../../answers/schemas/answer.schema';

export type SurveyTypeDocument = SurveyType & Document;

@Schema()
export class SurveyType {
  @Prop()
  _id: Number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: [Number],
    ref: Answer.name,
    required: true,
    autopopulate: true,
  })
  answers: Partial<Answer>[];
}

export const SurveyTypeSchema = SchemaFactory.createForClass(SurveyType);
