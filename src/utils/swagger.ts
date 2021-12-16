import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logInfo } from './fancy-console';

export class Swagger {
  public docURL = '';
  private swaggerOption = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Blog')
    .build();

  constructor(private app: INestApplication) {}

  build() {
    const document = SwaggerModule.createDocument(this.app, this.swaggerOption);
    SwaggerModule.setup(this.docURL, this.app, document);
  }

  log(serverURL: string) {
    logInfo(`API Documentation is running on:`, `${serverURL}/${this.docURL}`);
    logInfo(`OpenAPI spec link`, `${serverURL}/${this.docURL}-json`);
  }
}
