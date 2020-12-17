import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  @Prop()
  _id: Number;

  @Prop({ required: true, unique: true })
  name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
