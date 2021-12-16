import { IBlog } from './blog.interface';

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Blog implements IBlog {
  /** Required Fields */
  @Prop({ type: String, required: false, trim: true }) blogName!: string;
  @Prop({ type: String, required: false }) description!: string;
  @Prop({ type: String }) photoUrl!: string;
}
export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
