import { IUser } from '../user/user.interface';

export type ItemStatus =
  | 'draft'
  | 'under-review'
  | 'published'
  | 'rejected'
  | 'paused';
export interface IItem {
  name: string;
  description: string;
  // imageURLs: string[];
  blogPostedBy?: Partial<IUser>;
}

export interface ImageProperties {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
