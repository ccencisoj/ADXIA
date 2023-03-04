import { ApplicationException } from "../../application";

export class RequiredEmployeeTokenException extends ApplicationException {
  public constructor() {
    super("RequiredEmployeeTokenException", 400, "Required employee token")
  }
}