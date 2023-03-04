import { config } from "~/config"
import { http } from "~/packages/http"
import { Employee } from "~/models/Employee";
import { handleBadResponse } from "~/helpers/handleBadResponse";
import { isBadResponse } from "~/helpers/isBadResponse";

export const getEmployees = async ({name}, skip, limit)=> {
  const response = await http.get(
    `${config.EMPLOYEES_SERVICE_URI}/employees?skip=${skip}&&limit=${limit}`,
    {
      name
    }
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const employees = data.employees.map((employee)=> new Employee(employee));

  return employees;
}
