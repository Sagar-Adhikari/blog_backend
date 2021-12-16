import { UserSchema } from './../../modals/user/user.schema';
import { CommentService } from 'src/services/comment/comment.services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDBConfig } from 'src/config/mongodb.config';
import { CommentSchema } from 'src/modals/comment/comment.schema';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: mongoDBConfig.collectionName.comment,
        schema: CommentSchema,
      },
      ,
      {
        name: mongoDBConfig.collectionName.user,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
