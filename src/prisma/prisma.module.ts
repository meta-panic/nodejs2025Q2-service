import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService], // <-- PrismaService must be here
  exports: [PrismaService], // <-- and here
})
export class PrismaModule { }
