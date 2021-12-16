import { IBlog, ImageProperties } from './blog.interface';

import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

export class CreateBlogDTO implements Partial<IBlog> {
  @ApiProperty() @IsString() readonly blogName!: string;
  @ApiProperty() @IsString() readonly description!: string;
  @ApiProperty() @IsString() readonly photoUrl!: string;
}

export class BlogImageUploadDTO implements Partial<IBlog> {
  @ApiProperty({ type: 'string', format: 'binary' })
  blogImageFile!: ImageProperties;
}
