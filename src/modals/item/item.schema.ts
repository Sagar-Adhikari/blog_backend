import { mongoDBConfig } from './../../config/mongodb.config';
import { IUser } from './../user/user.interface';
import { IItem } from './item.interface';
import { Document, Schema as NativeSchema } from 'mongoose';

import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Item implements IItem {
  /** Required Fields */
  @Prop({ type: String, required: false, trim: true }) name!: string;

  /** Optional Fields */
  // @Prop({ type: String }) firstName!: string;
  // @Prop({ type: [String] }) imageURLs!: string[];
  @Prop({ required: false }) description!: string;

  @Prop({
    type: NativeSchema.Types.ObjectId,
    ref: mongoDBConfig.collectionName.user,
  })
  blogPostedBy!: Partial<IUser>;
}

export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);
