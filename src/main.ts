import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pjson from '../package.json';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Analyst API')
    .setDescription('API for managing analysts')
    .setVersion(pjson.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix('analyst-service/v1');

  await app.listen(port, host, () =>
    Logger.log(`Server running on port ${port}`),
  );
}

bootstrap();
