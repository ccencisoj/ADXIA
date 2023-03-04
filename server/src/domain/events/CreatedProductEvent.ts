import { Product } from "../Product";
import { DomainEvent } from "../common/DomainEvent";

export class CreatedProductEvent extends DomainEvent {
  public constructor(product: Product) {
    super("CreatedProductEvent", product.id);
  }
}
