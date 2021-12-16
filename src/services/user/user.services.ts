import { UserDocument } from '../../modals/user/user.schema';
import { IUser } from '../../modals/user/user.interface';
import { mongoDBConfig } from '../../config/mongodb.config';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(mongoDBConfig.collectionName.user)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: IUser): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new this.userModel(user);
      return await newUser.save();
    }
    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }

  async update(_id: string, updateUser: Partial<IUser>): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate({ _id }, updateUser, { new: true });
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getAllUser(): Promise<UserDocument[] | null> {
    return await this.userModel.find().sort({ _id: -1 });
  }
}
