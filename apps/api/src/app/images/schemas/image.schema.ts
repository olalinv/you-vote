import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image extends Document {
  @Prop({ required: true, unique: true })
  source: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
