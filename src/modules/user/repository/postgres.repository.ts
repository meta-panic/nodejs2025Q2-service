import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../model/User.model';
import { IUserRepo } from './user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PostgresUserRepository implements IUserRepo {
  constructor(private readonly prisma: PrismaService) { }


  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, props: Partial<User>): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: props,
    });
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return false;
      }
      throw error;
    }
  }

  async create(props: User): Promise<User> {
    return await this.prisma.user.create({ data: props });
  }

  async findByLogin(login: string) {
    return await this.prisma.user.findUnique({ where: { login } });
  }
}
