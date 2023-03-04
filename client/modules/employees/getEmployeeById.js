import { http } from "~/packages/http";
import { Employee } from "~/models/Employee";
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

export const getEmployeeById = async (employeeId)=> {
  const response = await http.get(
    `${config.EMPLOYEES_SERVICE_URI}/employee?employeeId=${employeeId}`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;
  
  const employee = new Employee(data.employee);
  
  return employee;
}
