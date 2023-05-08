import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { StrategyJwt } from './jwt.strategy';
@Module({
  imports: [UsersModule,    
    JwtModule.register({
    global: true,
    secret: process.env.SECRET_PASS,
    signOptions: { expiresIn: '4m' },
  })],
  controllers: [AuthController],
  providers: [AuthService, StrategyJwt],
 
})
export class AuthModule {}
