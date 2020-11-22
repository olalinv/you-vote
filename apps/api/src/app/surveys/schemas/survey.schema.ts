import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import { User } from '../../users/schemas/user.schema';
import { Comment } from './comment.schema';
import { Image } from './image.schema';
import { SurveyType } from './survey-type.schema';
import { Vote } from './vote.schema';

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
    autopopulate: true,
  })
  categoryId: Category;

  @Prop()
  comments: Comment[];

  @Prop()
  image: Image;

  @Prop({ required: true })
  question: string;

  @Prop()
  surveyType: SurveyType;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    autopopulate: { select: '-password' },
  })
  user: User;

  @Prop()
  votes: Vote[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
