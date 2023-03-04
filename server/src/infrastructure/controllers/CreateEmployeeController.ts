import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  CreateEmployeeDTO, 
  CreateEmployeeUseCase
} from "../../application";

interface CreateEmployeeControllerDeps {
  createEmployeeUseCase: CreateEmployeeUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class CreateEmployeeController {
  public readonly route = "/employee";

  protected readonly createEmployeeUseCase: CreateEmployeeUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    createEmployeeUseCase,
    controllerErrorHandler
  }: CreateEmployeeControllerDeps) {
    this.createEmployeeUseCase = createEmployeeUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {

      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        nroDocument: req.body.nroDocument,
        birthDate: req.body.birthDate,
        type: req.body.type,
        imageURL: req.body.imageURL,
        accessCode: req.body.accessCode,
        phone: req.body.phone,
        employeeToken: employeeTokenOrError.getValue()
      } as CreateEmployeeDTO;

      const employee = await this.createEmployeeUseCase.execute(reqData);
      
      const employeeJSON = EmployeeMapper.toJSON(employee);

      res.json({employee: employeeJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
