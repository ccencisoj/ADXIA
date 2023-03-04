import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { LoginEmployeeUseCase } from "../../application";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { setSessionEmployeeToken } from "../helpers/setSessionEmployeeToken";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";

interface LoginEmployeeControllerDeps {
  loginEmployeeUseCase: LoginEmployeeUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class LoginEmployeeController {
  public readonly route = "/employee/login";

  protected readonly loginEmployeeUseCase: LoginEmployeeUseCase;
  protected readonly controlllerErrorHandler: ControllerErrorHandler;

  public constructor({
    loginEmployeeUseCase, 
    controllerErrorHandler
  }: LoginEmployeeControllerDeps) {
    this.loginEmployeeUseCase = loginEmployeeUseCase;
    this.controlllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {
      const reqData = {
        nroDocument: String(req.body.nroDocument),
        accessCode: String(req.body.accessCode)
      }

      const { employee, employeeToken } = await this.loginEmployeeUseCase.execute(reqData);

      const employeeJSON = EmployeeMapper.toJSON(employee);

      setSessionEmployeeToken(req, employeeToken);

      res.json({employee: employeeJSON, employeeToken});

    }catch(error) {
      this.controlllerErrorHandler.execute(req, res, error);
    }
  }
}
