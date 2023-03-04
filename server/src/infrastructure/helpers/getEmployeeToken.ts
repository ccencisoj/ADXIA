import { Result } from "../../domain";
import { HttpRequest } from "../http/HttpRequest";
import { getSessionEmployeeToken } from "./getSessionEmployeeToken";

type Response = Promise<Result<string>>;

export const getEmployeeToken = async (req: HttpRequest): Response => {
  const employeeToken = getSessionEmployeeToken(req);
  const hasEmployeeToken = !!employeeToken;

  if(!hasEmployeeToken) {
    return Result.fail("The employee token is required");
  }
  
  return Result.ok(employeeToken);
}
