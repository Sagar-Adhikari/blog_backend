import { IUser } from './../user/user.interface';
import { mongoDBConfig } from 'src/config/mongodb.config';
import { IComment } from 'src/modals/comment/comment.interfaces';

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Comment implements IComment {
  @Prop({ type: String, required: false }) comment!: string;
  @Prop({
    type: NativeSchema.Types.ObjectId,
    ref: mongoDBConfig.collectionName.user,
  })
  commentedBy?: Partial<IUser>;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
