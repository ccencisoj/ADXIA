import { ApplicationException } from "../common/ApplicationException";

export class EmployeeCredentialsException extends ApplicationException {
  public constructor(message?: string) {
    super(
      "EmployeeCredentialsException", 400, 
      message || "Employee credentials are incorrect"
    );
  }
}
