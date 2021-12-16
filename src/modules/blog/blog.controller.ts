import { BlogDocument } from './../../modals/blog/blog.schema';
import {
  blogImageStorage,
  blogImageFieldName,
} from './../../utils/image-upload';
import { ImageProperties, IBlog } from './../../modals/blog/blog.interface';
import {
  BlogImageUploadDTO,
  CreateBlogDTO,
} from './../../modals/blog/blog.dto';

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from 'src/services/blog/blog.services';
import { Observable, of } from 'rxjs';
import { join } from 'path';

@ApiTags('User Blogs')
@Controller('blog')
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}
  @Post('create-blog')
  async createBlogPost(
    @Body() createBlogDTO: CreateBlogDTO,
  ): Promise<BlogDocument> {
    return await this._blogService.createBlog(createBlogDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch('blog-image-upload') // API Path
  @UseInterceptors(
    FileInterceptor(blogImageFieldName, { storage: blogImageStorage }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: BlogImageUploadDTO })
  async uploadFile(
    @Body() body: any,
    @Req() request: Request,
    @UploadedFile() photoURL: ImageProperties,
  ): Promise<BlogDocument> {
    const { _id } = body;
    const blog: BlogDocument = await this._blogService.findBlogById(_id);

    const newPhoto = new Buffer(JSON.stringify(photoURL)).toString('base64');

    blog.photoUrl = 'http://localhost:3000/uploads/' + photoURL.filename;

    return await blog.save();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('all-blog-posts') // API Path
  async getAllPost(): Promise<IBlog | IBlog[]> {
    const response = await this._blogService.getAllBlogs();

    return response;
  }

  @Get('blog-image/:imageName')
  findImage(@Param('imageName') imageName, @Res() res): Observable<object> {
    console.log(
      '🚀 ~ file: blog.controller.ts ~ line 83 ~ BlogController ~ findImage ~ imageName',
      imageName,
    );
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imageName)));
  }

  @Get(':imagepath')
  getFile(@Param('imagePath') image, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/' + image), {
      root: 'uploads',
    });
  }
}
