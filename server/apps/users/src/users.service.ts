import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  // register user service
  
}
