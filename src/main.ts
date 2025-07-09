import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
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
    console.log('PROJECT ENVS: ');
    console.log(' ENV: ', config.get('ENV'));
    console.log(' PORT: ', config.get('PORT'));
  }
}
bootstrap();
