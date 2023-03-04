import { ApplicationException } from "../common/ApplicationException";

export class ProductNoFoundException extends ApplicationException {
  public constructor() {
    super("ProductNoFoundException", 400, "Product no found");
  }
}
