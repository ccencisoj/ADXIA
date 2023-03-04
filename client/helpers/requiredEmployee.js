import { getEmployeeFromRequest } from "~/helpers/getEmployeeFromRequest"

export const requiredEmployee = (callback)=> {
  return async (ctx)=> {
    const employee = await getEmployeeFromRequest(ctx.req);

    if(!employee) {
      return {props: {}, redirect: {destination: "/login"}};
    }

    return callback(employee, ctx);
  }
}
