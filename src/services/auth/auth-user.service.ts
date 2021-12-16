import { IUser } from './../../modals/user/user.interface';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.services';
import { UserDocument } from 'src/modals/user/user.schema';
import { compareSync } from 'bcrypt';

export interface IAuthToken {
  accessToken: string;
}

@Injectable()
export class AuthUserService {
  constructor(
    private _usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IUser> {
    const user = await this._usersService.findUserByEmail(email);
    if (user && user.password && compareSync(pass, user.password)) {
      console.log('matched password');
      return user;
    }
    console.log('matched did not password');
    return null;
  }

  generateAccessToken(user: UserDocument): IAuthToken {
    const accessToken = {
      accessToken: this.jwtService.sign(
        {
          sub: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        { expiresIn: '10y' },
      ),
    };
    return accessToken;
  }
}
