import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import { Comment } from '../../comments/schemas/comment.schema';
import { SurveyType } from '../../surveytypes/schemas/surveytype.schema';
import { User } from '../../users/schemas/user.schema';

import { Image } from './image.schema';

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
    autopopulate: true,
  })
  category: Partial<Category>;

  @Prop()
  comments: Comment[];

  @Prop()
  image: Partial<Image>;

  @Prop({ required: true })
  question: string;

  @Prop({
    type: Number,
    ref: SurveyType.name,
    required: true,
    autopopulate: true,
  })
  surveytype: Partial<SurveyType>;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    autopopulate: { select: 'username' },
  })
  user: Partial<User>;

  @Prop()
  surveyResult: any;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
