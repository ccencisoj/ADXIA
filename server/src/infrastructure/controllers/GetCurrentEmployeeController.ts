import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import { GetCurrentEmployeeDTO, GetCurrentEmployeeUseCase } from "../../application";

interface GetCurrentEmployeeControllerDeps {
  getCurrentEmployeeUseCase: GetCurrentEmployeeUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetCurrentEmployeeController {
  public readonly route = "/employee/current";

  protected readonly getCurrentEmployeeUseCase: GetCurrentEmployeeUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getCurrentEmployeeUseCase,
    controllerErrorHandler
  }: GetCurrentEmployeeControllerDeps) {
    this.getCurrentEmployeeUseCase = getCurrentEmployeeUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse)=> {
    try {
      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        employeeToken: employeeTokenOrError.getValue()
      } as GetCurrentEmployeeDTO;

      const employee = await this.getCurrentEmployeeUseCase.execute(reqData);

      const employeeJSON = EmployeeMapper.toJSON(employee);

      res.json({employee: employeeJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
