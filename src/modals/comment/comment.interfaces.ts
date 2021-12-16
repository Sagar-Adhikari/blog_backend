import { IUser } from './../user/user.interface';
export interface IComment {
  _id?: string;
  comment?: string;
  commentedBy?: Partial<IUser>;
}
