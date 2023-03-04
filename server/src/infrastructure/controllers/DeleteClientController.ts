import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  DeleteClientDTO, 
  DeleteClientUseCase
} from "../../application";

interface DeleteClientControllerDeps {
  deleteClientUseCase: DeleteClientUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class DeleteClientController {
  public readonly route = "/client";

  protected readonly deleteClientUseCase: DeleteClientUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    deleteClientUseCase,
    controllerErrorHandler
  }: DeleteClientControllerDeps) {
    this.deleteClientUseCase = deleteClientUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {

      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        clientId: req.query.clientId,
        employeeToken: employeeTokenOrError.getValue()
      } as DeleteClientDTO;

      await this.deleteClientUseCase.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
