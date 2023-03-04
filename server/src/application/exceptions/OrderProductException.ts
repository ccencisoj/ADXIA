import { ApplicationException } from "../common/ApplicationException";

export class OrderProductException extends ApplicationException {
  public constructor(message: string) {
    super("OrderProductException", 400, message);
  }
}
