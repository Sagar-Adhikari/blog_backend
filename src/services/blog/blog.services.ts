import { IBlog } from './../../modals/blog/blog.interface';
import { BlogDocument } from './../../modals/blog/blog.schema';
import { mongoDBConfig } from './../../config/mongodb.config';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(mongoDBConfig.collectionName.blog)
    private readonly blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(blogDetails: Partial<IBlog>): Promise<BlogDocument> {
    try {
      const newBlog: BlogDocument = new this.blogModel(blogDetails);
      return await newBlog.save();
    } catch (err) {
      throw new HttpException(
        'Unable to create an item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findBlogById(id: string): Promise<BlogDocument> {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    return blog;
  }

  async getAllBlogs(): Promise<IBlog | BlogDocument[]> {
    return await this.blogModel.find().sort({ _id: -1 });
  }
}
