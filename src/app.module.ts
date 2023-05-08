import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from 'path'
import { User } from './typeorm/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import * as dotenv from "dotenv";

dotenv.config({ path:join( __dirname,'..','/src','/.env')});

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type:  'postgres',
    host: process.env.DATABASE_HOST as string,
    port: (process.env.DATABASE_PORT as unknown) as number ,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: true
  }), UsersModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
