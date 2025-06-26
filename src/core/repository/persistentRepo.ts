import { NotFoundException } from '@nestjs/common';

import { IRepoAsync } from './repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


export class PersistentRepo<T extends { id: string }> implements IRepoAsync<T> {
  constructor(protected readonly prisma: PrismaService, private readonly entityName: string) { }

  findAll(): Promise<T[]> {
    return this.prisma[this.entityName].findMany();
  }

  async findById(id: string): Promise<T> {
    const entity = await this.prisma[this.entityName].findUnique({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async create(props: T): Promise<T> {
    return this.prisma[this.entityName].create({ data: props });
  }

  async update(id: string, props: Omit<Partial<T>, 'id'>): Promise<T> {
    const entity = await this.prisma[this.entityName].findUnique({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return this.prisma[this.entityName].update({
      where: { id },
      data: props,
    });
  }


  async delete(id: string): Promise<boolean> {
    const entity = await this.prisma[this.entityName].findUnique({ where: { id: id } });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }


    try {
      await this.prisma[this.entityName].delete({ where: { id } });
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
}
