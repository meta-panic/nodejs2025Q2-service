export interface IRepo<T extends { id: string }> {
  findAll(): T[];
  findById(id: string): T;
  create(props: T): T;
  update(id: string, props: Partial<T>): T;
  delete(id: string): boolean;
}

export interface IRepoAsync<T extends { id: string }> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(props: T): Promise<T>;
  update(id: string, props: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
