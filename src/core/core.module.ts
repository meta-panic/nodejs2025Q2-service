import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/authGuard';


@Module({
  providers: [
    JwtAuthGuard,
    JwtService,
  ],
  exports: [
    JwtAuthGuard,
    JwtService,
  ],
})
export class CoreModule { }

