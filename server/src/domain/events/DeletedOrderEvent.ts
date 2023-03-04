import { Order } from "../Order";
import { DomainEvent } from "../common/DomainEvent";

export class DeletedOrderEvent extends DomainEvent {
  public constructor(order: Order) {
    super("DeletedOrderEvent", order.id);
  }
}
