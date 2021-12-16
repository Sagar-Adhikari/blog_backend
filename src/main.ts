import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { Swagger } from './utils/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port: Number = configService.get('PORT') || 3000;
  const serverURL: string =
    configService.get('SERVER_URL') || 'http://localhost:3000';

  const swagger = new Swagger(app);
  swagger.build();

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    index: false,
    prefix: '/uploads',
  });
  // app.useStaticAssets(join(__dirname, '.., uploads'));

  app.enableCors();
  await app.listen(Number(port) || 3333);
  swagger.log(serverURL);
}
bootstrap();
