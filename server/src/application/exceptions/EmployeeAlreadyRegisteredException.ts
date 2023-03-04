import { Employee } from "../../domain";
import { ApplicationException } from "../common/ApplicationException";

export class EmployeeAlreadyRegisteredException extends ApplicationException {
  public constructor(employee: Employee) {
    super(
      "EmployeeAlreadyRegisteredException", 400, 
      `The employee with the document number ${employee.nroDocument} already registered`
    );
  }
}
