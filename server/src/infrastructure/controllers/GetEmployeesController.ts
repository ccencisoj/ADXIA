import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetEmployeesDTO, 
  GetEmployeesUseCase
} from "../../application";

interface GetEmployeesControllerDeps {
  getEmployeesUseCase: GetEmployeesUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetEmployeesController {
  public readonly route = "/employees";

  protected readonly getEmployeesUseCase: GetEmployeesUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getEmployeesUseCase,
    controllerErrorHandler
  }: GetEmployeesControllerDeps) {
    this.getEmployeesUseCase = getEmployeesUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {
      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        skip: Number(req.query.skip),
        limit: Number(req.query.limit),
        searchValue: req.query.search,
        employeeToken: employeeTokenOrError.getValue()
      } as GetEmployeesDTO;

      const employees = await this.getEmployeesUseCase.execute(reqData);
      
      const employeesJSON = employees.map((employee)=> EmployeeMapper.toJSON(employee));

      res.json({employees: employeesJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
