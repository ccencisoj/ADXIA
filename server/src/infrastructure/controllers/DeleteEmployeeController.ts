import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  DeleteEmployeeDTO, 
  DeleteEmployeeUseCase
} from "../../application";

interface DeleteEmployeeControllerDeps {
  deleteEmployeeUseCase: DeleteEmployeeUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class DeleteEmployeeController {
  public readonly route = "/employee";

  protected readonly deleteEmployeeUseCase: DeleteEmployeeUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    deleteEmployeeUseCase,
    controllerErrorHandler
  }: DeleteEmployeeControllerDeps) {
    this.deleteEmployeeUseCase = deleteEmployeeUseCase;
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
      } as DeleteEmployeeDTO;

      await this.deleteEmployeeUseCase.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
