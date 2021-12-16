import { blogImageUploadPath } from './../../utils/image-upload';
import * as fs from 'fs';
import * as path from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageProperties } from 'src/modals/blog/blog.interface';
import sharp from 'sharp';

@Injectable()
export class BlogImageService {
  private _blogImageFolder = path.join(
    __dirname,
    `../../../../${blogImageUploadPath}`,
  );
  constructor() {}

  async manipulateAndUploadBlogImage(
    blogImage: ImageProperties,
  ): Promise<string> {
    const filePath = this._blogImageFolder + '/' + blogImage.filename;
    // this.deleteProfileImageServer(filePath);
    return blogImage.filename;
  }

  async manipulateAndUploadProfileImage(
    blogImage: ImageProperties,
  ): Promise<string> {
    const filePath = this._blogImageFolder + '/' + blogImage.filename;
    // const buffer = await this.bufferImage(filePath);
    // const resized = await this.resizeToFullHD(buffer);

    return filePath;
  }

  async bufferImage(filePath: string): Promise<Buffer> {
    return await sharp(filePath).toBuffer();
  }

  async resizeToFullHD(file: Buffer): Promise<Buffer> {
    const metaData = await sharp(file).metadata();
    const imageHeight = metaData.height;
    const resizeHeight = imageHeight > 1920 ? 1920 : Math.round(imageHeight);
    const resizeWidth = Math.round((resizeHeight * 9) / 16);
    return await sharp(file)
      .resize(resizeWidth, resizeHeight, { withoutEnlargement: true })
      .toBuffer();
  }

  deleteProfileImageServer(filePath: string): void {
    try {
      fs.unlinkSync(`${filePath}`);
    } catch (error) {
      throw new HttpException(
        `Unable to find the image: ${filePath}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
