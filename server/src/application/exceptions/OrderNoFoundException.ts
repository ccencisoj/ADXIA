import { ApplicationException } from "../common/ApplicationException";

export class OrderNoFoundException extends ApplicationException {
  public constructor() {
    super("OrderNoFoundException", 400, "Order no found");
  }
}
