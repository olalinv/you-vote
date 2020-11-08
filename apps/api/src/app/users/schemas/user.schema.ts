import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ type: Types.ObjectId, ref: Survey.name, autopopulate: true })
  // surveys: Types.ObjectId[];

  @Prop()
  yearBirth: number;

  @Prop()
  gender: string;

  @Prop()
  provinceResidence: string;

  @Prop()
  countryOrigin: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
