import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import { Comment } from '../../comments/schemas/comment.schema';
import { Image } from '../../images/schemas/image.schema';
import { SurveyType } from '../../surveytypes/schemas/surveytype.schema';
import { User } from '../../users/schemas/user.schema';
import { SurveyResult } from './surveyresult.schema';

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

  @Prop({
    type: Types.ObjectId,
    ref: Image.name,
    required: true,
    autopopulate: { select: 'name' },
  })
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
  surveyResult: SurveyResult;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
