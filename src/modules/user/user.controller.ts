import { getAuthUserFromAuthGuard } from 'src/utils/auth';
import { UserDocument } from './../../modals/user/user.schema';
import { encrypt } from 'src/utils/hash-password';
import { UserService } from '../../services/user/user.services';
import { IUser } from './../../modals/user/user.interface';
import { LoginUserDTO, RegisterUserDTO } from './../../modals/user/user.dto';
import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserService } from 'src/services/auth/auth-user.service';
import { Request } from 'express';

@ApiTags('User Authentication')
@Controller('user')
export class UserAuthController {
  constructor(
    private readonly _authUserService: AuthUserService,
    private readonly _userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO): Promise<IUser> {
    const user: IUser = {
      ...registerUserDTO,
      password: await encrypt(registerUserDTO.password),
    };
    const response = await this._userService.create(user);
    response.password = undefined;
    return response;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginPassword(
    @Req() request: Request,
    @Body() _body: LoginUserDTO,
  ): Promise<any> {
    // // tslint:disable-next-line: no-string-literal
    const user = request['user']['_doc'];
    const token = this._authUserService.generateAccessToken(user);
    delete user.password;
    return { user, ...token };
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Get('all-users')
  async getAll(@Req() request: Request): Promise<UserDocument[]> {
    return await this._userService.getAllUser();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('get-current-user')
  async getProfile(@Req() request: Request): Promise<UserDocument | IUser> {
    const authUser = getAuthUserFromAuthGuard(request);
    if (authUser._id) {
      return await this._userService.findUserById(authUser._id);
    }
    return authUser;
  }
}
