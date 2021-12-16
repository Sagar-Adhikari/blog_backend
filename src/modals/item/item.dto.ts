import { ImageProperties, IItem } from './item.interface';
// tslint:disable: max-classes-per-file

import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user/user.interface';

export class ImageUploadDTO {
  @ApiProperty() readonly _id!: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: ImageProperties;
}

export class PostItemDTO implements Partial<IItem> {
  // @ApiProperty() readonly _id!: string;
  @ApiProperty() @IsString() readonly name!: string;
  @ApiProperty() readonly description!: string;
  @ApiProperty() readonly blogPostedBy!: Partial<IUser>;
}
