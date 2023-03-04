import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { ClientMapper } from "../mappers/ClientMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetClientByIdDTO, 
  GetClientByIdUseCase
} from "../../application";

interface GetClientByIdControllerDeps {
  getClientByIdUseCase: GetClientByIdUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetClientByIdController {
  public readonly route = "/client";

  protected readonly getClientByIdUseCase: GetClientByIdUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getClientByIdUseCase,
    controllerErrorHandler
  }: GetClientByIdControllerDeps) {
    this.getClientByIdUseCase = getClientByIdUseCase;
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
      } as GetClientByIdDTO;

      const client = await this.getClientByIdUseCase.execute(reqData);

      const clientJSON = ClientMapper.toJSON(client);

      res.json({client: clientJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
