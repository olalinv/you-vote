import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenderDocument = Gender & Document;

@Schema()
export class Gender {
  @Prop()
  _id: Number;

  @Prop({ required: true, unique: true })
  name: string;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
