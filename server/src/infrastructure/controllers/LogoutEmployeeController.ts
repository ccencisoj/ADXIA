import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { setSessionEmployeeToken } from "../helpers/setSessionEmployeeToken";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";

interface LogoutEmployeeControllerDeps {
  controllerErrorHandler: ControllerErrorHandler
}

export class LogoutEmployeeController {
  public readonly route = "/employee/logout";

  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({controllerErrorHandler}: LogoutEmployeeControllerDeps) {
    this.controllerErrorHandler = controllerErrorHandler;
  }
  
  public execute = (req: HttpRequest, res: HttpReponse)=> {
    try {

      setSessionEmployeeToken(req, null);

      res.json({logout: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
