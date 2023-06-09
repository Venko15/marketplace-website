import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'

dotenv.config({ path:join( __dirname,'..','/src','/.env')});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, "..","src/public"))

  await app.listen(3000);
}
bootstrap();
