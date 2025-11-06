import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(session({
    name: 'NESTS_SESSION_ID',
    secret: 'erkergnndlkfndefxeofweroiuerioueorvpnoenvuwemcrwemrqwr;j',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    }
  }))
  await app.listen(process.env.PORT ?? 3800);
}
bootstrap();
