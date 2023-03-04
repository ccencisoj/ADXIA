import { http } from "~/packages/http"
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

export const deleteEmployee = async (employeeId)=> {
  const response = await http.delete(
    `${config.EMPLOYEES_SERVICE_URI}/employee?employeeId=${employeeId}`,
  ); 

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  return {deleted: true};
}
