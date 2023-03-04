import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { OrderMapper } from "../mappers/OrderMapper";
import { ClientMapper } from "../mappers/ClientMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import { GetOrdersClientsDTO, GetOrdersClientsUseCase } from "../../application"

interface GetOrdersClientsControllerDeps {
  getOrdersClientsUseCase: GetOrdersClientsUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetOrdersClientsController {
  public readonly route = "/orders/clients";

  protected readonly getOrdersClientsUseCase: GetOrdersClientsUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getOrdersClientsUseCase, 
    controllerErrorHandler
  }: GetOrdersClientsControllerDeps) {
    this.getOrdersClientsUseCase = getOrdersClientsUseCase;
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
        employeeToken: employeeTokenOrError.getValue()
      } as GetOrdersClientsDTO;

      const ordersClients = await this.getOrdersClientsUseCase.execute(reqData);

      let clients = [];

      for(let orderClient of ordersClients) {
        const client = ClientMapper.toJSON(orderClient.client);
        const order = orderClient.order ? OrderMapper.toJSON(orderClient.order) : null;

        clients.push({...client, order});
      }

      res.json({clients: clients});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
