import { Order } from "../Order";
import { DomainEvent } from "../common/DomainEvent";

export class UpdatedOrderEvent extends DomainEvent {
  public constructor(order: Order) {
    super("UpdatedOrderEvent", order.id);
  }
}
