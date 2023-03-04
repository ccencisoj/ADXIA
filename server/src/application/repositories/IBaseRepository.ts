export interface IBaseRepository<T> {
  findOne(filter: any): Promise<T>,
  findMany(filter: any, skip?: number, limit?: number): Promise<T[]>,
  save(entity: T): Promise<void>,
  delete(entity: T): Promise<void>,
  deleteMany(filter: any): Promise<void>;

}
