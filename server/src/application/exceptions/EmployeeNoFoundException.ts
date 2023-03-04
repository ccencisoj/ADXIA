import { ApplicationException } from "../common/ApplicationException";

export class EmployeeNoFoundException extends ApplicationException {
  public constructor() {
    super("EmployeeNoFoundException", 400, "Employee no found");
  }
}
