import { NotFoundException } from '@nestjs/common';

import { IRepo } from './repository.interface';

export class InMemoryRepo<T extends { id: string }> implements IRepo<T> {
  protected entities: Map<string, T> = new Map();

  findAll(): T[] {
    return Array.from(this.entities, ([, value]) => value);
  }

  findById(id: string): T {
    const entity = this.entities.get(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  create(props: T): T {
    const newEntity = { ...props } as T;
    this.entities.set(props.id, newEntity);

    return newEntity;
  }

  update(id: string, props: Omit<Partial<T>, 'id'>): T {
    const entity = this.entities.get(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    const updatedEntity = { ...entity, ...props, id } as T;
    this.entities.set(id, updatedEntity);

    return updatedEntity;
  }

  delete(id: string): boolean {
    const entity = this.entities.get(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return this.entities.delete(id);
  }
}
