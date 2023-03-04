import { Product } from '../../domain';
import { IBaseRepository } from './IBaseRepository';

export interface IProductRepository extends IBaseRepository<Product> {}
