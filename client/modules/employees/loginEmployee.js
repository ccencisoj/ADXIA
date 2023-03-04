import { config } from "~/config";
import { http } from "~/packages/http";
import { controllerBadResponseHandle } from "~/helpers/handleBadResponse";
import { Employee } from "~/models/Employee";

export const loginEmployee = async ({nroDocument, accessCode})=> {
  const response = await http.get(
    `${config.EMPLOYEES_SERVICE_URI}/employee/login`, 
    {
      nroDocument,
      accessCode
    }
  );

  if(!(response.status === 200)) {
    return controllerBadResponseHandle(response);
  }

  const data = response.data;

  const employee = new Employee(data.employee);

  return employee;
}
