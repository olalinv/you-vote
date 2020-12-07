import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  @Prop({ required: true, unique: true })
  username: string;

  // @Prop({ type: Types.ObjectId, ref: Survey.name, autopopulate: true })
  // surveys: Types.ObjectId[];

  @Prop()
  countryOrigin: string;

  @Prop()
  gender: string;

  @Prop()
  provinceResidence: string;

  @Prop()
  yearBirth: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
