import { Product } from "../../domain";
import { ApplicationException } from "../common/ApplicationException";

export class ProductNameAlreadyInUseException extends ApplicationException {
  public constructor(product: Product) {
    super(
      "ProductNameAlreadyInUseException", 400, 
      `The product name '${product.name}' already in use`
    );
  }
}
