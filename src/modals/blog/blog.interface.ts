export interface IBlog {
  _id?: string;
  blogName?: string;
  description?: string;
  photoURL?: string;
  blogImageFile?: ImageProperties;
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
