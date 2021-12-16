import { jwtConstants } from './../../utils/secret-key';
import { mongoDBConfig } from './../../config/mongodb.config';
import { UserService } from '../../services/user/user.services';
import { UserAuthController } from './user.controller';
import { UserSchema } from './../../modals/user/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserService } from 'src/services/auth/auth-user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/services/auth/strategy/local-strategy';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeature([
      {
        name: mongoDBConfig.collectionName.user,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserAuthController],
  providers: [UserService, AuthUserService, LocalStrategy],
  exports: [UserService, AuthUserService, LocalStrategy],
})
export class UserModule {}
