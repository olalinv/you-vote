import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegionDocument = Region & Document;

@Schema()
export class Region {
  @Prop()
  _id: Number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  country: number;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
