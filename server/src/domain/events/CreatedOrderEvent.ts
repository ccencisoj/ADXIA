import { Order } from "../Order";
import { DomainEvent } from "../common/DomainEvent";

export class CreatedOrderEvent extends DomainEvent {
  public constructor(order: Order) {
    super("CreatedOrderEvent", order.id);
  }
}
