// @ts-nocheck
import { HttpRequest } from "../http/HttpRequest";

export const getSessionEmployeeToken = (req: HttpRequest): string => {

  const employeeToken = req.session.employeeToken;

  return employeeToken;
  
}
