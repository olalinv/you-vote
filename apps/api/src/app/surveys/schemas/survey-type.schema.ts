import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Answer } from './answer.schema';

export type SurveyTypeDocument = SurveyType & Document;

@Schema()
export class SurveyType {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: Answer[];
}

export const SurveyTypeSchema = SchemaFactory.createForClass(SurveyType);
