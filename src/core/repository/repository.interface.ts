
export interface IRepo<T extends { id: string }> {
  findAll(): string[];
  findById(id: string): T;
  create(props: T): T;
  update(id: string, props: Partial<T>): T;
  delete(id: string): boolean;
}
