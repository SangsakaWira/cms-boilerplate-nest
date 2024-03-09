import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = process.env.APP_PORT || 3000;
  const baseUrl = process.env.BACKEND_DOMAIN;

  // Setting API Path
  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  // Enable versioning API Path
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const options = new DocumentBuilder()
    .setTitle('Larangan-app API')
    .setDescription('Larangan-app API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);
  await app.listen(port, () => {
    logger.log(`Host: ${baseUrl}:${port}`);
    logger.log(`Documentation: ${baseUrl}:${port}/${apiPath}/docs`);
  });
}
bootstrap();
