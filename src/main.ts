import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("API documentation")
    .setDescription("API documentation for developers")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/documentation', app, document);

  await app.listen(3000);
}
bootstrap();
