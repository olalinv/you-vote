import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Answer } from '../../answers/schemas/answer.schema';

export type SurveyResultDocument = SurveyResult & Document;

@Schema()
export class SurveyResult extends Document {
  @Prop()
  answers: Answer[];

  @Prop()
  total: Number;
}

export const SurveyResultSchema = SchemaFactory.createForClass(SurveyResult);
