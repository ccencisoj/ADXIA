// @ts-nocheck
import { HttpRequest } from "../http/HttpRequest";

export const setSessionEmployeeToken = (req: HttpRequest, employeeToken: string): Promise<void> => {

  req.session.employeeToken = employeeToken;

}
