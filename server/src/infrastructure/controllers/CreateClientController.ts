import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { ClientMapper } from "../mappers/ClientMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  CreateClientDTO, 
  CreateClientUseCase
} from "../../application";

interface CreateClientControllerDeps {
  createClientUseCase: CreateClientUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class CreateClientController {
  public readonly route = "/client";

  protected readonly createClientUseCase: CreateClientUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    createClientUseCase,
    controllerErrorHandler
  }: CreateClientControllerDeps) {
    this.createClientUseCase = createClientUseCase;
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
        nroDocument: String(req.body.nroDocument),
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        imageURL: req.body.imageURL,
        business: req.body.business,
        employeeToken: employeeTokenOrError.getValue()
      } as CreateClientDTO;

      const client = await this.createClientUseCase.execute(reqData);

      const clientJSON = ClientMapper.toJSON(client);

      res.json({client: clientJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
