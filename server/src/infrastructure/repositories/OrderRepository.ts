import { Model } from 'mongoose';
import { Order } from '../../domain';
import { IOrderRepository } from "../../application";
import { OrderMapper } from '../mappers/OrderMapper';

export class OrderRepository implements IOrderRepository {
  protected readonly model: Model<any>;

  public constructor(model: Model<any>) {
    this.model = model;
  }

  public findOne = async (filter: any): Promise<Order> => {
    const repoOrder = await this.model.findOne({...filter, deleted: false});    
    const order = repoOrder ? OrderMapper.toDomain(repoOrder) : null;
    return order;
  }

  public findMany = async (filter: any, skip: number, limit: number): Promise<Order[]> => {
    const repoOrders = await this.model.find({...filter, deleted: false}).sort({"$natural": -1}).skip(skip).limit(limit);
    const orders = repoOrders.map((repoOrder)=> OrderMapper.toDomain(repoOrder));
    return orders;
  }

  public save = async (Order: Order): Promise<void> => {
    const exists = await this.existsById(Order.id);
    const repoOrder = OrderMapper.toPersistence(Order);

    if(exists) {
      await this.model.updateOne({id: repoOrder.id}, repoOrder);
    }else {
      await this.model.create({...repoOrder, deleted: false});
    }
  }

  public delete = async (Order: Order): Promise<void> => {
    await this.model.updateOne({id: Order.id}, {deleted: true}); 
  }

  public deleteMany = async (filter: any): Promise<void> => {
    await this.model.updateMany(filter, {deleted: true});
  }

  public existsById = async (entityId: string): Promise<boolean> => {
    const repoOrder = await this.model.findOne({id: entityId});
    const exists = !!repoOrder ? true : false;
    return exists;
  }
}
