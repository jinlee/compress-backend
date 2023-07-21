import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      // dev options only
      disableErrorMessages: false,
      enableDebugMessages: true,
      errorHttpStatusCode: 422,
      stopAtFirstError: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidUnknownValues: true,
    }),
  );
  const pebl = await(import('pebl'));
  await pebl.service(app, "hey.pebl.rocks");
}
bootstrap();
