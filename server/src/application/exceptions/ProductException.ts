import { ApplicationException } from "../common/ApplicationException";

export class ProductException extends ApplicationException {
  public constructor(message: string) {
    super("ProductException", 400, message);
  }
}
