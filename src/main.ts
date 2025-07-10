import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const port = config.get<number>('PORT') || 3000;
  await app.listen(port);

  if (config.get('ENV') === 'development') {
    Logger.log('PROJECT ENVS: ');
    Logger.log(' ENV: ', config.get('ENV'));
    Logger.log(' PORT: ', config.get('PORT'));
  }
}
bootstrap();
