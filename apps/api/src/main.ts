/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { useContainer } from 'class-validator';

async function bootstrap() {
  // Create the Nest application with Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
  app.useBodyParser('json', { bodyLimit: 5 });
  // app.enableCors({ origin: true, credentials: true });
  // app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users') // Grouping tag
    .addBearerAuth() // Adds "Authorize" button for JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.register(fastifyCookie, {
    secret: 'rvkremlkvemlkjmfdslkvmrelk',
  });

  // Enable DI in class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
  Logger.log(`📃 Swagger is running on: http://localhost:${port}/api`);
}

bootstrap();
