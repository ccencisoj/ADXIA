import { config } from "~/config";
import { http } from "~/packages/http";
import { Employee } from "~/models/Employee";
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

export const getCurrentEmployee = async ()=> {
  const response = await http.get(
    `${config.EMPLOYEES_SERVICE_URI}/employee/current`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const employee = new Employee(data.employee);

  return employee;
}
