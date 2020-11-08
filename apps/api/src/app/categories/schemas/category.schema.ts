import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Survey } from '../../surveys/schemas/survey.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  // @Prop({ type: [Types.ObjectId], ref: 'Survey', autopopulate: true })
  // surveys: Survey[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
