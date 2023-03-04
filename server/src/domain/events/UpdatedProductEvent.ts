import { Product } from "../Product";
import { DomainEvent } from "../common/DomainEvent";

export class UpdatedProductEvent extends DomainEvent {
  public constructor(product: Product) {
    super("UpdatedProductEvent", product.id);
  }
}
