import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetEmployeeByIdDTO, 
  GetEmployeeByIdUseCase
} from "../../application";

interface GetEmployeeByIdControllerDeps {
  getEmployeeByIdUseCase: GetEmployeeByIdUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetEmployeeByIdController {
  public readonly route = "/employee";

  protected readonly getEmployeeByIdUseCase: GetEmployeeByIdUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getEmployeeByIdUseCase,
    controllerErrorHandler
  }: GetEmployeeByIdControllerDeps) {
    this.getEmployeeByIdUseCase = getEmployeeByIdUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {

      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        employeeId: req.query.employeeId,
        employeeToken: employeeTokenOrError.getValue()
      } as GetEmployeeByIdDTO;

      const employee = await this.getEmployeeByIdUseCase.execute(reqData);

      const employeeJSON = EmployeeMapper.toJSON(employee);

      res.json({employee: employeeJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
