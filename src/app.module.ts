import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './modules/user/user.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoDBConfig } from './config/mongodb.config';
import { ItemsModule } from './modules/items/items.module';
import { join } from 'path';

import { BlogModule } from './modules/blog/blog.modules';
import { CommentModule } from './modules/comments/comment.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        ...mongoDBConfig.options,
      }),
    }),
    UserModule,
    ItemsModule,
    BlogModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
