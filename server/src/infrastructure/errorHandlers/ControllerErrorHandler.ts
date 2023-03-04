import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { ApplicationException } from "../../application";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";

export class ControllerErrorHandler {
  public execute = async (req: HttpRequest, res: HttpReponse, error: any)=> {
    if(error instanceof ApplicationException) {
      return res.status(error.code).json({message: error.message});
    }
    console.log("\n####################################");
    console.log("##### Occurred a unknown error #####");
    console.log("####################################\n");
    console.log(error);
    return res.status(500).json({message: "Occurred a unknown error"});
  }
}
