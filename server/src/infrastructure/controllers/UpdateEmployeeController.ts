import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  UpdateEmployeeDTO, 
  UpdateEmployeeUseCase
} from "../../application";

interface UpdateEmployeeControllerDeps {
  updateEmployeeUseCase: UpdateEmployeeUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class UpdateEmployeeController {
  public readonly route = "/employee";

  protected readonly updateEmployeeUseCase: UpdateEmployeeUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    updateEmployeeUseCase,
    controllerErrorHandler
  }: UpdateEmployeeControllerDeps) {
    this.updateEmployeeUseCase = updateEmployeeUseCase;
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
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        nroDocument: req.body.nroDocument,
        birthDate: req.body.birthDate,
        imageURL: req.body.imageURL,
        type: req.body.type,
        phone: req.body.phone,
        accessCode: req.body.accessCode,
        employeeToken: employeeTokenOrError.getValue()
      } as UpdateEmployeeDTO;
      
      await this.updateEmployeeUseCase.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
