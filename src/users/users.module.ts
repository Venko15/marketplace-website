import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { JwtAtAuthGuard } from 'src/auth/jwtAtAuth.guard';
import { JwtRtAuthGuard } from 'src/auth/jwtRtAuthGuard.guard';
import { Product } from 'src/typeorm/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [UsersController],
  providers: [UsersService, JwtAtAuthGuard, JwtRtAuthGuard],
  exports:[TypeOrmModule]
})
export class UsersModule {}
