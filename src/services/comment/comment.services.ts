import { IComment } from '../../modals/comment/comment.interfaces';
import { mongoDBConfig } from '../../config/mongodb.config';
import { CommentDocument as CommentDocument } from 'src/modals/comment/comment.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(mongoDBConfig.collectionName.comment)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(comment: IComment): Promise<CommentDocument> {
    const newComment = new this.commentModel(comment);
    return await newComment.save();
  }

  async getAllComments(): Promise<CommentDocument[] | null> {
    return await this.commentModel.find().sort({ _id: -1 });
  }
}
