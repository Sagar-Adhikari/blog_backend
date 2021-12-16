import { UserSchema } from './../../modals/user/user.schema';
import { ItemSchema } from './../../modals/item/item.schema';
import { mongoDBConfig } from './../../config/mongodb.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemsController } from './items.controller';
import { ItemsService } from 'src/services/item/items.service';
import { UserService } from 'src/services/user/user.services';

import { JwtStrategy } from 'src/services/auth/strategy/jwt-strategy';
import { UserModule } from '../user/user.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: mongoDBConfig.collectionName.item,
        schema: ItemSchema,
      },
      {
        name: mongoDBConfig.collectionName.user,
        schema: UserSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, JwtStrategy],
})
export class ItemsModule {}
