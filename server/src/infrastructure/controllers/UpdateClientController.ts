import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  UpdateClientDTO, 
  UpdateClientUseCase
} from "../../application";

interface UpdateClientControllerDeps {
  updateClientUseCase: UpdateClientUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class UpdateClientController {
  public readonly route = "/client";

  protected readonly updateClientUseCase: UpdateClientUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    updateClientUseCase,
    controllerErrorHandler
  }: UpdateClientControllerDeps) {
    this.updateClientUseCase = updateClientUseCase;
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
        name: req.body.name,
        surname: req.body.surname,
        nroDocument: req.body.nroDocument,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        imageURL: req.body.imageURL,
        business: req.body.business,
        employeeToken: employeeTokenOrError.getValue()
      } as UpdateClientDTO;

      await this.updateClientUseCase.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
