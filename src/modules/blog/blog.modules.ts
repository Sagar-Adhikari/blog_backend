import { mongoDBConfig } from '../../config/mongodb.config';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogSchema } from 'src/modals/blog/blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from 'src/services/blog/blog.services';
import { BlogImageService } from 'src/services/blog/blog-image.service.ts';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: mongoDBConfig.collectionName.blog,
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogImageService],
  exports: [],
})
export class BlogModule {}
