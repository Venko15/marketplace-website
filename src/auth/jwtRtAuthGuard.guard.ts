import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRtAuthGuard extends AuthGuard('refresh-jwt') {}