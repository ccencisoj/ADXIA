import { agent } from "~/agent";

export const getEmployeeFromRequest = async (req)=> {
  try {
    const cookie = req.headers.cookie;

    const employee = await agent.Employee.current(cookie);

    return employee;
    
  }catch(error) {
    return null;
  }
}
