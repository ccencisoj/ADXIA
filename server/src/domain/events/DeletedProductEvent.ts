import { Product } from "../Product";
import { DomainEvent } from "../common/DomainEvent";

export class DeletedProductEvent extends DomainEvent {
  public constructor(product: Product) {
    super("DeletedProductEvent", product.id);
  }
}
