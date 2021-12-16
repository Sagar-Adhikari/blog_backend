export type UserType = 'user' | 'admin' | undefined;

export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  blogPostedBy?: Partial<IUser>;
  commentedBy?: Partial<IUser>;
}
