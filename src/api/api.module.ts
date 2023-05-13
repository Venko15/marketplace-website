import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';


@Module({
    imports: [UsersModule,AuthModule],
    controllers: [ApiController],
    providers: [ApiService],
   
})
export class ApiModule{}