import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Global,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

export const PRISMA_SERVICE = 'PRISMA_SERVICE';
