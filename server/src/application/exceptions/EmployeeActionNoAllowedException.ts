import { ApplicationException } from "../common/ApplicationException";

export class EmployeeActionNoAllowedException extends ApplicationException {
  public constructor() {
    super(
      "EmployeeActionNoAllowedException", 400, 
      "Employee action no allowed"
    );
  }
}
