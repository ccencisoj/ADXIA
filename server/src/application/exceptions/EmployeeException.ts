import { ApplicationException } from "../common/ApplicationException";

export class EmployeeException extends ApplicationException {
  public constructor(message: string) {
    super("EmployeeException", 400, message);
  }
}
