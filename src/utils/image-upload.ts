import { diskStorage } from 'multer';
import { extname } from 'path';

import { getRandomString } from './string';

export const blogImageFieldName = 'blogImageFile';

export const blogImageUploadPath = 'uploads';

export const blogImageStorage = diskStorage({
  destination: blogImageUploadPath,
  filename: (_request, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const awsS3Bucket = diskStorage({
  destination: './example',
  filename: (_request, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file: Express.Multer.File): string {
  return `${Date.now()}-${getRandomString() + extname(file.originalname)}`;
}
