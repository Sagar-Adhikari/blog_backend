import { IUser, UserType } from './user.interface';

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

@Schema({ timestamps: true })
export class User implements IUser {
  /** Required Fields */
  @Prop({ type: String, required: false, trim: true }) firstName!: string;
  @Prop({ type: String, required: false }) lastName!: string;
  @Prop({ type: String, required: false }) email: string;
  @Prop({ type: String, required: false }) password!: string;

  // @Prop({ type: String }) role!: UserType;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
