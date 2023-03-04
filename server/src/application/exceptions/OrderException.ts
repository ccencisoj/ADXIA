import { ApplicationException } from "../common/ApplicationException";

export class OrderException extends ApplicationException {
  public constructor(message: string) {
    super("OrderException", 400, message);
  }
}
