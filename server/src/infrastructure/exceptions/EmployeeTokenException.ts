import { ApplicationException } from "../../application";

export class EmployeeTokenException extends ApplicationException {
  public constructor(message: string) {
    super("EmployeeTokenException", 400, message);
  }
}