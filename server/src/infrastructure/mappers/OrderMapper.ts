import { DateTime, Order } from "../../domain";
import { DeliveryState } from "../../domain/DeliveryState";

type OrderRaw = {
  id: string;
  employeeId: string;
  clientId: string,
  createdAt: string;
  deliveryState: string;
  deliveredAt: string;
  total: number;
};

export class OrderMapper {
  public static toJSON = (order: Order): any => {
    return {
      id: order.id,
      clientId: order.clientId,
      employeeId: order.employeeId,
      createdAt: order.createdAt.value,
      deliveredAt: order.deliveredAt?.value,
      deliveryState: order.deliveryState,
      total: order.total
    }
  }

  public static toPersistence = (order: Order): any => {
    return {
      id: order.id,
      clientId: order.clientId,
      employeeId: order.employeeId,
      createdAt: order.createdAt.value,
      deliveredAt: order.deliveredAt?.value,
      deliveryState: order.deliveryState,
      total: order.total
    }
  }

  public static toDomain = (raw: OrderRaw): Order => {
    const createdAtOrError = DateTime.create(raw.createdAt);
    const deliveredAt = DateTime.create(raw.deliveredAt);
    const deliveryStateOrError = DeliveryState.create(raw.deliveryState);
    const orderOrError = Order.create({
      clientId: raw.clientId,
      employeeId: raw.employeeId,
      createdAt: createdAtOrError.getValue(),
      deliveredAt: deliveredAt.getValue(),
      deliveryState: deliveryStateOrError.getValue(),
      total: raw.total
    }, raw.id);
    const order = orderOrError.getValue();
    return order;
  }
}
