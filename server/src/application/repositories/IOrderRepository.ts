import { Order } from '../../domain';
import { IBaseRepository } from './IBaseRepository';

export interface IOrderRepository extends IBaseRepository<Order> {}
