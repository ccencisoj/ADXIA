import { ApplicationException } from "../common/ApplicationException";

export class ValidationException extends ApplicationException {
  public constructor(message: string) {
    super("ValidationException", 400, message);
  }
}
