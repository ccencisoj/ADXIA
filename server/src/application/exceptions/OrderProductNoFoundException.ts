import { ApplicationException } from "../common/ApplicationException";

export class OrderProductNoFound extends ApplicationException {
  public constructor() {
    super("OrderProductNoFound", 400, "Order product no found");
  }
}
